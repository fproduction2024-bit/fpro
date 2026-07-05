#!/usr/bin/env python3
"""
Proline KPI to Google Sheets Exporter
Exports KPI data to a Google Spreadsheet weekly.
"""
import os
import json
import asyncio
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials

# Import the extractor
from extractor import get_dashboard_data

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_FILE = os.path.join(BASE_DIR, "credentials.json")
CONFIG_FILE = os.path.join(BASE_DIR, "config.json")
SHEET_NAME = "KPI Data"

def load_config():
    """Load configuration from config.json."""
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "r") as f:
            return json.load(f)
    return {}

config = load_config()
SPREADSHEET_ID = config.get("spreadsheet_id", os.environ.get("PROLINE_SPREADSHEET_ID", ""))


# Google Sheets API scopes
SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]


def get_sheets_client():
    """Initialize Google Sheets client with service account."""
    if not os.path.exists(CREDENTIALS_FILE):
        raise FileNotFoundError(
            f"Credentials file not found: {CREDENTIALS_FILE}\n"
            "Please download the service account JSON from Google Cloud Console."
        )
    
    creds = Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
    return gspread.authorize(creds)


def ensure_headers(spreadsheet):
    """Ensure the worksheet has the correct headers."""
    worksheet = spreadsheet.worksheet(SHEET_NAME)
    headers = [
        "Date",
        "Total Friends",
        "Friends (Range)",
        "Purchasers (Range)",
        "Conversion Rate (%)",
        "Range (Days)"
    ]
    
    # Check current headers
    current_headers = worksheet.row_values(1)
    if current_headers != headers:
        print("Updating headers to match new format...")
        worksheet.update('A1:F1', [headers])
        
        # Format header row
        worksheet.format('A1:F1', {
            'backgroundColor': {'red': 0.2, 'green': 0.4, 'blue': 0.8},
            'textFormat': {'bold': True, 'foregroundColor': {'red': 1, 'green': 1, 'blue': 1}},
            'horizontalAlignment': 'CENTER'
        })
    return spreadsheet



def create_spreadsheet_if_needed(client):
    """Create or open the spreadsheet and ensure headers."""
    global SPREADSHEET_ID
    
    spreadsheet = None
    if SPREADSHEET_ID:
        try:
            spreadsheet = client.open_by_key(SPREADSHEET_ID)
        except gspread.SpreadsheetNotFound:
            print(f"Spreadsheet {SPREADSHEET_ID} not found.")
            raise Exception(
                f"Spreadsheet not found or not shared with {client.auth.signer_email if hasattr(client.auth, 'signer_email') else 'service account'}.\n"
                "Please make sure you shared the sheet with Editor access."
            )
    
    if not spreadsheet:
        print("No Spreadsheet ID found in config. Attempting to create a new one (may fail if quota exceeded)...")
        spreadsheet = client.create("Proline KPI Weekly Report")
        print(f"Created new spreadsheet: {spreadsheet.url}")
        
        # Save the ID for future use
        config_path = os.path.join(BASE_DIR, "config.json")
        config = load_config()
        config['spreadsheet_id'] = spreadsheet.id
        config['spreadsheet_url'] = spreadsheet.url
        with open(config_path, 'w') as f:
            json.dump(config, f, indent=2)
        
        # Initial worksheet name
        worksheet = spreadsheet.sheet1
        worksheet.update_title(SHEET_NAME)

    return ensure_headers(spreadsheet)



def append_kpi_row(spreadsheet, kpi_data):
    """Append a new row with KPI data."""
    worksheet = spreadsheet.worksheet(SHEET_NAME)
    
    # Calculate conversion rate
    friends = kpi_data.get('range_friends_count', 0)
    purchasers = kpi_data.get('range_purchaser_count', 0)
    conversion_rate = round((purchasers / friends * 100), 2) if friends > 0 else 0
    
    # Range description
    days_from = kpi_data.get('days_from', '?')
    days_to = kpi_data.get('days_to', '?')
    range_desc = f"{days_from}-{days_to} days ago"

    # Prepare row data
    row = [
        datetime.now().strftime("%Y-%m-%d %H:%M"),
        kpi_data.get('user_count', ''),
        friends,
        purchasers,
        f"{conversion_rate}%",
        range_desc
    ]

    
    worksheet.append_row(row, value_input_option='USER_ENTERED')
    print(f"Added row: {row}")



async def main(days_from=45, days_to=15):
    """Main function to extract and export KPI data."""
    print("=" * 50)
    print(f"Proline KPI Export (Range: {days_from}~{days_to} days ago)")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)
    
    # Step 1: Extract KPI data
    print("\n[1/3] Extracting KPI data from Proline...")
    kpi_data = await get_dashboard_data(days_from=days_from, days_to=days_to)
    
    if not kpi_data or kpi_data.get('status') != 'success':
        print("ERROR: Failed to extract KPI data")
        return False
    
    print(f"Extracted: {json.dumps(kpi_data, ensure_ascii=False, indent=2)}")
    
    # Step 2: Connect to Google Sheets
    print("\n[2/3] Connecting to Google Sheets...")
    try:
        client = get_sheets_client()
        spreadsheet = create_spreadsheet_if_needed(client)
        print(f"Connected to: {spreadsheet.title}")
    except Exception as e:
        print(f"ERROR: Failed to connect to Google Sheets: {e}")
        return False
    
    # Step 3: Append data
    print("\n[3/3] Appending data to spreadsheet...")
    try:
        append_kpi_row(spreadsheet, kpi_data)
        print("SUCCESS: Data exported to Google Sheets!")
    except Exception as e:
        print(f"ERROR: Failed to append data: {e}")
        return False
    
    print("\n" + "=" * 50)
    print("Export completed successfully!")
    print("=" * 50)
    return True


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='Proline KPI Sheets Exporter')
    parser.add_argument('--from', type=int, dest='days_from', default=45, help='Days from (default: 45)')
    parser.add_argument('--to', type=int, dest='days_to', default=15, help='Days to (default: 15)')
    args = parser.parse_args()
    
    asyncio.run(main(days_from=args.days_from, days_to=args.days_to))

