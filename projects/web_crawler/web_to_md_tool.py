import os
import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md
import re
import time
import argparse
from urllib.parse import urlparse, urljoin
from concurrent.futures import ThreadPoolExecutor

class WebToMarkdownCrawler:
    def __init__(self, start_url, output_dir, max_pages=100, delay=1, strict_path=False):
        self.start_url = start_url
        self.domain = urlparse(start_url).netloc
        self.base_path = urlparse(start_url).path
        self.output_dir = output_dir
        self.max_pages = max_pages
        self.delay = delay
        self.strict_path = strict_path
        self.visited = set()
        self.to_visit = [start_url]
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })

    def is_internal(self, url):
        parsed = urlparse(url)
        if parsed.netloc != self.domain:
            return False
        if self.strict_path and not parsed.path.startswith(self.base_path):
            return False
        return True

    def clean_filename(self, title):
        return re.sub(r'[\\/*?:"<>|]', "_", title).strip()

    def extract_links(self, soup, current_url):
        links = []
        for a in soup.find_all('a', href=True):
            absolute_url = urljoin(current_url, a['href']).split('#')[0].split('?')[0].rstrip('/')
            if self.is_internal(absolute_url) and absolute_url not in self.visited:
                links.append(absolute_url)
        return links

    def scrape_page(self, url):
        if url in self.visited or len(self.visited) >= self.max_pages:
            return
        
        self.visited.add(url)
        print(f"Crawling: {url} ({len(self.visited)}/{self.max_pages})")
        
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find main content
            content_area = soup.find('article') or soup.find('main') or soup.find('div', id='content') or soup.find('div', class_='content')
            if not content_area:
                # Fallback: remove common noise
                for noise in soup.find_all(['nav', 'footer', 'header', 'aside', 'script', 'style']):
                    noise.decompose()
                content_area = soup.body

            title = soup.title.string if soup.title else url.split('/')[-1] or "index"
            title = self.clean_filename(title)
            
            markdown_content = md(str(content_area), heading_style="ATX")
            
            # Save file
            filename = f"{len(self.visited):03d}_{title}.md"
            filepath = os.path.join(self.output_dir, filename)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(f"# {title}\n\nSource: {url}\n\n")
                f.write(markdown_content)
            
            # Add new links to visit
            new_links = self.extract_links(soup, url)
            for link in new_links:
                if link not in self.visited and link not in self.to_visit:
                    self.to_visit.append(link)
                    
            time.sleep(self.delay)
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")

    def run(self):
        os.makedirs(self.output_dir, exist_ok=True)
        while self.to_visit and len(self.visited) < self.max_pages:
            url = self.to_visit.pop(0)
            self.scrape_page(url)
        
        print(f"\nCompleted! Crawled {len(self.visited)} pages.")
        print(f"Files saved in: {self.output_dir}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Crawl a website and save pages as Markdown.")
    parser.add_argument("url", help="The starting URL to crawl")
    parser.add_argument("output", help="The output directory")
    parser.add_argument("--max", type=int, default=50, help="Maximum number of pages to crawl (default: 50)")
    parser.add_argument("--delay", type=int, default=1, help="Delay between requests in seconds (default: 1)")
    parser.add_argument("--strict-path", action="store_true", help="Only crawl pages that start with the same path as the start URL")

    args = parser.parse_args()
    
    crawler = WebToMarkdownCrawler(args.url, args.output, max_pages=args.max, delay=args.delay, strict_path=args.strict_path)
    crawler.run()
