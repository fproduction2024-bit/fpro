#!/bin/bash
# Proline KPI Weekly Export Runner
# This script is called by launchd

cd /Users/hiroshi/cursor/projects/proline_extractor
source .venv/bin/activate
python3 sheets_export.py >> /Users/hiroshi/cursor/projects/proline_extractor/logs/export.log 2>&1
