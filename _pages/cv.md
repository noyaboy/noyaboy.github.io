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
    <strong>M.Eng. in Digital VLSI and System Design</strong><br>
    <em>National Yang Ming Chiao Tung University (NYCU)</em>
  </div>
  <div class="job-date">Sep 2023 – Jun 2025 (Expected)</div>
</div>

<div class="experience-item">
  <div class="job-info">
    <strong>B.S. in Electrical Engineering</strong><br>
    <em>National Tsing Hua University (NTHU)</em> — GPA: 4.1/4.3, <span class="achievement">Distinction Graduation</span>
  </div>
  <div class="job-date">Sep 2019 – Jun 2023</div>
</div>

</div>

<div class="cv-section">

<h2>Awards &amp; Honors</h2>

<div class="experience-item">
  <div class="job-info">
    <strong>Excellent Poster Award</strong><br>
    <em>Taiwan and Japan Conference on Circuits and Systems (TJCAS)</em>
  </div>
  <div class="job-date">Aug 2025</div>
</div>

<div class="experience-item">
  <div class="job-info">
    <strong>Distinction Graduation</strong> <span class="award-stat">(Top 10 of 116)</span>
    <a href="#" class="cert-link" onclick="openCertModal(); return false;">View Certificate</a><br>
    <em>Department of Electrical Engineering, NTHU</em>
  </div>
  <div class="job-date">Jun 2023</div>
</div>

<!-- Certificate Modal -->
<div id="certModal" class="cert-modal" onclick="closeCertModal()">
  <div class="cert-modal-content" onclick="event.stopPropagation()">
    <span class="cert-modal-close" onclick="closeCertModal()">&times;</span>
    <img src="/images/distinction-graduation.png" alt="Distinction Graduation Certificate">
    <p class="cert-modal-caption">Outstanding Academic Performance Award Certificate</p>
  </div>
</div>

<script>
function openCertModal() {
  document.getElementById('certModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCertModal() {
  document.getElementById('certModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeCertModal();
});
</script>

</div>

<div class="cv-section">

<h2>Work Experience</h2>

<div class="experience-item">
  <div class="job-info">
    <strong>Digital Design Intern</strong><br>
    <em>Andes Technology Corporation</em>
  </div>
  <div class="job-date">Nov 2024 – Present</div>
</div>
<ul class="experience-details">
  <li>Developing CPU-related AI and deep learning accelerators</li>
  <li>Working on RISC-V based neural network acceleration solutions</li>
</ul>

<div class="experience-item">
  <div class="job-info">
    <strong>Affiliate Trainee</strong><br>
    <em>A3D3 Institute, University of Washington</em>
  </div>
  <div class="job-date">Jun 2024 – Present</div>
</div>
<ul class="experience-details">
  <li>Optimizing GPU algorithms for particle trajectory reconstruction in HL-LHC experiments</li>
  <li>Implementing Kalman filter tracking with kernel refactoring and INT8 surrogates</li>
</ul>

<div class="experience-item">
  <div class="job-info">
    <strong>Graduate Research Assistant</strong><br>
    <em>Parallel Computing System Laboratory, NYCU</em>
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
