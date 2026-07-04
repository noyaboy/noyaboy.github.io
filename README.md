# noyaboy.github.io

Personal academic website of Hao-Chun Liang — hand-rolled static HTML/CSS, no build step.

Modeled on the single-page profiles of the best academic personal sites (Jon Barron,
Keenan Crane, Andrej Karpathy): everything a reviewer needs on one page.

- `index.html` — the whole profile: bio, news, publications (with TL;DRs, abstracts, BibTeX), projects, education, experience
- `cv/` — printable vita page (+ PDF at `files/resume.pdf`)
- `assets/site.css` — the entire design system (light/dark via `prefers-color-scheme` + manual toggle)
- `assets/fonts/` — self-hosted variable woff2 subsets of Newsreader & Source Sans 3
- `assets/theme.js` — light/dark toggle; `assets/pets.js` — the resident Bichon & tabby; `assets/tracks.js` — pale specks drift beneath the page, and clicks ink faint collider-event tracks
- `files/`, `images/` — papers, slides, photos (working materials stay out of the repo — `/input/` is gitignored)
- `publications/`, `projects/`, `portfolio/`, `publication/`, `lectures/`, `about/`, `resume/` — redirect stubs preserving old URLs (hash-forwarding where needed)

Deployed via GitHub Pages (`.nojekyll`, no build).
