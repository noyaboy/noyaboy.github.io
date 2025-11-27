---
layout: archive
title: ""
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<div class="cv-section">
<h2>Education</h2>

<div class="experience-item">
  <div class="job-info">
    <strong><a href="https://iais.nycu.edu.tw/en/intro1.html" target="_blank">M.Eng. in Institute of Pioneer Semiconductor Innovation (ICS &amp; EDA Group)</a></strong><br>
    <em>National Yang Ming Chiao Tung University (NYCU)</em>
  </div>
  <div class="job-date">Sep 2025 – Jun 2027 (Expected)</div>
</div>

<div class="experience-item">
  <div class="job-info">
    <strong><a href="https://dee.site.nthu.edu.tw/index.php?Lang=en" target="_blank">B.S. in Electrical Engineering</a></strong><br>
    <em>National Tsing Hua University (NTHU)</em> — GPA: 4.1/4.3, <span class="achievement"><a href="#" class="cert-title-link" onclick="openModal('certModal'); return false;">Distinction Graduation</a></span>
  </div>
  <div class="job-date">Sep 2020 – Jun 2024</div>
</div>
<ul class="experience-details">
  <li>Transferred from Dept. of Physics (Top 1 of 65; <a href="#" class="cert-title-link" onclick="openModal('eliteModal'); return false;">College of Science Elite Student Award</a>).</li>
</ul>

<p><strong>Selected Coursework:</strong> IC Design Laboratory (A+), VLSI Testing, VLSI Design, Computer Architecture, Deep Learning.</p>

</div>

<div class="cv-section">
<h2>Awards &amp; Certificates</h2>

<div class="experience-item">
  <div class="job-info">
    <strong><a href="#" class="cert-title-link" onclick="openModal('tjcasModal'); return false;">Excellent Poster Award</a></strong><br>
    <em>Taiwan and Japan Conference on Circuits and Systems (TJCAS)</em>
  </div>
  <div class="job-date">Aug 2025</div>
</div>

<div class="experience-item">
  <div class="job-info">
    <strong><a href="#" class="cert-title-link" onclick="openModal('adfpModal'); return false;">Cell-Based Digital Chip Design and Implementation</a></strong> <span class="award-stat">(ADFP - TSMC 16nm)</span><br>
    <em>Taiwan Semiconductor Research Institute (TSRI)</em>
  </div>
  <div class="job-date">Sep 2024</div>
</div>

<div class="experience-item">
  <div class="job-info">
    <strong><a href="#" class="cert-title-link" onclick="openModal('certModal'); return false;">Distinction Graduation</a></strong><br>
    <em>National Tsing Hua University (NTHU)</em>
  </div>
  <div class="job-date">Jun 2024</div>
</div>
<ul class="experience-details">
  <li>Top 5% of 116 in Professional Elective GPA with <a href="/files/distinction-rule.pdf" target="_blank" class="cert-title-link">Regulation</a></li>
</ul>

<div class="experience-item">
  <div class="job-info">
    <strong><a href="#" class="cert-title-link" onclick="openModal('eliteModal'); return false;">College of Science Elite Student Award</a></strong> <span class="award-stat">(Top 1 of 65)</span><br>
    <em>National Tsing Hua University (NTHU)</em>
  </div>
  <div class="job-date">Apr 2021</div>
</div>

<!-- TJCAS Certificate Modal -->
<div id="tjcasModal" class="cert-modal" onclick="closeModal('tjcasModal')">
  <div class="cert-modal-content" onclick="event.stopPropagation()">
    <span class="cert-modal-close" onclick="closeModal('tjcasModal')">&times;</span>
    <img src="/images/tjcas-certificate.jpg" alt="TJCAS Excellent Poster Award Certificate">
    <p class="cert-modal-caption">Excellent Poster Award Certificate - TJCAS 2025</p>
  </div>
</div>

<!-- Distinction Graduation Certificate Modal -->
<div id="certModal" class="cert-modal" onclick="closeModal('certModal')">
  <div class="cert-modal-content" onclick="event.stopPropagation()">
    <span class="cert-modal-close" onclick="closeModal('certModal')">&times;</span>
    <img src="/images/distinction-graduation.png" alt="Distinction Graduation Certificate">
    <p class="cert-modal-caption">Outstanding Academic Performance Award Certificate</p>
  </div>
</div>

<!-- ADFP Certificate Modal -->
<div id="adfpModal" class="cert-modal" onclick="closeModal('adfpModal')">
  <div class="cert-modal-content" onclick="event.stopPropagation()">
    <span class="cert-modal-close" onclick="closeModal('adfpModal')">&times;</span>
    <img src="/images/adfp-certificate.jpg" alt="ADFP Certificate">
    <p class="cert-modal-caption">Cell-Based Digital Chip Design and Implementation Certificate - TSRI</p>
  </div>
</div>

<!-- Elite Student Award Modal -->
<div id="eliteModal" class="cert-modal" onclick="closeModal('eliteModal')">
  <div class="cert-modal-content" onclick="event.stopPropagation()">
    <span class="cert-modal-close" onclick="closeModal('eliteModal')">&times;</span>
    <img src="/images/elite-award.png" alt="College of Science Elite Student Award">
    <p class="cert-modal-caption">College of Science Elite Student Award - NTHU</p>
  </div>
</div>

<script>
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = 'auto';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.cert-modal').forEach(function(m) { m.style.display = 'none'; });
    document.body.style.overflow = 'auto';
  }
});
</script>

</div>

<div class="cv-section">
<h2>Skills</h2>

<p><strong>Languages & Tools:</strong> Python, C/C++, Verilog/SystemVerilog, HLS, CUDA</p>
<p><strong>Domains:</strong> Efficient Machine Learning, Computer Architecture, Digital IC Design, Data-Driven RTL/C++ Codegen</p>

</div>

<div class="cv-section">
<h2>Work Experience</h2>

<div class="experience-item">
  <div class="job-info">
    <strong>Digital IC Design Intern</strong><br>
    <em><a href="https://www.andestech.com/en/" target="_blank">Andes Technology Corporation</a></em>
  </div>
  <div class="job-date">Nov 2024 – Aug 2025</div>
</div>
<ul class="experience-details">
  <li>Developing Register File Code Generation from scratch</li>
</ul>

<div class="experience-item">
  <div class="job-info">
    <strong>Affiliate Trainee (Remote)</strong><br>
    <em><a href="https://a3d3.ai/" target="_blank">A3D3 Institute</a>, <a href="https://www.washington.edu/" target="_blank">University of Washington</a></em>
  </div>
  <div class="job-date">Jun 2024 – Present</div>
</div>
<ul class="experience-details">
  <li>Optimizing CUDA Pipeline for particle trajectory reconstruction in HL-LHC experiments</li>
</ul>

<div class="experience-item">
  <div class="job-info">
    <strong>Graduate Research Assistant</strong><br>
    <em><a href="https://sites.google.com/nycu.edu.tw/pcs-lab/" target="_blank">Parallel Computing System Laboratory</a>, NYCU</em>
  </div>
  <div class="job-date">Sep 2025 – Jun 2027 (Expected)</div>
</div>
<ul class="experience-details">
  <li>Authored high-quality research papers, leading to successful publication/project</li>
  <li>Designed impactful visual content and posters, enhancing external communication</li>
  <li>Analyzed profiles to derive actionable insights for strategic planning</li>
</ul>

</div>

<div class="cv-section">
<h2 class="section-title-muted">Selected Publications &amp; Presentations</h2>

<ul class="cv-publications">{% for post in site.publications reversed limit:4 %}
  <li>
    <a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a><br>
    <span class="cv-pub-authors">{{ post.authors }}</span><br>
    <span class="cv-pub-venue"><em>{{ post.venue }}</em>, {{ post.date | date: "%Y" }}</span>
  </li>
{% endfor %}</ul>
<p style="text-align: center; margin-top: 1em;"><a href="/publications/" class="pub-button">View All Publications</a></p>

</div>

