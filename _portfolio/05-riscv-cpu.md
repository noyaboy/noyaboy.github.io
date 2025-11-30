---
title: "RISC-V 5-Stage Pipelined CPU Core"
excerpt: "A processor implementing the RISC-V RV32I instruction set architecture with a classic five-stage pipeline (IF, ID, EX, MEM, WB), featuring data forwarding and stall units for hazard resolution, dual-bank instruction cache, and single-port data cache. Synthesized at 179.21 MHz on GPDK 45nm."
collection: portfolio
paperurl: "/files/ICLAB_report.pdf"
github: "https://github.com/noyaboy/5-Stage-Pipelined-RISC-V-CPU-Core"
---

## Overview

A processor implementing the RISC-V RV32I instruction set architecture with a classic five-stage pipeline (IF, ID, EX, MEM, WB), featuring data forwarding and stall units for hazard resolution, dual-bank instruction cache (256 words), and single-port data cache (128 words). Developed for the IC Design Laboratory course at National Tsing Hua University.

## Synthesis Results (GPDK 45nm)

- Clock frequency: 179.21 MHz
- Total cell area: 158,257.43 μm²
- Power consumption: 5.109 mW

## Technical Stack

<div class="skills-container">
  <span class="skill-tag">Verilog</span>
  <span class="skill-tag">Synopsys VCS</span>
  <span class="skill-tag">Design Compiler</span>
  <span class="skill-tag">Innovus</span>
  <span class="skill-tag">Python</span>
</div>

<p style="margin-top: 1.5em;">
  <a href="/files/ICLAB_report.pdf" class="pub-button">Paper</a>
  <a href="https://github.com/noyaboy/5-Stage-Pipelined-RISC-V-CPU-Core" class="pub-button">GitHub</a>
</p>
