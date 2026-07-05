#!/usr/bin/env python3
import subprocess
import time
import sys

# --- CONFIGURATION ---
# Target processes to monitor
TARGET_PROCESSES = ["Cursor", "Antigravity Helper (Plugin)", "Electron", "Code", "Visual Studio Code"]

# Button labels to click (English and Japanese)
BUTTON_LABELS = [
    "Approve", "Proceed", "Allow", "Allow Once", "Accept", "Approve all",
    "承認", "続行", "許可", "一回許可", "すべて承認", "はい", "OK"
]

# Polling interval (seconds)
INTERVAL = 1.0
# ---------------------

APPLESCRIPT_TEMPLATE = """
tell application "System Events"
    repeat with procName in {processes}
        if exists process procName then
            tell process procName
                set buttonLabels to {labels}
                repeat with w in every window
                    try
                        repeat with btnLabel in buttonLabels
                            -- Direct button match
                            if exists (button btnLabel of w) then
                                click (button btnLabel of w)
                                return "Clicked " & btnLabel & " in " & procName
                            end if
                            
                            -- Deep search by name
                            try
                                set targetObj to (first UI element of w whose name is btnLabel)
                                if exists targetObj then
                                    perform action "AXPress" of targetObj
                                    return "Pressed " & btnLabel & " in " & procName
                                end if
                            end try
                        end repeat
                    end try
                end repeat
            end tell
        end if
    end repeat
end tell
return "No buttons found"
"""

def format_list_for_applescript(lst):
    return "{" + ", ".join(f'"{item}"' for item in lst) + "}"

def run_applescript():
    script = APPLESCRIPT_TEMPLATE.format(
        processes=format_list_for_applescript(TARGET_PROCESSES),
        labels=format_list_for_applescript(BUTTON_LABELS)
    )
    
    try:
        result = subprocess.run(
            ["osascript", "-e", script],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        return f"Error: {e.stderr.strip()}"

def main():
    print(f"--- Auto-Approval Script Started ---")
    print(f"Monitoring: {', '.join(TARGET_PROCESSES)}")
    print(f"Polling Interval: {INTERVAL}s")
    print("Press Ctrl+C to stop.")
    print("-" * 35)

    try:
        while True:
            output = run_applescript()
            if "No buttons found" not in output:
                print(f"[{time.strftime('%H:%M:%S')}] {output}")
            time.sleep(INTERVAL)
    except KeyboardInterrupt:
        print("\nStopping auto-approval script...")
        sys.exit(0)

if __name__ == "__main__":
    main()
