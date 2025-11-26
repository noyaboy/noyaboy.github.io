---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<p><a href="/files/resume.pdf" class="pub-button" style="font-size: 1.1em; padding: 0.5em 1.2em;">Download CV (PDF)</a></p>

<div class="cv-section">

## Education

<div class="experience-item">
  <div class="job-info">
    <strong>M.Eng. in Digital VLSI and System Design</strong><br>
    <em>National Yang Ming Chiao Tung University (NYCU)</em>
  </div>
  <div class="job-date">2025 (Expected)</div>
</div>

<div class="experience-item">
  <div class="job-info">
    <strong>B.S. in Electrical Engineering</strong><br>
    <em>National Tsing Hua University (NTHU)</em> — <span class="achievement">Distinction (Ranked 1st in class)</span>
  </div>
</div>

</div>

<div class="cv-section">

## Work Experience

<div class="experience-item">
  <div class="job-info">
    <strong>Digital Design Intern</strong><br>
    <em>Andes Technology Corporation</em>
  </div>
  <div class="job-date">Nov 2024 - Present</div>
</div>
<ul class="experience-details">
  <li>Focusing on CPU-related AI and deep learning accelerator development</li>
</ul>

<div class="experience-item">
  <div class="job-info">
    <strong>Affiliate Trainee</strong><br>
    <em>A3D3 Institute (University of Washington)</em>
  </div>
  <div class="job-date">Present</div>
</div>
<ul class="experience-details">
  <li>Optimizing GPU algorithms for particle trajectory reconstruction in HL-LHC HEP experiments</li>
</ul>

<div class="experience-item">
  <div class="job-info">
    <strong>Graduate Research Assistant</strong><br>
    <em>Parallel Computing System Laboratory, NYCU</em>
  </div>
  <div class="job-date">Present</div>
</div>
<ul class="experience-details">
  <li>Research on hardware-software co-acceleration and heterogeneous platforms (FPGA/GPU)</li>
</ul>

</div>

<div class="cv-section">

## Skills

<div class="skills-container">
  <span class="skill-tag">Efficient Machine Learning</span>
  <span class="skill-tag">FPGA/GPU Heterogeneous System</span>
  <span class="skill-tag">HLS for Machine Learning</span>
  <span class="skill-tag">Digital IC Design</span>
  <span class="skill-tag">Data-Driven RTL/C++ Codegen</span>
</div>

</div>

<div class="cv-section">

## Selected Publications & Presentations
  <ul>{% for post in site.publications reversed limit:4 %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  <p><a href="/publications/">View all publications →</a></p>

</div>
