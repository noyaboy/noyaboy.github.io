---
title: "traccc Optimization"
excerpt: "GPU algorithm optimization for real-time particle trajectory reconstruction at the High-Luminosity Large Hadron Collider (HL-LHC), featuring Kalman filter acceleration and INT8 surrogate models."
collection: portfolio
---

## Overview

This project focuses on optimizing GPU algorithms within the [traccc](https://github.com/acts-project/traccc) framework, a GPU-accelerated track reconstruction library developed for the ACTS (A Common Tracking Software) project at CERN.

## Key Contributions

- **Kalman Filter Kernel Refactoring**: Redesigned GPU kernels for the Kalman filter algorithm to improve parallelism and reduce memory bandwidth bottlenecks
- **INT8 Surrogate Models**: Implemented quantized neural network surrogates for computationally expensive tracking operations
- **Performance Optimization**: Achieved significant speedups in trajectory reconstruction for HL-LHC collision events

## Technical Stack

- CUDA / GPU Computing
- C++ / Modern C++17
- ACTS Framework
- High-Energy Physics Data Processing

## Context

The High-Luminosity Large Hadron Collider (HL-LHC) will produce unprecedented amounts of collision data, requiring real-time reconstruction of millions of particle trajectories per second. This work contributes to meeting the stringent latency and throughput requirements of the experiment.
