# Website Optimization Plan (Layout & Typography)

Based on `/input/website_optimization.md`

---

## Status Legend
- ✅ Already Implemented
- 🔧 To Be Implemented
- ⏭️ Skipped (requires assets/user input)

---

## Phase 1: Global Layout & Sidebar

### 1.1 Sidebar Bio Shortening
- **Status:** 🔧 To Be Implemented
- **File:** `_config.yml`
- **Current:** "Master's Student at National Yang Ming Chiao Tung University, working on Parallel Computing Systems. Also a Digital Design Intern at Andes Technology and Affiliate Trainee at A3D3 Institute."
- **Action:** Shorten to punchy summary: "M.Eng. Student at NYCU | Digital Design Intern | Affiliate at A3D3"
- **Priority:** High

### 1.2 University Name Abbreviation
- **Status:** 🔧 To Be Implemented
- **File:** `_config.yml` (employer field)
- **Action:** Use "NYCU" instead of full name in sidebar metadata
- **Priority:** Medium

### 1.3 Profile Image Quality Check
- **Status:** 🔧 To Be Implemented
- **File:** `images/profile.png`
- **Action:** Verify image is high-resolution and properly cropped
- **Priority:** Low

---

## Phase 2: CV Page Enhancements

### 2.1 Download Button Styling
- **Status:** ✅ Already Implemented
- **Note:** Button uses `.pub-button` class with prominent styling

### 2.2 Skills as Tags/Pills
- **Status:** ✅ Already Implemented
- **Note:** Skills use `.skill-tag` class with pill styling and hover effects

### 2.3 Content Redundancy - Selected Publications
- **Status:** 🔧 To Be Implemented
- **File:** `_pages/cv.md`
- **Action:** Change "Publications" to "Selected Publications" or limit to top 2-3 items
- **Priority:** Medium

---

## Phase 3: Publications & Talks

### 3.1 Date Consistency
- **Status:** ✅ Already Implemented
- **Note:** All dates standardized to "Mon YYYY" format

### 3.2 Visual Hierarchy Teasers
- **Status:** ⏭️ Skipped
- **Reason:** Requires thumbnail image assets for each publication

### 3.3 Citation Button Styling
- **Status:** ✅ Already Implemented
- **Note:** Collapsible `<details>` with styled summary and citation text

---

## Phase 4: Portfolio

### 4.1 Portfolio Thumbnail
- **Status:** ⏭️ Skipped
- **Reason:** Requires representative image asset

### 4.2 Portfolio Grid Layout
- **Status:** 🔧 To Be Implemented
- **File:** `_sass/_custom.scss`, potentially layout files
- **Action:** Add CSS for grid layout when more items are added
- **Priority:** Low (only 1 item currently)

---

## Phase 5: Typography & Readability

### 5.1 Body Font Size
- **Status:** 🔧 To Be Implemented
- **File:** `_sass/_custom.scss`
- **Action:** Ensure body text is 16-18px for comfortable reading
- **Priority:** Medium

### 5.2 Line Height
- **Status:** 🔧 To Be Implemented
- **File:** `_sass/_custom.scss`
- **Action:** Set line-height to 1.6-1.8 for body text
- **Priority:** Medium

### 5.3 Link Contrast
- **Status:** 🔧 To Be Implemented
- **File:** `_sass/_custom.scss`
- **Action:** Verify link colors have sufficient contrast and clear hover states
- **Priority:** Low

---

## Phase 6: Mobile Responsiveness

### 6.1 Navigation Testing
- **Status:** 🔧 To Be Implemented
- **Action:** Test hamburger menu functionality on mobile viewport
- **Priority:** Medium

### 6.2 Mobile Padding
- **Status:** 🔧 To Be Implemented
- **File:** `_sass/_custom.scss`
- **Action:** Add left/right padding to prevent text touching screen edges
- **Priority:** Medium

### 6.3 Mobile Avatar/Layout
- **Status:** ✅ Already Implemented
- **Note:** Media queries added for avatar sizing and flexbox stacking

---

## Implementation Summary

| Phase | Task | Priority | Status |
|-------|------|----------|--------|
| 1.1 | Sidebar bio shortening | High | 🔧 Pending |
| 1.2 | University abbreviation | Medium | 🔧 Pending |
| 1.3 | Profile image check | Low | 🔧 Pending |
| 2.1 | CV download button | - | ✅ Done |
| 2.2 | Skills tags | - | ✅ Done |
| 2.3 | Selected publications on CV | Medium | 🔧 Pending |
| 3.1 | Date consistency | - | ✅ Done |
| 3.2 | Publication teasers | - | ⏭️ Skipped |
| 3.3 | Citation styling | - | ✅ Done |
| 4.1 | Portfolio thumbnail | - | ⏭️ Skipped |
| 4.2 | Portfolio grid CSS | Low | 🔧 Pending |
| 5.1 | Body font size | Medium | 🔧 Pending |
| 5.2 | Line height | Medium | 🔧 Pending |
| 5.3 | Link contrast | Low | 🔧 Pending |
| 6.1 | Mobile nav testing | Medium | 🔧 Pending |
| 6.2 | Mobile padding | Medium | 🔧 Pending |
| 6.3 | Mobile avatar/layout | - | ✅ Done |

---

## Actionable Tasks (Excluding Skipped)

**High Priority:**
1. Shorten sidebar bio in `_config.yml`

**Medium Priority:**
2. Use NYCU abbreviation in employer field
3. Change CV to "Selected Publications"
4. Add typography improvements (font size, line height)
5. Add mobile padding CSS
6. Test mobile navigation

**Low Priority:**
7. Verify profile image quality
8. Prepare portfolio grid CSS
9. Verify link contrast

---

## Files to Modify

| File | Changes |
|------|---------|
| `_config.yml` | Shorten bio, abbreviate university |
| `_pages/cv.md` | Change to "Selected Publications" |
| `_sass/_custom.scss` | Typography, mobile padding, portfolio grid |
