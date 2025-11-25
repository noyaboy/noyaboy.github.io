# Optimization Suggestions for noyaboy.github.io

This document outlines aesthetic and structural improvements for your academic CV website built on **Jekyll (AcademicPages theme)**.

---

## 1. Visual Hierarchy & Layout

### **1.1. Separate Dates from Content (High Priority)**
* **Current State:** Dates (e.g., "November 2024 - Present") are listed as the first line of bullet points, blending with the job titles.
* **Recommendation:** **Right-align** the dates or place them in a dedicated left-hand gutter. This ensures the **Job Title** and **Company/Lab Name** are the primary visual focus.
* **Technique:** Use CSS Flexbox to push the date to the far right or use a lighter grey font color to create visual separation.

### **1.2. Increase Whitespace**
* **Current State:** Markdown lists often have dense line spacing, making it difficult to distinguish where one job entry ends and the next begins.
* **Recommendation:** Add `margin-bottom` between major list items to improve scannability.

### **1.3. Header Emphasis**
* **Current State:** Headers like `# Education` and `# Work Experience` blend with the body text.
* **Recommendation:** Add a **bottom border** or change the color of H1/H2 headers to match your personal brand (e.g., Deep Blue or Teal).

---

## 2. Content Presentation

### **2.1. Visualize Skills (The "Pill" Style)**
* **Current State:** A simple text list.
* **Recommendation:** Convert skills into **"Pills" or "Tags"**.
* **Benefit:** This looks modern and allows recruiters to spot keywords (e.g., "CUDA", "FPGA") instantly.

### **2.2. Highlight Publications**
* **Recommendation:**
    1.  **Bold Your Name:** Always bold **Hao-Chun Liang** in the author list.
    2.  **Buttons for Links:** Convert `[PDF]`, `[Code]`, and `[Slides]` into small buttons/badges instead of plain text links.
    3.  **Teaser Images:** If layout permits, add a small thumbnail of the system architecture next to the paper title.

### **2.3. Emphasize Education**
* **Recommendation:** Since you graduated **Ranked 1st in class**, use **Bold text** or a highlight color to make this achievement stand out.

---

## 3. Typography & Color

### **3.1. Font Pairing**
* **Recommendation:** To create a "Professional yet Tech-savvy" look:
    * **Headers:** Use a Serif font (e.g., *Merriweather*, *Playfair Display*) for a classic academic feel.
    * **Body:** Keep a clean Sans-serif font (e.g., *Inter*, *Roboto*) for readability.

### **3.2. Accent Color**
* **Recommendation:** Choose one **Accent Color** (e.g., Navy Blue, Dark Teal, or Maroon) and apply it consistently to:
    * Hyperlinks
    * Header underlines
    * Sidebar name/icons
    * Skill tag backgrounds (lighter shade)

---

## 4. Implementation Snippets (CSS)

You can add these snippets to your `assets/css/style.scss` or `_sass/_custom.scss` file.

### **Snippet A: Flexbox Layout for Experience**
*Use this structure in your Markdown files:*
```html
<div class="experience-item">
  <div class="job-info">
    <strong>Digital Design Intern</strong><br>
    <em>Andes Technology Corporation</em>
  </div>
  <div class="job-date">Nov 2024 - Present</div>
</div>