#!/usr/bin/env python3
"""
PLAUD NOTE Export Script

Extracts transcripts and AI summaries from PLAUD Web and saves them as Markdown.

Usage:
    python plaud_export.py --file-id <FILE_ID> --token <JWT_TOKEN>

Environment Variables:
    PLAUD_TOKEN: JWT token from browser's local storage (tokenstr)
"""

import argparse
import gzip
import json
import os
import sys
from datetime import datetime
from io import BytesIO
from typing import Optional

import requests


def fetch_file_detail(file_id: str, token: str) -> dict:
    """Fetch the file detail including links to transcript and summaries."""
    url = f"https://api-apne1.plaud.ai/file/detail/{file_id}?pre_note_ids[]=transcript"
    headers = {
        "Authorization": f"bearer {token}",
        "Accept": "application/json, text/plain, */*",
        "Platform": "web",
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()


def fetch_json_content(url: str) -> dict:
    """Download JSON content from S3 (handles both gzipped and plain JSON)."""
    response = requests.get(url)
    response.raise_for_status()
    content = response.content
    
    # Check if content is gzipped (gzip magic number: 1f 8b)
    if content[:2] == b'\x1f\x8b':
        with gzip.GzipFile(fileobj=BytesIO(content)) as f:
            return json.load(f)
    else:
        # Plain JSON
        return response.json()


def format_time(ms: int) -> str:
    """Convert milliseconds to HH:MM:SS format."""
    total_seconds = ms // 1000
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    if hours > 0:
        return f"{hours:02}:{minutes:02}:{seconds:02}"
    return f"{minutes:02}:{seconds:02}"


def export_to_markdown(
    file_detail: dict,
    output_path: Optional[str] = None,
) -> str:
    """Generate a Markdown document from the extracted data."""
    data = file_detail.get("data", {})
    file_name = data.get("file_name", "Untitled")
    start_time = data.get("start_time", 0)
    duration = data.get("duration", 0)

    # Format date
    if start_time:
        date_str = datetime.fromtimestamp(start_time / 1000).strftime("%Y-%m-%d %H:%M")
    else:
        date_str = "Unknown date"

    lines = [
        f"# {file_name}",
        "",
        f"**Date**: {date_str}",
        f"**Duration**: {format_time(duration)}",
        "",
    ]

    # Parse content_list to find S3 links
    content_list = data.get("content_list", [])
    transcript_url = None
    summary_urls = []

    for item in content_list:
        data_type = item.get("data_type", "")
        data_link = item.get("data_link", "")
        data_title = item.get("data_title", "")
        data_tab_name = item.get("data_tab_name", "")

        if data_type == "transaction" and data_link:
            transcript_url = data_link
        elif "sum" in data_type and data_link:
            summary_urls.append({
                "url": data_link,
                "title": data_title or data_tab_name or "Summary",
            })

    # Fetch and include AI Summaries
    for summary_info in summary_urls:
        try:
            print(f"  Fetching summary: {summary_info['title']}")
            summary_data = fetch_json_content(summary_info["url"])
            ai_content = summary_data.get("ai_content", "")
            if ai_content:
                lines.append("---")
                lines.append("")
                lines.append(f"## {summary_info['title']}")
                lines.append("")
                lines.append(ai_content)
                lines.append("")
        except Exception as e:
            print(f"  Warning: Failed to fetch summary {summary_info['title']}: {e}")

    # Fetch and include Transcript
    if transcript_url:
        try:
            print("  Fetching transcript...")
            trans_data = fetch_json_content(transcript_url)
            # Handle both dict and list response formats
            if isinstance(trans_data, list):
                trans_result = trans_data
            else:
                trans_result = trans_data.get("trans_result", [])
            
            if trans_result:
                lines.append("---")
                lines.append("")
                lines.append("## Transcript")
                lines.append("")
                for segment in trans_result:
                    start = segment.get("start_time", 0)
                    content = segment.get("content", "")
                    timestamp = format_time(start)
                    lines.append(f"**[{timestamp}]** {content}")
                    lines.append("")
        except Exception as e:
            print(f"  Warning: Failed to fetch transcript: {e}")

    markdown = "\n".join(lines)

    if output_path:
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(markdown)
        print(f"Saved to: {output_path}")

    return markdown


def list_files(token: str, limit: int = 20) -> list:
    """Fetch the list of most recent recordings."""
    url = "https://api-apne1.plaud.ai/file/simple/web"
    params = {
        "skip": 0,
        "limit": limit,
        "is_trash": 2,
        "sort_by": "start_time",
        "is_desc": "true"
    }
    headers = {
        "Authorization": f"bearer {token}",
        "Accept": "application/json, text/plain, */*",
        "Platform": "web",
    }
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json().get("data_file_list", [])


def load_processed_files(state_file: str) -> set:
    """Load the set of already processed file IDs."""
    if os.path.exists(state_file):
        try:
            with open(state_file, "r") as f:
                return set(json.load(f))
        except Exception:
            return set()
    return set()


def save_processed_files(state_file: str, processed_ids: set):
    """Save the set of processed file IDs to a JSON file."""
    with open(state_file, "w") as f:
        json.dump(list(processed_ids), f)


def main():
    parser = argparse.ArgumentParser(description="Export PLAUD NOTE to Markdown")
    parser.add_argument(
        "--file-id",
        help="The file ID from the PLAUD URL (e.g., e9bdab4c16a96fd5aca9a198b066dd7c)",
    )
    parser.add_argument(
        "--token",
        default=os.environ.get("PLAUD_TOKEN"),
        help="JWT token (or set PLAUD_TOKEN env var)",
    )
    parser.add_argument(
        "--auto",
        action="store_true",
        help="Automatically detect and export new files",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=20,
        help="Limit for --auto mode (default: 20)",
    )
    parser.add_argument(
        "--output",
        "-o",
        help="Output file path (default: <file_name>.md)",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Also output raw JSON data",
    )
    parser.add_argument(
        "--dir",
        default="plaud_exports",
        help="Output directory (default: plaud_exports)",
    )
    parser.add_argument(
        "--state-file" ,
        default="plaud_processed.json",
        help="File to track processed IDs (default: plaud_processed.json)",
    )

    args = parser.parse_args()

    if not args.token:
        print(
            "Error: Token is required. Provide via --token or PLAUD_TOKEN env var.",
            file=sys.stderr,
        )
        sys.exit(1)

    # Create output directory
    if not os.path.exists(args.dir):
        os.makedirs(args.dir)
        print(f"Created directory: {args.dir}")

    if args.auto:
        print("Running in AUTO mode...")
        processed_ids = load_processed_files(args.state_file)
        files = list_files(args.token, args.limit)
        
        new_files = [f for f in files if f.get("id") not in processed_ids]
        print(f"Found {len(new_files)} new files out of {len(files)} total.")
        
        for file_info in new_files:
            file_id = file_info.get("id")
            file_name = file_info.get("filename", file_id)
            is_trans = file_info.get("is_trans")
            is_summary = file_info.get("is_summary")
            
            if not is_trans or not is_summary:
                print(f"Skipping {file_name} ({file_id}) - AI processing not yet complete.")
                continue
                
            print(f"Exporting: {file_name} ({file_id})")
            try:
                detail = fetch_file_detail(file_id, args.token)
                
                # Sanitize filename
                safe_name = "".join(c if c.isalnum() or c in " _-" else "_" for c in file_name)
                output_path = os.path.join(args.dir, f"{safe_name}.md")
                
                export_to_markdown(detail, output_path)
                processed_ids.add(file_id)
                save_processed_files(args.state_file, processed_ids)
                
                if args.json:
                    json_path = output_path.replace(".md", ".json")
                    with open(json_path, "w", encoding="utf-8") as f:
                        json.dump({"file_detail": detail}, f, ensure_ascii=False, indent=2)
            except Exception as e:
                print(f"Error exporting {file_name}: {e}")
                
        print("Auto mode complete.")
        return

    # Manual mode
    if not args.file_id:
        print("Error: --file-id is required in manual mode.", file=sys.stderr)
        sys.exit(1)

    print(f"Fetching file detail for: {args.file_id}")
    file_detail = fetch_file_detail(args.file_id, args.token)

    # Determine output path
    if args.output:
        output_path = args.output
    else:
        file_name = file_detail.get("data", {}).get("file_name", args.file_id)
        # Sanitize filename
        safe_name = "".join(c if c.isalnum() or c in " _-" else "_" for c in file_name)
        output_path = os.path.join(args.dir, f"{safe_name}.md")

    export_to_markdown(file_detail, output_path)

    if args.json:
        json_path = output_path.replace(".md", ".json")
        json_full_path = os.path.join(args.dir, json_path) if not args.output else json_path
        with open(json_full_path, "w", encoding="utf-8") as f:
            json.dump({"file_detail": file_detail}, f, ensure_ascii=False, indent=2)
        print(f"Saved JSON to: {json_full_path}")

    print("Done!")


if __name__ == "__main__":
    main()
