update:
	git add .
	git commit -m "fix" || true
	git push

# Résumé build.
# First run: unzips resume.zip into resume-src/ (one-time — never
# re-extracted after that, so your edits are never overwritten).
# Every run after: edit resume-src/main.tex, then `make resume` to
# recompile and deploy files/resume.pdf, and re-pack resume.zip so the
# source backup stays in sync with what you just built.
# Deliberately does NOT touch the ?v= on resume.pdf links in index.html /
# cv/index.html — those stay pinned (currently v18) unless asked otherwise.
.PHONY: resume

resume-src/main.tex:
	mkdir -p resume-src
	unzip -o resume.zip -d resume-src

resume: resume-src/main.tex
	cd resume-src && pdflatex -interaction=nonstopmode -halt-on-error main.tex
	cd resume-src && pdflatex -interaction=nonstopmode -halt-on-error main.tex
	@if grep -qi overfull resume-src/main.log; then \
		echo "WARNING: overfull hbox in resume-src/main.log -- a field is running past the margin, check the PDF"; \
	fi
	cp resume-src/main.pdf files/resume.pdf
	cd resume-src && zip -j -X -q ../resume.zip main.tex photo.jpg
	@echo "files/resume.pdf updated. ?v= left unchanged -- bump it yourself if you want browsers to refetch immediately."