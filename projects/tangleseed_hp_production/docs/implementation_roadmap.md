# TangleSeed Official HP: Implementation Roadmap

This roadmap outlines the steps to build the site, integrating the newly designed "TangleSeed Official HP" concept with existing assets identified in `lp-builder` and documentation.

---

## 🛠 Phase 1: Foundation & Design System (Week 1) [COMPLETE]

1.  **Tech Stack Initialization**: ✅
    - **Framework**: Setup a Next.js (App Router) project with Tailwind CSS or Vanilla CSS (as per preference).
    - **SEO Setup**: Configure `next-seo` or global metadata templates using the titles defined in `detailed_page_design.md`.
2.  **Visual Identity Implementation**: ✅
    - Port the **Color Palette** from `Webサイト制作発注仕様書`:
      - Base: `#F8F6F1` / Text: `#2D2D2D` / Gold: `#C9A86C`
    - Setup **Typography**: Import `Noto Serif JP` and `Noto Sans JP`.
3.  **Global Components**: ✅
    - Build the Navigation bar (Dual-mode: B2C/B2B toggle) and Footer (integrating links from `zentangle.json`).

## 🖋 Phase 2: Content & Asset Migration (Week 1-2) [IN PROGRESS]

4.  **The Story & Profile migration**:
    - Extract and polish the "Cancer Recovery Story" from `zentangle.json` and port it to the `/about` page.
    - Standardize the "Social Proof" numbers (40,000 users, etc.) into a reusable `Counter` component.
5.  **B2C Conversion Funnel**:
    - Implement the "First Tile 7-Day Challenge" landing section.
    - Embed the LINE conversion links from `core_content_draft.md`.
6.  **B2B Alliance Section**:
    - Build the "Partner Info" page based on the `Webサイト制作発注仕様書_提携戦略版`.
    - Create the lead-gen form for Corporate/Bookstore partners.
7.  **[NEW] YouTube Integration Strategy**:
    - Embed curated videos from [Midori Furuhashi's CZT Channel](https://www.youtube.com/@midorifuruhashiczt1152) across key pages:
      - **Home Page**: Latest tutorial or brand introduction video as a "hero video" section.
      - **Beginner's Guide**: Step-by-step tutorial playlist integration.
      - **About Page**: Personal story video (if available) to humanize the brand.
      - **Library**: Pattern-specific tutorial videos embedded on individual tangle detail pages.
    - Implement a "Featured Videos" section on the homepage.
    - Add a dedicated "/videos" or "/tutorials" page showcasing the full YouTube library.

## 🎨 Phase 3: Tangle Library Engine (Week 2-3)

7.  **Data Structure Design**:
    - Set up a Markdown-based or Headless CMS structure for patterns.
    - Define fields: `Pattern Name`, `Creator`, `Complexity (1-5)`, `CZT-Led?`, `Step-out Image`.
8.  **Search & Filter Interface**:
    - Develop the real-time search engine for the library.
    - Implement the filter chips (e.g., "Official", "Basic", "Advanced").

## 🚀 Phase 4: Optimization & Launch (Week 4)

9.  **SEO & Performance Tuning**:
    - Ensure all pattern pages are generated statically (SSG) for instant load.
    - Implement structured data (Schema.org) for "Articles/How-to" to get Google Rich Snippets.
10. **Deployment & Tracking**:
    - Deploy to **Vercel** or a similar platform.
    - Connect Google Analytics & Search Console.
    - Final verification against the `walkthrough.md` checklist.

---

## 💡 Quick Win: Current Actionables

> [!TIP]
> Since we already have the content in `zentangle.json` and a technical spec in MD, the first practical step is to **create the "Alliance Strategy" (Partnership) landing page** first, as it is a critical business driver for the 2026 expansion.
