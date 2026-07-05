from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import threading
import os
import subprocess
from web_to_md_tool import WebToMarkdownCrawler

app = Flask(__name__, template_folder='.')
CORS(app)

# Store job status
jobs = {}

class WebCrawlerBridge(WebToMarkdownCrawler):
    def __init__(self, job_id, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.job_id = job_id

    def scrape_page(self, url):
        try:
            super().scrape_page(url)
            jobs[self.job_id]['logs'].append(f"Successfully scraped: {url}")
            jobs[self.job_id]['progress'] = (len(self.visited) / self.max_pages) * 100
            jobs[self.job_id]['count'] = len(self.visited)
        except Exception as e:
            jobs[self.job_id]['logs'].append(f"Error scraping {url}: {str(e)}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/scrape', methods=['POST'])
def start_scrape():
    data = request.json
    url = data.get('url')
    output_folder = data.get('folder', 'scraped_content')
    max_pages = int(data.get('max', 10))
    delay = int(data.get('delay', 1))
    strict_path = bool(data.get('strict_path', False))

    if not url:
        return jsonify({"error": "URL is required"}), 400

    job_id = str(len(jobs) + 1)
    output_path = os.path.join(os.getcwd(), output_folder)
    
    jobs[job_id] = {
        "status": "running",
        "progress": 0,
        "count": 0,
        "logs": [f"Starting crawl for {url}..."],
        "output_path": output_path
    }

    def run_crawler():
        crawler = WebCrawlerBridge(job_id, url, output_path, max_pages=max_pages, delay=delay, strict_path=strict_path)
        crawler.run()
        jobs[job_id]["status"] = "completed"
        jobs[job_id]["logs"].append("Crawl completed successfully!")

    thread = threading.Thread(target=run_crawler)
    thread.start()

    return jsonify({"job_id": job_id})

@app.route('/api/status/<job_id>', methods=['GET'])
def get_status(job_id):
    job = jobs.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify(job)

@app.route('/api/open-folder/<job_id>', methods=['POST'])
def open_folder(job_id):
    job = jobs.get(job_id)
    if not job or "output_path" not in job:
        return jsonify({"error": "Job or output path not found"}), 404
    
    path = job["output_path"]
    try:
        # For macOS, use 'open'. For Windows 'explorer', for Linux 'xdg-open'
        subprocess.run(["open", path])
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Server starting at http://localhost:8080")
    app.run(debug=True, port=8080)
