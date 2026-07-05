import asyncio
import os
import json
from datetime import datetime, timedelta
from playwright.async_api import async_playwright

# Get the directory of the current script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SESSION_FILE = os.path.join(BASE_DIR, "session.json")
OUTPUT_FILE = os.path.join(BASE_DIR, "kpi_data.json")


async def get_basic_kpis(page):
    """Extract basic KPIs from the dashboard homepage."""
    kpi_data = {}
    try:
        # 友だち数 (User Count)
        user_count_el = await page.query_selector(".friend-count-area .user-count")
        if user_count_el:
            kpi_data["user_count"] = await user_count_el.inner_text()

        # プラン名 (Plan Name)
        plan_el = await page.query_selector(".plan-name a")
        if plan_el:
            kpi_data["plan_name"] = (await plan_el.inner_text()).strip()


        # アカウント名 (Account Name)
        account_el = await page.query_selector("#partner_pulldown_menu_label_id_md2JsGPl13")
        if account_el:
            kpi_data["account_name"] = await account_el.inner_text()

    except Exception as e:
        print(f"Error extracting basic KPIs: {e}")

    return kpi_data


async def get_friends_count(page, days_from=45, days_to=15):
    """
    Get the count of users added between days_from and days_to days ago.
    No tag filtering - just date-based user count.
    """
    print(f"\n--- Extracting Friends Count ({days_from}~{days_to} days ago) ---")
    
    # Calculate date range
    today = datetime.now()
    date_from = (today - timedelta(days=days_from)).strftime("%Y/%m/%d")
    date_to = (today - timedelta(days=days_to)).strftime("%Y/%m/%d")
    print(f"Date range: {date_from} ~ {date_to}")

    try:
        # Navigate to user management page
        print("Navigating to user management page...")
        await page.goto("https://autosns.jp/select-user", wait_until="domcontentloaded", timeout=60000)
        await asyncio.sleep(5)

        # Set date range via JavaScript
        print("Setting date filters...")
        await page.evaluate(f"""() => {{
            const fromEl = document.getElementById('search_addfriend_from');
            const toEl = document.getElementById('search_addfriend_to');
            if (fromEl) {{
                fromEl.value = '{date_from}';
                fromEl.dispatchEvent(new Event('change', {{ bubbles: true }}));
            }}
            if (toEl) {{
                toEl.value = '{date_to}';
                toEl.dispatchEvent(new Event('change', {{ bubbles: true }}));
            }}
        }}""")
        
        # Wait for the page to update with filtered results
        print("Waiting for results...")
        await asyncio.sleep(3)

        # Read the filtered count
        import re
        
        count = await page.evaluate("""() => {
            // Look for elements with count format
            const allText = document.body.innerText;
            
            // Pattern 1: Look for "X人" pattern
            const patterns = allText.match(/\\d+人/g);
            if (patterns) {
                for (const p of patterns) {
                    const num = parseInt(p.replace('人', ''));
                    if (num < 10000) {  // Filtered count should be smaller than total
                        return num;
                    }
                }
            }
            
            // Pattern 2: Look for text pattern "1~XX / XX人"
            const resultMatch = allText.match(/\\d+~(\\d+) \\/ (\\d+)人/);
            if (resultMatch) {
                return parseInt(resultMatch[2]);
            }
            
            return null;
        }""")
        
        if count is not None:
            print(f"Found count: {count}")
            return count

        # Take a debug screenshot to help identify the issue
        debug_path = os.path.join(BASE_DIR, "friends_debug.png")
        await page.screenshot(path=debug_path)
        print(f"Debug screenshot saved to: {debug_path}")

    except Exception as e:
        print(f"Error extracting friends count: {e}")
        import traceback
        traceback.print_exc()

    return None


async def get_purchaser_count(page, days_from=45, days_to=15):
    """
    Get the count of users added between days_from and days_to days ago,
    who have the "購入者" (Purchaser) tag.
    """
    print(f"\n--- Extracting Purchaser Count ({days_from}~{days_to} days ago) ---")
    
    # Calculate date range
    today = datetime.now()
    date_from = (today - timedelta(days=days_from)).strftime("%Y/%m/%d")
    date_to = (today - timedelta(days=days_to)).strftime("%Y/%m/%d")
    print(f"Date range: {date_from} ~ {date_to}")

    try:
        # Navigate to user management page
        print("Navigating to user management page...")
        await page.goto("https://autosns.jp/select-user", wait_until="domcontentloaded", timeout=60000)
        await asyncio.sleep(5)

        # Set date range via JavaScript
        print("Setting date filters...")
        await page.evaluate(f"""() => {{
            const fromEl = document.getElementById('search_addfriend_from');
            const toEl = document.getElementById('search_addfriend_to');
            if (fromEl) {{
                fromEl.value = '{date_from}';
                fromEl.dispatchEvent(new Event('change', {{ bubbles: true }}));
            }}
            if (toEl) {{
                toEl.value = '{date_to}';
                toEl.dispatchEvent(new Event('change', {{ bubbles: true }}));
            }}
        }}""")
        await asyncio.sleep(1)

        # Open tag selection modal
        print("Opening tag selection modal...")
        modal_opened = await page.evaluate("""() => {
            const buttons = document.querySelectorAll('a, button');
            for (const btn of buttons) {
                if (btn.textContent.trim() === '選択する') {
                    btn.click();
                    return true;
                }
            }
            return false;
        }""")
        print(f"Modal open clicked: {modal_opened}")
        await asyncio.sleep(2)

        # Select 購入者 tag
        print("Selecting '購入者' tag...")
        tag_selected = await page.evaluate("""() => {
            const includeBtn = document.querySelector('.table-body-area[data-name="購入者"] label.include');
            if (includeBtn) {
                if (!includeBtn.classList.contains('active')) {
                    includeBtn.click();
                    return "clicked";
                } else {
                    return "already_selected";
                }
            }
            return "not_found";
        }""")
        print(f"Tag selection result: {tag_selected}")
        await asyncio.sleep(1)

        # Save selection
        print("Saving selection...")
        save_clicked = await page.evaluate("""() => {
            const swalConfirm = document.querySelector('button.swal2-confirm');
            if (swalConfirm) {
                swalConfirm.click();
                return "swal_confirm";
            }
            return false;
        }""")
        print(f"Save button clicked: {save_clicked}")
        await asyncio.sleep(3)

        # Read the filtered count
        import re
        count = await page.evaluate("""() => {
            const allText = document.body.innerText;
            const patterns = allText.match(/\\d+人/g);
            if (patterns) {
                for (const p of patterns) {
                    const num = parseInt(p.replace('人', ''));
                    if (num < 10000) {
                        return num;
                    }
                }
            }
            return null;
        }""")
        
        if count is not None:
            print(f"Found count: {count}")
            return count

    except Exception as e:
        print(f"Error extracting purchaser count: {e}")
        import traceback
        traceback.print_exc()

    return None



async def get_dashboard_data(days_from=45, days_to=15):
    """Main function to extract all KPI data."""
    if not os.path.exists(SESSION_FILE):
        print(f"Error: {SESSION_FILE} not found. Please run auth_helper.py first.")
        return None

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(storage_state=SESSION_FILE)
        page = await context.new_page()

        print(f"=== Proline KPI Extractor (Range: {days_from}~{days_to} days ago) ===\n")

        # 1. Get basic KPIs from dashboard
        print("--- Extracting Basic KPIs ---")
        try:
            await page.goto("https://autosns.jp/", wait_until="domcontentloaded", timeout=60000)
            await asyncio.sleep(10)
        except Exception as e:
            print(f"Navigation warning: {e}")

        kpi_data = await get_basic_kpis(page)
        # Store requested range in data
        kpi_data["days_from"] = days_from
        kpi_data["days_to"] = days_to
        print(f"Basic KPIs: {kpi_data}")

        # 2. Get friends count (custom range) - no tag filter
        friends_count = await get_friends_count(page, days_from=days_from, days_to=days_to)
        if friends_count is not None:
            kpi_data[f"friends_count_{days_from}_{days_to}_days"] = friends_count
            # Also keep a semantic key for easier sheets export
            kpi_data["range_friends_count"] = friends_count
            print(f"Friends count ({days_from}-{days_to} days ago): {friends_count}")
        else:
            print("Could not extract friends count")

        # 3. Get purchaser count (custom range) - with 購入者 tag
        purchaser_count = await get_purchaser_count(page, days_from=days_from, days_to=days_to)
        if purchaser_count is not None:
            kpi_data[f"purchaser_count_{days_from}_{days_to}_days"] = purchaser_count
            # Also keep a semantic key for easier sheets export
            kpi_data["range_purchaser_count"] = purchaser_count
            print(f"Purchaser count ({days_from}-{days_to} days ago): {purchaser_count}")
        else:
            print("Could not extract purchaser count")


        # Save to JSON
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(kpi_data, f, ensure_ascii=False, indent=2)

        print(f"\n=== All KPIs extracted successfully ===")
        print(f"Output file: {OUTPUT_FILE}")
        print(json.dumps(kpi_data, ensure_ascii=False, indent=2))

        await browser.close()
        return {"status": "success", **kpi_data}


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='Proline KPI Extractor')
    parser.add_argument('--from', type=int, dest='days_from', default=45, help='Days from (default: 45)')
    parser.add_argument('--to', type=int, dest='days_to', default=15, help='Days to (default: 15)')
    args = parser.parse_args()
    
    asyncio.run(get_dashboard_data(days_from=args.days_from, days_to=args.days_to))



