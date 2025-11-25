---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* M.Eng. in Digital VLSI and System Design, National Yang Ming Chiao Tung University, 2025 (Expected)
* B.S. in Electrical Engineering, National Tsing Hua University - Distinction (Ranked 1st in class)

Work Experience
======
* November 2024 - Present: Digital Design Intern
  * Andes Technology Corporation
  * Focusing on CPU-related AI and deep learning accelerator development

* Present: Affiliate Trainee
  * A3D3 Institute (University of Washington)
  * Optimizing GPU algorithms for particle trajectory reconstruction in HL-LHC HEP experiments

* Present: Graduate Research Assistant
  * Parallel Computing System Laboratory, NYCU
  * Research on hardware-software co-acceleration and heterogeneous platforms (FPGA/GPU)

Skills
======
* Efficient Machine Learning
* FPGA/GPU Heterogeneous System
* HLS for Machine Learning
* Digital IC Design
* Data-Driven RTL/C++ Codegen

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
