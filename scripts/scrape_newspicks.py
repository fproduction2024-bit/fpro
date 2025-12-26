import requests
from bs4 import BeautifulSoup
import os
import datetime
import re
from urllib.parse import urljoin

# Configuration
BASE_URL = "https://newspicks.com/"
OUTPUT_DIR = "articles"

def get_latest_articles():
    """Scrapes the main page for article links."""
    print(f"Fetching {BASE_URL}...")
    try:
        response = requests.get(BASE_URL, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"Error fetching base URL: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    links = []
    
    # Strategy: finding 'a' tags that link to news or trends
    # The structure observed has links like /news/... and /trends/...
    for a_tag in soup.find_all('a', href=True):
        href = a_tag['href']
        if '/news/' in href or '/trends/' in href:
            # Avoid generic index pages if possible, target specific IDs
            if re.search(r'/(news|trends)/\d+/', href):
                full_url = urljoin(BASE_URL, href)
                # clear query params for cleaner URL if needed, or keep them if required
                # keeping detailed link might be safer for now
                if full_url not in links:
                    links.append(full_url)
    
    print(f"Found {len(links)} potential article links.")
    return links[:5] # Return top 5

def scrape_article(url):
    """Fetches a single article and extracts content."""
    print(f"Scraping {url}...")
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Extract Title - try h1, then og:title
    title = None
    h1 = soup.find('h1')
    if h1:
        title = h1.get_text(strip=True)
    
    if not title:
        og_title = soup.find('meta', property='og:title')
        if og_title:
            title = og_title.get('content')
            
    if not title:
        title = "No Title Found"

    # Extract Content - NewsPicks is SPA/React, content might be dynamically loaded.
    # We grab what we can from meta description or potentially visible text.
    body_text = ""
    
    # Try og:description first
    og_desc = soup.find('meta', property='og:description')
    if og_desc:
        body_text += f"> {og_desc.get('content')}\n\n"
        
    # Try to find main content text if rendered
    # This is best-effort for static scrape
    paragraphs = soup.find_all('p')
    for p in paragraphs:
        text = p.get_text(strip=True)
        if len(text) > 50: # arbitrary filter to avoid menu items
            body_text += f"{text}\n\n"

    return {
        "title": title,
        "url": url,
        "body": body_text,
        "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

def save_to_markdown(article, save_dir):
    """Saves article data to a markdown file."""
    if not article:
        return

    # Sanitize filename
    safe_title = re.sub(r'[\\/*?:"<>|]', "", article['title'])
    safe_title = safe_title.replace(" ", "_")
    filename = f"{safe_title[:50]}.md"
    filepath = os.path.join(save_dir, filename)

    content = f"""# {article['title']}

- **Source**: {article['url']}
- **Date**: {article['date']}

## Content

{article['body']}
"""
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Saved: {filepath}")

def main():
    # Setup output directory
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H%M%S")
    save_dir = os.path.join(OUTPUT_DIR, timestamp)
    os.makedirs(save_dir, exist_ok=True)
    
    links = get_latest_articles()
    
    for link in links:
        article_data = scrape_article(link)
        if article_data:
            save_to_markdown(article_data, save_dir)
            
    # Check if directory is empty (no articles found)
    if not os.listdir(save_dir):
        print("No articles saved. Removing empty directory.")
        os.rmdir(save_dir)
    else:
        print(f"Done. Articles saved in {save_dir}")

if __name__ == "__main__":
    main()
