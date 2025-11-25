# Personalization Plan for Hao-Chun Liang's Website

Based on the profile at `/input/profile.md`, here is the complete plan:

---

## Phase 1: Core Configuration (`_config.yml`)

| Line | Field | Change To |
|------|-------|-----------|
| 12 | `title` | `"Hao-Chun Liang"` |
| 14 | `name` | `"Hao-Chun Liang"` |
| 15 | `description` | `"Hao-Chun Liang's academic portfolio"` |
| 16 | `url` | `https://noyaboy.github.io` |
| 19 | `repository` | `"noyaboy/noyaboy.github.io"` |
| 27 | `author.name` | `"Hao-Chun Liang"` |
| 28 | `author.pronouns` | (leave blank) |
| 29 | `author.bio` | `"Thesis-Based Master Student at National Yang Ming Chiao Tung University, working on Parallel Computing Systems. Also a Digital Design Intern at Andes Technology and Affiliate Trainee at A3D3 Institute."` |
| 30 | `author.location` | `"Hsinchu, Taiwan"` |
| 31 | `author.employer` | `"National Yang Ming Chiao Tung University"` |
| 33 | `author.email` | `"science103555@gmail.com"` |

**Remove unused profiles (lines 36-79):**
- Delete or comment out: `googlescholar`, `orcid`, `pubmed`, `arxiv`, `github`, `bluesky`, `linkedin`, `twitter`, and all other social media fields (no URLs provided)

---

## Phase 2: Navigation Menu (`_data/navigation.yml`)

**Keep:**
- Publications (line 11-12)
- Talks (line 14-15)
- Portfolio (line 20-21)
- CV (line 26-27)

**Remove:**
- Teaching (line 17-18) - User selected "No"
- Blog Posts (line 23-24) - User selected "No"
- Guide (line 32-33) - Template documentation

---

## Phase 3: Homepage (`_pages/about.md`)

**Replace entire content with:**

```markdown
---
permalink: /
title: "Hao-Chun Liang"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

I am currently pursuing a Master of Engineering in Digital VLSI and System Design at National Yang Ming Chiao Tung University, working in the Parallel Computing System Laboratory under Professor Lai, Bo-Cheng. My research focuses on developing advanced methodologies for intelligent computing, with an emphasis on hardware-software co-acceleration and heterogeneous platform integrating FPGA and GPU.
```

---

## Phase 4: CV Page (`_pages/cv.md`)

**Education section (lines 12-16):**
```
* M.Eng. in Digital VLSI and System Design, National Yang Ming Chiao Tung University, 2025 (Expected)
* B.S. in Electrical Engineering, National Tsing Hua University - Distinction (Ranked 1st in class)
```

**Work Experience section (lines 19-33):**
```
* November 2024 - Present: Digital Design Intern
  * Andes Technology Corporation
  * Focusing on CPU-related AI and deep learning accelerator development

* Present: Affiliate Trainee
  * A3D3 Institute (University of Washington)
  * Optimizing GPU algorithms for particle trajectory reconstruction in HL-LHC HEP experiments

* Present: Graduate Research Assistant
  * Parallel Computing System Laboratory, NYCU
  * Research on hardware-software co-acceleration and heterogeneous platforms (FPGA/GPU)
```

**Skills section (lines 36-42):**
```
* Efficient Machine Learning
* FPGA/GPU Heterogeneous System
* HLS for Machine Learning
* Digital IC Design
* Data-Driven RTL/C++ Codegen
```

**Remove:** Service and leadership section (line 64)

---

## Phase 5: Publications (`_publications/`)

**Delete all existing sample files:**
- `2009-10-01-paper-title-number-1.md`
- `2010-10-01-paper-title-number-2.md`
- `2015-10-01-paper-title-number-3.md`
- `2024-02-17-paper-title-number-4.md`
- `2025-06-08-paper-title-number-5.md`

**Create 3 new publication files:**

### File 1: `_publications/2025-01-01-tgda-fgir.md`
```yaml
---
title: "Fine-Grained Image Recognition from Scratch with Teacher-Guided Data Augmentation"
collection: publications
category: manuscripts
permalink: /publication/2025-tgda-fgir
excerpt: 'Introduces Teacher‑Guided Data Augmentation (TGDA), showing that un‑pretrained fine‑grained recognition models with LRNet and ViTFS match or exceed SOTA using fewer parameters.'
date: 2025-01-01
venue: 'arXiv'
paperurl: 'https://noah-site.netlify.app/uploads/fgir.pdf'
citation: 'Edwin Arkel Rios, Fernando Mikael, Oswin Gosal, Femiloye Oyerinde, Hao-Chun Liang, Bo-Cheng Lai, Min-Chun Hu. (2025). "Fine-Grained Image Recognition from Scratch with Teacher-Guided Data Augmentation." arXiv.'
---
```

### File 2: `_publications/2025-01-02-higtr-tjcas.md`
```yaml
---
title: "HiGTR: A High-Performance FPGA Implementation for Complete GNN-Based Trajectory Reconstruction in High-Energy Physics"
collection: publications
category: conferences
permalink: /publication/2025-higtr-tjcas
excerpt: 'FPGA-accelerated GNN pipeline for HL-LHC exceeding latency and throughput requirements.'
date: 2025-01-02
venue: 'Taiwan and Japan Conference on Circuits and Systems (TJCAS)'
paperurl: 'https://noah-site.netlify.app/uploads/tjcas_gnn_trajectory_reconstruction.pdf'
citation: 'Yun-Chen Yang, Hao-Chun Liang, Bo-Cheng Lai. (2025). "HiGTR: A High-Performance FPGA Implementation for Complete GNN-Based Trajectory Reconstruction in High-Energy Physics." TJCAS 2025.'
---
```

### File 3: `_publications/2025-01-03-gnn-fpga-vlsi.md`
```yaml
---
title: "A High-Performance Implementation of GNN-Based Trajectory Reconstruction on FPGA"
collection: publications
category: conferences
permalink: /publication/2025-gnn-fpga-vlsi
excerpt: 'FPGA-accelerated GNN pipeline for HL-LHC exceeding latency and throughput requirements.'
date: 2025-01-03
venue: 'VLSI Design / CAD Symposium'
paperurl: 'https://noah-site.netlify.app/uploads/gnn_trajectory_reconstruction.pdf'
citation: 'Yun-Chen Yang, Hao-Chun Liang, Bo-Cheng Lai. (2025). "A High-Performance Implementation of GNN-Based Trajectory Reconstruction on FPGA." VLSI Design / CAD Symposium 2025.'
---
```

---

## Phase 6: Talks (`_talks/`)

**Delete all existing sample files:**
- `2012-03-01-talk-1.md`
- `2013-03-01-tutorial-1.md`
- `2014-02-01-talk-2.md`
- `2014-03-01-talk-3.md`

**Create 1 new talk file:**

### File: `_talks/2025-fastml-gpu-tracking.md`
```yaml
---
title: "Real-Time GPU Kalman-Filter Tracking via Kernel Refactoring and INT8 Surrogates for High-Luminosity Colliders"
collection: talks
type: "Talk"
permalink: /talks/2025-fastml-gpu-tracking
venue: "Fast Machine Learning for Science Conference 2025"
date: 2025-01-01
location: "CERN / Hybrid"
---

Speaker: Mr Hao-Chun Liang
```

---

## Phase 7: Portfolio (`_portfolio/`)

**Delete all existing sample files:**
- `portfolio-1.md`
- `portfolio-2.html`

**Create 1 new portfolio file:**

### File: `_portfolio/traccc-optimization.md`
```yaml
---
title: "traccc Optimization"
excerpt: "Optimizing GPU algorithms in traccc to enhance performance and address computational challenges in particle trajectory reconstruction for the High-Luminosity Large Hadron Collider (HL-LHC)."
collection: portfolio
---

Optimizing GPU algorithms in traccc to enhance performance and address computational challenges in particle trajectory reconstruction for the High-Luminosity Large Hadron Collider (HL-LHC).
```

---

## Phase 8: Teaching (`_teaching/`)

**Delete all files (section disabled):**
- `2014-spring-teaching-1.md`
- `2015-spring-teaching-2.md`

---

## Phase 9: Blog Posts (`_posts/`)

**Delete all files (section disabled):**
- `2012-08-14-blog-post-1.md`
- `2013-08-14-blog-post-2.md`
- `2014-08-14-blog-post-3.md`
- `2015-08-14-blog-post-4.md`
- `2199-01-01-future-post.md`

**Also delete:**
- `_drafts/post-draft.md`

---

## Phase 10: Images (`/images/`)

**Download and replace:**
- Download profile photo from `https://noah-site.netlify.app/author/hao-chun-liang/avatar_hu16973994667164585547.jpg`
- Save as `/images/profile.png`

**Delete unused placeholder images:**
- `bio-photo.jpg`
- `bio-photo-2.jpg`
- `500x300.png`
- `editing-talk.png`

---

## Phase 11: Files (`/files/`)

**Download CV:**
- Download from `https://noah-site.netlify.app/uploads/resume.pdf`
- Save as `/files/resume.pdf`

**Delete sample files:**
- `paper1.pdf`, `paper2.pdf`, `paper3.pdf`
- `slides1.pdf`, `slides2.pdf`, `slides3.pdf`
- `bibtex1.bib`

---

## Phase 12: Data Files

**`_data/cv.json`** - Update if using JSON CV option:
- Update basics, education, work, publications, presentations sections with Hao-Chun's data

**`_data/authors.yml`** - Delete placeholder authors or update with Hao-Chun's info

**`_data/navigation.yml`** - Remove Teaching, Blog Posts, Guide links

---

## Phase 13: Optional Settings (`_config.yml`)

| Line | Setting | Value |
|------|---------|-------|
| 11 | `site_theme` | `"default"` (keep) |
| 99 | `comments.provider` | `false` (disable comments) |
| 155 | `analytics.provider` | `"false"` (no analytics) |
| 10 | `locale` | `"en-US"` (keep) |

---

## Summary of Files to Modify

| Action | Files |
|--------|-------|
| **Edit** | `_config.yml`, `_pages/about.md`, `_pages/cv.md`, `_data/navigation.yml` |
| **Create** | 3 publications, 1 talk, 1 portfolio item |
| **Delete** | 5 sample posts, 5 sample publications, 4 sample talks, 2 sample teaching, 2 sample portfolio, sample PDFs/images |
| **Download** | Profile photo, CV PDF |
