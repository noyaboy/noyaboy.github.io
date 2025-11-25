# Website Optimization Plan (Layout & UX)

Based on `/input/website_optimization.md`

---

## Phase 1: Global Navigation & Footer

### 1.1 Footer Simplification
- **File:** `_includes/footer.html`
- **Action:** Replace verbose template credits with simple "© 2025 Hao-Chun Liang"
- **Priority:** Medium

### 1.2 Date Format Standardization
- **Files:** `_layouts/`, `_includes/archive-single.html`, publication/talk templates
- **Action:** Standardize to consistent format (e.g., "Sep 2025") across all pages
- **Priority:** Low

---

## Phase 2: Home Page Improvements

### 2.1 Bio Paragraph Structure
- **File:** `_pages/about.md`
- **Action:** Split single paragraph into 2-3 shorter paragraphs:
  1. Current status & affiliation
  2. Research focus & interests
  3. Additional context (internship, collaborations)
- **Priority:** High

### 2.2 Page Title Change
- **File:** `_pages/about.md`
- **Action:** Change `title: "Academic Portfolio"` to `title: "About Me"` or `title: "Biography"`
- **Priority:** Low
- **Note:** Recently changed to fix duplicate title issue; evaluate if further change needed

---

## Phase 3: Publications Page Enhancements

### 3.1 Citation Collapsible Section
- **Files:** `_layouts/single.html` or `_includes/archive-single-pub.html`, publication `.md` files
- **Action:** Wrap "Recommended citation" in `<details><summary>BibTeX</summary>...</details>` tag
- **Priority:** Medium

### 3.2 Paper Thumbnails (Optional)
- **Files:** Publication `.md` files, potentially layout files
- **Action:** Add teaser images for papers if available
- **Priority:** Low (requires assets)

---

## Phase 4: Talks Page Cleanup

### 4.1 Remove Redundant Speaker Info
- **File:** `_talks/2025-fastml-gpu-tracking.md`
- **Action:** Remove "Speaker: Mr Hao-Chun Liang" line (implied on personal site)
- **Priority:** High

### 4.2 Event Location Styling
- **File:** `_sass/_custom.scss`, talk layout/includes
- **Action:** Add CSS to italicize or differentiate venue/location from talk title
- **Priority:** Low

---

## Phase 5: CV Page Refinements

### 5.1 Section Header Markup
- **File:** `_pages/cv.md`
- **Action:** Replace `======` text separators with proper `## Header` markdown
- **Priority:** Medium
- **Note:** Improves SEO and accessibility

### 5.2 Timeline Date Alignment
- **Status:** Already implemented (flexbox layout with right-aligned dates)
- **Action:** None required

### 5.3 Skills as Badges
- **Status:** Already implemented (skill-tag pill styling)
- **Action:** None required

---

## Phase 6: Portfolio Page Enhancement

### 6.1 Project Images
- **File:** `_portfolio/traccc-optimization.md`
- **Action:** Add representative screenshot or diagram
- **Priority:** Medium (requires image asset)

### 6.2 Expand Description
- **File:** `_portfolio/traccc-optimization.md`
- **Action:** Expand the excerpt/description for better preview on list page
- **Priority:** Medium

### 6.3 Add More Projects
- **Action:** Consider adding:
  - Undergraduate capstone project
  - Digital IC design coursework
  - Open-source contributions
- **Priority:** Low (requires user input on content)

---

## Phase 7: Mobile Responsiveness Check

### 7.1 Sidebar Behavior
- **Action:** Test sidebar collapse on mobile viewport
- **Priority:** Low

### 7.2 Profile Image Sizing
- **Action:** Verify profile image doesn't dominate mobile view
- **Priority:** Low

---

## Implementation Summary

| Phase | Task | Priority | Status |
|-------|------|----------|--------|
| 1.1 | Footer simplification | Medium | Pending |
| 1.2 | Date format standardization | Low | Pending |
| 2.1 | Bio paragraph structure | High | Pending |
| 2.2 | Page title change | Low | Pending |
| 3.1 | Citation collapsible | Medium | Pending |
| 3.2 | Paper thumbnails | Low | Pending |
| 4.1 | Remove speaker info | High | Pending |
| 4.2 | Event location styling | Low | Pending |
| 5.1 | CV section headers | Medium | Pending |
| 5.2 | Timeline alignment | - | Done |
| 5.3 | Skills badges | - | Done |
| 6.1 | Project images | Medium | Pending |
| 6.2 | Expand description | Medium | Pending |
| 6.3 | Add more projects | Low | Pending |
| 7.1 | Sidebar mobile check | Low | Pending |
| 7.2 | Profile image mobile | Low | Pending |

**High Priority Items:** 2.1, 4.1
**Already Completed:** 5.2, 5.3
