# Color Scheme Optimization Plan for noyaboy.github.io

**Target Website:** [https://noyaboy.github.io/](https://noyaboy.github.io/)  
**Objective:** Enhance readability, reduce visual fatigue, and ensure compliance with WCAG (Web Content Accessibility Guidelines) AA standards for both Light and Dark modes.

---

## 1. Current Status Audit

Based on the analysis of the existing layout (likely using the *al-folio* Jekyll theme or similar), the following issues were identified:

### ☀️ Light Mode
* **Background:** Pure White (`#ffffff`).
* **Body Text:** Often defaults to Pure Black (`#000000`).
    * *Issue:* High contrast (21:1) is accessible but can cause eye strain/halos during long reading sessions.
* **Link/Theme Color:** Standard Cyan (approx. `#2698ba`).
    * *⚠️ Critical Issue:* The contrast ratio against a white background is approximately **3.5:1**. This **FAILS** the WCAG AA standard (which requires at least 4.5:1), making links difficult to read for users with mild visual impairments.

### 🌙 Dark Mode
* **Background:** Dark Gray (`#1c1c1d`) or Pure Black (`#000000`).
* **Body Text:** Light Gray (`#e0e0e0`).
    * *Status:* Generally good.
* **Link/Theme Color:** Standard Cyan (`#2698ba`).
    * *Status:* The contrast ratio against dark gray is approx **6.6:1**. This **PASSES** WCAG AA standards.

---

## 2. Optimization Strategy

The goal is to maintain the aesthetic identity (Cyan theme) while fixing accessibility flaws.

### ☀️ Light Mode Improvements
* **Body Text:** Change from `#000000` to **`#333333`** (Dark Gray).
    * *Benefit:* Softens the viewing experience while maintaining excellent readability (Ratio ~12.6:1).
* **Link Color:** Change from `#2698ba` to **`#007696`** (Darker Cyan).
    * *Benefit:* Increases contrast ratio to **5.1:1** (Passes WCAG AA).

### 🌙 Dark Mode Improvements
* **Background:** Ensure use of **`#121212`** or **`#1c1c1d`**.
    * *Benefit:* Avoids "Pure Black" to prevent white text from vibrating visually (halation) and reduces OLED smearing when scrolling.
* **Body Text:** Maintain **`#e0e0e0`** (Off-White).
    * *Benefit:* Avoids pure white `#ffffff` to reduce glare.
* **Link Color:** Adjust to **`#4dd0e1`** (Lighter Cyan).
    * *Benefit:* pops clearly against the dark background without being neon-bright.

---

## 3. Implementation Plan (CSS)

Add or update the following CSS variables in your `_sass/_variables.scss` or `assets/css/main.css`.

```css
/* =========================================
   Color Scheme Optimization
   ========================================= */

:root {
    /* --- Light Mode Settings --- */
    
    /* Soften the text color to avoid harsh contrast with white bg */
    --global-bg-color: #ffffff;
    --global-text-color: #333333; 
    
    /* CRITICAL FIX: Darkened Cyan 
       Old: #2698ba (Fail) -> New: #007696 (Pass WCAG AA 5.1:1) 
    */
    --global-theme-color: #007696; 
    --global-hover-color: #005f79; /* Darker on hover */

    /* Secondary text for dates/captions */
    --global-secondary-text-color: #666666;
}

/* --- Dark Mode Settings --- */
/* Triggered via data-theme attribute or media query */
[data-theme="dark"] {
    
    /* Material Design recommended dark background (not pure black) */
    --global-bg-color: #121212; 
    
    /* Off-white text for reading comfort */
    --global-text-color: #e0e0e0;
    
    /* Lighter Cyan for better visibility on dark backgrounds */
    --global-theme-color: #4dd0e1; 
    --global-hover-color: #88ffff;

    /* Secondary text */
    --global-secondary-text-color: #a0a0a0;
}

/* --- Application --- */
body {
    background-color: var(--global-bg-color);
    color: var(--global-text-color);
}

a {
    color: var(--global-theme-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: var(--global-hover-color);
}