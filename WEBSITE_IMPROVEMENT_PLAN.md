# Website Improvement Plan

Based on the review of `/input/website_improvement.md`, here is the implementation plan:

---

## Overview

The improvement document outlines 4 main areas with 8 specific recommendations:

| Area | Recommendations | Priority |
|------|-----------------|----------|
| 1. Visual Hierarchy & Layout | 3 items | High |
| 2. Content Presentation | 3 items | Medium-High |
| 3. Typography & Color | 2 items | Medium |
| 4. Implementation | CSS snippets provided | Reference |

---

## Phase 1: Create Custom SCSS File

**Task:** Create `_sass/_custom.scss` for all style customizations

**Files to modify:**
- Create: `_sass/_custom.scss`
- Edit: `assets/css/main.scss` (import the new file)

---

## Phase 2: Visual Hierarchy & Layout

### 2.1 Separate Dates from Content (High Priority)

**Current issue:** Dates blend with job titles in bullet points

**Solution:**
- Add CSS class `.experience-item` with Flexbox layout
- Right-align dates with lighter grey color (`#6c757d`)
- Update `_pages/cv.md` to use HTML structure instead of plain markdown

**CSS to add:**
```scss
.experience-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5em;
}
.job-date {
  color: #6c757d;
  font-size: 0.9em;
  white-space: nowrap;
}
```

### 2.2 Increase Whitespace

**Current issue:** Dense line spacing between entries

**Solution:**
- Add `margin-bottom` to CV section items
- Increase spacing between major list items

**CSS to add:**
```scss
.archive ul li {
  margin-bottom: 1.2em;
}
.cv-section {
  margin-bottom: 2em;
}
```

### 2.3 Header Emphasis

**Current issue:** Headers blend with body text

**Solution:**
- Add bottom border to H2 headers
- Apply accent color (Navy Blue: `#1a365d` or Teal: `#0d9488`)

**CSS to add:**
```scss
.page__content h2 {
  border-bottom: 2px solid #1a365d;
  padding-bottom: 0.3em;
  color: #1a365d;
}
```

---

## Phase 3: Content Presentation

### 3.1 Visualize Skills as Pills/Tags

**Current issue:** Skills displayed as plain bullet list

**Solution:**
- Create `.skill-tag` CSS class
- Update `_pages/cv.md` to use span elements with pill styling

**CSS to add:**
```scss
.skill-tag {
  display: inline-block;
  background-color: #e2e8f0;
  color: #1a365d;
  padding: 0.25em 0.75em;
  margin: 0.25em;
  border-radius: 9999px;
  font-size: 0.875em;
  font-weight: 500;
}
```

**CV.md update:**
```html
<div class="skills-container">
  <span class="skill-tag">Efficient Machine Learning</span>
  <span class="skill-tag">FPGA/GPU Heterogeneous System</span>
  ...
</div>
```

### 3.2 Highlight Publications

**Sub-tasks:**
1. **Bold author name:** Update all publication files to bold "Hao-Chun Liang"
2. **Button-style links:** Create `.pub-button` class for PDF/Code/Slides links
3. **Optional:** Add teaser images (lower priority)

**CSS to add:**
```scss
.pub-button {
  display: inline-block;
  background-color: #1a365d;
  color: white;
  padding: 0.2em 0.6em;
  margin: 0.2em;
  border-radius: 4px;
  font-size: 0.8em;
  text-decoration: none;
}
.pub-button:hover {
  background-color: #2c5282;
}
```

**Files to update:**
- `_publications/2025-01-01-tgda-fgir.md`
- `_publications/2025-01-02-higtr-tjcas.md`
- `_publications/2025-01-03-gnn-fpga-vlsi.md`

### 3.3 Emphasize Education Achievement

**Current issue:** "Ranked 1st in class" not highlighted

**Solution:**
- Add `.achievement` CSS class with highlight styling
- Update `_pages/cv.md` to wrap achievement in styled span

**CSS to add:**
```scss
.achievement {
  background-color: #fef3c7;
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-weight: 600;
  color: #92400e;
}
```

---

## Phase 4: Typography & Color

### 4.1 Font Pairing

**Recommendation:**
- Headers: Serif font (Merriweather or Playfair Display)
- Body: Sans-serif (Inter or Roboto)

**Implementation:**
- Add Google Fonts import to `_includes/head/custom.html`
- Update font variables in custom SCSS

**CSS to add:**
```scss
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Inter:wght@400;500;600&display=swap');

h1, h2, h3, h4 {
  font-family: 'Merriweather', serif;
}
body {
  font-family: 'Inter', sans-serif;
}
```

### 4.2 Accent Color System

**Chosen accent:** Navy Blue (`#1a365d`)

**Apply to:**
- Hyperlinks
- Header underlines
- Sidebar name/icons
- Skill tag backgrounds (lighter: `#e2e8f0`)

**CSS to add:**
```scss
$accent-color: #1a365d;
$accent-light: #e2e8f0;

a {
  color: $accent-color;
}
.author__name {
  color: $accent-color;
}
```

---

## Implementation Summary

### Files to Create:
| File | Purpose |
|------|---------|
| `_sass/_custom.scss` | All custom styles |

### Files to Modify:
| File | Changes |
|------|---------|
| `assets/css/main.scss` | Import `_custom.scss` |
| `_includes/head/custom.html` | Add Google Fonts |
| `_pages/cv.md` | HTML structure for experience, skills pills, achievement highlight |
| `_publications/*.md` | Bold author name, button-style links |

### CSS Classes to Create:
| Class | Purpose |
|-------|---------|
| `.experience-item` | Flexbox layout for work entries |
| `.job-date` | Right-aligned grey dates |
| `.skill-tag` | Pill-style skill tags |
| `.pub-button` | Button-style publication links |
| `.achievement` | Highlighted achievements |
| `.cv-section` | Section spacing |

---

## Execution Order

1. **Phase 1:** Create `_sass/_custom.scss` and import it
2. **Phase 4.1:** Add Google Fonts (dependency for other styles)
3. **Phase 2.3:** Header emphasis (quick visual win)
4. **Phase 4.2:** Accent color system (foundation for other styles)
5. **Phase 3.1:** Skills pills (CV page update)
6. **Phase 2.1:** Experience layout with dates (CV page update)
7. **Phase 2.2:** Whitespace improvements
8. **Phase 3.3:** Education achievement highlight
9. **Phase 3.2:** Publication enhancements
