---
permalink: /
title: "About"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

{% include base_path %}

I am a master's student at the [Institute of Pioneer Semiconductor Innovation](https://iais.nycu.edu.tw/en/intro1.html) (ICS &amp; EDA Group), National Yang Ming Chiao Tung University (NYCU), where I am fortunate to be advised by Prof. Bo-Cheng Lai in the [Parallel Computing System Laboratory](https://sites.google.com/nycu.edu.tw/pcs-lab/). I am also an affiliate trainee of the [A3D3 Institute](https://a3d3.ai/), collaborating with researchers at the University of Washington and UIUC on real-time machine learning for high-energy physics.

My research lies at the intersection of machine learning and hardware systems: making demanding ML workloads meet real-time and resource constraints through careful codesign of algorithms, architectures, and their software stacks. My current work centers on accelerating particle track reconstruction for the High-Luminosity LHC — high-level synthesis (HLS) accelerator design for the [traccc](https://github.com/acts-project/traccc) tracking pipeline on the AMD Versal V80, and GPU performance engineering of Kalman-filter tracking via kernel refactoring and low-precision INT8 surrogates.

## Research Interests

- **ML architecture &amp; compiler codesign** — jointly optimizing model architectures and compilation stacks for efficient inference
- **Domain-specific accelerators** — HLS-based FPGA/ACAP design (AMD Versal), GNN inference for real-time scientific applications
- **GPU performance engineering** — CUDA kernel optimization and deep-dive profiling with Nsight Systems/Compute
- **Efficient machine learning** — low-precision arithmetic and lightweight architectures for resource-constrained deployment

In the long term, I aim to pursue a Ph.D. on the codesign of machine-learning architectures and compilers — building systems in which models, compilers, and silicon are shaped together rather than in isolation.

## News

<ul class="news-list">
  <li><span class="news-date">Dec 2025</span><span>Received the <strong>Elite New Graduate Scholarship</strong> from the Industry Academia Innovation School, NYCU.</span></li>
  <li><span class="news-date">Nov 2025</span><span>Our ultra-lightweight HDC-CNN placed <strong>Top-20</strong> in the <a href="{{ base_path }}/portfolio/02-cosmology-challenge/">NeurIPS 2025 FAIR Universe Weak-Lensing Challenge</a>.</span></li>
  <li><span class="news-date">Sep 2025</span><span>Presented our work on <a href="{{ base_path }}/publication/2025-fastml-gpu-tracking">real-time GPU Kalman-filter tracking</a> at the Fast Machine Learning for Science Conference 2025, CERN.</span></li>
  <li><span class="news-date">Sep 2025</span><span>Started my M.Eng. at NYCU as a graduate research assistant in the Parallel Computing System Laboratory.</span></li>
  <li><span class="news-date">Aug 2025</span><span>Received the <strong>Excellent Poster Award</strong> at TJCAS 2025 for our <a href="{{ base_path }}/publication/2025-higtr-tjcas">GNN-based trajectory reconstruction on FPGA</a>.</span></li>
  <li><span class="news-date">Nov 2024</span><span>Joined the <a href="https://a3d3.ai/">A3D3 Institute</a> as an affiliate trainee and <a href="https://www.andestech.com/en/">Andes Technology</a> as a digital IC design intern.</span></li>
</ul>

## Selected Publications

<ul class="cv-publications">
  <li>
    <a href="{{ base_path }}/publication/2025-unitrac-trets">UniTrac: A Unified FPGA Accelerator for GNN-based Particle Track Reconstruction in HEPs</a><br>
    <span class="cv-pub-authors">Yun-Chen Yang, <strong>Hao-Chun Liang*</strong>, Hsuan-Wei Yu, Edwin Arkel Rios, Santosh Parajuli, Mark S. Neubauer, Shih-Chieh Hsu, Bo-Cheng Lai</span><br>
    <span class="cv-pub-venue"><em>ACM Transactions on Reconfigurable Technology and Systems</em>, in submission, 2025</span>
  </li>
  <li>
    <a href="{{ base_path }}/publication/2025-fastml-gpu-tracking">Real-Time GPU Kalman-Filter Tracking via Kernel Refactoring and INT8 Surrogates for High-Luminosity Colliders</a><br>
    <span class="cv-pub-authors"><strong>Hao-Chun Liang</strong>, Yuan-Tang Chou, Bo-Cheng Lai</span><br>
    <span class="cv-pub-venue"><em>Fast Machine Learning for Science Conference</em>, CERN, 2025</span>
  </li>
  <li>
    <a href="{{ base_path }}/publication/2025-higtr-tjcas">An Integrated FPGA Implementation of Complete GNN-Based Trajectory Reconstruction</a> <span class="achievement">Excellent Poster Award</span><br>
    <span class="cv-pub-authors">Yun-Chen Yang, <strong>Hao-Chun Liang</strong>, Hsuan-Wei Yu, Bo-Cheng Lai, Shih-Chieh Hsu, Mark Neubauer, Santosh Pandey</span><br>
    <span class="cv-pub-venue"><em>Taiwan and Japan Conference on Circuits and Systems (TJCAS)</em>, 2025</span>
  </li>
</ul>

<p style="text-align: center; margin-top: 1em;"><a href="{{ base_path }}/publications/" class="pub-button">View All Publications</a></p>

## Contact

The best way to reach me is by email at [science103555@gmail.com](mailto:science103555@gmail.com). A full CV is available [on this site]({{ base_path }}/cv/) or as a [PDF]({{ base_path }}/input/resume.pdf?v=10).
