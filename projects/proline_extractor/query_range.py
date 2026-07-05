#!/usr/bin/env python3
import os
import asyncio
import sys

# Ensure we can import from the project directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)

from sheets_export import main

async def interactive_query():
    print("=== Proline Custom Range Query Tool ===")
    print("This tool will extract Proline KPIs for a specific date range and export them to Google Sheets.")
    
    try:
        days_from = input("Enter 'days from' (e.g., 45): ")
        if not days_from:
            days_from = 45
        else:
            days_from = int(days_from)
            
        days_to = input("Enter 'days to' (e.g., 15): ")
        if not days_to:
            days_to = 15
        else:
            days_to = int(days_to)
            
        print(f"\nStarting extraction for range: {days_from} to {days_to} days ago...")
        success = await main(days_from=days_from, days_to=days_to)
        
        if success:
            print("\nSUCCESS: Data exported to Google Sheets!")
        else:
            print("\nERROR: Export failed. Check the console output above.")
            
    except ValueError:
        print("\nERROR: Please enter an integer value.")
    except KeyboardInterrupt:
        print("\nOperation cancelled.")
    except Exception as e:
        print(f"\nAn unexpected error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(interactive_query())
