import asyncio
import os
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        # Launch browser in non-headless mode so user can interact
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()

        print("Opening Proline login page...")
        await page.goto("https://autosns.jp/login")

        print("Please log in manually in the opened browser window.")
        print("Waiting for login to complete (waiting for dashboard or user selection page)...")

        # Wait for the user to be redirected to a post-login page
        # Based on browser state, 'select-user' or the root domain are likely
        try:
            print("Waiting for login... (Auto-closes when dashboard is reached)")
            
            # Wait for either URL to match
            # We use a pattern that matches the root or the select-user page
            await page.wait_for_function("""() => {
                const url = window.location.href;
                return url.includes('select-user') || (url === 'https://autosns.jp/') || (url === 'https://autosns.jp');
            }""", timeout=300000)

            print("Login detected! Waiting 2 seconds for cookies to settle...")
            await asyncio.sleep(2)
            
            # Save storage state to a file
            await context.storage_state(path="session.json")
            print("Session saved successfully to session.json")
        except Exception as e:
            print(f"Error or timeout during login: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
