#!/bin/bash
# PLAUD NOTE Watch Script
# Periodically runs the export script in auto mode

# CONFIGURATION
TOKEN="YOUR_TOKEN_HERE" # Or set PLAUD_TOKEN environment variable
INTERVAL=3600            # Interval in seconds (default 1 hour)
EXPORT_SCRIPT="/Users/hiroshi/cursor/plaud_export.py"

# Use environment variable if set
if [ -z "$TOKEN" ]; then
    TOKEN=$PLAUD_TOKEN
fi

if [ -z "$TOKEN" ]; then
  echo "Error: PLAUD_TOKEN environment variable is not set."
  echo "Please set it: export PLAUD_TOKEN='your_token'"
  exit 1
fi

echo "Starting PLAUD Watcher (Interval: ${INTERVAL}s)..."

while true; do
  echo "[$(date)] Checking for new recordings..."
  python3 "$EXPORT_SCRIPT" --auto --token "$TOKEN"
  sleep "$INTERVAL"
done
