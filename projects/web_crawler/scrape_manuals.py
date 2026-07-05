import os
import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md
import re
import time
from urllib.parse import urlparse, urljoin

# Config
BASE_URL = "https://autosns.co.jp/manual/"
OUTPUT_DIR = "/Users/hiroshi/cursor/autosns_manuals"
URLS = [
    "https://autosns.co.jp/manual/",
    "https://autosns.co.jp/manual/category/start",
    "https://autosns.co.jp/manual/category/use/",
    "https://autosns.co.jp/manual/use/reserve-calendar/reserve_summary",
    "https://autosns.co.jp/manual/use/scenarios/enquete_scenario",
    "https://autosns.co.jp/manual/use/form/form_score",
    "https://autosns.co.jp/manual/start/one-proline-overview",
    "https://autosns.co.jp/manual/start/two-official-differ",
    "https://autosns.co.jp/manual/start/three-othertool-differ",
    "https://autosns.co.jp/manual/start/external/paypal-smartbtn",
    "https://autosns.co.jp/manual/start/external/ycbm-new-booking",
    "https://autosns.co.jp/manual/start/make-10steps",
    "https://autosns.co.jp/manual/start/linkage-check",
    "https://autosns.co.jp/manual/start/redo",
    "https://autosns.co.jp/manual/start/delivered",
    "https://autosns.co.jp/manual/start/fee-structure",
    "https://autosns.co.jp/manual/start/term-overview",
    "https://autosns.co.jp/manual/category/start/setnavi",
    "https://autosns.co.jp/manual/start/setnavi/navi_new_step1_loam",
    "https://autosns.co.jp/manual/start/setnavi/navi_old_step1",
    "https://autosns.co.jp/manual/start/setnavi/firsttime-api",
    "https://autosns.co.jp/manual/category/start/external",
    "https://autosns.co.jp/manual/start/external/push_html",
    "https://autosns.co.jp/manual/start/external/receive_request",
    "https://autosns.co.jp/manual/start/external/addfriend_parameter",
    "https://autosns.co.jp/manual/start/external/ycbm-zoom-form",
    "https://autosns.co.jp/manual/category/start/connect",
    "https://autosns.co.jp/manual/start/connect/in-real-time",
    "https://autosns.co.jp/manual/start/connect/line-login",
    "https://autosns.co.jp/manual/start/connect/enable-webhook-redelivery",
    "https://autosns.co.jp/manual/start/connect/account-exch",
    "https://autosns.co.jp/manual/start/connect/create-proline-account",
    "https://autosns.co.jp/manual/start/connect/main_menu",
    "https://autosns.co.jp/manual/start/connect/create-line",
    "https://autosns.co.jp/manual/start/connect/got-account-link",
    "https://autosns.co.jp/manual/start/connect/autosns-line",
    "https://autosns.co.jp/manual/start/connect/add-first-friend",
    "https://autosns.co.jp/manual/use/conditional-send",
    "https://autosns.co.jp/manual/use/birthday-coupon",
    "https://autosns.co.jp/manual/use/direct-cp",
    "https://autosns.co.jp/manual/use/concurrent-messaging",
    "https://autosns.co.jp/manual/use/subsc-revenue",
    "https://autosns.co.jp/manual/use/change-account",
    "https://autosns.co.jp/manual/category/use/friends",
    "https://autosns.co.jp/manual/use/friends/after-block",
    "https://autosns.co.jp/manual/use/friends/uid-warning",
    "https://autosns.co.jp/manual/use/friends/blocked",
    "https://autosns.co.jp/manual/use/friends/url-click",
    "https://autosns.co.jp/manual/use/friends/friend-recog",
    "https://autosns.co.jp/manual/use/friends/add-notice",
    "https://autosns.co.jp/manual/use/friends/block",
    "https://autosns.co.jp/manual/use/friends/allfriends",
    "https://autosns.co.jp/manual/use/friends/tag",
    "https://autosns.co.jp/manual/use/friends/select-user",
    "https://autosns.co.jp/manual/category/use/special-message",
    "https://autosns.co.jp/manual/use/scenarios/click",
    "https://autosns.co.jp/manual/use/special-message/extramessage",
    "https://autosns.co.jp/manual/use/special-message/send-message-template",
    "https://autosns.co.jp/manual/category/use/scenarios",
    "https://autosns.co.jp/manual/use/scenarios/mainscenario-delete",
    "https://autosns.co.jp/manual/use/scenarios/scenario-move",
    "https://autosns.co.jp/manual/use/scenarios/flow-test",
    "https://autosns.co.jp/manual/use/scenarios/remind-scenario",
    "https://autosns.co.jp/manual/use/scenarios/form-jump",
    "https://autosns.co.jp/manual/use/scenarios/changegreeting",
    "https://autosns.co.jp/manual/use/scenarios/stepextra",
    "https://autosns.co.jp/manual/use/scenarios/customize",
    "https://autosns.co.jp/manual/use/scenarios/button",
    "https://autosns.co.jp/manual/use/scenarios/testmessage",
    "https://autosns.co.jp/manual/use/scenarios/add-scenario-message",
    "https://autosns.co.jp/manual/use/scenarios/create-scenario",
    "https://autosns.co.jp/manual/use/scenarios/edit-scenario-message",
    "https://autosns.co.jp/manual/use/scenarios/delete-scenario-message",
    "https://autosns.co.jp/manual/use/scenarios/copy-scenario",
    "https://autosns.co.jp/manual/use/scenarios/exec-measurement-tag-button",
    "https://autosns.co.jp/manual/use/scenarios/deploy-template-message",
    "https://autosns.co.jp/manual/category/use/greeting",
    "https://autosns.co.jp/manual/use/greeting/sendmessage",
    "https://autosns.co.jp/manual/category/use/reply",
    "https://autosns.co.jp/manual/use/reply/only-1time",
    "https://autosns.co.jp/manual/use/reply/auto-message",
    "https://autosns.co.jp/manual/use/reply/setting-keyword",
    "https://autosns.co.jp/manual/category/use/chat",
    "https://autosns.co.jp/manual/use/chat/line-chat",
    "https://autosns.co.jp/manual/use/chat/chat-settings",
    "https://autosns.co.jp/manual/use/chat/no-chat",
    "https://autosns.co.jp/manual/use/chat/chat-mistake",
    "https://autosns.co.jp/manual/use/chat/chataddress",
    "https://autosns.co.jp/manual/use/chat/chatsetting",
    "https://autosns.co.jp/manual/use/chat/chat",
    "https://autosns.co.jp/manual/use/chat/newtag",
    "https://autosns.co.jp/manual/category/use/menu",
    "https://autosns.co.jp/manual/use/menu/seasonal-menu-switch",
    "https://autosns.co.jp/manual/use/menu/richmenu-change",
    "https://autosns.co.jp/manual/use/menu/richmenu-move",
    "https://autosns.co.jp/manual/use/menu/shop-card",
    "https://autosns.co.jp/manual/use/menu/richmenu",
    "https://autosns.co.jp/manual/category/use/asp-system",
    "https://autosns.co.jp/manual/use/asp-system/asp-afcode",
    "https://autosns.co.jp/manual/use/asp-system/about-asp",
    "https://autosns.co.jp/manual/use/asp-system/config-asp",
    "https://autosns.co.jp/manual/use/asp-system/create-asp",
    "https://autosns.co.jp/manual/use/asp-system/results-asp",
    "https://autosns.co.jp/manual/use/asp-system/richmenu-asp",
    "https://autosns.co.jp/manual/category/use/form",
    "https://autosns.co.jp/manual/use/form/form-answer-score",
    "https://autosns.co.jp/manual/use/form/omikuji",
    "https://autosns.co.jp/manual/use/form/form",
    "https://autosns.co.jp/manual/use/form/formmessage",
    "https://autosns.co.jp/manual/category/use/page",
    "https://autosns.co.jp/manual/use/page/change-cp",
    "https://autosns.co.jp/manual/use/page/color-change",
    "https://autosns.co.jp/manual/use/page/play-wall",
    "https://autosns.co.jp/manual/use/page/cp-link",
    "https://autosns.co.jp/manual/use/page/menu-page",
    "https://autosns.co.jp/manual/use/page/cant-see",
    "https://autosns.co.jp/manual/use/page/anchor",
    "https://autosns.co.jp/manual/use/page/countdown",
    "https://autosns.co.jp/manual/use/page/editor",
    "https://autosns.co.jp/manual/use/page/contents",
    "https://autosns.co.jp/manual/category/use/reserve-calendar",
    "https://autosns.co.jp/manual/use/reserve-calendar/reservation-ends-message",
    "https://autosns.co.jp/manual/use/reserve-calendar/calendar-add-friend",
    "https://autosns.co.jp/manual/use/reserve-calendar/proxy-reservation",
    "https://autosns.co.jp/manual/use/reserve-calendar/create_calendar",
    "https://autosns.co.jp/manual/use/reserve-calendar/google_calendar",
    "https://autosns.co.jp/manual/use/reserve-calendar/reserve_menu",
    "https://autosns.co.jp/manual/use/reserve-calendar/reserve_staff",
    "https://autosns.co.jp/manual/use/reserve-calendar/add_calendar_form",
    "https://autosns.co.jp/manual/use/reserve-calendar/pre_calendar_form",
    "https://autosns.co.jp/manual/use/reserve-calendar/add_calendar_products",
    "https://autosns.co.jp/manual/use/reserve-calendar/change_reservation",
    "https://autosns.co.jp/manual/use/reserve-calendar/reserve-reminder",
    "https://autosns.co.jp/manual/use/reserve-calendar/manage-notice",
    "https://autosns.co.jp/manual/use/reserve-calendar/zoom_personal",
    "https://autosns.co.jp/manual/category/use/payment-work",
    "https://autosns.co.jp/manual/category/use/payment-work/univapay",
    "https://autosns.co.jp/manual/use/payment-work/univapay/create-univapay",
    "https://autosns.co.jp/manual/use/payment-work/univapay/univapay-proline",
    "https://autosns.co.jp/manual/category/use/payment-work/stripe",
    "https://autosns.co.jp/manual/use/payment-work/stripe/stripe-portal",
    "https://autosns.co.jp/manual/use/payment-work/stripe/create-stripe",
    "https://autosns.co.jp/manual/use/payment-work/stripe/stripe-proline",
    "https://autosns.co.jp/manual/category/use/payment-work/paypal",
    "https://autosns.co.jp/manual/use/payment-work/paypal/paypal-cancel",
    "https://autosns.co.jp/manual/use/payment-work/paypal/paypal-howto",
    "https://autosns.co.jp/manual/use/payment-work/paypal/paypal-checkout-proline",
    "https://autosns.co.jp/manual/use/payment-work/paypal/paypal-proline",
    "https://autosns.co.jp/manual/category/use/payment-work/common",
    "https://autosns.co.jp/manual/use/payment-work/common/pay-membersite",
    "https://autosns.co.jp/manual/use/payment-work/common/pay-tips",
    "https://autosns.co.jp/manual/use/payment-work/common/payment-movement",
    "https://autosns.co.jp/manual/category/use/storage",
    "https://autosns.co.jp/manual/use/storage/media",
    "https://autosns.co.jp/manual/category/use/ticket",
    "https://autosns.co.jp/manual/use/ticket/coupon-page",
    "https://autosns.co.jp/manual/use/ticket/timer",
    "https://autosns.co.jp/manual/category/use/code",
    "https://autosns.co.jp/manual/use/code/qrchord",
    "https://autosns.co.jp/manual/use/message/create_message_text",
    "https://autosns.co.jp/manual/use/message/create-message-image",
    "https://autosns.co.jp/manual/use/message/create_message_video",
    "https://autosns.co.jp/manual/use/message/create_message_video-2",
    "https://autosns.co.jp/manual/category/use/setting",
    "https://autosns.co.jp/manual/use/setting/slack-notify",
    "https://autosns.co.jp/manual/use/setting/chatwork-notify",
    "https://autosns.co.jp/manual/use/setting/ban-counterplan",
    "https://autosns.co.jp/manual/use/setting/icon",
    "https://autosns.co.jp/manual/use/setting/admin-login",
    "https://autosns.co.jp/manual/use/setting/address",
    "https://autosns.co.jp/manual/use/setting/line-notify",
    "https://autosns.co.jp/manual/application/changeplan",
    "https://autosns.co.jp/manual/category/use/account-use",
    "https://autosns.co.jp/manual/use/account-use/cancellation",
    "https://autosns.co.jp/manual/use/account-use/doubleaccount",
    "https://autosns.co.jp/manual/category/application",
    "https://autosns.co.jp/manual/application/line-official/copy-account-transfer",
    "https://autosns.co.jp/manual/application/cross-trigger",
    "https://autosns.co.jp/manual/application/addfriend-embed",
    "https://autosns.co.jp/manual/category/application/line-official",
    "https://autosns.co.jp/manual/application/line-official/bot_basic_id",
    "https://autosns.co.jp/manual/application/line-official/plan-confirmation-change",
    "https://autosns.co.jp/manual/application/line-official/premium-id",
    "https://autosns.co.jp/manual/application/line-official/qrcode",
    "https://autosns.co.jp/manual/application/line-official/change-name",
    "https://autosns.co.jp/manual/application/line-official/add-member",
    "https://autosns.co.jp/manual/application/line-official/line-app-email",
    "https://autosns.co.jp/manual/application/line-official/twotype-rich-menu",
    "https://autosns.co.jp/manual/application/line-official/howto-rich-menu",
    "https://autosns.co.jp/manual/category/application/method",
    "https://autosns.co.jp/manual/application/method/0-4-setup-part2",
    "https://autosns.co.jp/manual/application/method/continue",
    "https://autosns.co.jp/manual/application/method/fullauto_1",
    "https://autosns.co.jp/manual/application/method/coupon_scenario"
]

# De-duplicate and clean
unique_urls = sorted(list(set([url.split('?')[0].rstrip('/') for url in URLS])))

def scrape_page(url):
    print(f"Scraping: {url}")
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Try to find the main content area
        content_area = soup.find('article') or soup.find('main') or soup.find('div', class_='content')
        if not content_area:
            content_area = soup.body
            
        title = soup.title.string if soup.title else url.split('/')[-1]
        title = re.sub(r'[\\/*?:"<>|]', "_", title).strip() # Sanitize filename
        
        # Convert the content area to markdown
        markdown_content = md(str(content_area), heading_style="ATX")
        
        # Save file
        filename = f"{title}.md"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(f"# {title}\n\nSource: {url}\n\n")
            f.write(markdown_content)
            
        print(f"Saved: {filename}")
        return True
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return False

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    success_count = 0
    for url in unique_urls:
        if scrape_page(url):
            success_count += 1
        time.sleep(1) # Be polite
        
    print(f"Finished. Successfully scraped {success_count}/{len(unique_urls)} pages.")
