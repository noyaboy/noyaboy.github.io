# Website Layout & Typography Review
**Target Website:** [noyaboy.github.io](https://noyaboy.github.io/)  
**Date:** November 26, 2025

This document outlines suggested optimizations for layout, typography, and user experience (UX) to enhance the professional appearance and readability of your academic website.

---

## 1. Global Layout & Sidebar (All Pages)

The sidebar is the most persistent element of your site; ensuring it is clean and readable is crucial.

* **Sidebar Bio Length:**
    * **Observation:** The bio text in the sidebar (*"Master's Student at National Yang Ming Chiao Tung University..."*) is quite long and dense. This can clutter the visual hierarchy, especially on smaller desktop screens.
    * **Action:** Shorten the sidebar bio to a punchy summary (e.g., *"M.Eng. Student at NYCU | Digital Design Intern | Affiliate at A3D3"*). Keep the full detailed bio for the main **"About Me"** content area.
* **University Name Wrapping:**
    * **Observation:** "National Yang Ming Chiao Tung University" is a very long string.
    * **Action:** In the sidebar metadata, consider using the abbreviation **"NYCU"** or ensuring the CSS handles line breaks gracefully without creating awkward widows (single words on a new line).
* **Profile Image:**
    * **Action:** Ensure the profile image is high-resolution and properly cropped (circular or square with rounded corners usually looks best in this theme).

---

## 2. CV Page (`/cv/`)

This page is critical for recruitment and academic networking.

* **"Download" Call-to-Action (CTA):**
    * **Observation:** The "[Download CV (PDF)]" link is a standard text link.
    * **Action:** Style this as a **button** to make it stand out. It should be the most prominent element on this page.
    * *Example CSS Class:* `.btn .btn--primary` (if using Minimal Mistakes theme).
* **Skills Section Formatting:**
    * **Observation:** The skills seem to be listed as a continuous text or simple list (*"Efficient Machine Learning FPGA/GPU Heterogeneous System..."*). It is hard to scan.
    * **Action:** Format these as **Tags/Pills** or a **Grid Layout**. This improves readability and highlights keywords for recruiters scanning the page.
    * *Example:* `[Verilog] [Python] [HLS] [PyTorch]`
* **Content Redundancy:**
    * **Observation:** You list full publications and talks on the CV page, which duplicates the content of the dedicated `/publications` and `/talks` pages.
    * **Action:** Consider listing only **"Selected Publications"** on the CV page to keep it concise, or ensure the formatting is identical to the main Publications page to maintain consistency.

---

## 3. Publications & Talks (`/publications/`, `/talks/`)

* **Date Consistency:**
    * **Observation:** In Publications, dates are formatted as "Jan 2025". In Talks, the date is "September 03, 2025".
    * **Action:** Standardize all dates to a single format (e.g., **"Jan 2025"** or **"January 2025"**) across the entire site for a polished look.
* **Visual Hierarchy (Teasers):**
    * **Observation:** The lists are text-heavy.
    * **Action:** If possible, add **thumbnail images** (teasers) for each publication or talk. This could be a diagram from the paper or a slide from the talk. It breaks up the wall of text and makes the list more engaging.
* **Citation Buttons:**
    * **Action:** Ensure the "Cite" buttons function correctly (expanding the BibTeX) and are styled consistently with the "PDF" links.

---

## 4. Portfolio (`/portfolio/`)

* **Content Density:**
    * **Observation:** Currently, there is only one item ("traccc Optimization").
    * **Action:** While building your portfolio:
        1.  **Enhance the single item:** Add a representative image/thumbnail to the main list view so it doesn't look like a single line of text.
        2.  **Grid View:** If you plan to add more, a grid layout (3 items per row) usually looks better for portfolios than a vertical list.

---

## 5. Typography & Readability (General)

* **Font Sizes:**
    * **Observation:** Ensure the body text size is large enough for comfortable reading (typically 16px-18px).
* **Line Height:**
    * **Observation:** Check line height in the "About Me" paragraphs. A line-height of 1.6 to 1.8 improves readability for academic texts.
* **Link Contrast:**
    * **Action:** Verify that hyperlinks in the body text (blue/colored) have sufficient contrast against the background and clear hover states.

---

## 6. Mobile Responsiveness

* **Navigation:**
    * **Action:** Test the "Hamburger" menu on mobile. Ensure the "CV", "Publications", etc., are easily clickable and not hidden behind other elements.
* **Padding:**
    * **Action:** Ensure there is sufficient padding (margins) on the left and right sides of the text content on mobile screens so text doesn't touch the screen edges.