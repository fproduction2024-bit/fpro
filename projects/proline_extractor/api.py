from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import subprocess
import os
import threading
import json

app = Flask(__name__, template_folder='templates')
CORS(app)

# Get the directory of the current script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Use the virtual environment's python in the same directory
PYTHON_EXEC = os.path.join(BASE_DIR, ".venv", "bin", "python3")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/auth', methods=['POST'])
def run_auth():
    def execute():
        subprocess.run([PYTHON_EXEC, "auth_helper.py"], cwd=BASE_DIR)
    
    thread = threading.Thread(target=execute)
    thread.start()
    return jsonify({"status": "running", "message": "auth_helper.py started. Please look for the browser window."})

@app.route('/api/export_range', methods=['POST'])
def run_export_range():
    data = request.json
    days_from = data.get('days_from', 45)
    days_to = data.get('days_to', 15)
    
    print(f"API: Running export for range {days_from} to {days_to}")
    
    try:
        # Run sheets_export.py with range arguments
        result = subprocess.run([
            PYTHON_EXEC, "sheets_export.py", 
            "--from", str(days_from), 
            "--to", str(days_to)
        ], capture_output=True, text=True, cwd=BASE_DIR)
        
        if result.returncode == 0:
            print("API: Export successful")
            return jsonify({"status": "success", "message": "Data exported to Google Sheets."})
        else:
            print(f"API: Export failed: {result.stderr}")
            return jsonify({"status": "error", "message": result.stderr or "Export failed."})
    except Exception as e:
        print(f"API: Exception during export: {str(e)}")
        return jsonify({"status": "error", "message": str(e)})

@app.route('/api/extract', methods=['GET', 'POST'])
def run_extract():
    # Keep this for compatibility with original hub dashboard
    try:
        result = subprocess.run([PYTHON_EXEC, "extractor.py"], capture_output=True, text=True, cwd=BASE_DIR)
        if result.returncode == 0:
            return jsonify({"status": "success", "title": "Dashboard", "output": result.stdout})
        else:
            return jsonify({"status": "error", "message": result.stderr or "Extraction failed."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == "__main__":
    print("Proline API starting at http://localhost:8081")
    app.run(debug=True, port=8081)

