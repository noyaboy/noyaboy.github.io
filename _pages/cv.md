---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<div class="cv-header">
  <a href="/files/resume.pdf" class="pub-button cv-download-btn">Download CV (PDF)</a>
</div>

<div class="cv-section">

<h2>Research Interests</h2>

<p class="research-interests">
Hardware-software co-design for efficient machine learning, real-time particle tracking algorithms on heterogeneous platforms (FPGA/GPU), and data-driven hardware generation for high-energy physics applications.
</p>

</div>

<div class="cv-section">

<h2>Education</h2>

<div class="experience-item">
  <div class="job-info">
    <strong><a href="https://iais.nycu.edu.tw/en/intro1.html" target="_blank">M.Eng. in Institute of Pioneer Semiconductor Innovation (ICS &amp; EDA Group)</a></strong><br>
    <em>National Yang Ming Chiao Tung University (NYCU)</em>
  </div>
  <div class="job-date">Sep 2023 – Jun 2025 (Expected)</div>
</div>

<div class="experience-item">
  <div class="job-info">
    <strong><a href="https://dee.site.nthu.edu.tw/index.php?Lang=en" target="_blank">B.S. in Electrical Engineering</a></strong><br>
    <em>National Tsing Hua University (NTHU)</em> — GPA: 4.1/4.3, <span class="achievement">Distinction Graduation</span>
  </div>
  <div class="job-date">Sep 2019 – Jun 2023</div>
</div>

</div>

<div class="cv-section">

<h2>Awards &amp; Honors</h2>

<div class="experience-item">
  <div class="job-info">
    <strong>Excellent Poster Award</strong>
    <a href="#" class="cert-link" onclick="openModal('tjcasModal'); return false;">View Certificate</a><br>
    <em>Taiwan and Japan Conference on Circuits and Systems (TJCAS)</em>
  </div>
  <div class="job-date">Aug 2025</div>
</div>

<div class="experience-item">
  <div class="job-info">
    <strong>Distinction Graduation</strong> <span class="award-stat">(Top 10 of 116)</span>
    <a href="#" class="cert-link" onclick="openModal('certModal'); return false;">View Certificate</a><br>
    <em>Department of Electrical Engineering, NTHU</em>
  </div>
  <div class="job-date">Jun 2023</div>
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

<h2>Certificates</h2>

<div class="experience-item">
  <div class="job-info">
    <strong>Cell-Based Digital Chip Design and Implementation</strong> <span class="award-stat">(ADFP - TSMC 16nm)</span>
    <a href="#" class="cert-link" onclick="openModal('adfpModal'); return false;">View Certificate</a><br>
    <em>Taiwan Semiconductor Research Institute (TSRI)</em>
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

</div>

<div class="cv-section">

<h2>Work Experience</h2>

<div class="experience-item">
  <div class="job-info">
    <strong>Digital IC Design Intern</strong><br>
    <em><a href="https://www.andestech.com/en/" target="_blank">Andes Technology Corporation</a></em>
  </div>
  <div class="job-date">Nov 2024 – Present</div>
</div>
<ul class="experience-details">
  <li>Developing Register File Code Generation from scratch</li>
</ul>

<div class="experience-item">
  <div class="job-info">
    <strong>Affiliate Trainee</strong><br>
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
  <div class="job-date">Sep 2023 – Present</div>
</div>
<ul class="experience-details">
  <li>Researching hardware-software co-acceleration for machine learning workloads</li>
  <li>Developing FPGA-based GNN implementations for real-time particle tracking</li>
  <li>Contributing to hls4ml framework for HLS-based neural network deployment</li>
</ul>

</div>

<div class="cv-section">

<h2>Skills</h2>

<div class="skills-category">
  <span class="skills-label">Languages & Tools</span>
  <div class="skills-container">
    <span class="skill-tag">Python</span>
    <span class="skill-tag">C/C++</span>
    <span class="skill-tag">Verilog/SystemVerilog</span>
    <span class="skill-tag">HLS</span>
    <span class="skill-tag">CUDA</span>
  </div>
</div>

<div class="skills-category">
  <span class="skills-label">Domains</span>
  <div class="skills-container">
    <span class="skill-tag">Efficient Machine Learning</span>
    <span class="skill-tag">FPGA/GPU Heterogeneous Systems</span>
    <span class="skill-tag">Digital IC Design</span>
    <span class="skill-tag">Data-Driven RTL/C++ Codegen</span>
  </div>
</div>

</div>

<div class="cv-section">

<h2>Selected Publications &amp; Presentations</h2>

<ul class="cv-publications">{% for post in site.publications reversed limit:4 %}
  <li>
    <a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a><br>
    <span class="cv-pub-authors">{{ post.authors }}</span><br>
    <span class="cv-pub-venue"><em>{{ post.venue }}</em>, {{ post.date | date: "%Y" }}</span>
  </li>
{% endfor %}</ul>
<p><a href="/publications/">View all publications →</a></p>

</div>
