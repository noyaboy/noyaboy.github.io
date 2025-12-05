---
title: "Digital IC Design 面試筆記"
date: 2024-12-04
permalink: /blog/digital-ic-design-interview/
excerpt: "數位 IC 設計完整筆記，涵蓋 metastability、CDC、STA、clock gating、frequency dividers，以及 MTK、RTK、NTK、PHISON、SMI、GUC 面試題目。"
toc: false
tags:
  - 面試
  - Digital IC Design
---

## 目錄

### 基礎概念
- [Latch vs Flip-flop](#latch-vs-flip-flop)
- [Metastability](#metastability)

### 跨時脈域 (CDC)
- [CDC 概述](#clock-domain-crossing-cdc)
- [Single-bit 同步](#single-bit-signal)
- [Pulse Synchronizer](#pulse-synchronizer)
- [Toggle Synchronizer](#toggle-synchronizer-slow-to-fast-cdc)
- [Pulse Extender](#pulse-extender-fast-to-slow-cdc)
- [Multi-bit 同步](#multi-bit-signal)
- [Asynchronous FIFO 與 Gray Code](#asynchronous-fifo)
- [FIFO Depth 計算](#fifo-depth-calculation)
- [FIFO Almost Full/Empty](#fifo-almost-fullempty)

### CMOS 與數位基礎元件
- [Synchronous 與 Asynchronous Reset](#synchronous-vs-asynchronous-reset)
- [Race 與 Hazard](#race-and-hazard)
- [High-Impedance State](#high-impedance-state-tri-state)
- [NMOS 與 PMOS](#nmos-vs-pmos)
- [CMOS Inverter VTC](#cmos-inverter-vtc-voltage-transfer-characteristic)
- [Transmission Gate](#transmission-gate)

### Verilog 與 RTL 設計
- [Blocking 與 Non-blocking](#blocking-vs-non-blocking-assignments)
- [Verilog Event Queue](#verilog-stratified-event-queue)
- [FSM 三段式寫法](#fsm-finite-state-machine---three-stage-coding)
- [什麼寫法會產生 Latch？](#what-coding-causes-latch-inference)
- [SystemVerilog Assertions (SVA)](#systemverilog-assertions-sva)

### 組合邏輯
- [Full Adder](#full-adder)
- [RCA 與 CLA Adder](#ripple-carry-vs-carry-lookahead-adder)
- [用 MUX 建構邏輯閘](#building-gates-using-mux)
- [用 NAND 建構邏輯閘](#building-gates-using-nand-only)

### 設計流程
- [前端設計](#front-end-design)
- [後端設計](#back-end-design)
- [ASIC 與 FPGA 比較](#asic-vs-fpga-comparison)

### FPGA
- [FPGA 與 CPLD](#fpga-vs-cpld)
- [FPGA 架構](#fpga-architecture)
- [FPGA 組態模式](#fpga-configuration-modes)

### 合成
- [Technology Library 與 PVT](#technology-library)
- [Liberty File Format (.lib)](#liberty-file-format-lib)
- [Delay Models](#delay-models)
- [SDF 檔案格式](#sdf-file-format)
- [SDC Constraints](#sdc-constraints)
- [Clock Gating](#clock-gating)
- [Cross Boundary Optimization](#cross-boundary-optimization)

### 靜態時序分析 (STA)
- [DTA 與 STA](#dta-vs-sta)
- [Pre-sim 與 Post-sim](#pre-simulation-vs-post-simulation)
- [Timing Path 類型](#types-of-timing-path)
- [Setup 與 Hold 分析](#setup--hold-check)
- [Recovery 與 Removal Time](#recovery--removal-time)
- [Clock Jitter](#clock-jitter)
- [OCV (On-Chip Variation)](#ocv-on-chip-variation)
- [CPPR/CRPR (Pessimism Removal)](#cpprcrpr-clock-path-pessimism-removal)
- [Multi-Corner Multi-Mode (MCMM)](#multi-corner-multi-mode-mcmm)
- [Timing Violation 解決方法](#setup--hold-violation-solutions)
- [特殊 Timing Path](#special-timing-path)

### 低功耗設計
- [功耗降低技術](#low-power-design-techniques)
- [Power Intent (UPF/CPF)](#power-intent-upfcpf)
- [Level Shifters 與 Isolation Cells](#level-shifters--isolation-cells)

### 電路範例
- [Frequency Dividers](#frequency-divider-circuits)
- [奇數除頻 50% Duty Cycle](#odd-clock-divider---50-duty-cycle)
- [Glitch-free Clock Mux](#glitch-free-clock-mux)
- [Round Robin Arbiter](#round-robin-arbiter)
- [Pipeline 概念](#pipeline-concept)
- [除法演算法](#division-algorithm)
- [Sequence Detector](#sequence-detector)
- [Johnson Counter](#johnson-counter)

### 後端 / 實體設計
- [CTS 與 Clock Uncertainty](#cts--clock-uncertainty)
- [Routing Congestion 解決方法](#routing-congestion-solutions)
- [晶片面積估算](#chip-area-estimation)
- [CTS 中 Buffer 與 Inverter](#buffer-vs-inverter-in-cts)
- [ECO 流程](#eco-engineering-change-order)
- [Scan Chain / DFT](#scan-chain--dft)
- [MBIST (Memory BIST)](#mbist-memory-built-in-self-test)
- [IR Drop 分析](#ir-drop-analysis)
- [Electromigration](#electromigration)
- [Signal Integrity (Crosstalk)](#signal-integrity-crosstalk)
- [Latch-up 效應](#latch-up-effect)
- [Antenna 效應](#antenna-effect)

### 記憶體與 Cache
- [SRAM 與 DRAM](#sram-vs-dram)
- [Write-back 與 Write-through](#write-back-vs-write-through-cache)
- [Cache Associativity](#cache-associativity)
- [MESI Protocol](#mesi-protocol-cache-coherence)

### 匯流排協定
- [常見協定](#common-protocols)（包含 AXI、SPI、I2C、UART、DDR）
- [DDR Memory Timing](#ddr-memory-timing)

### 電腦架構
- [Pipeline Hazards](#pipeline-hazards)
- [Branch Predictor](#branch-predictor)
- [Virtual Memory 與 TLB](#virtual-memory--tlb)

### EDA 與腳本
- [Tcl 腳本](#eda-scripting-tcl)

### 常見面試問題
- [Input/Output Delay](#inputoutput-delay) *(STA)*
- [Clock Skew 影響](#clock-skew-effect-on-setuphold) *(STA)*
- [Hold Time 可為零或負？](#can-hold-time-be-zero-or-negative) *(STA)*
- [SystemVerilog 用途](#systemverilog-purpose) *(Verilog)*
- [Cache 如何加速 CPU](#how-cache-accelerates-cpu) *(記憶體)*
- [2-Stage FF CDC 限制](#can-2-stage-ff-solve-all-cdc-problems) *(CDC)*
- [合成所需檔案](#files-needed-for-synthesis) *(合成)*
- [Glitch 預防](#glitch-causes-and-prevention) *(設計)*
- [雙邊緣偵測](#dual-edge-detection) *(電路)*

### 面試經驗
- [MTK](#mtk) | [RTK](#rtk) | [NTK](#ntk) | [PHISON](#phison) | [SMI](#smi) | [GUC](#guc)

### [參考資料](#references)

---

## 基礎概念

### Latch vs Flip-flop

Latch 與 flip-flop 是數位設計中的基本儲存元件，各自儲存一個位元的資料。關鍵區別在於觸發機制：latch 是 **level-triggered**（位準觸發），表示當 enable 訊號為 active 時，輸出會跟隨輸入（transparent）；而 flip-flop 是 **edge-triggered**（邊緣觸發），僅在 clock 訊號的上升或下降邊緣時擷取輸入。這使得 flip-flop 在同步設計中更為可預測，而 latch 雖有速度優勢但會使時序分析變複雜。

| Feature | Latch | Flip-Flop |
|---------|-------|-----------|
| **Triggering** | Level-triggered (transparent when enabled) | Edge-triggered (changes only at clock edge) |
| **Sensitivity** | Output follows input while enable is high | Output changes only at rising/falling edge |
| **Area** | Smaller, requires less circuitry | Larger, requires more gates |
| **Speed** | Faster | Slower due to edge detection logic |
| **Power** | Lower | Higher |
| **Timing Analysis** | More complex (time borrowing possible) | Simpler, well-defined timing |
| **FPGA Support** | Not recommended | Preferred |

**Key Points:**
- A flip-flop is built from two back-to-back latches with opposite polarity clocks (master-slave topology)
- Latches allow **time borrowing**: if one half-cycle path is slow and another is fast, the slow path can borrow time from the fast path
- Latches are typically avoided in synchronous designs due to complex timing analysis

**Time Borrowing Deep Dive:**

Time borrowing is a powerful technique in latch-based designs that flip-flops cannot achieve. The key insight is that latches are transparent during the entire enable phase, not just at an edge.

```
Example: 4-stage pipeline with latches vs flip-flops

Flip-flop based (each stage limited to half-period):
  Stage delays: 8ns, 12ns, 6ns, 10ns (max = 12ns)
  Required period: 2 × 12ns = 24ns → Fmax = 41.7 MHz

Latch-based (time borrowing allowed):
  Total delay: 8 + 12 + 6 + 10 = 36ns
  Average per stage: 36/4 = 9ns
  Required period: 2 × 9ns = 18ns → Fmax = 55.6 MHz (33% faster!)
```

**Why latches are more variation-tolerant:** When process variation causes some paths to be slow and others fast, latch-based designs automatically compensate through time borrowing. This makes them dramatically more yield-friendly in advanced nodes where variation is significant.

![Latch](https://i.imgur.com/E6NY4ca.png)

![Flip-flop](https://i.imgur.com/tv3FbCD.png)

### **Metastability**
Metastability occurs when the time for the flip-flop's output (Q pin) to stabilize is greater than the clk-to-q (Tcq) time. This happens when data transitions near the clock edge, violating setup or hold time requirements.

![Metastability 1](https://i.imgur.com/y3WG22Q.png)
![Metastability 2](https://i.imgur.com/kp5y9dk.png)

**MTBF (Mean Time Between Failures) Formula:**

```
MTBF = e^(Tr/τ) / (T0 × Fclk × Fdata)
```

Where:
- `Tr` = resolution time (time available for metastability to resolve)
- `τ` (tau) = metastability time constant (device dependent)
- `Fclk` = clock frequency
- `Fdata` = data transition frequency

**Resolution time calculation:**
```
Tr = Tclk - (Tsu + Tckq + Tpd)
```

**Design Guidelines:**

The number of synchronizer stages directly affects MTBF through the exponential term in the formula. Each additional stage roughly squares the MTBF, making the choice of synchronizer depth a critical design decision based on reliability requirements.

- With **2 flip-flops**: adequate MTBF for most designs (10s-100s MHz)
- With **3 flip-flops**: mandated for space/medical devices
- With **4 flip-flops**: MTBF can reach 1,000+ years

**Practical MTBF Example:**
```
Given: Fclk = 100 MHz, Fdata = 10 MHz, τ = 0.3 ns, T0 = 1 ns
With Tr = 5 ns (2FF synchronizer at 100 MHz):
  MTBF = e^(5/0.3) / (1e-9 × 100e6 × 10e6)
       = e^16.67 / (1e6)
       ≈ 17.4 million seconds ≈ 201 days

With Tr = 10 ns (3FF synchronizer):
  MTBF = e^(10/0.3) / (1e6)
       ≈ 2.8e8 years (effectively infinite)
```

`Solution (double flip-flop synchronizer)`: Simply add another flip-flop driven by the same clock after the subsequent flip-flop stage. The second flip-flop gives the first flip-flop an entire clock cycle to resolve from any metastable state.

**Advanced MTBF Considerations:**

| Factor | Impact on MTBF | Recommendation |
|--------|----------------|----------------|
| **Heavy load on sync output** | Reduces resolution time → worse MTBF | Keep synchronizer output lightly loaded |
| **Faster flip-flop family** | Lower setup/hold times → better MTBF | Use fast cells for synchronizers |
| **Multiple sync locations** | Each adds failure probability | Synchronize signal only once, distribute the synchronized version |
| **Temperature/voltage variation** | τ varies with conditions | Characterize at worst-case corner |

**Process Node Trends:** In advanced nodes (28nm and below), τ values around 10ps with T0 around 20ps are typical. At 1 GHz with data changing every 10 cycles and one clock cycle for resolution, MTBF can exceed 10^29 years—essentially infinite.

**Altera/Intel Recommendation:** Use three synchronizer flip-flops as standard practice for better metastability protection, not just two.

---

## 跨時脈域 (CDC)

### **CDC 概述**

當訊號在數位系統中從一個 clock domain 傳遞到另一個 clock domain 時，就會發生 clock domain crossing。這是多時脈設計中最具挑戰性的部分，因為跨越非同步邊界的訊號可能導致 metastability——一種 flip-flop 輸出在不確定期間內不可預測的不穩定狀態。了解 clock 之間的關係決定了適當的同步策略。

**Types of CDC:**

| Type | Description |
|------|-------------|
| **Asynchronous** | Clocks have different frequencies and no phase relationship—most challenging, requires robust synchronization |
| **Mesochronous** | Same frequency, different phase—phase offset is fixed, needs one-time compensation |
| **Plesiochronous** | Almost same frequency, gradual drift—requires continuous phase tracking and compensation |

#### **single bit signal**
→ Can be solved using double flip-flop synchronizer
However, it is not suitable for pulse signals, so Pulse synchronizer is used instead.

**Best Practice:** Avoid combinatorial logic immediately before synchronizer flip-flops. Combinational logic tends to glitch multiple times before settling, increasing metastability risk.

**Types of Single-bit Synchronizers:**

| Synchronizer | Description | Use Case |
|--------------|-------------|----------|
| **Level** | 2-FF synchronizer for static signals | Slow-changing control signals |
| **Edge** | Detects edge transitions across domains | Clock enables, interrupts |
| **Pulse** | XOR-based, converts pulse→level→pulse | Fast pulses (req/ack) |

**Pulse synchronizer**: Convert the pulse signal to a level signal through an XOR gate, pass it through a double flip-flop, then convert the level signal back to a pulse signal through another XOR gate.
![Pulse synchronizer](https://i.imgur.com/UuK9bvn.png)

```verilog
module pulse_sync (
    input  src_clk, src_rst_n, src_pulse,
    input  dst_clk, dst_rst_n,
    output dst_pulse
);
// Source: toggle on pulse (pulse → level)
reg src_toggle;
always @(posedge src_clk or negedge src_rst_n)
    if (!src_rst_n) src_toggle <= 1'b0;
    else if (src_pulse) src_toggle <= ~src_toggle;

// 2FF sync + edge detect (level → pulse)
reg [2:0] sync;
always @(posedge dst_clk or negedge dst_rst_n)
    if (!dst_rst_n) sync <= 3'b0;
    else sync <= {sync[1:0], src_toggle};

assign dst_pulse = sync[2] ^ sync[1];  // XOR detects toggle
endmodule
```

**Limitation:** Minimum 3 destination clock cycles between consecutive source pulses.

**Edge synchronizer**: Similar to pulse synchronizer but outputs a pulse when detecting rising/falling edge in the destination domain.

#### **Toggle Synchronizer (Slow-to-Fast CDC)**

When transferring pulses from a slow clock domain to a fast clock domain, the destination can safely sample the signal multiple times. The toggle synchronizer is effective here because the pulse duration from the slow domain spans multiple fast clock cycles.

```verilog
module toggle_sync_slow_to_fast (
    input  slow_clk, slow_rst_n, slow_pulse,
    input  fast_clk, fast_rst_n,
    output fast_pulse
);
// Toggle in slow domain
reg toggle;
always @(posedge slow_clk or negedge slow_rst_n)
    if (!slow_rst_n) toggle <= 1'b0;
    else if (slow_pulse) toggle <= ~toggle;

// 2FF sync in fast domain (plenty of time to sample)
reg [1:0] sync;
always @(posedge fast_clk or negedge fast_rst_n)
    if (!fast_rst_n) sync <= 2'b0;
    else sync <= {sync[0], toggle};

// Edge detect
reg sync_d;
always @(posedge fast_clk or negedge fast_rst_n)
    if (!fast_rst_n) sync_d <= 1'b0;
    else sync_d <= sync[1];

assign fast_pulse = sync[1] ^ sync_d;
endmodule
```

#### **Pulse Extender (Fast-to-Slow CDC)**

When transferring pulses from a fast clock domain to a slow clock domain, a single-cycle fast pulse may be missed entirely by the slow clock. The pulse extender stretches the fast pulse to ensure it spans at least 2-3 slow clock cycles.

**Problem:** A 1-cycle pulse at 500 MHz (2ns) transferring to 50 MHz (20ns period) could be entirely missed between two slow clock edges.

**Solution:** Extend the pulse in the source domain using a feedback acknowledgment:

```verilog
module pulse_extender (
    input  fast_clk, fast_rst_n, fast_pulse,
    input  slow_clk, slow_rst_n,
    output slow_pulse
);
// Sync ack back to fast domain
reg [1:0] ack_sync;
always @(posedge fast_clk or negedge fast_rst_n)
    if (!fast_rst_n) ack_sync <= 2'b0;
    else ack_sync <= {ack_sync[0], slow_sync[1]};

// Extended pulse in fast domain (held until ack received)
reg extended;
always @(posedge fast_clk or negedge fast_rst_n)
    if (!fast_rst_n) extended <= 1'b0;
    else if (fast_pulse) extended <= 1'b1;
    else if (ack_sync[1]) extended <= 1'b0;

// 2FF sync + edge detect in slow domain
reg [1:0] slow_sync;
always @(posedge slow_clk or negedge slow_rst_n)
    if (!slow_rst_n) slow_sync <= 2'b0;
    else slow_sync <= {slow_sync[0], extended};

reg slow_d;
always @(posedge slow_clk or negedge slow_rst_n)
    if (!slow_rst_n) slow_d <= 1'b0;
    else slow_d <= slow_sync[1];

assign slow_pulse = slow_sync[1] & ~slow_d;  // Rising edge detect
endmodule
```

**CDC Synchronizer Selection Guide:**

| Source → Dest | Technique | Latency | Notes |
|--------------|-----------|---------|-------|
| Slow → Fast | Toggle sync | 2-3 fast cycles | Simple, reliable |
| Fast → Slow | Pulse extender | 4-6 fast cycles | Uses feedback ack |
| Same frequency | 2-FF sync | 2 cycles | Simplest approach |
| Multi-bit | Async FIFO | Variable | Most robust |

#### **Multi bit signal**
Cannot use 2F/F synchronizer to synchronize multi-bit data because the delay of 2F/F synchronizer is random - it may take one cycle to synchronize or two cycles, which causes each bit of multi-bits to be unstable.

**Solutions for Multi-bit CDC:**

Synchronizing multi-bit data requires ensuring all bits are captured coherently. Several techniques exist, each with different trade-offs between latency, throughput, and complexity.

* **Load signal (MCP - Multi-Cycle Path)**: Use pulse synchronizer to generate load signal. The qualifier pulse enables sampling of the multi-bit bus. Source data must remain stable long enough for safe synchronization.
![Load signal](https://i.imgur.com/gDR7VW7.png)

* **Handshake synchronization**: Source sends "request" signal → destination receives via 2-FF synchronizer → destination sends "ack" back via 2-FF synchronizer → source can update data. Guarantees data integrity but adds latency.

* **Additional two-stage flip-flop**: Use double flip-flop synchronizer to synchronize data to the destination domain, then pass the data through two stages of flip-flops, then compare these 3 stages. If all are equal, it means the value synchronized by the synchronizer is stable.

* **Asynchronous FIFO**: The most robust solution for continuous data streams, using Gray-coded pointers to safely transfer read/write addresses between domains.

### **Asynchronous FIFO**
Handles multi-bit CDC Problem

Convert read pointer & write pointer to gray code representation. Since gray code only changes one bit at each edge, it can be transferred to the destination domain through 2F/F synchronizer.

**Why Gray Code is Essential:**
```
Binary counter (WRONG for CDC):
  3 → 4: 011 → 100 (3 bits change simultaneously!)
  If sampled mid-transition: could read 000, 001, 010, 100, 101, 110, 111
  → FIFO may incorrectly report full/empty

Gray code counter (SAFE for CDC):
  3 → 4: 010 → 110 (only 1 bit changes)
  If sampled mid-transition: either 010 or 110
  → At worst, pointer is off by 1 (conservative full/empty)
```

#### Gray code Encoding Method
1. Only one bit differs between two adjacent gray codes
2. When the Nth bit of binary code changes from 0 to 1, the subsequent N-1 bits of gray code will be symmetrical to the first half, while the bits before the Nth bit remain the same

**Binary to Gray Code Conversion:**
```verilog
// Method 1: Compact one-liner
assign gray = bin ^ (bin >> 1);

// Method 2: Explicit (4-bit)
assign G[3] = bin[3];
assign G[2] = bin[3] ^ bin[2];
assign G[1] = bin[2] ^ bin[1];
assign G[0] = bin[1] ^ bin[0];
```

**Gray to Binary Code Conversion:**
```verilog
// Method 1: Cascading XOR from MSB
assign bin[3] = gray[3];
assign bin[2] = gray[3] ^ gray[2];
assign bin[1] = gray[3] ^ gray[2] ^ gray[1];
assign bin[0] = gray[3] ^ gray[2] ^ gray[1] ^ gray[0];

// Method 2: Using loop
integer i;
always @(*) begin
    bin[WIDTH-1] = gray[WIDTH-1];
    for (i = WIDTH-2; i >= 0; i = i - 1)
        bin[i] = bin[i+1] ^ gray[i];
end
```

![Gray code 1](https://i.imgur.com/Mfsh1nk.png)
![Gray code 2](https://i.imgur.com/CVVPyQy.png)

If the Asynchronous FIFO depth is not a power of 2, use the symmetry property of gray code to change the starting point, ensuring that each adjacent gray code only has one bit change.
![Gray code 3](https://i.imgur.com/yBLXnAv.png)

### **FIFO Depth Calculation**

Calculating the minimum FIFO depth is critical for asynchronous FIFOs to prevent data loss when the write rate temporarily exceeds the read rate. The "Leaky Bucket" model provides a systematic approach to determine the required depth.

**Leaky Bucket Model:**

Think of the FIFO as a bucket where:
- Water flows IN at the write rate (f_wr)
- Water leaks OUT at the read rate (f_rd)
- The bucket must be large enough to hold the accumulated water during burst periods

**Basic Formula (Continuous Burst):**

When writing B data items in a burst with no idle cycles:

```
FIFO_Depth ≥ B - B × (f_rd / f_wr)
           = B × (1 - f_rd / f_wr)
           = B × (f_wr - f_rd) / f_wr
```

Where:
- B = Burst length (number of data items written consecutively)
- f_wr = Write clock frequency
- f_rd = Read clock frequency

**Example 1: Simple Burst**
- Write clock: 80 MHz, Read clock: 50 MHz
- Burst length: 120 data items (no idle)

```
Depth ≥ 120 × (1 - 50/80)
      = 120 × (1 - 0.625)
      = 120 × 0.375
      = 45
```

Minimum FIFO depth = 45 entries

**Idle Cycle Adjustment:**

If there are idle cycles between writes, the effective write rate decreases:

```
Effective_f_wr = f_wr × (Data_cycles / Total_cycles)

FIFO_Depth ≥ B × (1 - f_rd / Effective_f_wr)
```

**Example 2: With Idle Cycles**
- Write: 80 MHz with 1 idle cycle every 4 data cycles (3 data + 1 idle)
- Read: 50 MHz continuous
- Burst: 120 data items

```
Effective_f_wr = 80 × (3/4) = 60 MHz

Depth ≥ 120 × (1 - 50/60)
      = 120 × (1/6)
      = 20
```

**Practical Considerations:**

| Factor | Impact on Depth |
|--------|----------------|
| Synchronization latency | Add 2-4 cycles margin |
| Full/Empty detection delay | Add extra entries |
| Power-of-2 constraint | Round up to nearest 2^n |
| Safety margin | Typically add 10-20% |

**Gray Code Full/Empty Detection:**

```verilog
// Full: MSB different, other bits same (after sync)
assign full = (wr_ptr_gray[N:N-1] == ~rd_ptr_sync[N:N-1]) &&
              (wr_ptr_gray[N-2:0] == rd_ptr_sync[N-2:0]);

// Empty: pointers identical (after sync)
assign empty = (rd_ptr_gray == wr_ptr_sync);
```

Note: The extra MSB bit in the pointer allows distinguishing between full (pointers differ only in MSB) and empty (pointers identical) conditions when using Gray code.

**Why Gray Code Works for CDC (Even Fast-to-Slow):**

A common misconception is that Gray code fails when crossing from a fast to slow clock domain because multiple increments may occur between slow clock samples. However, the key insight is:

```
Fast-to-slow crossing concern:
  Fast domain increments: 5 → 6 → 7 → 8 (Gray: 111 → 101 → 100 → 110)
  Slow domain samples: may only see 5 and 8

Why this is SAFE:
  - Only ONE bit is changing at any instant in the fast domain
  - The slow domain sees a monotonically increasing sequence
  - At worst, the slow domain may skip values, but never sees an invalid value
  - This means the FIFO may report "more full" or "less empty" than reality
  - Conservative (safe) behavior: prevents overflow/underflow
```

**Real-World FIFO Considerations:**
- Real FIFOs have CDC synchronizers that consume 2-4 entries of usable depth
- Always verify your specific FIFO IP's behavior at corner cases
- Consider back-pressure latency when sizing for streaming applications

### **FIFO Almost Full/Empty**

Beyond basic full/empty flags, FIFOs often implement programmable threshold flags (almost_full, almost_empty) to support burst transfers and provide early warnings for flow control.

**Why Almost Full/Empty is Needed:**

```
Problem: Writer cannot instantly stop
  Writer sees: FULL flag (too late!)
  Writer already has data in flight
  Result: FIFO overrun!

Solution: Early warning with Almost Full
  Writer sees: ALMOST_FULL flag
  Writer stops sending new data
  Writer's in-flight data fills remaining slots
  Result: No overrun, FULL reached gracefully

The gap between ALMOST_FULL and FULL is called a "skid buffer"
```

**Flag Thresholds:**

```
FIFO Depth = 16
                                 Write
                                   ↓
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │13 │14 │15 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
  ↑                               ↑                           ↑
EMPTY                        ALMOST_FULL                    FULL
(count=0)                    (count≥12)                  (count=16)

  ↑           ↑
ALMOST_EMPTY  HALF_FULL
(count≤4)    (count=8)
```

**Common Flag Definitions:**

| Flag | Condition | Typical Use |
|------|-----------|-------------|
| **EMPTY** | rd_ptr == wr_ptr | Block read operations |
| **FULL** | wr_ptr - rd_ptr == DEPTH | Block write operations |
| **ALMOST_EMPTY** | count ≤ AE_threshold | Trigger DMA refill |
| **ALMOST_FULL** | count ≥ AF_threshold | Apply back-pressure |
| **HALF_FULL** | count == DEPTH/2 | Flow control switching |

**Implementation Approaches:**

```verilog
// Method 1: Direct threshold comparison
// (Requires Gray-to-binary conversion for async FIFO)
wire [PTR_WIDTH-1:0] fifo_count = wr_ptr_bin - rd_ptr_bin;
assign almost_full  = (fifo_count >= AF_THRESHOLD);
assign almost_empty = (fifo_count <= AE_THRESHOLD);

// Method 2: Separate counters per domain (more common)
// Write domain: decrement count when read acknowledged
// Read domain: increment count when write acknowledged
```

**Programmable Thresholds:**

Many FIFO IPs allow runtime configuration of thresholds:

```verilog
module async_fifo #(
    parameter DEPTH = 16,
    parameter WIDTH = 8,
    parameter AF_THRESH = 12,  // Static threshold
    parameter AE_THRESH = 4
)(
    input  [PTR_WIDTH-1:0] prog_af_thresh,  // Programmable
    input  [PTR_WIDTH-1:0] prog_ae_thresh,  // Programmable
    output almost_full,
    output almost_empty,
    ...
);
// Use prog_*_thresh for dynamic configuration
```

**Threshold Selection Guidelines:**

| Parameter | Consideration | Typical Value |
|-----------|---------------|---------------|
| **AF_THRESH** | Max burst size + CDC latency | DEPTH - 4 to DEPTH - 8 |
| **AE_THRESH** | Min read burst before underrun | 2 to 4 |
| **CDC Latency** | 2-3 clock cycles per synchronizer | Account for in timing |

**Burst Transfer Example:**

```
Scenario: USB packet reception (max 64 bytes)
  - FIFO depth: 128 bytes
  - Read clock slower than write clock

AF_THRESHOLD calculation:
  Max burst: 64 bytes
  CDC latency: 3 write cycles
  Safety margin: 1 byte

  AF_THRESH = 128 - 64 - 3 - 1 = 60

When count ≥ 60:
  - Assert almost_full
  - Tell USB controller to NAK next packet
  - Remaining 68 slots absorb in-flight data
```

**Gray Code Consideration:**

In async FIFOs, full/empty flags use synchronized Gray code pointers. For almost_full/empty, you need the actual distance between pointers:

```verilog
// Option 1: Convert to binary after synchronization
wire [PTR_WIDTH-1:0] wr_ptr_bin_sync = gray_to_bin(wr_ptr_gray_sync);
wire [PTR_WIDTH-1:0] rd_ptr_bin_sync = gray_to_bin(rd_ptr_gray_sync);
wire [PTR_WIDTH-1:0] count = wr_ptr_bin_sync - rd_ptr_bin_sync;

// Option 2: Use conservative thresholds (account for sync uncertainty)
// Almost_full may assert slightly early (safe, but reduced effective depth)
```

**Common Interview Questions:**

**Q: Why not just use full flag for flow control?**
A: By the time the writer sees FULL, it may have already issued more writes. The almost_full gives advance warning, allowing graceful stopping.

**Q: How do you choose almost_full threshold?**
A: DEPTH minus (max_burst_size + synchronization_latency + safety_margin).

---

## CMOS 與數位基礎元件

### **Synchronous vs Asynchronous Reset**

Reset 訊號在開機或錯誤恢復時將 flip-flop 初始化至已知狀態。選擇 synchronous 或 asynchronous reset 會影響 timing closure、面積和可靠性。Synchronous reset 被視為一般資料輸入，僅在 clock edge 時生效；而 asynchronous reset 會立即作用，不受 clock 影響，但若在 clock edge 附近釋放可能導致 metastability。

| Aspect | Synchronous Reset | Asynchronous Reset |
|--------|-------------------|-------------------|
| **Activation** | At clock edge only | Immediate, clock-independent |
| **Timing** | Requires setup/hold relative to clock | No timing constraints |
| **Area** | Smaller (reset in data path) | Larger (extra reset pin on FF) |
| **Glitch Sensitivity** | Filtered by clock | Susceptible to glitches |
| **DFT** | Easier to test | May need special handling |

```verilog
// Synchronous Reset
always @(posedge clk) begin
    if (rst)
        q <= 1'b0;
    else
        q <= d;
end

// Asynchronous Reset
always @(posedge clk or posedge rst) begin
    if (rst)
        q <= 1'b0;
    else
        q <= d;
end
```

**Asynchronous Reset with Synchronous Release:**

Best practice combining both approaches - reset activates immediately but releases synchronized to clock to avoid metastability.

```verilog
// Reset synchronizer (async assert, sync deassert)
reg rst_n_meta, rst_n_sync;

always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        rst_n_meta <= 1'b0;
        rst_n_sync <= 1'b0;
    end else begin
        rst_n_meta <= 1'b1;
        rst_n_sync <= rst_n_meta;
    end
end
```

### **Race and Hazard**

| Term | Definition |
|------|------------|
| **Race** | Different propagation delays cause signals to arrive at different times, leading to unpredictable results |
| **Hazard** | Temporary glitches (unwanted pulses) in combinational logic output due to unequal path delays |

**Types of Hazards:**

| Type | Description | Example |
|------|-------------|---------|
| **Static-1** | Output should stay 1, but glitches to 0 | Y = A + A' (momentary 0) |
| **Static-0** | Output should stay 0, but glitches to 1 | Y = A · A' (momentary 1) |
| **Dynamic** | Output should change once, but changes multiple times | Multiple transitions |

**Solutions:**

Hazards can be eliminated at the logic design level or masked through sequential elements. The choice depends on whether glitch-free combinational output is required or if registered outputs are acceptable.

- Add redundant terms to Boolean expression (consensus term)
- Insert output register to filter glitches
- Use Gray code encoding
- Add delay elements to balance paths

```
Example: Y = AB + A'C has hazard when B=C=1, A changes
Fix: Y = AB + A'C + BC (add consensus term BC)
```

### **High-Impedance State (Tri-state)**

High-impedance (Hi-Z) state is neither logic 0 nor logic 1. The output acts as an open circuit with very high resistance.

**Characteristics:**
- Output is electrically disconnected from the circuit
- Allows multiple drivers to share a common bus
- Controlled by output enable (OE) signal

```verilog
// Tri-state buffer
module tristate_buffer (
    input  data_in,
    input  oe,        // output enable
    output data_out
);
    assign data_out = oe ? data_in : 1'bz;
endmodule

// Bidirectional I/O
module bidir_io (
    inout  data,
    input  data_out,
    input  oe,
    output data_in
);
    assign data = oe ? data_out : 1'bz;
    assign data_in = data;
endmodule
```

**Use Cases:**

Tri-state outputs are essential when multiple devices need to drive a common signal line. Without tri-state capability, connecting multiple outputs together would cause contention and potential damage. The high-impedance state allows inactive drivers to electrically disconnect.

- Shared bus architectures (e.g., CPU data bus)
- Bidirectional I/O pins (GPIO, memory interfaces)
- Memory data buses (SRAM, DRAM data lines)

### **NMOS vs PMOS**

NMOS and PMOS are the two complementary transistor types in CMOS technology. Their fundamental difference lies in charge carriers: NMOS uses electrons while PMOS uses holes. Since electron mobility in silicon (~1350 cm²/V·s) is approximately 2-3× higher than hole mobility (~480 cm²/V·s), NMOS transistors switch faster and can be smaller for equivalent drive strength. This is why PMOS transistors in a balanced CMOS inverter are typically sized 2-3× wider than their NMOS counterparts.

| Property | NMOS | PMOS |
|----------|------|------|
| **Carrier** | Electrons | Holes |
| **Mobility** | Higher (~2-3× faster) | Lower |
| **Conducts when** | Gate = High (VGS > Vth) | Gate = Low (VGS < Vth) |
| **Passes** | Strong 0, weak 1 | Strong 1, weak 0 |
| **Pull network** | Pull-down (to GND) | Pull-up (to VDD) |
| **Size for equal drive** | Smaller | Larger (~2-3×) |

**Why NMOS is faster:**
- Electron mobility (~1350 cm²/V·s) > Hole mobility (~480 cm²/V·s)
- For same current drive, NMOS can be smaller than PMOS

**CMOS Inverter:**
```
        VDD
         │
      ┌──┴──┐
      │PMOS │←── A (input)
      └──┬──┘
         ├────── Y (output) = A'
      ┌──┴──┐
      │NMOS │←── A (input)
      └──┬──┘
         │
        GND
```

### **CMOS Inverter VTC (Voltage Transfer Characteristic)**

The Voltage Transfer Characteristic (VTC) curve plots input voltage vs output voltage and is the key metric for characterizing digital inverter quality. From this curve, we can extract noise margins, gain, and operating logic levels.

**Five Regions of Operation:**

| Region | Vin Range | NMOS State | PMOS State | Vout |
|--------|-----------|------------|------------|------|
| **A** | 0 ≤ Vin ≤ VTHn | Cut-off | Linear | VDD |
| **B** | VTHn < Vin < VM | Saturation | Linear | High |
| **C** | Vin ≈ VM | Saturation | Saturation | VM |
| **D** | VM < Vin < VDD-VTHp | Linear | Saturation | Low |
| **E** | Vin ≥ VDD-VTHp | Linear | Cut-off | 0 |

**Switching Threshold (VM):** At VM, both NMOS and PMOS are in saturation, both conduct, creating **short-circuit current** - an important component of dynamic power.

**Noise Margins:**

Noise margin quantifies how much noise the input can tolerate without affecting the output:

```
NML = VIL - VOL  (Low Noise Margin)
NMH = VOH - VIH  (High Noise Margin)

Where:
  VIL = Maximum input voltage recognized as LOW
  VIH = Minimum input voltage recognized as HIGH
  VOL = Maximum output voltage for LOW
  VOH = Minimum output voltage for HIGH
```

**Adjusting VM:** The switching threshold can be shifted by changing the β ratio (W/L ratio of PMOS to NMOS). Increasing PMOS width shifts VM higher; increasing NMOS width shifts VM lower.

### **Transmission Gate**

A transmission gate consists of an NMOS and PMOS connected in parallel, enabling **full-swing** signal passing (both strong 0 and strong 1).

```
           ┌─────┐
    In ────┤NMOS ├──── Out
           └──┬──┘
              │ (parallel)
           ┌──┴──┐
    In ────┤PMOS ├──── Out
           └─────┘

    Control: EN (to NMOS gate), EN' (to PMOS gate)
```

**Why both transistors?**
- NMOS passes strong 0 but weak 1 (loses VTHn)
- PMOS passes strong 1 but weak 0 (loses |VTHp|)
- Together: full rail-to-rail signal transfer

**D-Latch using Transmission Gates:**

```
        ┌─────────────────────────────┐
        │    EN        EN'            │
        │     │         │             │
    D ──┼──►[TG1]──┬──►[TG2]──┐       │
        │         │          │       │
        │      ┌──┴──┐    ┌──┴──┐    │
        │      │ INV │◄───│WEAK │◄───┤──► Q
        │      │  1  │    │ INV │    │
        │      └─────┘    └─────┘    │
        └─────────────────────────────┘

    EN=1: TG1 open, TG2 closed → Transparent (Q follows D)
    EN=0: TG1 closed, TG2 open → Latched (Q holds)
```

**Why use Weak Inverter in feedback?** To avoid **contention** - when new data is written, the weak inverter's output can be easily overridden by the stronger input signal.

**Building gates using NMOS/PMOS:**

```
NAND using CMOS:           NOR using CMOS:
    VDD                        VDD
     │                          │
  ┌──┴──┐                   ┌──┴──┬──┴──┐
  │PMOS │ ┌──┐              │PMOS│PMOS │
  └──┬──┘ │P │              └──┬─┴──┬──┘
     ├────┤  │                 │    │
     │    └──┘              ┌──┴────┴──┐
  ┌──┴──┐                   │   NMOS   │
  │NMOS │                   └────┬─────┘
  └──┬──┘                   ┌────┴─────┐
  ┌──┴──┐                   │   NMOS   │
  │NMOS │                   └────┬─────┘
  └──┬──┘                        │
     │                          GND
    GND
(Series NMOS, Parallel PMOS)  (Parallel NMOS, Series PMOS)
```

---

## Verilog 與 RTL 設計

### **Blocking vs Non-blocking Assignments**

| Assignment | Symbol | Behavior | Use Case |
|------------|--------|----------|----------|
| **Blocking** | `=` | Executes sequentially, blocks next statement | Combinational logic |
| **Non-blocking** | `<=` | Executes concurrently, updates at end of time step | Sequential logic |

**Key Rules:**
- Use **non-blocking (`<=`)** for sequential logic (flip-flops, registers)
- Use **blocking (`=`)** for combinational logic
- Never mix blocking and non-blocking in the same always block

```verilog
// WRONG - causes race condition
always @(posedge clk) begin
    b = a;      // blocking
    c = b;      // c gets value of a (immediate)
end

// CORRECT - proper sequential behavior
always @(posedge clk) begin
    b <= a;     // non-blocking
    c <= b;     // c gets OLD value of b
end
```

**Why it matters:** Blocking assignments in sequential logic can create unintended combinational paths during synthesis, leading to simulation/synthesis mismatch.

**Cliff Cummings' Golden Guidelines** (from "Nonblocking Assignments in Verilog Synthesis, Coding Styles That Kill!"):

1. **Guideline #1:** When modeling sequential logic, use **non-blocking** assignments
2. **Guideline #2:** When modeling latches, use **non-blocking** assignments
3. **Guideline #3:** When modeling combinational logic with an always block, use **blocking** assignments
4. **Guideline #4:** When modeling both sequential and combinational logic in the same always block, use **non-blocking** assignments
5. **Guideline #5:** Do **not mix** blocking and non-blocking in the same always block
6. **Guideline #6:** Do not make assignments to the same variable from more than one always block

Following these guidelines eliminates 90-100% of the most common Verilog race conditions.

**Verilog Stratified Event Queue:**

Understanding *why* blocking and non-blocking behave differently requires understanding Verilog's simulation event queue:

```
┌─────────────────────────────────────────────────────────┐
│              Stratified Event Queue                      │
├─────────────────────────────────────────────────────────┤
│ 1. Active Events (current time)                          │
│    - Blocking assignments (=)                            │
│    - Continuous assignments                              │
│    - RHS evaluation of non-blocking                      │
├─────────────────────────────────────────────────────────┤
│ 2. Inactive Events                                       │
│    - #0 blocking assignments                             │
├─────────────────────────────────────────────────────────┤
│ 3. NBA (Non-Blocking Assignment) Events                  │
│    - LHS updates of non-blocking (<=)                    │
├─────────────────────────────────────────────────────────┤
│ 4. Monitor Events                                        │
│    - $monitor, $strobe                                   │
├─────────────────────────────────────────────────────────┤
│ 5. Future Events                                         │
│    - Events scheduled for later time                     │
└─────────────────────────────────────────────────────────┘
```

**Key Insight:** Non-blocking assignments evaluate RHS in Active region but update LHS in NBA region. This separation prevents race conditions in sequential logic.

**Interview Trap - Shift Register with Blocking:**
```verilog
// WRONG: Using blocking in sequential logic
always @(posedge clk) begin
    a = b;  // a updated immediately
    b = c;  // b updated immediately
    c = d;  // All shift in ONE cycle!
end

// CORRECT: Using non-blocking
always @(posedge clk) begin
    a <= b;  // All RHS evaluated first
    b <= c;  // Then all LHS updated
    c <= d;  // Proper shift register behavior
end
```

### **FSM (Finite State Machine) - Three-Stage Coding**

Recommended coding style separating sequential and combinational logic:

```verilog
// Stage 1: State register (sequential)
always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        current_state <= IDLE;
    else
        current_state <= next_state;
end

// Stage 2: Next state logic (combinational)
always @(*) begin
    case (current_state)
        IDLE:    next_state = start ? RUN : IDLE;
        RUN:     next_state = done  ? IDLE : RUN;
        default: next_state = IDLE;
    endcase
end

// Stage 3: Output logic (can be sequential or combinational)
always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        output_reg <= 1'b0;
    else
        output_reg <= (next_state == RUN);  // Moore: based on state
end
```

**FSM Types:**

Finite state machines are classified by how their outputs are generated. Moore machines produce outputs based solely on the current state, resulting in glitch-free registered outputs but potentially requiring more states. Mealy machines generate outputs based on both current state and inputs, enabling faster response with fewer states but potentially introducing glitches on output transitions.

| Aspect | Moore Machine | Mealy Machine |
|--------|---------------|---------------|
| **Output depends on** | Current state only | Current state + inputs |
| **Output timing** | Changes after state transition | Changes immediately with input |
| **Latency** | 1 cycle delay | No delay (combinational) |
| **Glitches** | Glitch-free outputs | Prone to glitches |
| **States required** | More states | Fewer states |
| **Use case** | Clean outputs, safety-critical | Fast response, area-constrained |

```verilog
// Moore: output registered, depends on state only
always @(posedge clk) begin
    case (state)
        IDLE: out <= 1'b0;
        RUN:  out <= 1'b1;
    endcase
end

// Mealy: output combinational, depends on state + input
always @(*) begin
    case (state)
        IDLE: out = start ? 1'b1 : 1'b0;
        RUN:  out = done ? 1'b0 : 1'b1;
    endcase
end
```

**Coding Tips:**
- Use `localparam` or `parameter` for state encoding
- Prefer **one-hot encoding** for high-speed designs (faster decode, more FFs)
- Prefer **binary encoding** for area-constrained designs (fewer FFs)
- Prefer **Gray code encoding** for sequential state machines (minimal switching)
- Always include `default` case to avoid latches

**State Encoding Comparison:**

| Encoding | Flip-Flops (N states) | Decode Logic | Best For |
|----------|----------------------|--------------|----------|
| **Binary** | ⌈log₂N⌉ | Complex (N-bit comparison) | ASIC, area-constrained |
| **One-Hot** | N | Simple (single bit check) | FPGA, high-speed |
| **Gray** | ⌈log₂N⌉ | Moderate | Sequential cycling, low power |

**FPGA vs ASIC Trade-off:**
- **FPGA**: Flip-flops are abundant (in CLBs); combinational logic is expensive (consumes LUTs). One-hot is typically faster and often uses fewer resources overall.
- **ASIC**: Flip-flops require ~25 transistors each plus clock distribution; 2-input gates need ~4 transistors. Binary encoding usually wins on area.

**Synthesis Tool Behavior:** Modern tools (Vivado, DC) often re-encode FSMs automatically. Vivado defaults to one-hot for FSMs with ≤32 states. To preserve your encoding, use synthesis attributes like `(* fsm_encoding = "one_hot" *)` or `(* fsm_encoding = "sequential" *)`.

### **SystemVerilog Assertions (SVA)**

SystemVerilog Assertions（SVA）是強大的驗證功能，允許設計師直接在 RTL 或 testbench 中嵌入檢查。Assertion 可透過 simulation 動態驗證，或透過 formal verification 工具靜態驗證。

**Two Types of Assertions:**

| Type | Syntax | Evaluation | Use Case |
|------|--------|------------|----------|
| **Immediate** | `assert (expression)` | Procedural, instant | Simple checks, procedural code |
| **Concurrent** | `assert property (...)` | Clock-based, temporal | Protocol checking, multi-cycle behavior |

**Immediate Assertions:**

Immediate assertions execute like procedural statements and check a condition at the current simulation time.

```systemverilog
// Immediate assertion in procedural block
always @(posedge clk) begin
    assert (data_valid |-> data != 0)
        else $error("Valid data cannot be zero!");
end

// Immediate assertion with action blocks
always_comb begin
    assert (state != ILLEGAL)
        else $fatal(1, "FSM entered illegal state!");
end

// Simple form (like if statement)
assert (fifo_count <= FIFO_DEPTH);
```

**Concurrent Assertions:**

Concurrent assertions are clock-based and can express temporal relationships spanning multiple cycles.

```systemverilog
// Basic concurrent assertion
property p_req_ack;
    @(posedge clk) disable iff (!rst_n)
    req |-> ##[1:3] ack;  // ack within 1-3 cycles after req
endproperty
assert property (p_req_ack);

// Assertion with implication
property p_valid_data;
    @(posedge clk)
    valid |-> !$isunknown(data);  // No X/Z when valid
endproperty
assert property (p_valid_data);
```

**Implication Operators:**

| Operator | Name | Meaning |
|----------|------|---------|
| `\|->` | Overlapping | If antecedent true, check consequent same cycle |
| `\|=>` | Non-overlapping | If antecedent true, check consequent next cycle |

```systemverilog
// Overlapping: check starts same cycle
req |-> gnt;           // When req=1, gnt must be 1 (same cycle)

// Non-overlapping: check starts next cycle
req |=> gnt;           // When req=1, gnt must be 1 (next cycle)
// Equivalent to:
req |-> ##1 gnt;
```

**Sequence Operators:**

```systemverilog
// ##N: delay by N cycles
a ##2 b;               // a, then 2 cycles later, b

// ##[min:max]: delay range
a ##[1:3] b;           // b occurs 1-3 cycles after a

// [*N]: repetition
a ##1 b[*3] ##1 c;     // a, then b for 3 consecutive cycles, then c

// [*min:max]: repetition range
a[*2:4];               // a repeats 2-4 times

// [->N]: goto repetition (non-consecutive)
start ##1 data[->3] ##1 done;  // 3 data cycles (not necessarily consecutive)
```

**Common SVA Patterns:**

```systemverilog
// Request-acknowledge handshake
property p_handshake;
    @(posedge clk) disable iff (!rst_n)
    req && !ack |-> ##[1:$] ack;  // Eventually get ack
endproperty

// FIFO never overflows
property p_no_overflow;
    @(posedge clk)
    (wr_en && full) |-> 0;  // Never write when full
endproperty

// Data stability during valid
property p_data_stable;
    @(posedge clk)
    (valid && !ready) |=> $stable(data);  // Hold data until accepted
endproperty

// One-hot encoding check
property p_onehot;
    @(posedge clk)
    $onehot(state);  // Exactly one bit set
endproperty
```

**Built-in Functions:**

| Function | Description |
|----------|-------------|
| `$rose(signal)` | True if signal transitioned 0→1 |
| `$fell(signal)` | True if signal transitioned 1→0 |
| `$stable(signal)` | True if signal unchanged |
| `$past(signal, N)` | Value of signal N cycles ago |
| `$onehot(vector)` | True if exactly one bit is set |
| `$onehot0(vector)` | True if zero or one bit is set |
| `$isunknown(signal)` | True if signal contains X or Z |

**Cover Property:**

Besides checking violations, assertions can measure coverage:

```systemverilog
// Cover: check that scenario occurs
cover property (@(posedge clk)
    req ##[1:5] gnt ##1 done
);  // Verify this sequence happens in simulation

// Covergroup for functional coverage
covergroup cg_fifo @(posedge clk);
    cp_level: coverpoint fifo_count {
        bins empty = {0};
        bins low   = {[1:3]};
        bins mid   = {[4:12]};
        bins high  = {[13:15]};
        bins full  = {16};
    }
endgroup
```

**Assume Property (Formal Verification):**

```systemverilog
// Assume: constrain inputs (for formal tools)
assume property (@(posedge clk)
    $onehot0(sel)  // Assume select is one-hot or zero
);

// Difference from assert:
// assert: Check that design satisfies property
// assume: Tell formal tool to assume input satisfies property
```

**Binding Assertions to Design:**

```systemverilog
// Bind assertions to module without modifying RTL
module fifo_assertions (
    input clk, rst_n, wr_en, rd_en, full, empty
);
    property p_no_write_when_full;
        @(posedge clk) disable iff (!rst_n)
        full |-> !wr_en;
    endproperty
    assert property (p_no_write_when_full);
endmodule

// Bind to DUT
bind fifo fifo_assertions u_fifo_asserts (.*);
```

**Assertion Severity Levels:**

```systemverilog
assert property (...) else $info("Info message");
assert property (...) else $warning("Warning message");
assert property (...) else $error("Error message");
assert property (...) else $fatal(1, "Fatal error!");
```

---

## 組合邏輯

### **Full adder**

A full adder is the fundamental building block for arithmetic circuits, adding three single-bit inputs (two operands and a carry-in) to produce a sum and carry-out. Multiple full adders can be cascaded to create ripple-carry adders for multi-bit addition, though more advanced architectures like carry-lookahead or carry-select adders are used for higher performance.

| a | b | Cin | Sum | Cout |
|:---:|:---:|:---:|:---:|:----:|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

```
Sum = a XOR b XOR Cin
Cout = ab + aCin + bCin
     = (a·b) + Cin·(a XOR b)
```

![Full adder](https://i.imgur.com/k9lPhQQ.png)

### **Ripple Carry Adder (RCA) vs Carry Look-ahead Adder (CLA)**

When building multi-bit adders, the choice between RCA and CLA represents a fundamental area-speed trade-off.

| Aspect | Ripple Carry Adder (RCA) | Carry Look-ahead Adder (CLA) |
|--------|--------------------------|------------------------------|
| **Delay** | O(N) - linear with bit width | O(log N) - logarithmic |
| **Area** | Smaller, N full adders | Larger, extra logic for G/P |
| **Complexity** | Simple cascade | Complex carry computation |
| **Use Case** | Low-speed, area-critical | High-speed arithmetic |

**RCA Problem:** Carry must ripple through all stages sequentially. For N-bit adder, worst-case delay = N × (carry propagation delay).

**CLA Solution:** Pre-compute carries in parallel using Generate (G) and Propagate (P) functions:

```
Generate: Gi = Ai · Bi      (bit position i generates carry)
Propagate: Pi = Ai ⊕ Bi     (bit position i propagates carry)

Carry equations:
C1 = G0 + P0·C0
C2 = G1 + P1·G0 + P1·P0·C0
C3 = G2 + P2·G1 + P2·P1·G0 + P2·P1·P0·C0
...
```

**Hybrid Architectures:** For 64-bit adders, pure CLA becomes impractical. Common solutions:
- **Carry-Select Adder**: Compute both (Cin=0, Cin=1) in parallel, select result
- **Carry-Skip Adder**: Skip carry through blocks where all Pi=1
- **Kogge-Stone Adder**: Parallel-prefix network, O(log N) delay, high area
- **Brent-Kung Adder**: Reduced area variant of Kogge-Stone

**Interview Question:** "For a 64-bit adder, which architecture would you choose?"
**Answer:** Hybrid approach - hierarchical CLA (4-bit CLA blocks with second-level lookahead) or Kogge-Stone for maximum speed with acceptable area overhead.

## 設計流程

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONT-END DESIGN                               │
├─────────────────────────────────────────────────────────────────────────┤
│ Specification → Detailed Design → HDL Coding → Pre-Simulation →         │
│ Logic Synthesis → STA → Formal Verification                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                           BACK-END DESIGN                                │
├─────────────────────────────────────────────────────────────────────────┤
│ DFT → Floorplanning → Placement → CTS → Routing → Physical Verification │
│ → Tape-out                                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### **Front-End Design**

| Stage | Description | Key Tools |
|-------|-------------|-----------|
| **Specification** | Define customer requirements and architecture | Documentation |
| **Detailed Design** | Module planning, interface definition | Documentation |
| **HDL Coding** | Write RTL-level Verilog/VHDL | VS Code, Vim, Quartus, Vivado |
| **Pre-Simulation** | Functional verification against spec | VCS, ModelSim, NC-Verilog, Xcelium |
| **Logic Synthesis** | Convert RTL to gate-level netlist | Design Compiler, Synplify, Genus |
| **STA** | Verify timing constraints | PrimeTime, Tempus |
| **Formal Verification** | Prove RTL ≡ Netlist equivalence | Formality, Conformal |

**Logic Synthesis**: Translates HDL code into a gate-level netlist. The synthesizer maps RTL constructs to standard cells from the technology library.

### **Back-End Design**

| Stage | Description | Key Tools |
|-------|-------------|-----------|
| **DFT (Design For Test)** | Insert scan chains for testability | DFT Compiler, Tessent |
| **Floorplanning** | Define block placement, power grid, I/O | ICC2, Innovus |
| **Placement** | Place standard cells optimally | ICC2, Innovus |
| **CTS (Clock Tree Synthesis)** | Build symmetric clock distribution | ICC2, Innovus |
| **Routing** | Connect all signals with metal layers | ICC2, Innovus |
| **Physical Verification** | DRC, LVS, ERC checks | Calibre, ICV |
| **Tape-out** | Generate GDSII for fabrication | — |

**CTS Purpose**: Create a balanced clock distribution network to minimize clock skew across all flip-flops.

**DFT Purpose**: Make the design testable after fabrication by inserting scan chains, BIST, and boundary scan logic.

### **ASIC vs FPGA Comparison**

ASICs (Application-Specific Integrated Circuits) and FPGAs (Field-Programmable Gate Arrays) represent different trade-offs in digital design. ASICs offer maximum performance and lowest unit cost at high volumes but require expensive mask fabrication and cannot be modified after manufacturing. FPGAs provide flexibility and rapid prototyping but sacrifice performance and power efficiency due to programmable routing overhead. The choice depends on volume, time-to-market, and whether the design may need future updates.

| Aspect | ASIC | FPGA |
|--------|------|------|
| **Reconfigurability** | Fixed after fabrication | Reprogrammable |
| **NRE Cost** | High (millions USD for masks) | Low (development tools) |
| **Unit Cost** | Low at high volume | Higher per unit |
| **Time-to-market** | Months (fabrication) | Days/weeks |
| **Performance** | Highest (custom optimization) | Lower (routing overhead) |
| **Power Efficiency** | Best | Higher power consumption |
| **Application** | Mass production, high performance | Prototyping, low volume, flexibility |

---

## FPGA

### **FPGA vs CPLD**

| Aspect | FPGA | CPLD |
|--------|------|------|
| **Architecture** | LUT-based (Look-Up Tables) | Product-term based (AND-OR arrays) |
| **Granularity** | Fine-grained (many small logic blocks) | Coarse-grained (fewer large blocks) |
| **Density** | High (100K+ logic elements) | Low (up to ~10K gates) |
| **Storage** | SRAM-based (volatile) | EEPROM/Flash (non-volatile) |
| **Power-on** | Requires configuration loading | Instant-on operation |
| **Timing** | Variable (routing-dependent) | Predictable (fixed interconnect) |
| **Best for** | Complex algorithms, DSP, high-speed | Control logic, glue logic, state machines |
| **Power** | Higher (SRAM leakage) | Lower |
| **Cost** | Higher | Lower |

**When to use FPGA:**

FPGAs excel in applications requiring high logic density, complex algorithms, or frequent design updates. Their LUT-based architecture efficiently implements any combinational function, while abundant registers and embedded blocks support sophisticated designs.

- Complex digital signal processing
- High-speed interfaces (PCIe, DDR)
- Prototyping ASIC designs
- Applications requiring embedded processors

**When to use CPLD:**

CPLDs are ideal for simpler applications where deterministic timing and instant-on operation are critical. Their non-volatile storage means the design is ready immediately after power-up without configuration loading.

- Simple control logic
- Boot sequencing
- Level shifting / voltage translation
- Applications requiring instant power-on

### **FPGA Architecture**

Modern FPGAs are organized as a sea of configurable logic blocks surrounded by programmable I/O and interconnected by a hierarchical routing network. This architecture enables implementation of virtually any digital circuit by programming the logic functions, memory contents, and routing connections. The key to understanding FPGA capabilities is knowing how each component type contributes to the overall design.

| Component | Description |
|-----------|-------------|
| **IOB (I/O Block)** | Programmable I/O units for various electrical standards |
| **CLB (Configurable Logic Block)** | Basic logic unit = LUT + Register |
| **Clock Resources** | PLLs, global/regional clock trees |
| **Routing Resources** | Interconnect for signal routing |
| **Block RAM** | Embedded memory blocks |
| **Hard IP** | DSP blocks, SerDes, embedded processors |

#### **CLB (Configurable Logic Block)**

The Configurable Logic Block is the fundamental computational element in an FPGA. Each CLB can implement arbitrary combinational logic through its Look-Up Tables (LUTs) and sequential logic through its flip-flops. The combination of programmable logic and storage in a single block enables efficient implementation of both datapath and control logic.

Each CLB contains:
- **LUT (Look-Up Table)**: Implements combinational logic (typically 4-6 inputs)
- **Flip-flops/Registers**: Configurable as D, T, JK, or SR types
- **Carry chain**: Fast arithmetic operations
- **MUX**: Output selection

**How LUT Works:**
- A 4-input LUT stores 2⁴ = 16 bits in SRAM
- Any 4-input Boolean function can be implemented
- Larger functions use multiple LUTs with routing

**LUT Example (2-input AND gate: Y = A·B):**
```
Inputs address SRAM locations; stored value is the output.

Address (BA) | SRAM Content | Output Y
-------------|--------------|----------
    00       |      0       |    0
    01       |      0       |    0
    10       |      0       |    0
    11       |      1       |    1

The LUT is programmed with: 0001 (binary) = truth table of AND
```

**Why LUTs are powerful:** Same hardware implements ANY 4-input function by changing SRAM contents. XOR, MUX, comparator - all use identical LUT structure.

#### **I/O Block (IOB)**

I/O Blocks provide the interface between the FPGA's internal logic and the external world. Each IOB can be configured to support various voltage levels and signaling standards, enabling direct connection to diverse external devices without level-shifting circuitry. The registered I/O paths improve timing by placing flip-flops at the chip boundary.

Each I/O element contains:
- Input register
- Output register
- Output enable register
- Programmable pull-up/pull-down
- Configurable for: LVDS, LVCMOS, SSTL, HSTL, etc.

#### **Routing Resources**

The programmable interconnect consumes the majority of FPGA silicon area and significantly impacts timing. Routing is organized hierarchically: fast local connections for adjacent blocks, longer segmented lines for medium distances, and dedicated global networks for clocks and resets. The routing architecture determines how efficiently logic can be interconnected and often limits achievable clock frequencies.

| Type | Description |
|------|-------------|
| **Global routing** | Dedicated lines for clock and reset signals |
| **Long lines** | Inter-bank signal routing |
| **Short lines** | Adjacent logic unit connections |
| **Row connections (R4, R24)** | Horizontal routing within rows |
| **Column connections (C4, C16)** | Vertical routing within columns |

#### **Clock Resources**

Clock distribution is critical for FPGA performance and reliability. FPGAs provide dedicated low-skew clock networks separate from general routing to ensure all flip-flops see clock edges within tight timing bounds. Multiple clock network levels allow designers to balance between global reach (all logic) and local performance (specific regions).

| Level | Description |
|-------|-------------|
| **Global clock** | Dedicated CLK pins → global clock tree → all FFs |
| **Regional clock** | BUFR buffers for clock regions |
| **I/O clock** | Local clocks for SerDes/DDR interfaces |

**PLL (Phase-Locked Loop):**

PLLs are essential clock management resources that manipulate input clock signals to generate precisely controlled output clocks. They use feedback loops to lock onto an input reference and can synthesize multiple derived clocks from a single input.

- Frequency multiplication/division
- Phase shifting
- Duty cycle correction
- Clock deskewing

#### **Embedded Memory (Block RAM)**

Block RAMs are dedicated memory resources embedded throughout the FPGA fabric. Unlike distributed RAM (implemented in LUTs), Block RAMs provide larger, more power-efficient storage with dedicated read/write ports. They can be configured in various widths and depths to match application requirements, from narrow deep FIFOs to wide shallow register files.

| Mode | Description |
|------|-------------|
| **Single-port RAM** | One read/write port |
| **Simple dual-port** | One read port, one write port |
| **True dual-port** | Two independent read/write ports |
| **ROM** | Read-only with initialized data |
| **FIFO** | First-in-first-out buffer |
| **Shift register** | Serial data storage |

### **FPGA Configuration Modes**

FPGA configuration data must be loaded on every power-up (volatile SRAM-based).

#### **JTAG Configuration**

JTAG (IEEE 1149.1) is a standard interface originally designed for board-level testing but widely used for FPGA configuration and debugging. It provides direct access to the configuration memory through a simple 4-wire interface, making it ideal for development environments where rapid iteration is more important than configuration speed.

| Signal | Direction | Description |
|--------|-----------|-------------|
| **TDI** | Input | Test Data In |
| **TDO** | Output | Test Data Out |
| **TMS** | Input | Test Mode Select |
| **TCK** | Input | Test Clock |
| **TRST** | Input | Test Reset (optional, tie to GND if unused) |

**Use case:** Development, debugging, boundary scan testing.

#### **Master Mode**

FPGA controls the configuration process and provides clock to external memory.

| Mode | Description | Speed |
|------|-------------|-------|
| **Master Serial (AS)** | FPGA reads bit-by-bit from serial flash | Slower |
| **Master Parallel** | FPGA reads 8+ bits per cycle from parallel flash | Faster |

#### **Slave Mode**

External processor/controller manages configuration.

| Mode | Description | Use Case |
|------|-------------|----------|
| **Slave Parallel** | Processor writes 8-bit data | Processor-controlled boot |
| **Slave Serial** | Processor sends serial bitstream | Pin-constrained designs |

#### **Multi-Chip Cascade**

Multiple FPGAs share single configuration memory:
- First FPGA in **Master** mode
- Subsequent FPGAs in **Slave** mode
- Daisy-chain connection via configuration pins
- Reduces memory chip count

**Mode Selection:**
- Typically 3 MSEL pins determine configuration mode
- Set before power-up or during reset

---

## 合成

### **Technology library**

Technology library（.lib/.db 檔案）包含 standard cell 的 timing、power 和面積特性資料。由於 transistor 行為會隨製程、供應電壓和操作溫度而變化，cell 需在多個 PVT（Process、Voltage、Temperature）corner 下進行特性化。針對不同分析情境使用適當的 library，可確保設計在所有操作條件下正常運作。

| Library | Process | Voltage | Temperature | Use Case |
|---------|---------|---------|-------------|----------|
| **fast.db** | Fast | High | Low | Hold time analysis (best case) |
| **slow.db** | Slow | Low | High | Setup time analysis (worst case) |
| **typical.db** | Typical | Nominal | Nominal | Functional verification |

### **Liberty File Format (.lib)**

Liberty format 是由 Synopsys 開發的業界標準 ASCII 格式，描述 standard cell 的特性化 timing、power 和 noise 資料。它對 synthesis 和 place-and-route 工具都是必要的。

**What Liberty Files Contain:**

| Category | Information |
|----------|-------------|
| **Cell Information** | Area, function, pin definitions |
| **Timing Data** | Delay, transition time, setup/hold, recovery/removal |
| **Power Data** | Dynamic power, leakage power, internal power |
| **Noise Data** | Output noise, noise immunity |
| **Operating Conditions** | Process, voltage, temperature (PVT) corners |

**Multiple Liberty Files per Library:**

It is common to have multiple liberty files for the same cell library—one for each PVT corner:

| Library | Process | Voltage | Temperature | Use Case |
|---------|---------|---------|-------------|----------|
| **ss_0p9v_125c.lib** | Slow | 0.9V | 125°C | Setup analysis (worst) |
| **ff_1p1v_m40c.lib** | Fast | 1.1V | -40°C | Hold analysis (best) |
| **tt_1p0v_25c.lib** | Typical | 1.0V | 25°C | Nominal analysis |

**Delay Models: NLDM vs CCS**

| Model | Description | Accuracy | Runtime |
|-------|-------------|----------|---------|
| **NLDM** | Non-Linear Delay Model (voltage source) | Good | Fast |
| **CCS** | Composite Current Source model | Higher | Slower |

CCS models current waveforms more accurately than NLDM voltage-based models, which is critical for advanced nodes where waveform effects significantly impact timing.

**Liberty File Structure:**

```
library (my_lib) {
  /* Library attributes */
  delay_model : table_lookup;
  time_unit : "1ns";
  voltage_unit : "1V";
  current_unit : "1mA";
  capacitive_load_unit (1, pf);

  /* Operating conditions */
  operating_conditions (slow) {
    process : 1.0;
    voltage : 0.9;
    temperature : 125;
  }

  /* Cell definition */
  cell (INV_X1) {
    area : 1.2;
    cell_leakage_power : 0.05;

    pin (A) {
      direction : input;
      capacitance : 0.002;
    }

    pin (Y) {
      direction : output;
      function : "!A";

      timing () {
        related_pin : "A";
        timing_sense : negative_unate;

        /* 2D lookup table: input_transition x output_load */
        cell_rise (delay_template_7x7) {
          index_1 ("0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.0");  /* slew */
          index_2 ("0.001, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2"); /* load */
          values ( \
            "0.02, 0.03, 0.04, ...", \
            "0.03, 0.04, 0.05, ...", \
            ...
          );
        }
      }
    }
  }
}
```

**Key Timing Measurements:**

```
Delay measurement points (default):
  - Input:  50% of transition
  - Output: 50% of transition

Transition (slew) measurement:
  - Rise: 10% to 90% of VDD
  - Fall: 90% to 10% of VDD
  (Can be 20%-80% or 30%-70% depending on foundry)
```

**Look-Up Table (LUT) Interpolation:**

Cell delay is characterized as a function of input transition time (slew) and output capacitive load:

```
delay = f(input_slew, output_load)

The LUT provides discrete values; tools interpolate for actual conditions:
- If actual values fall within table range: interpolation
- If actual values exceed table range: extrapolation (less accurate)
```

**Timing Arcs:**

| Arc Type | Description |
|----------|-------------|
| **Combinational** | Input-to-output delay through logic cell |
| **Sequential Setup** | Setup time check at clock edge |
| **Sequential Hold** | Hold time check at clock edge |
| **Recovery** | Async signal release to clock edge |
| **Removal** | Clock edge to async signal assertion |

### **Undefined interconnect**
Can be solved by wire load model

### **Delay Models**

Delay models represent how signal propagation time is calculated during timing analysis. The choice of model affects both accuracy and runtime. Early in the design flow, simpler models provide quick feedback; as the design matures and layout information becomes available, more accurate models ensure reliable timing closure.

| Model | Description | Accuracy | Use Case |
|-------|-------------|----------|----------|
| **Lumped** | Single delay value per gate | Low | Quick estimation |
| **Distributed** | Per-gate delay based on fanout/load | Medium | Early synthesis |
| **Module-path** | Specify block delays (SDF) | High | Timing-critical designs |

### **SDF File Format**

**SDF (Standard Delay Format)** contains timing information for post-synthesis/post-layout simulation.

**Delay Format:** `(min:typ:max)`

| Value | Description | Use Case |
|-------|-------------|----------|
| **min** | Best-case delay (fast corner) | Hold time analysis |
| **typ** | Typical delay (nominal corner) | Functional verification |
| **max** | Worst-case delay (slow corner) | Setup time analysis |

**SDF File Contents:**

```
(DELAYFILE
  (SDFVERSION "3.0")
  (DESIGN "my_design")
  (INSTANCE top)
  (CELL
    (CELLTYPE "AND2")
    (INSTANCE U1)
    (DELAY
      (ABSOLUTE
        (IOPATH A Y (0.1:0.2:0.3) (0.1:0.2:0.3))  // rise:fall
        (IOPATH B Y (0.1:0.2:0.3) (0.1:0.2:0.3))
      )
    )
  )
  (INTERCONNECT net1 net2 (0.05:0.1:0.15))  // wire delay
)
```

**Key SDF Constructs:**

| Construct | Description |
|-----------|-------------|
| **IOPATH** | Cell input-to-output delay |
| **INTERCONNECT** | Wire/net delay between cells |
| **SETUPHOLD** | Setup and hold timing checks |
| **PERIOD** | Clock period constraint |
| **WIDTH** | Minimum pulse width |

**Usage in Simulation:**
```tcl
# Verilog simulation with SDF back-annotation
vcs design.v -sdf max:top:timing.sdf
```

### **SDC Constraints**

**SDC (Synopsys Design Constraints)** is the industry-standard format for specifying timing, power, and area constraints. SDC files guide synthesis and place-and-route tools to meet design specifications.

**Essential Clock Definition:**

```tcl
# Basic clock definition
create_clock -name sys_clk -period 10.0 [get_ports clk]

# Clock with specific waveform (rise at 0, fall at 4ns)
create_clock -name fast_clk -period 8.0 -waveform {0 4} [get_ports clk2]

# Virtual clock (for I/O constraints, no physical port)
create_clock -name virt_clk -period 10.0
```

**Clock Uncertainty:**

```tcl
# Setup and hold uncertainty
set_clock_uncertainty -setup 0.3 [get_clocks sys_clk]
set_clock_uncertainty -hold 0.1 [get_clocks sys_clk]

# Inter-clock uncertainty
set_clock_uncertainty -from [get_clocks clk_a] -to [get_clocks clk_b] 0.5
```

**Common SDC Commands:**

| Command | Purpose | Example |
|---------|---------|---------|
| `create_clock` | Define clock source and period | `create_clock -period 10 [get_ports clk]` |
| `create_generated_clock` | Define derived clocks | `create_generated_clock -divide_by 2 -source clk` |
| `set_input_delay` | Constrain input arrival time | `set_input_delay -clock clk 3.0 [get_ports din]` |
| `set_output_delay` | Constrain output required time | `set_output_delay -clock clk 2.5 [get_ports dout]` |
| `set_false_path` | Mark path as don't-time | `set_false_path -from clkA -to clkB` |
| `set_multicycle_path` | Allow multiple cycles | `set_multicycle_path 2 -setup -from [get_pins */Q]` |
| `set_max_delay` | Constrain combinational path | `set_max_delay 5.0 -from A -to B` |

**Generated Clock Example:**

```tcl
# Divide-by-2 clock
create_generated_clock -name clk_div2 \
    -source [get_ports clk] \
    -divide_by 2 \
    [get_pins div_reg/Q]

# PLL output clock
create_generated_clock -name pll_clk \
    -source [get_pins pll/CLKIN] \
    -multiply_by 3 -divide_by 2 \
    [get_pins pll/CLKOUT]
```

**CDC Constraints:**

```tcl
# Mark asynchronous clock domains as false paths
set_false_path -from [get_clocks clk_a] -to [get_clocks clk_b]
set_false_path -from [get_clocks clk_b] -to [get_clocks clk_a]

# Or use clock groups for bidirectional exclusion
set_clock_groups -asynchronous \
    -group [get_clocks clk_a] \
    -group [get_clocks clk_b]
```

### **Clock gating**
Clock signal arrives only when data is to be switched
→ Reduce dynamic power dissipation (up to 30-50% power savings)

**Power Equation:**
```
P_dynamic = α × C_L × V_DD² × f
```

Clock gating reduces switching activity (α) by disabling clock to inactive registers.

![Clock gated](https://i.imgur.com/oazpEi2.png)

**Implementation Methods:**
1. **AND gate**: Simple but prone to glitches
2. **Integrated Clock Gating (ICG) cell**: Latch-based, glitch-free (preferred)

CG with AND gate may have glitch due to unstable enable signal
→ **Glitch prevention**: Enable generated by <span style="color:red">latch with negative clk</span>
![Glitch prevention](https://i.imgur.com/WfrnP41.png)

**Types of Clock Gating:**

Clock gating can be inserted explicitly by the designer or automatically by the synthesis tool. Automatic clock gating typically achieves 20-40% power savings with minimal area overhead.

- **RTL-based (Intent-based)**: Designer explicitly codes clock gating
- **Tool-generated**: Synthesis tool identifies flip-flops sharing same control logic

### **Cross Boundary Optimization**

Cross boundary optimization allows synthesis tools to optimize logic across hierarchical module boundaries.

| Aspect | Enabled | Disabled |
|--------|---------|----------|
| **Optimization** | Better QoR (timing, area) | Limited to module scope |
| **Hierarchy** | Flattened/modified | Preserved exactly |
| **Debug** | Harder (structure changed) | Easier (structure intact) |
| **ECO** | More difficult | Easier |
| **Runtime** | Longer | Shorter |

**When to Enable:**
- Performance-critical designs
- Area-constrained designs
- Final tape-out synthesis

**When to Disable:**
- Early design exploration
- IP blocks (preserve interface)
- Debug-friendly netlists
- Hierarchical ECO requirements

```tcl
# Design Compiler commands
set_boundary_optimization [get_designs block_A] true   # enable
set_boundary_optimization [get_designs block_B] false  # disable
compile_ultra -no_boundary_optimization                 # global disable
```

**Common Optimizations:**
- Constant propagation across boundaries
- Redundant logic removal
- Buffer/inverter pushing
- Logic restructuring at interfaces

## 靜態時序分析 (STA)

### **DTA v.s. STA**

| Aspect | DTA (Dynamic) | STA (Static) |
|--------|---------------|--------------|
| **Method** | Simulation with test vectors + SDF | Traverses all timing paths |
| **Input required** | Test vectors/stimuli | Constraints only |
| **Coverage** | Depends on test quality | All paths analyzed |
| **Speed** | Very slow | Fast |
| **Memory** | High | Low |
| **Circuit type** | Any (sync/async) | Synchronous only |
| **Tools** | VCS, ModelSim, NC-Verilog | PrimeTime, Tempus |

**STA Advantages:**

Static timing analysis mathematically computes all possible timing paths without requiring simulation vectors. This makes it both exhaustive and efficient, catching timing violations that might be missed by simulation.

- No input stimuli required
- Finds nearly all critical paths
- Fast execution, low memory usage
- Exhaustive path analysis

**STA Disadvantages:**

STA's static nature means it cannot handle asynchronous logic or verify functional correctness. Designers must carefully specify exceptions for paths that don't follow normal timing rules.

- Synchronous circuits only
- Cannot verify functionality
- Tricky constraints for special cases:
  - False paths
  - Multicycle paths
  - Multiple clock domains

**DTA Advantages:**

Dynamic timing analysis simulates actual circuit behavior with real delays, making it suitable for verifying asynchronous logic and confirming that functionality is preserved under timing constraints.

- Works for any circuit type (including asynchronous)
- Verifies both timing and functionality

**DTA Disadvantages:**

The simulation-based approach means DTA is only as good as its test vectors. Achieving full path coverage is practically impossible, and runtime grows significantly with design complexity.

- Critical paths may be missed (depends on vectors)
- Very slow simulation
- High memory and compute requirements

### **Pre-simulation vs Post-simulation**

Digital designs undergo simulation at multiple stages, with each stage revealing different types of issues. Pre-simulation (RTL) verifies logical correctness quickly, while post-simulation (gate-level with SDF) confirms the design meets timing requirements with actual delays. Both are essential: pre-simulation catches functional bugs early, post-simulation catches timing-related failures.

| Aspect | Pre-simulation | Post-simulation |
|--------|----------------|-----------------|
| **Stage** | Before synthesis | After synthesis/P&R |
| **Netlist** | RTL (behavioral) | Gate-level |
| **Timing** | Ideal (unit delay or no delay) | Real delays from SDF |
| **Purpose** | Functional verification | Timing verification |
| **Speed** | Fast | Slow |
| **Accuracy** | Logic only | Includes timing effects |

**Post-synthesis simulation:** Uses gate-level netlist + SDF (Standard Delay Format) for timing annotation.

**Post-layout simulation:** Most accurate, includes actual routing delays and parasitics.

### **Types of timing path**

STA analyzes timing along all possible signal paths in the design. Understanding path types helps in setting appropriate constraints and interpreting timing reports. Each path type has different characteristics and constraint requirements.

* reg (clk) → reg (D) : Register to Register (most common, constrained by clock period)
* reg (clk) → OUTPUT : Register to Output (constrained by output delay)
* INPUT → reg (D) : Input to Register (constrained by input delay)
* INPUT (clk) → OUTPUT : Input to Output (combinational path, constrained by max delay)

### **Type of STA**

Two fundamental approaches exist for propagating delays through a design. Path-based analysis tracks each unique path separately for maximum accuracy, while block-based analysis uses arrival time windows at each node for computational efficiency. Most commercial tools use block-based STA with path enumeration only for critical paths.

*  Path-based STA
    - Real situation, considers actual delay of each path
    - Complex computation
    - More accurate
*  Block-based STA
    - Only considers best/worst case of each node
    - More pessimistic
    - Faster computation

### **Setup & Hold check**

Setup and hold are the fundamental timing constraints for flip-flops. Setup time defines how early data must arrive before the clock edge, while hold time defines how long data must remain stable after the clock edge. Violating either causes the flip-flop to potentially enter a metastable state, producing unpredictable outputs.

* `Setup` (Max delay) - Data must be stable **before** clock edge

```
Arrival Time (AT) = T0 + Tclk_latency + Tcq + Tpd
Required Time (RT) = T0 + Tclk_latency - Tskew + Tcycle - Tsetup
Slack = RT - AT  (positive = timing met)
```

![Setup](https://i.imgur.com/MNbkt4s.png)

* `Hold` (Min delay) - Data must be stable **after** clock edge

```
Arrival Time (AT) = T0 + Tclk_latency + Tcq + Tpd
Required Time (RT) = T0 + Tclk_latency + Tskew + Thold
Slack = AT - RT  (positive = timing met)
```

![Hold](https://i.imgur.com/ZJxtQoR.png)

**Why Slack Formulas Differ:**
- **Setup**: Data must arrive BEFORE required time → Slack = RT - AT (positive means early enough)
- **Hold**: Data must stay AFTER required time → Slack = AT - RT (positive means held long enough)

**Practical Timing Example:**
```
Given: Tcycle = 10 ns, Tsetup = 0.5 ns, Thold = 0.3 ns
       Tcq = 0.4 ns, Tpd = 3.0 ns, Tskew = 0.1 ns

Setup Analysis:
  Data arrives at: 0 + 0.4 + 3.0 = 3.4 ns
  Data required by: 10 - 0.5 = 9.5 ns
  Setup Slack = 9.5 - 3.4 = +6.1 ns ✓ (met)

Hold Analysis:
  Data changes at: 0 + 0.4 + 3.0 = 3.4 ns (next cycle data)
  Data must hold until: 0 + 0.3 = 0.3 ns
  Hold Slack = 3.4 - 0.3 = +3.1 ns ✓ (met)
```

**Key Insight:** Hold time is independent of clock period. Reducing clock frequency fixes setup violations but NOT hold violations.

### **Recovery & Removal Time**

These timing checks apply to **asynchronous control signals** (reset, set, clear) relative to the clock.

| Timing Check | Definition |
|--------------|------------|
| **Recovery Time** | Minimum time between async signal release and next active clock edge |
| **Removal Time** | Minimum time between active clock edge and async signal assertion |

```
Recovery Time Check (similar to setup):
─────────────────────────────────────────────────────
          │←─ Recovery ─→│
          │              │
RST_N: ───┘              │
                    ┌────┴────
CLK:   ─────────────┘

The reset must be released at least Trecovery before clock edge.

Removal Time Check (similar to hold):
─────────────────────────────────────────────────────
               │←─ Removal ─→│
               │             │
CLK:   ────────┐             │
               └─────────────┴────
RST_N: ──────────────────────┘

The reset must remain asserted for at least Tremoval after clock edge.
```

**Why they matter:**
- Violation causes metastability in the flip-flop
- Critical for asynchronous reset with synchronous release design
- STA tools check these automatically

### **Clock Jitter**

Clock jitter is the deviation of clock edges from their ideal positions, caused by noise in clock generation and distribution circuits. Jitter effectively reduces the available timing margin because the actual clock edge may arrive earlier or later than expected. In high-speed designs, jitter can consume a significant portion of the timing budget.

| Type | Description |
|------|-------------|
| **Period Jitter** | Variation in clock period from cycle to cycle |
| **Cycle-to-Cycle Jitter** | Difference between adjacent clock periods |
| **Long-term Jitter** | Accumulated timing error over many cycles |

**Sources of Jitter:**

Multiple noise sources contribute to clock jitter, with power supply noise typically being the dominant factor in on-chip PLLs.

- PLL/DLL noise (phase detector, VCO non-idealities)
- Power supply noise (IR drop, switching noise)
- Thermal noise (random electron motion)
- Crosstalk from adjacent signals

**Impact on Timing:**
```
Setup check: Tjitter reduces available setup margin
Hold check: Tjitter can cause hold violations if edges shift
```

**Jitter in STA:**
- Modeled as clock uncertainty
- Added to setup/hold timing budgets
- Typical values: 50-200 ps for on-chip PLLs

**Reducing Jitter:**

Jitter reduction focuses on minimizing noise sources and providing clean reference signals to clock generation circuits. Power supply noise is often the dominant contributor to PLL jitter.

- Use clean power supplies for PLLs (dedicated LDO regulators)
- Proper decoupling capacitors (multiple values for different frequencies)
- Shield clock signals from noisy traces (guard rings, spacing)
- Use dedicated clock routing resources (global clock networks in FPGAs)

### **OCV (On-Chip Variation)**

On-Chip Variation accounts for the fact that identical cells on the same chip can have different delays due to local manufacturing variations, voltage drops, and temperature gradients. Traditional corner-based analysis assumes all cells see the same conditions, but OCV provides more realistic analysis by applying derating factors to account for within-die variation.

| Factor | Description |
|--------|-------------|
| **Process (P)** | Manufacturing variations across die (doping, oxide thickness) |
| **Voltage (V)** | IR drop, power supply noise |
| **Temperature (T)** | Thermal gradients across chip |

**OCV Derating:**

STA applies OCV derating factors to account for worst-case variations:

```
Launch path: Use slower cells (max delay) × (1 + OCV_late)
Capture path: Use faster cells (min delay) × (1 - OCV_early)
```

**AOCV (Advanced OCV):**
- Location-aware derating
- Cells closer together have less variation
- More accurate than flat OCV

**POCV/SOCV (Parametric/Statistical OCV):**
- Statistical timing analysis
- Uses probability distributions instead of fixed derates (uses delay σ from Monte-Carlo HSPICE)
- Most accurate, reduces pessimism
- Assumes delay follows normal distribution; uses 3σ by default for sign-off

**Technology Node Recommendations:**

| Technology Node | Recommended Variation Method | Rationale |
|----------------|------------------------------|-----------|
| **Above 90nm** | OCV (flat derates) | Sufficient accuracy at older nodes |
| **65nm - 40nm** | AOCV (depth/distance aware) | Depth reduces random variation impact |
| **28nm - 20nm** | AOCV or POCV | Transition zone, POCV gaining adoption |
| **16nm and below** | POCV/SOCV/LVF | Essential for sign-off; significantly reduces pessimism |

**Why Flat OCV is Overly Pessimistic:** Fixed derates assume all cells in a path are simultaneously fast or slow. In reality, random variations tend to cancel out in deep paths—some cells are fast, others slow. AOCV and POCV model this statistical reality.

### **CPPR/CRPR (Clock Path Pessimism Removal)**

當 STA 對 launch 和 capture clock 的相同實體 clock path 套用不同的 derating factor 時，就會產生 clock path pessimism。CPPR（Common Path Pessimism Removal）會自動修正這種人為的 pessimism。

**Why CPPR is Needed:**

In OCV mode, STA applies late derating to the launch clock path and early derating to the capture clock path. However, part of these paths is physically the same—the common clock path from the clock source to where the tree branches.

```
                    Clock Source
                         │
                    ┌────┴────┐
                    │ Common  │ ← Same physical path!
                    │  Path   │    But derated differently:
                    └────┬────┘    - Late for launch (setup)
                         │         - Early for capture (setup)
                    ┌────┴────┐
            ┌───────┘         └───────┐
            │                         │
      Launch FF                 Capture FF
```

**The Pessimism Problem:**

```
Without CPPR:
  Common path delay (late derate):  1.0 ns × 1.2 = 1.20 ns
  Common path delay (early derate): 1.0 ns × 0.8 = 0.80 ns
  Artificial skew added: 1.20 - 0.80 = 0.40 ns pessimism!

With CPPR:
  CPPR adjustment removes 0.40 ns from the skew calculation
  More realistic timing without unnecessary margin
```

**CPPR vs CRPR:**

| Term | Full Name | Cause | Correction |
|------|-----------|-------|------------|
| **CPPR** | Common Path Pessimism Removal | OCV derating on common clock path | Remove delta from common path |
| **CRPR** | Clock Reconvergence Pessimism Removal | Clock paths through different logic that reconverge | Remove unrealistic path combinations |

**CRPR Example (Clock Reconvergence):**

```
        ┌──────┐
CLK ────┤ MUX  ├──── To FF
        │      │
sel ────┤      │
        └──────┘
          │  │
       Path A  Path B
       (short) (long)

If sel=0 always active, but STA considers both paths:
  - Launch through short path
  - Capture through long path
  → Unrealistic pessimism that CRPR removes
```

**Tool Commands:**

```tcl
# PrimeTime
set timing_remove_clock_reconvergence_pessimism true
set timing_crpr_mode same_transition  # or other_transition

# Tempus
set_global timing_cppr true
```

**When CPPR/CRPR Matters:**

| Scenario | Impact |
|----------|--------|
| **Deep clock trees** | More common path → larger adjustment |
| **Tight timing margins** | Small adjustment can mean pass/fail |
| **Multi-corner analysis** | CPPR calculated per-corner |
| **Hold analysis** | Often more critical than setup |

**Practical Impact Example:**

```
Timing Report (without CPPR):
  Data Path Delay:     3.50 ns
  Clock Skew:          0.60 ns (pessimistic)
  Setup Slack:        -0.10 ns (FAIL)

Timing Report (with CPPR):
  Data Path Delay:     3.50 ns
  Clock Skew:          0.20 ns (realistic)
  CPPR Adjustment:     0.40 ns
  Setup Slack:         0.30 ns (PASS)
```

### **Multi-Corner Multi-Mode (MCMM)**

現代 SoC 在各種條件（PVT corner）和不同功能模式下運作。Multi-Corner Multi-Mode（MCMM）分析同時驗證所有相關組合的 timing。

**Why MCMM is Essential:**

As process technology scales below 28nm, timing sensitivity to PVT variations increases dramatically. A design that passes timing at one corner may fail at another. MCMM ensures comprehensive coverage.

**Definitions:**

| Term | Definition | Examples |
|------|------------|----------|
| **Corner** | PVT condition (Process, Voltage, Temperature) | SS/0.9V/125°C, FF/1.1V/-40°C |
| **Mode** | Functional operating mode | Functional, Scan, Low-power, Retention |
| **Scenario** | One Mode + One Corner combination | Functional @ SS corner |

**Common Corners:**

| Corner | Process | Voltage | Temperature | Primary Use |
|--------|---------|---------|-------------|-------------|
| **SS (Slow-Slow)** | Slow NMOS, Slow PMOS | Low | Hot | Setup analysis |
| **FF (Fast-Fast)** | Fast NMOS, Fast PMOS | High | Cold | Hold analysis |
| **TT (Typical)** | Typical | Nominal | 25°C | Functional verification |
| **SF/FS** | Skewed (one fast, one slow) | Varies | Varies | Noise margin |

**Common Modes:**

| Mode | Description | Typical Constraints |
|------|-------------|---------------------|
| **Functional** | Normal operation | Highest frequency, tightest timing |
| **Scan/Test** | DFT scan mode | Lower frequency, shift clock constraints |
| **Low-power** | Reduced activity | Clock gating active, some domains off |
| **Retention** | State retention | Isolation/retention timing |

**Scenario Matrix Example:**

```
                    Corners
           ┌──────┬──────┬──────┬──────┐
           │  SS  │  FF  │  TT  │  SF  │
     ┌─────┼──────┼──────┼──────┼──────┤
     │Func │ S,H  │ S,H  │  -   │  -   │
Modes│Scan │  S   │  H   │  -   │  -   │
     │LowP │  S   │  H   │  -   │  -   │
     └─────┴──────┴──────┴──────┴──────┘

S = Setup critical, H = Hold critical
```

**MCMM vs Traditional Flow:**

| Aspect | Traditional | MCMM |
|--------|-------------|------|
| **Analysis** | One corner at a time | All scenarios simultaneously |
| **Optimization** | Per-corner, may conflict | Unified optimization |
| **Runtime** | Multiple runs | Single (longer) run |
| **Convergence** | Fix one → break another | Global convergence |

**MCMM in Tools:**

```tcl
# PrimeTime MCMM setup
create_scenario -name func_ss
read_sdc functional.sdc
set_operating_conditions -library slow.db -analysis_type on_chip_variation

create_scenario -name scan_ff
read_sdc scan.sdc
set_operating_conditions -library fast.db -analysis_type on_chip_variation

# Analyze all scenarios
set_active_scenarios {func_ss scan_ff}
report_timing -scenarios all
```

**Dominant Corners:**

Not all corners need full analysis. ML-based approaches can predict timing at non-dominant corners from dominant corner results:

```
Dominant corners (must analyze):
  - SS/hot/lowV → Setup-critical
  - FF/cold/highV → Hold-critical

Non-dominant (can predict):
  - TT, SF, FS → Usually not worst-case

Prediction accuracy: 95-98% with 2× runtime reduction
```

**Sign-off Requirements:**

| Analysis | Required Corners | Typical Count |
|----------|------------------|---------------|
| **Setup** | All slow corners | 3-5 |
| **Hold** | All fast corners | 2-3 |
| **Total scenarios** | Modes × Corners | 10-30+ |

### **Setup & Hold Violation Solutions**

**⚠️ Important:** Always fix hold violations first! A chip with setup violations can work at lower frequency, but hold violations make the chip unusable ("DUMP the chip").

#### Fixing Setup Violations (make data path faster OR clock path slower):

| Technique | Description |
|-----------|-------------|
| **Optimize data path** | Use cells with higher drive strength, reduce logic depth |
| **Replace capture flip-flop** | Use flip-flop with smaller setup time requirement |
| **Increase clock skew** | Add delay to capture clock path (useful skew) |
| **RTL changes** | Use one-hot encoding for FSM, prefer `case` over `if-else` |
| **Reduce frequency** | Post tape-out last resort |

#### Fixing Hold Violations (make data path slower):

| Technique | Description |
|-----------|-------------|
| **Add delay buffers** | Insert buffers/inverter pairs in data path |
| **Reduce drive strength** | Use weaker cells to slow down data path |
| **Use different flip-flop** | Select flip-flop with lower hold time requirement |
| **Increase Tck-q** | Use flip-flop with higher clock-to-q delay |

**Caution:** When fixing hold violations, check if the path shares start/end points with setup-critical paths to avoid creating new violations.

### **Delay bound of D flip-flop**

![Delay bound 1](https://i.imgur.com/NLxP60C.png)
![Delay bound 2](https://i.imgur.com/Jd9shRH.png)

### **Special timing path**

Not all paths in a design require single-cycle timing closure. Correctly identifying and constraining special paths prevents over-design and enables realistic timing optimization.

**False paths** are timing paths that STA should ignore because they cannot affect actual operation. Incorrectly timing false paths wastes optimization effort and may prevent timing closure on real critical paths.

1. **Unexercised path**
    - Paths not used under normal conditions
    - e.g., probe for debugging, test-only logic
2. **Irrelevant path**
    - Paths that are too slow or where speed doesn't matter
    - e.g., reset paths, static configuration signals
3. **Asynchronous path**
    - Paths in different clock domains
    - Clock domain crossing (CDC): transfer data from clk1 to clk2
    - CDC requires special synchronization, not timing constraints
4. **Logically impossible path**
    - Exists in the circuit but data cannot possibly pass through
    - Example: mutually exclusive MUX select conditions
    - Should be detected by PrimeTime
5. **Combinational loops**
    - Should be broken with `set_disable_timing`

**Multicycle paths** are timing paths intentionally designed to take more than one clock cycle. These occur when a slow operation's result isn't needed until multiple cycles later.

- Example: A slow multiplier that takes 2 clock cycles
- Must explicitly constrain: `set_multicycle_path 2 -setup`
- Hold check also affected: typically `set_multicycle_path 1 -hold`

---

## 低功耗設計

### **Power Components**

Power consumption in CMOS circuits consists of two main components: dynamic power (consumed during switching) and static power (consumed even when idle). As process technology scales to smaller nodes, static power becomes increasingly significant due to higher leakage currents through thinner gate oxides and reduced threshold voltages.

**Dynamic Power:**
```
P_dynamic = α × C_L × V_DD² × f
```
- α = switching activity (0 to 1)
- C_L = load capacitance
- V_DD = supply voltage
- f = clock frequency

**Static Power (Leakage):**

| Leakage Type | Description |
|--------------|-------------|
| **Subthreshold** | Current through channel when VGS < Vth (dominant in modern nodes) |
| **Gate oxide** | Tunneling through thin gate oxide |
| **Junction** | Reverse-biased PN junction leakage |

### **Power Reduction Techniques**

Multiple techniques exist to reduce power consumption, each targeting different power components and applicable at different design stages. The choice of technique depends on power budget requirements, performance constraints, and implementation complexity.

| Technique | Target Power | Description | Trade-off |
|-----------|--------------|-------------|-----------|
| **Clock Gating** | Dynamic | Disable clock to inactive blocks | Minimal overhead |
| **Power Gating** | Static (Leakage) | Shut off power supply completely | Wake-up latency |
| **Multi-Vt** | Static | Use high-Vt cells for non-critical paths | Area |
| **DVFS** | Both | Dynamic voltage/frequency scaling | Complexity |
| **Operand Isolation** | Dynamic | Gate inputs to idle functional units | Extra logic |
| **Multi-VDD** | Both | Different voltage domains per block | Level shifters needed |

### **Multi-Vt Cell Library**

| Cell Type | Threshold | Speed | Leakage | Use Case |
|-----------|-----------|-------|---------|----------|
| **HVT** (High-Vt) | High | Slowest | Lowest | Non-critical paths |
| **SVT/RVT** (Standard) | Medium | Medium | Medium | Default cells |
| **LVT** (Low-Vt) | Low | Fast | High | Critical timing paths |
| **SLVT** (Super Low-Vt) | Very Low | Fastest | Highest | Most critical paths |

**Speed vs Leakage:** HVT < SVT < LVT < SLVT

**Multi-Vt Optimization Strategy:**

Modern synthesis and optimization tools automatically select cell Vt types to minimize leakage while meeting timing. The general approach is conservative: use slow, low-leakage cells by default and selectively upgrade only where needed.

1. Start with all HVT cells (minimize leakage baseline)
2. Replace cells on critical paths with LVT/SLVT
3. Balance timing closure with leakage budget

### **Clock Gating vs Power Gating**

| Aspect | Clock Gating | Power Gating |
|--------|--------------|--------------|
| **Reduces** | α (switching activity) | V (to zero) |
| **Saves** | Dynamic power only | Both dynamic + static |
| **Wake-up** | Instant (next clock) | Slow (μs to ms) |
| **State** | Preserved | Lost (needs retention) |
| **Overhead** | ICG cells | Sleep transistors, isolation, retention |

**Power Gating Implementation:**
- Uses sleep transistors (high-Vt PMOS header or NMOS footer)
- Requires isolation cells to prevent floating outputs
- Requires retention registers if state must be preserved

### **Power Intent (UPF/CPF)**

Power intent files describe how power should be managed in a design—which blocks can be shut down, which voltages they use, and how signals cross power domain boundaries.

**UPF vs CPF:**

| Aspect | UPF (Unified Power Format) | CPF (Common Power Format) |
|--------|---------------------------|---------------------------|
| **Standard** | IEEE 1801 | Si2 |
| **Backed by** | Synopsys, Mentor, Cadence | Originally Cadence |
| **Industry adoption** | More widely used | Legacy designs |
| **Syntax** | Tcl-based | Tcl-based |

**Key UPF Concepts:**

| Concept | Description |
|---------|-------------|
| **Power Domain** | Group of cells sharing same power supply |
| **Power State** | Operating mode (ON, OFF, RETENTION) |
| **Power Switch** | Header/footer transistor for power gating |
| **Isolation Cell** | Clamps outputs when domain is OFF |
| **Level Shifter** | Converts voltage between domains |
| **Retention Register** | Preserves state during power-down |

**Basic UPF Example:**

```tcl
# Define power domains
create_power_domain PD_TOP -include_scope
create_power_domain PD_CPU -elements {cpu_inst}

# Define power supplies
create_supply_net VDD
create_supply_net VSS
create_supply_net VDD_CPU

# Connect supplies to domains
create_supply_set SS_TOP -function {power VDD} -function {ground VSS}
create_supply_set SS_CPU -function {power VDD_CPU} -function {ground VSS}

# Add power switch
create_power_switch SW_CPU \
    -domain PD_CPU \
    -input_supply_port {vin VDD} \
    -output_supply_port {vout VDD_CPU} \
    -control_port {sleep sleep_cpu} \
    -on_state {on_state vin {!sleep}}

# Add isolation
set_isolation ISO_CPU \
    -domain PD_CPU \
    -applies_to outputs \
    -clamp_value 0 \
    -isolation_signal iso_en
```

**Power Intent in Design Flow:**

```
RTL + UPF → Synthesis → Power-aware netlist
         → Verification (formal + simulation)
         → P&R with power planning
         → Sign-off with power analysis
```

### **Level Shifters & Isolation Cells**

In multi-voltage designs, signals crossing between power domains require special cells to ensure correct operation and prevent damage or malfunction.

**Level Shifters:**

Level shifters convert signal voltage levels when crossing between domains operating at different voltages.

| Type | Direction | Complexity | Use Case |
|------|-----------|------------|----------|
| **L2H** (Low-to-High) | 0.8V → 1.0V | Complex (needs boost circuit) | Most common |
| **H2L** (High-to-Low) | 1.0V → 0.8V | Simple (buffer with lower VDD) | Less common |
| **Bidirectional** | Either direction | Most complex | DVFS designs |

```
Level Shifter Circuit (L2H):
                    VDD_HIGH
                       │
              ┌────────┴────────┐
        ┌─────┤ PMOS cross-coupled│
        │     └────────┬────────┘
        │              │
   IN ──┼──►[INV]──────┤──────► OUT
(VDD_LOW)              │      (VDD_HIGH)
        │     ┌────────┴────────┐
        └─────┤    NMOS pair    │
              └────────┬────────┘
                       │
                      VSS
```

**Isolation Cells:**

Isolation cells prevent undefined (floating) values from propagating when a power domain is shut down.

| Clamp Value | Cell Type | Behavior |
|-------------|-----------|----------|
| **0** | AND-based | Output = 0 when isolated |
| **1** | OR-based | Output = 1 when isolated |
| **Hold** | Latch-based | Output = last value |

```verilog
// AND-based isolation (clamp to 0)
// iso_en = 1 means isolated (output clamped)
assign isolated_out = data_in & ~iso_en;

// OR-based isolation (clamp to 1)
assign isolated_out = data_in | iso_en;
```

**Enable Level Shifter (ELS):**

Combines level shifting and isolation in a single cell—saves area when both are needed.

```
Typical cell insertion order:
  [Power-gated domain] → [Isolation] → [Level Shifter] → [Always-on domain]

With ELS:
  [Power-gated domain] → [Enable Level Shifter] → [Always-on domain]
```

**Physical Design Considerations:**

- Level shifters placed at power domain boundaries
- Must have access to both voltage rails
- Often double-height cells (span two standard cell rows)
- Tool automatically inserts based on UPF/CPF specifications

---

## 電路範例

### **Divide-by-2 Circuit**

#### Without cnt

```verilog
module div2 (
   input      clk,
   input      rst_n,
   output reg o_clk
);

always@(posedge clk or negedge rst_n) begin
   if (!rst_n)
       o_clk <= 1'b0;
   else
       o_clk <= ~o_clk;
end

endmodule
```

#### With cnt

```verilog
module div2 (
   input      clk,
   input      rst_n,
   output reg o_clk
);

reg cnt;

always@(posedge clk or negedge rst_n) begin
   if (!rst_n) begin
       o_clk <= 1'b0;
       cnt <= 1'b0;
   end
   else begin
       o_clk <= (cnt < 1) ? 1'b0 : 1'b1;
       cnt <= cnt + 1'b1;
   end
end

endmodule
```

### **Divide-by-N Circuit**
For **odd N**: Use both posedge and negedge counters, OR their outputs for 50% duty cycle.

```verilog
module divn    (
  input  clk,
  input  rst_n,
  output o_clk
);

parameter WIDTH = 3;
parameter N    = 6;

reg [WIDTH-1:0] cnt_p;
reg [WIDTH-1:0] cnt_n;
reg             clk_p;
reg             clk_n;

assign o_clk = (N == 1) ? clk :
               (N[0])   ? (clk_p | clk_n) : (clk_p);  // N[0]=1 means odd

always@(posedge clk or negedge rst_n) begin
  if (!rst_n)
    cnt_p <= 0;
  else
    cnt_p <= (cnt_p == (N-1)) ? 0 : cnt_p + 1;
end

always@(posedge clk or negedge rst_n) begin
  if (!rst_n)
    clk_p <= 1;
  else
    clk_p = (cnt_p < (N>>1));
end

always@(negedge clk or negedge rst_n) begin
  if (!rst_n)
    cnt_n <= 0;
  else
    cnt_n <= (cnt_n == (N-1)) ? 0 : cnt_n + 1;
end

always@(negedge clk or negedge rst_n) begin
  if (!rst_n)
    clk_n <= 1;
  else
    clk_n = (cnt_n < (N>>1));
end

endmodule
```

Divide-by-5 Circuit Waveform
![Divide-by-5 Circuit Waveform](https://i.imgur.com/AKh5gQR.png)

### **Odd Clock Divider - 50% Duty Cycle**

**Challenge:** Dividing by an even number with 50% duty cycle is trivial (toggle at half count). Odd division (e.g., divide-by-3) is tricky because the output would have 33% or 66% duty cycle.

**Solution:** Use both clock edges and combine with OR/XOR:

```
Method for Divide-by-3 with 50% Duty Cycle:

1. Create counter (0, 1, 2) on rising edge
2. Generate clk_p: toggle when cnt reaches threshold (posedge)
3. Generate clk_n: toggle when cnt reaches threshold (negedge)
4. Output = clk_p OR clk_n (or XOR for certain patterns)

        clk:    ─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─
                 └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘
        cnt:     0   1   2   0   1   2   0   1   2
        clk_p:  ─────┐     ┌─────────┐     ┌─────────
                     └─────┘         └─────┘
        clk_n:  ───────┐     ┌─────────┐     ┌───────
                       └─────┘         └─────┘
        output: ─────┐   ┌───────────┐   ┌───────────
        (OR)         └───┘           └───┘

The negedge signal "fills in" the gap, achieving 50% duty cycle.
```

**Why this works:** The negative-edge triggered signal is phase-shifted by half a clock period, so when OR'd together, the combined output has equal high and low times.

**FPGA Consideration:** This technique produces a combinational output, which shouldn't drive FPGA clock networks directly. Use PLL/DLL for proper clock generation.

### **Glitch-free Clock Mux**

When dynamically switching between clock sources (e.g., for power management), a standard MUX can produce glitches that cause circuit malfunction.

**Problem with Simple MUX:**
```
clk_a:  ──┐ ┌───┐ ┌───┐ ┌──
          └─┘   └─┘   └─┘
clk_b:  ┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌
        └─┘ └─┘ └─┘ └─┘ └─┘
sel:    ────────┐
                └───────────
output: ──┐ ┌───X GLITCH! ──
          └─┘   ↑
```

**Solution: Break-Before-Make with Feedback**

```
                   ┌───────────────────────────────┐
                   │                               │
    sel ──────────►│►[SYNC]──┬──►[NEG-FF]──►AND────┼──►
                   │         │              │      │
    clk_a ─────────┼─────────┼──────────────┘      │
                   │         │                     │
                   │    ◄────┼─────────────────────┤
                   │    │    │                     │
    sel' ─────────►│►[SYNC]──┴──►[NEG-FF]──►AND────┼──► OR ──► clk_out
                   │                        │      │
    clk_b ─────────┼────────────────────────┘      │
                   │                               │
                   └───────────────────────────────┘

Key points:
1. Negative-edge FFs ensure switching occurs during clock LOW
2. Feedback ensures "break-before-make" (old clock stops before new starts)
3. Synchronizers prevent metastability from async select
```

**Verilog Implementation:**
```verilog
module glitch_free_clk_mux (
    input  clk_a, clk_b,
    input  sel,           // 0=clk_a, 1=clk_b
    output clk_out
);

reg sel_a_sync1, sel_a_sync2, sel_a_neg;
reg sel_b_sync1, sel_b_sync2, sel_b_neg;

// Synchronize select to clk_a domain
always @(posedge clk_a) begin
    sel_a_sync1 <= ~sel & ~sel_b_neg;  // Include feedback
    sel_a_sync2 <= sel_a_sync1;
end

// Register on negative edge of clk_a
always @(negedge clk_a)
    sel_a_neg <= sel_a_sync2;

// Synchronize select to clk_b domain
always @(posedge clk_b) begin
    sel_b_sync1 <= sel & ~sel_a_neg;   // Include feedback
    sel_b_sync2 <= sel_b_sync1;
end

// Register on negative edge of clk_b
always @(negedge clk_b)
    sel_b_neg <= sel_b_sync2;

// Gated clocks
wire clk_a_gated = clk_a & sel_a_neg;
wire clk_b_gated = clk_b & sel_b_neg;

assign clk_out = clk_a_gated | clk_b_gated;

endmodule
```

**Interview Question:** "Why use negative-edge triggered FFs?"
**Answer:** To ensure the enable signal changes only when the clock is LOW, preventing any partial clock pulses (glitches) on the output.

### **Division Algorithm**

Hardware division using the **shift-subtract** (restoring division) method:

```verilog
module divider #(
    parameter WIDTH = 32
)(
    input  [WIDTH-1:0] dividend,
    input  [WIDTH-1:0] divisor,
    output reg [WIDTH-1:0] quotient,
    output reg [WIDTH-1:0] remainder
);

reg [2*WIDTH-1:0] temp_dividend;
reg [2*WIDTH-1:0] temp_divisor;
integer i;

always @(*) begin
    // Initialize: dividend in lower bits, zeros in upper bits
    temp_dividend = {{WIDTH{1'b0}}, dividend};
    temp_divisor  = {divisor, {WIDTH{1'b0}}};

    for (i = 0; i < WIDTH; i = i + 1) begin
        // Shift left by 1
        temp_dividend = {temp_dividend[2*WIDTH-2:0], 1'b0};

        // Compare and subtract
        if (temp_dividend[2*WIDTH-1:WIDTH] >= divisor) begin
            temp_dividend[2*WIDTH-1:WIDTH] = temp_dividend[2*WIDTH-1:WIDTH] - divisor;
            temp_dividend[0] = 1'b1;  // Set quotient bit
        end
    end

    quotient  = temp_dividend[WIDTH-1:0];
    remainder = temp_dividend[2*WIDTH-1:WIDTH];
end

endmodule
```

**Algorithm Steps:**
1. Place dividend in lower half, zeros in upper half
2. For each bit position:
   - Shift combined register left by 1
   - If upper half ≥ divisor, subtract divisor and set quotient bit = 1
   - Else quotient bit = 0
3. After WIDTH iterations: quotient in lower half, remainder in upper half

**Example (8 ÷ 3):**
```
Initial:  [0000][1000]  (dividend=8, divisor=3)
Shift:    [0001][000_]  upper=1 < 3, Q=0
Shift:    [0010][00_0]  upper=2 < 3, Q=0
Shift:    [0100][0_00]  upper=4 ≥ 3, subtract: [0001][0_01]
Shift:    [0010][_010]  upper=2 < 3, Q=0
Result:   quotient=0010(2), remainder=0010(2)
          8 ÷ 3 = 2 remainder 2 ✓
```

### **Sequence Detector**

Detect a specific bit pattern in a serial input stream (common interview question).

**Example: Detect "1011" (overlapping)**

```
State Diagram:
S0 (idle) --1--> S1 (got "1")
S0        --0--> S0
S1        --0--> S2 (got "10")
S1        --1--> S1 (got "1")
S2        --1--> S3 (got "101")
S2        --0--> S0
S3        --1--> S1 + OUTPUT (got "1011", output=1)
S3        --0--> S2 (got "10")
```

```verilog
module seq_detector_1011 (
    input  clk,
    input  rst_n,
    input  din,
    output reg detected
);

// State encoding
localparam S0 = 2'b00;  // Idle
localparam S1 = 2'b01;  // Got "1"
localparam S2 = 2'b10;  // Got "10"
localparam S3 = 2'b11;  // Got "101"

reg [1:0] state, next_state;

// State register
always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        state <= S0;
    else
        state <= next_state;
end

// Next state logic
always @(*) begin
    case (state)
        S0: next_state = din ? S1 : S0;
        S1: next_state = din ? S1 : S2;
        S2: next_state = din ? S3 : S0;
        S3: next_state = din ? S1 : S2;  // Overlap: "1011" ends with "1"
        default: next_state = S0;
    endcase
end

// Output logic (Mealy: depends on state + input)
always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        detected <= 1'b0;
    else
        detected <= (state == S3) && din;  // "1011" detected
end

endmodule
```

**Key Points:**
- **Overlapping detection**: After detecting "1011", can immediately start detecting next sequence
- **Non-overlapping**: Return to S0 after detection
- State count = pattern length (for simple patterns)

### **Johnson Counter**

A Johnson counter (twisted ring counter) is a shift register with inverted feedback.

**N-bit Johnson counter cycles through 2N states:**

```
4-bit Johnson Counter States:
0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001 → 0000...
```

```verilog
module johnson_counter #(
    parameter N = 4
)(
    input  clk,
    input  rst_n,
    output reg [N-1:0] q
);

always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        q <= {N{1'b0}};
    else
        q <= {~q[0], q[N-1:1]};  // Shift right, invert LSB to MSB
end

endmodule
```

**Johnson vs Ring Counter:**

| Aspect | Ring Counter | Johnson Counter |
|--------|--------------|-----------------|
| **States** | N states | 2N states |
| **Feedback** | Direct (Q[0] → Q[N-1]) | Inverted (~Q[0] → Q[N-1]) |
| **Self-starting** | No | No |
| **Decoding** | 1 gate per state | 1 gate per state |

**Applications:**
- Frequency division by 2N
- Phase generation (multi-phase clocks)
- Glitch-free decoding (only 1 bit changes per transition)

### **Round Robin Arbiter**

A round-robin arbiter grants access to multiple requestors in a fair, rotating manner. After each grant, the priority rotates so the last granted requestor has lowest priority.

**Key Requirements:**
- One-cycle arbitration (grant different requestors each cycle)
- Wraparound (rotate from last to first requestor)
- Work-conserving (no idle cycles when requests pending)

**Implementation Using Thermometer Mask:**

```verilog
module round_robin_arbiter #(
    parameter N = 4
)(
    input  [N-1:0] req,
    input  clk, rst_n,
    output reg [N-1:0] grant
);

reg [N-1:0] mask;  // Thermometer-encoded mask

wire [N-1:0] masked_req = req & mask;
wire [N-1:0] unmasked_grant, masked_grant;

// Priority encoder for masked requests
assign masked_grant = masked_req & (~masked_req + 1);  // Isolate lowest set bit

// Priority encoder for all requests (fallback)
assign unmasked_grant = req & (~req + 1);

// Use masked if any masked request, else use unmasked
wire [N-1:0] next_grant = |masked_req ? masked_grant : unmasked_grant;

always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        grant <= 0;
        mask <= {N{1'b1}};
    end else if (|req) begin
        grant <= next_grant;
        // Update mask: all bits above granted position = 1
        mask <= ~((next_grant << 1) - 1) | next_grant;
    end else begin
        grant <= 0;
    end
end

endmodule
```

**How Thermometer Mask Works:**
```
Example with 4 requestors (req[3:0]):

Initial: mask = 1111, req = 1010
  masked_req = 1010 & 1111 = 1010
  grant = 0010 (lowest set bit)
  new mask = 1100 (mask off granted and below)

Next: mask = 1100, req = 1010
  masked_req = 1010 & 1100 = 1000
  grant = 1000
  new mask = 0000 → wraps to 1111

Next: mask = 1111, req = 1010
  grant = 0010 (back to beginning)
```

**Applications:**
- Bus arbitration (AMBA interconnect)
- Memory controller request handling
- Network-on-Chip routing
- DMA channel scheduling

---

## 後端 / 實體設計

### **CTS & Clock Uncertainty**

Clock uncertainty accounts for timing variations in the clock network.

| Stage | Setup Uncertainty | Hold Uncertainty |
|-------|-------------------|------------------|
| **Pre-CTS** | PLL jitter + estimated skew | Estimated skew |
| **Post-CTS** | PLL jitter only | 0 (actual skew known) |

**Why uncertainty changes after CTS:**
- Pre-CTS: Clock tree doesn't exist, so skew must be estimated
- Post-CTS: Actual clock tree is built, real skew is calculated

**CTS Optimization Goals:**
- Minimize clock skew across all flip-flops
- Balance insertion delay
- Meet target transition times
- Minimize power consumption

**CTS Best Practices:**

Effective CTS requires balancing multiple competing goals. Aggressive skew targets increase buffer count and power, while relaxed targets may cause hold violations. Start with realistic constraints and iterate.

- Select appropriate clock root locations
- Use minimum RC metal layers for clock routing
- Consider double-width routing for reduced resistance
- Set reasonable maximum fanout limits
- Avoid overly tight skew targets (causes over-buffering)

### **Routing Congestion Solutions**

Congestion occurs when routing demand exceeds available tracks.

| Location | Solutions |
|----------|-----------|
| **Between memories** | Increase spacing, rotate RAM orientation, align address/data pins |
| **Around macros** | Add keepout zones, placement blockages, halo regions |
| **Standard cell areas** | Congestion-driven placement, reduce cell density, avoid pin-dense cells |
| **Power routing** | Optimize power grid, use wider straps |

**Congestion Analysis:**
```tcl
# ICC2 congestion analysis
report_congestion -routing_stage global
report_congestion -routing_stage detail
```

**Prevention Strategies:**

Routing congestion is best addressed early in the design flow. Fixing congestion after detailed routing is expensive and may require floorplan changes that ripple through timing closure.

- Use congestion-driven placement
- Set cell density limits (e.g., 70-80%)
- Add routing blockages in congested areas
- Increase routing resources (more metal layers)

### **Chip Area Estimation**

**Core-limited design:**
```
Total Area = Core Area + Power Ring + PAD Ring

Core Area = RAM Area + Macro Area + Standard Cell Area

RAM Area = Self Area + Power Ring + Keepout

Standard Cell Area = (Gate Count × Area per Gate) / Utilization
```

**Utilization Guidelines:**

| Metal Layers | Typical Utilization |
|--------------|---------------------|
| 4-5 layers | 50-60% |
| 6-7 layers | 60-70% |
| 8+ layers | 70-80% |

**IO-limited design:**
- Total area determined by number of IOs, not logic
- Solutions: staggered IO, flip-chip, narrow IO cells

### **Buffer vs Inverter in CTS**

| Aspect | Buffer | Inverter |
|--------|--------|----------|
| **Logic** | Non-inverting | Inverting |
| **Area** | Larger (2 inverters) | Smaller |
| **Power** | Higher | Lower |
| **Delay** | Higher | Lower |
| **Modification** | Easier to add/remove | Requires pairs |

**When to use each:**
- **Buffers**: Simpler logic, easier ECO modifications
- **Inverters**: Better PPA (Power, Performance, Area), but must use in pairs

### **ECO (Engineering Change Order)**

ECO is the process of making late-stage design modifications.

| ECO Type | Description | Constraints |
|----------|-------------|-------------|
| **Pre-mask** | Before GDSII tape-out | Any netlist changes allowed |
| **Post-mask** | After masks fabricated | Limited to spare cells, metal-only changes |

**Pre-mask ECO Flow:**
1. Modify RTL or netlist
2. ECO place and route
3. Incremental verification (DRC, LVS, timing)

**Post-mask ECO Flow:**
1. Identify available spare cells or gate array cells
2. Map logic changes to spare cells
3. Metal-only routing changes
4. Verify functionality preserved

**Spare Cell Strategy:**

Spare cells are pre-placed logic elements that can be connected via metal-only ECO after mask fabrication. Proper spare cell planning can save weeks of schedule and millions in mask costs.

- Insert spare cells during implementation (~2-5% of design)
- Distribute evenly across chip
- Include mix of cell types (INV, NAND, NOR, FF)

**SDC Development:**

| Constraint Type | Source |
|-----------------|--------|
| **Clock definitions** | Design specification (frequency, duty cycle) |
| **IO timing** | System requirements, board-level timing |
| **False paths** | Design architecture (mutually exclusive modes) |
| **Multicycle paths** | Design intent (slow paths by design) |

### **Scan Chain / DFT**

DFT (Design for Testability) inserts test structures to enable manufacturing testing.

**Scan Chain Concept:**
Convert sequential circuit testing into combinational circuit testing by connecting all flip-flops into a shift register chain.

```
Normal Mode:        Scan Mode:
   D → [FF] → Q        SI → [FF] → SO
       ↑                    ↑
      CLK                  CLK + SE
```

**Scan Cell Operation:**

| Mode | SE (Scan Enable) | Behavior |
|------|------------------|----------|
| **Normal** | 0 | D → Q (functional mode) |
| **Shift** | 1 | SI → Q (scan data shifts through chain) |
| **Capture** | 0 | Capture response into scan FFs |

**Scan Test Flow:**

The scan test process converts sequential testing into a three-phase operation. By controlling scan enable (SE), the tester can load any desired state, observe one clock cycle of functional behavior, and read out results.

1. **Shift-in**: SE=1, clock test pattern into scan chain
2. **Capture**: SE=0, apply one functional clock, capture response
3. **Shift-out**: SE=1, clock out captured response while shifting in next pattern

**DFT Methods:**

| Method | Description | Use Case |
|--------|-------------|----------|
| **Scan Chain** | FF replacement for sequential test | Logic testing |
| **MBIST** | Memory built-in self-test | RAM/ROM testing |
| **Boundary Scan** | IEEE 1149.1 (JTAG) | Board-level testing |
| **ATPG** | Automatic test pattern generation | Fault coverage |

**Scan Insertion Flow (DC):**
```tcl
# In Design Compiler
set_scan_configuration -chain_count 4
set_dft_signal -view existing_dft -type ScanClock -port clk
set_dft_signal -view spec -type ScanEnable -port SE
insert_dft
```

**Scan Chain Compression:**

As designs grow larger, full scan chains become impractical due to test time and tester memory limitations. Compression techniques maintain fault coverage while dramatically reducing test data volume.

- Full scan requires many test pins and long test time
- Compression (e.g., DFTMAX, Tessent) reduces test data volume by 10-100×
- Uses decompressor (input) and compactor (output)

**Fault Coverage Targets:**

| Coverage Level | Application | Notes |
|----------------|-------------|-------|
| **85-90%** | Partial scan, cost-sensitive | Acceptable for some consumer products |
| **95%+** | Industry standard | Required by most foundries as policy |
| **98-99%** | High-reliability | Automotive, aerospace, medical |

**Fault Models:**

| Model | What It Detects | Test Type |
|-------|-----------------|-----------|
| **Stuck-at** | Permanent shorts to VDD/GND | Static patterns |
| **Transition** | Slow-to-rise/fall delays | At-speed patterns |
| **Path Delay** | Timing failures on specific paths | At-speed patterns |
| **IDDQ** | Bridging faults via quiescent current | Current measurement |

**ATPG Strategy:** Apply random patterns until new pattern detects <0.5% of undetected faults, then apply deterministic tests for remaining faults—this minimizes test time while maximizing coverage.

### **MBIST (Memory Built-In Self-Test)**

MBIST adds test and repair circuitry directly to on-chip memories, enabling autonomous testing without external test equipment. Since memories constitute 50-70% of modern SoC area, memory testing is critical for yield.

**MBIST Architecture:**

```
┌──────────────────────────────────────────────────┐
│                  MBIST Controller                 │
│  ┌─────────┐  ┌──────────┐  ┌────────────────┐   │
│  │ Address │  │  Data    │  │  Comparator    │   │
│  │Generator│  │Generator │  │  (Pass/Fail)   │   │
│  └────┬────┘  └────┬─────┘  └───────┬────────┘   │
└───────┼────────────┼────────────────┼────────────┘
        │            │                │
        ▼            ▼                ▼
┌──────────────────────────────────────────────────┐
│                    Memory                         │
│   Address Bus ──►  SRAM/DRAM  ──► Data Out       │
└──────────────────────────────────────────────────┘
```

**March Test Algorithms:**

March algorithms systematically write and read patterns while "marching" through memory addresses. They're designed to detect specific fault types efficiently.

| Algorithm | Complexity | Faults Detected |
|-----------|------------|-----------------|
| **MATS** | 4n | Stuck-at faults (SAF) |
| **March C-** | 10n | SAF, address decoder faults (AF), transition faults |
| **March LR** | 14n | SAF, AF, realistic linked faults |
| **SMarchCKBD** | Variable | SAF, coupling faults, neighborhood pattern sensitivity |

**March C- Algorithm Notation:**

```
⇑(w0); ⇑(r0,w1); ⇑(r1,w0); ⇓(r0,w1); ⇓(r1,w0); ⇕(r0)

⇑ = Ascending address order
⇓ = Descending address order
⇕ = Either direction
w0/w1 = Write 0/1
r0/r1 = Read (expect 0/1)
```

**Fault Types Targeted:**

| Fault Type | Description | Detection Method |
|------------|-------------|------------------|
| **Stuck-at (SAF)** | Cell stuck at 0 or 1 | Write opposite, read back |
| **Transition (TF)** | Cannot transition 0→1 or 1→0 | Write, read, write opposite, read |
| **Coupling (CF)** | One cell affects another | Pattern with aggressor/victim cells |
| **Address Decoder (AF)** | Wrong address accessed | March with address uniqueness check |

**Memory Repair (BISR):**

Built-In Self-Repair uses redundant rows/columns to replace faulty cells:

```
┌────────────────────────────────────┐
│        Memory Array                │
│  ┌─────┬─────┬─────┬─────┐        │
│  │     │     │ ✗   │     │ ← Faulty cell
│  ├─────┼─────┼─────┼─────┤        │
│  │     │     │     │     │        │
│  ├─────┼─────┼─────┼─────┤        │
│  │ Spare Row                │ ← Replacement
│  └─────┴─────┴─────┴─────┘        │
└────────────────────────────────────┘
```

**MBIST vs Logic Scan:**

| Aspect | MBIST | Scan Chain |
|--------|-------|------------|
| **Target** | Memories (SRAM, ROM, RF) | Sequential logic (flip-flops) |
| **Test generation** | On-chip algorithm | External ATPG |
| **Pattern storage** | None (generated on-chip) | Tester memory |
| **Test time** | Fast | Depends on scan chain length |
| **Area overhead** | 3-5% of memory | ~15% of logic |

### **IR Drop Analysis**

IR drop is the voltage difference between power source and circuit elements due to resistance in the power distribution network. Excessive IR drop causes timing failures and functional errors.

**Static vs Dynamic IR Drop:**

| Aspect | Static IR Drop | Dynamic IR Drop |
|--------|----------------|-----------------|
| **Cause** | Average current through resistive PDN | Sudden current spikes during switching |
| **Analysis** | Vector-less (average power) | Vector-based (worst-case switching) |
| **Frequency** | Steady-state | Transient (within clock cycle) |
| **Effect** | Uniform voltage reduction | Localized voltage dips (hot spots) |

**IR Drop Mechanism:**

```
VDD (1.0V)
    │
    R_wire = 0.1Ω
    │
    ├──► Cell 1 (I = 1mA) → V_drop = 0.1mV
    │
    R_wire = 0.1Ω
    │
    ├──► Cell 2 (I = 10mA) → V_drop = 1mV
    │
    R_wire = 0.1Ω
    │
    └──► Cell N (cumulative drop)

Cells far from VDD pad see lower voltage!
```

**Impact on Timing:**

```
Cell delay ∝ 1 / (VDD - Vth)

If VDD drops from 1.0V to 0.9V and Vth = 0.3V:
  Original delay factor: 1 / (1.0 - 0.3) = 1.43
  With IR drop:          1 / (0.9 - 0.3) = 1.67

  Delay increase: ~17% slower!
```

**Typical IR Drop Budgets:**

| Application | Max Static IR Drop | Max Dynamic IR Drop |
|-------------|-------------------|---------------------|
| **Mobile SoC** | 3-5% of VDD | 8-10% of VDD |
| **High-performance** | 5-8% of VDD | 10-12% of VDD |
| **Automotive** | 2-3% of VDD | 5-7% of VDD |

**Fixing IR Drop Violations:**

| Issue | Static IR Drop Fix | Dynamic IR Drop Fix |
|-------|-------------------|---------------------|
| **Power grid** | Wider straps, more layers | Same + mesh density |
| **Decaps** | N/A | Add decoupling capacitors |
| **Placement** | Spread high-power cells | Avoid switching hot spots |
| **Pads** | Add VDD/VSS bumps/pads | Same, near hot spots |

### **Electromigration**

Electromigration (EM) is the gradual movement of metal atoms in interconnects due to momentum transfer from current-carrying electrons. Over time, this causes voids (opens) or hillocks (shorts), leading to circuit failure.

**Black's Equation (MTTF):**

```
MTTF = A × J^(-n) × exp(Ea / kT)

Where:
  A  = Material constant
  J  = Current density (A/cm²)
  n  = Current exponent (typically 1-2)
  Ea = Activation energy (~0.7-0.9 eV for Cu)
  k  = Boltzmann constant
  T  = Temperature (Kelvin)
```

**Key Insight:** Doubling current density reduces MTTF by 2x to 4x (depending on n).

**Failure Mechanisms:**

```
Electron flow →  →  →  →  →  →
                ↓     ↓
           ┌────────────────────┐
           │ █████    ░░░  █████│ ← Void formation
           │ Metal interconnect │
           │ █████████████  ░░░ │ ← Hillock formation
           └────────────────────┘
```

**Current Density Limits:**

| Metal Layer | Typical Jmax (DC) | Typical Jmax (AC/RMS) |
|-------------|------------------|----------------------|
| **M1-M3** | 1-2 mA/μm | 3-5 mA/μm |
| **M4-M6** | 2-4 mA/μm | 5-8 mA/μm |
| **Top metals** | 4-8 mA/μm | 10-15 mA/μm |

**EM Prevention Techniques:**

| Technique | Description |
|-----------|-------------|
| **Wire widening** | Increase cross-section to reduce J |
| **Via doubling** | Multiple vias reduce current per via |
| **Avoid 90° bends** | Current crowding at sharp corners |
| **Cu capping layers** | CoWP, Ta barrier improve EM resistance |
| **Blech length** | Short wires (<~10μm) are "EM immortal" |

**Blech Length Effect:**

Below a critical length (Blech length), mechanical back-stress prevents void formation:

```
Blech length ≈ Ω·σ_crit / (e·ρ·J)

For typical Cu interconnects: ~10-50 μm

If wire length < Blech length → No EM failure!
```

**EM Verification Flow:**

```
Post-route netlist + Spice simulation
           ↓
Current extraction (DC + AC/RMS)
           ↓
EM rule checking against PDK limits
           ↓
Fix violations: widen wires, add vias
           ↓
Re-verify until clean
```

### **Signal Integrity (Crosstalk)**

Signal integrity（SI）指電氣訊號在 interconnect 中傳播時的品質。不良的 SI 會導致 timing 錯誤、資料損壞和矽片失效。在先進製程（28nm 及以下），SI 問題佔 post-silicon bug 的 30% 以上。

**Types of Crosstalk:**

| Type | Mechanism | Description |
|------|-----------|-------------|
| **Capacitive (Electrostatic)** | Mutual capacitance | Changing voltage couples to adjacent net via electric field |
| **Inductive** | Mutual inductance | Changing current creates magnetic field coupling |

Capacitive crosstalk dominates in most digital designs due to close wire spacing.

**Crosstalk Effects:**

```
Aggressor: The switching net that causes interference
Victim: The affected net that receives noise

Two main effects:
1. Crosstalk Glitch (Functional): Noise pulse on static victim
2. Crosstalk Delay (Timing): Speed up or slow down victim transition
```

**Crosstalk Glitch:**

```
                Aggressor
               ┌────────────────┐
    ─────────┐ │                │ ┌─────────
             └─┘                └─┘
                    │
              Coupling Cap (Cc)
                    │
                Victim (stable)
    ──────────────╱╲─────────────────────
                 noise pulse (glitch)
```

**Crosstalk Delay:**

| Transition Direction | Effect on Victim | Result |
|---------------------|------------------|--------|
| **Same direction** (↑↑ or ↓↓) | Miller effect reduces Cc | Faster victim (speed-up) |
| **Opposite direction** (↑↓ or ↓↑) | Miller effect increases Cc | Slower victim (slow-down) |

```
Same direction (both rise):
  Aggressor: ───┐ ┌───
               └─┘
  Victim:    ───┐ ┌─── (faster!)
               └─┘

Opposite direction (aggressor rises, victim falls):
  Aggressor: ───┐ ┌───
               └─┘
  Victim:    ┌───┐    (slower!)
             └───┴───
```

**Worst Case for Timing:**

```
Crosstalk delay worst case:
  - Slow corner (max base delay)
  - Opposite switching direction
  - Maximum coupling capacitance
  - Overlapping switching windows

Setup violation risk: Victim slows down
Hold violation risk: Victim speeds up
```

**Crosstalk Mitigation Techniques:**

| Technique | Description | Trade-off |
|-----------|-------------|-----------|
| **Spacing** | Increase wire separation | Routing resources |
| **Shielding** | Insert ground wire between aggressor/victim | Metal density, routing |
| **Buffer insertion** | Strengthen victim driver | Area, power |
| **Net ordering** | Route timing-critical nets first | Tool runtime |
| **Layer assignment** | Use different layers for crossing nets | Via count |

**Shielding Example:**

```
Without shielding:      With shielding:
  Aggressor               Aggressor
     ║                       ║
     ║ ← Cc                 ═══ ← Ground shield
     ║                       ║
  Victim                  Victim
```

**Crosstalk Analysis Flow:**

```
1. Extract parasitics (RC + Coupling C)
           ↓
2. Identify aggressor-victim pairs
           ↓
3. Calculate noise/delay impact
           ↓
4. Check against thresholds
           ↓
5. Fix violations (shield, space, buffer)
```

**SI Analysis in Tools:**

```tcl
# PrimeTime SI
set_noise_parameters -enable_propagation true
report_noise -above 0.2 -all_nets

# SI in P&R (ICC2)
check_routes -type open_nets -type electrical_violations
route_detail -crosstalk_optimization true
```

**Design Guidelines:**

| Rule | Threshold | Purpose |
|------|-----------|---------|
| **Max coupling length** | <1000× wire width | Limit capacitive coupling |
| **Noise margin** | Glitch < 10-20% VDD | Prevent functional failure |
| **Timing margin** | SI delta < 5% of slack | Prevent timing closure issues |

### **Latch-up Effect**

Latch-up is a parasitic thyristor (PNPN) effect in CMOS that can cause permanent damage.

**Mechanism:**
```
         VDD
          │
    ┌─────┴─────┐
    │   P-well  │←── Parasitic PNP (substrate)
    │  ┌─────┐  │
    │  │NMOS │  │
    │  └──┬──┘  │
    │     │     │
    │  ┌──┴──┐  │
    │  │PMOS │  │
    │  └─────┘  │←── Parasitic NPN (well)
    │   N-well  │
    └─────┬─────┘
          │
         GND
```

The parasitic PNP and NPN transistors form a thyristor (SCR) structure. Once triggered, it creates a low-resistance path from VDD to GND.

**Triggering Conditions:**

Latch-up is triggered when sufficient current flows through the parasitic BJT base regions to turn on the thyristor structure. Once triggered, the positive feedback loop sustains conduction even after the trigger is removed.

- Voltage spikes on I/O pins (exceeding VDD or below GND)
- ESD events (sudden charge injection)
- High junction temperature (increases leakage, reduces trigger threshold)
- Excessive current injection (from external circuits)

**Prevention Methods:**

Prevention strategies aim to reduce parasitic BJT gain and provide low-resistance paths for charge dissipation before the thyristor can trigger.

| Method | Description |
|--------|-------------|
| **Guard rings** | Substrate/well contacts surrounding transistors |
| **Butted contacts** | Source tied directly to well/substrate |
| **Increase well spacing** | Larger distance between NMOS and PMOS |
| **ESD protection** | Clamp circuits on I/O pins |
| **Reduce substrate resistance** | Heavy doping, more substrate contacts |

**Design Rules:**

Foundries provide specific design rules to ensure latch-up immunity. These rules are mandatory for tape-out and verified during DRC (Design Rule Check).

- Maximum distance from transistor to well tap
- Minimum guard ring width
- I/O cells require robust latch-up protection

**How Guard Rings Work:**

Guard rings are diffusions that decouple the parasitic bipolar transistors:
- **Minority carrier guard rings**: Collect minority carriers before they reach the parasitic collector junction
- **Majority carrier guard rings**: Connected to VDD/VSS to reduce effective well/substrate resistance

The key is that guard rings act as "collectors" that intercept diffusing carriers and shunt them to the supply rails before they can trigger the thyristor.

**ESD and Latch-up Relationship:** ESD protection cells are common latch-up trigger sources. When ESD enters through an I/O pad, the protection circuit can inject minority carriers into the substrate. Guard rings around ESD cells are critical.

**Advanced Techniques:**
- Deep trench isolation blocks minority carrier diffusion
- Heavily doped substrates reduce parasitic BJT gain
- SOI (Silicon-On-Insulator) substrates eliminate the thyristor structure entirely

### **Antenna Effect**

Antenna effect occurs during fabrication when metal interconnects collect charge during plasma etching, potentially damaging gate oxide.

**Mechanism:**
```
During metal etching:
                    Plasma
                      ↓ ↓ ↓
    ┌─────────────────────────────┐
    │      Long metal wire        │ ← Collects charge
    └──────────────┬──────────────┘
                   │
              ┌────┴────┐
              │  Gate   │ ← Thin oxide stressed
              │  Oxide  │
              └─────────┘
```

Long metal wires act as "antennas" collecting charge from plasma. This charge accumulates on the gate, creating high voltage that can rupture thin gate oxide.

**Antenna Ratio:**
```
Antenna Ratio = Metal Area Connected to Gate / Gate Area

Typical limit: Antenna Ratio < 400-1000 (process dependent)
```

**Prevention Methods:**

Antenna violations are fixed by providing discharge paths or reducing the metal area connected to gates during fabrication. Modern place-and-route tools automatically detect and fix most antenna violations.

| Method | Description |
|--------|-------------|
| **Diode insertion** | Add reverse-biased diode to discharge accumulated charge |
| **Metal jumpers** | Break long wires using higher metal layers |
| **Layer hopping** | Route through via to upper layer and back |
| **Metal slotting** | Add slots to reduce effective antenna area |

**Antenna Diode:**
```verilog
// Antenna diode inserted by router
// Connected between gate node and ground
// Provides discharge path during fabrication
```

**DRC Checks:**

Antenna rules are checked as part of the physical verification flow. The router can be configured to automatically insert diodes or adjust routing to fix violations.

- Tools check antenna ratio at each metal layer
- Violations flagged for manual or automatic fixing
- Critical for advanced nodes with thinner gate oxides

**Surprising Property of Thin Oxides:**

Counterintuitively, very thin gate oxides in advanced nodes are **less** susceptible to antenna damage than thick oxides. Why?
- Thin oxides are "leaky"—they conduct small tunneling currents
- This leakage provides a natural discharge path, preventing charge buildup
- As oxide thickness decreases, leakage increases exponentially, but breakdown voltage only decreases linearly
- Result: The discharge rate outpaces the damage threshold

**Why "Antenna" is a Misnomer:** The effect has nothing to do with electromagnetic wave reception (the usual meaning of antenna). The term refers only to the charge-collecting behavior of long metal conductors during plasma processing. A more accurate name is "Plasma-Induced Gate Oxide Damage" (PID).

---

## 記憶體與 Cache

### **SRAM vs DRAM**

SRAM（Static RAM）與 DRAM（Dynamic RAM）代表記憶體設計中的基本權衡。SRAM 使用交叉耦合 inverter 儲存每個位元，提供快速存取但每個 cell 需要 6 個 transistor。DRAM 將電荷儲存在電容中，僅需 1 個 transistor 和 1 個電容即可達到更高密度，但由於電荷洩漏需要定期 refresh。這解釋了為何 CPU 使用 SRAM 作為快速 cache，而使用 DRAM 作為大容量主記憶體。

| Feature | SRAM | DRAM |
|---------|------|------|
| **Storage Element** | 6 transistors (flip-flop based) | 1 transistor + 1 capacitor |
| **Speed** | Fast (~1-10 ns access) | Slower (~50-70 ns access) |
| **Density** | Lower (6T per bit) | Higher (1T1C per bit) |
| **Power** | Higher static power | Lower static power |
| **Refresh** | Not required | Required (capacitor leaks) |
| **Cost** | More expensive per bit | Cheaper per bit |
| **Use Case** | Cache (L1, L2, L3), registers | Main memory (DDR) |

**SRAM Architecture:**
- Uses cross-coupled inverters to store data
- Data retained as long as power is supplied
- Faster access due to direct transistor switching
- Typically used for on-chip memory (caches)

**DRAM Architecture:**
- Stores data as charge in a capacitor
- Requires periodic refresh (every ~64 ms) due to capacitor leakage
- Higher density makes it suitable for large memory arrays
- Used for off-chip main memory (DDR3, DDR4, DDR5)

**Why use SRAM for cache?**
- Speed matches CPU clock frequencies
- No refresh overhead
- Lower latency for critical path operations

**Why use DRAM for main memory?**
- Cost-effective for large capacities (GB range)
- Higher density per chip area
- Acceptable latency for bulk data storage

### **Write-back vs Write-through Cache**

Cache write policies determine how modifications are propagated to main memory. Write-through immediately updates both cache and memory, ensuring consistency but incurring memory latency on every write. Write-back only updates the cache, deferring memory writes until the cache line is evicted, improving performance but requiring dirty bit tracking and more complex coherence handling.

| Aspect | Write-through | Write-back |
|--------|---------------|------------|
| **Write Policy** | Write to cache AND memory | Write to cache only |
| **Memory Update** | Immediate | When cache line evicted (dirty) |
| **Consistency** | Always consistent | May be inconsistent |
| **Write Speed** | Slower (memory latency) | Faster (cache latency) |
| **Bus Traffic** | Higher | Lower |
| **Complexity** | Simpler | Needs dirty bit tracking |

**Write-through:**
```
CPU Write → Update Cache → Update Memory (immediately)
```
- Pros: Simple, memory always up-to-date
- Cons: Every write incurs memory latency
- Solution: Write buffer to hide memory latency

**Write-back:**
```
CPU Write → Update Cache (set dirty bit)
Cache Eviction → Write dirty line to memory
```
- Pros: Faster writes, less bus traffic
- Cons: Memory may have stale data, complexity

**MTK Interview Question:** "Write-back & Write-through cache, 各舉一個優點?"
- Write-through: Memory always consistent (good for multi-processor)
- Write-back: Higher performance (fewer memory writes)

### **Cache Associativity**

Cache associativity determines how memory addresses map to cache locations. Higher associativity reduces conflict misses but increases hardware complexity and access latency.

**Cache Mapping Strategies:**

| Type | Description | Conflict Misses | Hardware Cost |
|------|-------------|-----------------|---------------|
| **Direct-Mapped** | Each address maps to exactly one cache line | Highest | Lowest |
| **N-way Set Associative** | Address maps to one set, any of N lines | Moderate | Moderate |
| **Fully Associative** | Address can map to any cache line | Lowest | Highest |

**Address Breakdown:**

```
For a 32KB, 4-way set associative cache with 64-byte lines:

Address bits: |----Tag----|--Index--|--Offset--|
              |   20 bits |  7 bits |  6 bits  |

Cache organization:
  - 32KB / 64B = 512 cache lines total
  - 512 lines / 4 ways = 128 sets
  - Index bits: log₂(128) = 7 bits
  - Offset bits: log₂(64) = 6 bits
  - Tag bits: 32 - 7 - 6 = 19 bits
```

**Set-Associative Cache Structure:**

```
           Set 0      Set 1      Set 2      ...    Set N-1
         ┌─────────┬─────────┬─────────┬───────┬─────────┐
Way 0    │ Tag|Data│ Tag|Data│ Tag|Data│  ...  │ Tag|Data│
         ├─────────┼─────────┼─────────┼───────┼─────────┤
Way 1    │ Tag|Data│ Tag|Data│ Tag|Data│  ...  │ Tag|Data│
         ├─────────┼─────────┼─────────┼───────┼─────────┤
Way 2    │ Tag|Data│ Tag|Data│ Tag|Data│  ...  │ Tag|Data│
         ├─────────┼─────────┼─────────┼───────┼─────────┤
Way 3    │ Tag|Data│ Tag|Data│ Tag|Data│  ...  │ Tag|Data│
         └─────────┴─────────┴─────────┴───────┴─────────┘
```

**Replacement Policies:**

When a cache set is full and a new line must be loaded, the replacement policy determines which existing line to evict.

| Policy | Description | Implementation | Performance |
|--------|-------------|----------------|-------------|
| **LRU** | Evict least recently used | Track access order | Best, expensive |
| **Pseudo-LRU** | Approximate LRU with tree | 1 bit per 2 ways | Good, practical |
| **FIFO** | Evict oldest inserted | Queue per set | Moderate |
| **Random** | Evict random line | Counter | Simple, ~same as LRU for high N |

**LRU Implementation (2-way):**

```verilog
// Simple 2-way LRU: 1 bit per set
// mru[set] = 0 → Way 0 was most recently used
// mru[set] = 1 → Way 1 was most recently used

// On access to way:
mru[set] <= accessed_way;

// On replacement:
evict_way = ~mru[set];  // Evict least recently used
```

**Pseudo-LRU (4-way) Tree:**

```
        [B0]         ← Root bit: which half was LRU?
       /    \
    [B1]    [B2]     ← Which quarter was LRU?
    /  \    /  \
  W0   W1  W2   W3   ← Ways

On access to W2: Set B0=1 (right half used), B2=0 (left of right)
On replacement:  Follow LRU path: B0=0→left, B1=1→W1 evicted
```

**Associativity Trade-offs:**

| Associativity | Miss Rate | Access Time | Power | Typical Use |
|---------------|-----------|-------------|-------|-------------|
| **Direct** | Higher | Fastest | Lowest | L1 instruction cache |
| **2-way** | -15-20% | +5-10% | Moderate | L1 data cache |
| **4-way** | -5-10% | +10-15% | Moderate | L2 cache |
| **8+ way** | Diminishing | +15-25% | Higher | L3 cache |

**Interview Question:** "Why not use fully associative caches?"
- Requires comparing tag against ALL entries simultaneously
- N comparators needed for N entries
- Impractical for large caches (64KB+ with 64B lines = 1000+ comparators)
- Used only for small structures: TLBs, victim caches

### **MESI Protocol (Cache Coherence)**

In multi-core systems, each core has its own cache, creating the cache coherence problem: how to ensure all cores see consistent data. The MESI protocol is the most widely used solution.

**MESI States:**

| State | Description | Ownership | Memory |
|-------|-------------|-----------|--------|
| **M (Modified)** | Data modified, only in this cache | Exclusive | Stale |
| **E (Exclusive)** | Data clean, only in this cache | Exclusive | Up-to-date |
| **S (Shared)** | Data clean, may be in other caches | Shared | Up-to-date |
| **I (Invalid)** | Cache line not valid | None | - |

**State Transitions:**

```
        Read hit (any state except I): Stay in same state
        Write hit to E/M: Stay in M
        Write hit to S: Invalidate others → M

              ┌──────────────────────────────────┐
              │                                  │
              ▼         Read Miss                │
         ┌────────┐  (no other cache has it) ┌───┴────┐
         │   E    │◄─────────────────────────│   I    │
         │Exclusive│                          │Invalid │
         └───┬────┘                          └───▲────┘
             │ Write                              │
             ▼                                   │ Snoop: Other
         ┌────────┐                             │ core writes
         │   M    │──────────────────────────────┘
         │Modified│        Eviction (write back)
         └───┬────┘
             │ Snoop: Other core reads
             ▼
         ┌────────┐
         │   S    │◄──── Read Miss (other cache has it)
         │ Shared │
         └────────┘
```

**Snooping Protocol:**

All caches monitor (snoop) the shared bus for memory transactions:
- If another core reads an address I have in **M**, supply data & transition to **S**
- If another core writes an address I have in **M/E/S**, invalidate my copy → **I**

**Interview Scenario:** "Core A reads address X that Core B has in Modified state. What happens?"
1. Core A issues read request on bus
2. Core B snoops the request, sees address X
3. Core B supplies data directly (or via memory writeback)
4. Both caches transition to **Shared** state
5. Memory is updated (if writeback)

**Snooping vs Directory-Based:**

| Aspect | Snooping | Directory |
|--------|----------|-----------|
| **Mechanism** | Broadcast on shared bus | Centralized directory |
| **Scalability** | Poor (bus bottleneck) | Good (point-to-point) |
| **Latency** | Lower (broadcast) | Higher (directory lookup) |
| **Use Case** | 2-8 cores | Many-core systems |

**Real Implementations:**
- Intel Core: Uses MESI (or MESIF with Forward state)
- AMD Opteron: Uses MOESI (Owned state for dirty sharing)

**MESI Extensions:**

| Protocol | Extra State | Purpose |
|----------|-------------|---------|
| **MESIF** (Intel) | **Forward** | Designates one sharer to respond to requests, reducing bus traffic |
| **MOESI** (AMD) | **Owned** | Allows dirty data sharing without writeback to memory |
| **MERSI** | **Recent** | Similar to Forward, for cache-to-cache transfers |

**Common Interview Scenario:** "Core A reads address X that Core B has in Modified state. What happens?"
1. Core A issues read miss on bus
2. Core B snoops the request, recognizes the address
3. Core B intervenes: supplies data directly (or writes back to memory first)
4. Both caches transition to **Shared** state
5. Memory is now up-to-date (if writeback occurred)

---

## 電腦架構

### **Pipeline Hazards**

Pipeline hazard 是導致下一條指令無法在其指定 clock cycle 執行的情況。理解並減輕 hazard 是在 pipelined processor 中達到高指令吞吐量的基礎。

**Types of Hazards:**

| Type | Cause | Example |
|------|-------|---------|
| **Structural** | Hardware resource conflict | Single memory port for fetch + data access |
| **Data** | Instruction depends on result of previous | `ADD R1,R2,R3; SUB R4,R1,R5` (R1 dependency) |
| **Control** | Branch outcome unknown | `BEQ` instruction: which path to fetch? |

**Data Hazard Types (RAW, WAR, WAW):**

| Hazard | Full Name | Description | In-Order Pipeline? |
|--------|-----------|-------------|-------------------|
| **RAW** | Read After Write | Read before write completes | Yes (most common) |
| **WAR** | Write After Read | Write before read completes | Only in OoO |
| **WAW** | Write After Write | Second write before first | Only in OoO |

**RAW Hazard Example:**

```
Cycle:        1   2   3   4   5   6   7
ADD R1,R2,R3: IF  ID  EX  MEM WB
SUB R4,R1,R5:     IF  ID  EX  MEM WB
                      ↑
                  R1 not yet written!
                  (R1 available at cycle 5, needed at cycle 3)
```

**Solutions to Data Hazards:**

| Technique | Description | Latency | Hardware Cost |
|-----------|-------------|---------|---------------|
| **Stalling** | Insert NOPs until data ready | 1-3 cycles | Hazard detection unit |
| **Forwarding** | Bypass result from later stage | 0 cycles (usually) | Forwarding paths + MUXes |
| **Code reordering** | Compiler moves independent instructions | 0 cycles | Smart compiler |

**Forwarding (Bypassing):**

```
Without forwarding:
  ADD R1,R2,R3: IF─ID─EX─MEM─WB
  SUB R4,R1,R5:    IF─ID─stall─stall─EX─MEM─WB
                         (wait for R1)

With forwarding:
  ADD R1,R2,R3: IF─ID─EX─MEM─WB
  SUB R4,R1,R5:    IF─ID─EX─MEM─WB
                      ↑
                      R1 forwarded from EX stage output
```

**Forwarding Paths in 5-Stage Pipeline:**

```
┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
│ IF  │──►│ ID  │──►│ EX  │──►│ MEM │──►│ WB  │
└─────┘   └─────┘   └──┬──┘   └──┬──┘   └─────┘
                       │         │
                       │    ┌────┘ EX/MEM forward
                       │    │
                       ▼    ▼
                    ┌─────────┐
                    │Forwarding│
                    │  MUX    │
                    └─────────┘
                         │
                    To EX inputs
```

**Load-Use Hazard (Cannot be fully forwarded):**

```
LW  R1, 0(R2):  IF─ID─EX─MEM─WB
                           ↑
ADD R3, R1, R4:    IF─ID─stall─EX─MEM─WB
                           ↑
                   Data available HERE (end of MEM)
                   but needed HERE (start of EX)
                   → Must stall 1 cycle
```

**Control Hazards:**

Control hazards occur when the processor doesn't know which instruction to fetch next due to branches.

| Solution | Description | Penalty |
|----------|-------------|---------|
| **Stall** | Wait until branch resolved | 1-3 cycles |
| **Predict not-taken** | Always fetch next sequential | Mispredict penalty |
| **Predict taken** | Always fetch branch target | Mispredict penalty |
| **Branch prediction** | Use history to predict | ~5-15% mispredict |
| **Delayed branch** | Execute instruction after branch | Compiler fills slot |

**Branch Prediction vs Speculation:**

```
Prediction: Guess which path to fetch
Speculation: Actually EXECUTE the predicted path

If wrong:
  - Prediction: Just fetch correct path (small penalty)
  - Speculation: Must FLUSH pipeline and rollback state (large penalty)
```

**Modern CPU Hazard Handling:**

| Technique | Purpose |
|-----------|---------|
| **Register renaming** | Eliminate WAR/WAW hazards |
| **Out-of-order execution** | Hide latency by executing ready instructions |
| **Speculative execution** | Execute past unresolved branches |
| **Memory disambiguation** | Detect/handle load-store conflicts |

### **Branch Predictor**

Branch predictor predicts the outcome of branch instructions to keep pipeline full.

**Why needed:**
- Branch instructions cause pipeline stalls
- Without prediction: wait until branch resolved (waste cycles)
- With prediction: speculatively fetch predicted path

**Types of Branch Predictors:**

Branch predictors have evolved from simple static rules to sophisticated learning-based approaches. Modern processors use multiple predictors in parallel, selecting the best prediction based on branch history and program context.

| Type | Description | Accuracy |
|------|-------------|----------|
| **Static** | Always predict taken/not-taken | ~60-70% |
| **1-bit** | Remember last outcome | ~80-85% |
| **2-bit** | 4-state saturating counter | ~85-90% |
| **Correlating** | Use history of other branches | ~90-95% |
| **Tournament** | Combine multiple predictors | ~95%+ |

**2-bit Saturating Counter:**
```
                    Taken
         ┌──────────────────────┐
         ↓                      │
    ┌─────────┐  Taken   ┌─────────┐
    │ Strongly│ ───────→ │ Weakly  │
    │  Taken  │ ←─────── │  Taken  │
    └─────────┘ Not Taken└─────────┘
         │                      ↑
         │ Not Taken    Taken   │
         ↓                      │
    ┌─────────┐ Not Taken┌─────────┐
    │ Weakly  │ ───────→ │Strongly │
    │Not Taken│ ←─────── │Not Taken│
    └─────────┘  Taken   └─────────┘
```

**States:** 11 (Strongly Taken) → 10 (Weakly Taken) → 01 (Weakly Not Taken) → 00 (Strongly Not Taken)

**Branch Target Buffer (BTB):**
- Cache storing branch target addresses
- Indexed by branch instruction PC
- Provides target address before decode stage

**Misprediction Penalty:**
- Flush pipeline
- Restart from correct address
- Modern CPUs: 10-20 cycle penalty

**Why 2-bit Beats 1-bit:**
```
Consider a loop that executes 10 times:
  Branch pattern: TTTTTTTTTN (9 taken, 1 not-taken)

1-bit predictor:
  Misses: First iteration (was N→predict N, actual T)
          Last iteration (was T→predict T, actual N)
          First iteration next time (was N→predict N, actual T)
  = 2-3 misses per loop execution

2-bit predictor:
  Misses: Only the last iteration (strongly taken→still predict T)
          Takes 2 not-takens to flip prediction
  = 1 miss per loop execution
```

**Tournament Predictor:** Uses a "choice predictor" (another 2-bit counter) to select between a local predictor (branch-specific history) and a global predictor (correlated branch history). The Alpha 21264 used this approach with 4K entries.

**MTK Interview Question:** "Branch predictor的實做方式?"
- Use BTB for target address prediction
- Use 2-bit counter or correlating predictor for direction
- Implemented in Fetch stage of pipeline

### **Virtual Memory & TLB**

Virtual memory 提供程序間的記憶體隔離，並允許程式使用超過實體可用的記憶體。Translation Lookaside Buffer（TLB）是加速 virtual-to-physical address translation 的關鍵 cache。

**Virtual Memory Concepts:**

| Concept | Description |
|---------|-------------|
| **Virtual Address** | Address used by program (per-process unique) |
| **Physical Address** | Actual hardware memory location |
| **Page** | Fixed-size memory block (typically 4KB) |
| **Page Table** | Maps virtual pages to physical frames |
| **Page Fault** | Access to page not in physical memory |

**Address Translation:**

```
Virtual Address:
┌──────────────────────┬─────────────┐
│  Virtual Page Number │ Page Offset │
│       (VPN)         │             │
└──────────┬───────────┴─────────────┘
           │
           ▼ Page Table Lookup
┌──────────────────────┬─────────────┐
│ Physical Frame Number│ Page Offset │
│       (PFN)         │   (same)    │
└──────────────────────┴─────────────┘
Physical Address
```

**Why TLB is Needed:**

Without TLB, every memory access requires two memory accesses:
1. Access page table to get physical address
2. Access actual data

This doubles memory latency—unacceptable for performance.

**TLB Organization:**

```
┌───────────────────────────────────────────────────┐
│                      TLB                           │
├─────────┬─────────┬───────┬───────────────────────┤
│   VPN   │  ASID   │ Valid │  PFN + Permissions    │
├─────────┼─────────┼───────┼───────────────────────┤
│  0x1234 │   5     │   1   │ 0x5678, RWX           │
│  0x2000 │   5     │   1   │ 0x3000, R--           │
│  0x3456 │   7     │   1   │ 0x7890, RW-           │
│   ...   │  ...    │  ...  │  ...                  │
└─────────┴─────────┴───────┴───────────────────────┘

ASID = Address Space Identifier (for process isolation)
```

**TLB Hit/Miss:**

| Event | Action | Latency |
|-------|--------|---------|
| **TLB Hit** | Use cached translation | 0.5-1 cycle |
| **TLB Miss (HW)** | Hardware walks page table | 10-100 cycles |
| **TLB Miss (SW)** | OS handles page table walk | 100-1000 cycles |
| **Page Fault** | OS loads page from disk | Millions of cycles |

**TLB Types:**

| Type | Structure | Pros | Cons |
|------|-----------|------|------|
| **Fully Associative** | Any VPN → any entry | Best hit rate | Expensive comparison |
| **Set Associative** | VPN → specific set | Balance cost/performance | Common choice |
| **Separate I/D TLB** | Instruction + Data TLBs | Parallel access | More hardware |

**TLB Reach:**

```
TLB Reach = TLB_entries × Page_size

Example:
  64-entry TLB with 4KB pages:
  TLB Reach = 64 × 4KB = 256KB

With 2MB huge pages:
  TLB Reach = 64 × 2MB = 128MB (much larger working set!)
```

**Context Switch and TLB:**

On context switch between processes, TLB entries become invalid because virtual addresses map differently.

**Solutions:**

| Method | Description | Trade-off |
|--------|-------------|-----------|
| **TLB Flush** | Invalidate all entries | Simple, but loses cached translations |
| **ASID (Address Space ID)** | Tag entries with process ID | Entries preserved, hardware cost |
| **PCID (Process Context ID)** | x86 extension of ASID | 12-bit ID, avoids most flushes |

**Typical TLB Hierarchy:**

```
CPU Core
    │
    ▼
┌─────────────────┐
│   L1 ITLB       │ ← Instruction TLB (small, fast)
│   (32 entries)  │
├─────────────────┤
│   L1 DTLB       │ ← Data TLB (small, fast)
│   (64 entries)  │
├─────────────────┤
│   L2 STLB       │ ← Shared TLB (larger, slower)
│   (512 entries) │
└─────────────────┘
         │
         ▼
    Page Table
    (in memory)
```

**Modern TLB Characteristics:**

| Processor | L1 DTLB | L1 ITLB | L2 TLB |
|-----------|---------|---------|--------|
| Intel Skylake | 64 entries, 4-way | 128 entries, 8-way | 1536 entries, 12-way |
| ARM Cortex-A72 | 48 entries, FA | 48 entries, FA | 1024 entries, 4-way |

**Interview Question:** "Why is TLB miss expensive?"

A TLB miss triggers a page table walk, which requires multiple memory accesses (one per page table level). Modern systems use 4-5 level page tables for 48-bit virtual addresses, potentially requiring 4-5 memory accesses—hundreds of cycles.

---

## 常見面試問題

### **Input/Output Delay**

**Purpose:** Model external delays for timing analysis at chip boundaries.

```tcl
# Input delay: time from external clock edge to data arriving at input pin
set_input_delay -clock CLK -max 3.0 [get_ports data_in]
set_input_delay -clock CLK -min 1.0 [get_ports data_in]

# Output delay: time required for data to be stable at output before external capture
set_output_delay -clock CLK -max 2.5 [get_ports data_out]
set_output_delay -clock CLK -min 0.5 [get_ports data_out]
```

**How to determine values:**
- Based on external device timing specs (setup/hold of receiving chip)
- PCB trace delays
- Typically 30-60% of clock period for conservative design

### **What Coding Causes Latch Inference?**

Incomplete conditional assignments in combinational logic:

```verilog
// WRONG - creates latch (missing else)
always @(*) begin
    if (sel)
        out = a;
    // no else → latch inferred to hold previous value
end

// WRONG - incomplete case
always @(*) begin
    case (sel)
        2'b00: out = a;
        2'b01: out = b;
        // missing 2'b10, 2'b11 → latch inferred
    endcase
end

// CORRECT - complete assignment
always @(*) begin
    if (sel)
        out = a;
    else
        out = b;  // explicit else
end

// CORRECT - use default
always @(*) begin
    case (sel)
        2'b00: out = a;
        2'b01: out = b;
        default: out = 1'b0;  // covers all cases
    endcase
end
```

### **Pipeline Concept**

Pipeline divides a long combinational path into shorter stages with registers, allowing higher clock frequency at the cost of latency.

```
Without pipeline: Tclk ≥ Tcq + Tlogic_total + Tsetup

With N-stage pipeline: Tclk ≥ Tcq + (Tlogic_total/N) + Tsetup
```

**Trade-offs:**
- **Throughput**: Same (1 result per cycle after pipeline fills)
- **Latency**: Increased by N cycles
- **Frequency**: Can be ~N× higher
- **Area**: More registers needed

### **Clock Skew Effect on Setup/Hold**

Clock skew is the difference in arrival time of the clock signal at different flip-flops. While often considered harmful, skew can be deliberately used ("useful skew") to fix timing violations. Understanding how skew affects setup and hold margins is crucial for both timing analysis and optimization.

**Clock skew** = arrival time difference between clocks at launch and capture flip-flops.

```
Positive skew: Capture clock arrives LATER than launch clock
Negative skew: Capture clock arrives EARLIER than launch clock
```

| Skew Type | Setup | Hold |
|-----------|-------|------|
| **Positive** (+Tskew) | Helps (more time) | Hurts (less margin) |
| **Negative** (-Tskew) | Hurts (less time) | Helps (more margin) |

**Useful skew:** Intentionally adding positive skew to fix setup violations (but watch hold!).

### **Can Hold Time Be Zero or Negative?**

**Yes!** Hold time can be zero or even negative.

- **Thold = 0**: Data can change immediately after clock edge
- **Thold < 0** (negative): Data can change slightly BEFORE clock edge

This occurs in fast flip-flop designs where internal delays ensure data is already captured before the clock edge fully propagates. Common in advanced process nodes.

**Why hold time is independent of clock period:** Hold is measured from the SAME clock edge that captured the data, not the next edge. It only depends on flip-flop internal timing, not clock frequency.

### **SystemVerilog Purpose**

SystemVerilog (IEEE 1800) extends Verilog with features for both design and verification. It adds hardware description enhancements like interfaces and always_ff/always_comb blocks, plus powerful verification constructs including classes, constrained random generation, and assertions. Modern verification methodologies (UVM) are built entirely on SystemVerilog.

| Feature | Purpose |
|---------|---------|
| **Data types** | `logic`, `bit`, `int`, `enum`, `struct`, `union` |
| **OOP** | Classes, inheritance for testbenches |
| **Assertions** | `assert`, `assume`, `cover` for formal verification |
| **Constraints** | `randomize()` for constrained random verification |
| **Interfaces** | Bundle signals, simplify connections |
| **Clocking blocks** | Specify timing for testbench sampling |
| **Covergroups** | Functional coverage collection |

### **Building Gates Using MUX**

A 2:1 multiplexer is functionally complete—any Boolean function can be implemented using only MUXes. This principle underlies FPGA LUT architecture, where N-input LUTs are essentially 2^N:1 MUXes with programmable truth tables. Understanding MUX-based gate implementation is a common interview question.

**2:1 MUX behavior:** `Y = S ? I1 : I0`

```
Implement NOT using MUX:
Y = A ? 0 : 1  →  NOT(A)
    ┌───┐
0 ──┤ 1 │
    │MUX├── Y = NOT(A)
1 ──┤ 0 │
    └─┬─┘
      A

Implement AND using MUX:
Y = B ? A : 0  →  A AND B
    ┌───┐
0 ──┤ 0 │
    │MUX├── Y = A·B
A ──┤ 1 │
    └─┬─┘
      B

Implement OR using MUX:
Y = B ? 1 : A  →  A OR B
    ┌───┐
A ──┤ 0 │
    │MUX├── Y = A+B
1 ──┤ 1 │
    └─┬─┘
      B

Implement XOR using MUX:
Y = B ? NOT(A) : A  →  A XOR B
    ┌───┐
A ──┤ 0 │
    │MUX├── Y = A⊕B
Ā ──┤ 1 │
    └─┬─┘
      B

Implement NAND using MUX:
Y = B ? NOT(A) : 1  →  NOT(A AND B)
    ┌───┐
1 ──┤ 0 │
    │MUX├── Y = (A·B)'
Ā ──┤ 1 │
    └─┬─┘
      B
```

### **Building Gates Using NAND Only**

NAND gates are universal—any Boolean function can be implemented using only NAND gates. This is why NAND-based standard cell libraries were historically common (though modern libraries include optimized cells for each function). The same universality applies to NOR gates.

```
NOT:  Y = (A NAND A) = A'
AND:  Y = ((A NAND B) NAND (A NAND B)) = A·B
OR:   Y = ((A NAND A) NAND (B NAND B)) = A+B
XOR:  Y = ((A NAND (A NAND B)) NAND (B NAND (A NAND B)))
```

### **How Cache Accelerates CPU**

Caches bridge the speed gap between fast CPUs and slow main memory by keeping frequently-accessed data close to the processor. The effectiveness of caching depends on program behavior exhibiting locality—the tendency to access the same or nearby memory locations repeatedly.

Cache exploits **temporal** and **spatial locality**:

| Principle | Description |
|-----------|-------------|
| **Temporal locality** | Recently accessed data likely accessed again soon |
| **Spatial locality** | Nearby addresses likely accessed soon (prefetch cache lines) |

**Performance impact:**
- L1 cache hit: ~1-4 cycles
- L2 cache hit: ~10-20 cycles
- L3 cache hit: ~30-50 cycles
- Main memory: ~100-300 cycles

**Cache reduces average memory access time:**
```
AMAT = Hit_time + Miss_rate × Miss_penalty
```

### **Can 2-Stage FF Solve All CDC Problems?**

**No!** 2-stage synchronizer only works for:
- ✅ Single-bit signals
- ✅ Level signals (not pulses shorter than destination clock period)

**Cannot solve:**
- ❌ Multi-bit buses (bits may sync at different times)
- ❌ Very short pulses (may be missed entirely)
- ❌ High-frequency data (MTBF too low)

**Solutions for multi-bit:** Async FIFO, handshake, MCP (multi-cycle path).

### **Files Needed for Synthesis**

Logic synthesis requires the design source code, timing/power characterization of target cells, and constraints specifying timing requirements. Missing or incorrect files result in synthesis failures or designs that don't meet specifications.

| File Type | Description |
|-----------|-------------|
| **RTL files** | Verilog/VHDL source code (.v, .vhd) |
| **Technology library** | .db/.lib files with cell timing/power |
| **Constraints** | SDC file (clocks, I/O delays, exceptions) |
| **Floorplan** | DEF file (optional, for physical-aware synthesis) |

```tcl
# Basic synthesis script
read_verilog design.v
read_db slow.db
source constraints.sdc
compile_ultra
write -format verilog -output netlist.v
write_sdc output.sdc
```

### **Glitch Causes and Prevention**

**Causes:**
- Unequal path delays in combinational logic
- Race conditions
- Clock domain crossing without synchronization

**Prevention:**
- Register outputs of combinational blocks
- Use Gray code for counters crossing domains
- Add synchronizers for async signals
- Use glitch-free clock gating cells (latch-based ICG)

### **Dual-Edge Detection**

Detect both rising and falling edges of a signal:

```verilog
module dual_edge_detect (
    input  clk,
    input  rst_n,
    input  sig_in,
    output rise_edge,
    output fall_edge,
    output any_edge
);

reg sig_d1, sig_d2;

always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        sig_d1 <= 1'b0;
        sig_d2 <= 1'b0;
    end else begin
        sig_d1 <= sig_in;
        sig_d2 <= sig_d1;
    end
end

assign rise_edge = sig_d1 & ~sig_d2;   // 0→1 transition
assign fall_edge = ~sig_d1 & sig_d2;   // 1→0 transition
assign any_edge  = sig_d1 ^ sig_d2;    // any transition

endmodule
```

**Timing Diagram:**
```
sig_in:   ────┐     ┌─────┐     ┌────
              └─────┘     └─────┘
sig_d1:   ─────┐     ┌─────┐     ┌───
               └─────┘     └─────┘
sig_d2:   ──────┐     ┌─────┐     ┌──
                └─────┘     └─────┘
rise:     ──────╥─────────╥──────────
                ║         ║
fall:     ────────────╥─────────╥────
                      ║         ║
```

### **Common Protocols**

Key protocols in digital IC design:

| Protocol | Full Name | Description |
|----------|-----------|-------------|
| **SPI** | Serial Peripheral Interface | 4-wire synchronous serial (MOSI, MISO, SCLK, CS) |
| **I2C** | Inter-Integrated Circuit | 2-wire serial (SDA, SCL), multi-master |
| **UART** | Universal Async Receiver/Transmitter | Asynchronous serial, start/stop bits |
| **LVDS** | Low-Voltage Differential Signaling | High-speed differential pairs |
| **DDR** | Double Data Rate | Data on both clock edges |
| **SerDes** | Serializer/Deserializer | Parallel ↔ serial conversion |
| **PCIe** | PCI Express | High-speed serial interconnect |
| **USB** | Universal Serial Bus | Differential serial, multiple speeds |
| **JTAG** | Joint Test Action Group | Boundary scan, debugging (IEEE 1149.1) |
| **AXI** | Advanced eXtensible Interface | ARM AMBA bus protocol |

**DDR Concept:**
- Transfers data on both rising and falling clock edges
- Effectively doubles data rate without increasing clock frequency
- Used in DDR SDRAM (DDR3, DDR4, DDR5)

```
CLK:    ──┐  ┌──┐  ┌──┐  ┌──
          └──┘  └──┘  └──┘
SDR:    ──D0────D1────D2────  (1 bit per cycle)
DDR:    ──D0─D1─D2─D3─D4─D5─  (2 bits per cycle)
```

#### **AXI Protocol (AMBA)**

AXI (Advanced eXtensible Interface) is ARM's high-performance bus protocol for SoC interconnects, widely used in ARM-based SoCs.

**Five Independent Channels:**

| Channel | Direction | Purpose |
|---------|-----------|---------|
| **AW** (Write Address) | Master → Slave | Write address and control |
| **W** (Write Data) | Master → Slave | Write data |
| **B** (Write Response) | Slave → Master | Write completion status |
| **AR** (Read Address) | Master → Slave | Read address and control |
| **R** (Read Data) | Slave → Master | Read data and status |

**VALID/READY Handshake:**

Every channel uses the same handshake mechanism:

```
        ┌─────┐          ┌─────┐
VALID ──┤     ├── DATA ──┤     ├──
        │ SRC │          │ DST │
READY ◄─┤     │◄─────────┤     │◄──
        └─────┘          └─────┘

Transfer occurs when BOTH VALID and READY are HIGH.
```

**Critical Rule (Deadlock Prevention):**
- **VALID must NOT depend on READY** - Source asserts VALID when data is available
- **READY may depend on VALID** - Destination can wait to see data before asserting READY

This asymmetric rule is fundamental to preventing deadlock in AXI systems.

```verilog
// WRONG - causes deadlock (circular dependency)
assign VALID = ready_from_slave;  // Never!

// CORRECT - VALID independent of READY
always @(posedge clk)
    if (have_data) VALID <= 1'b1;
```

**Why Deadlock Occurs:**
```
Deadlock scenario:
  Master: "I'll assert VALID when I see READY"
  Slave:  "I'll assert READY when I see VALID"
  Result: Both wait forever → DEADLOCK

Safe scenario:
  Master: "I have data, asserting VALID" (no wait for READY)
  Slave:  Can assert READY anytime (before, with, or after VALID)
  Result: Transfer completes when both are high → SUCCESS
```

**Additional AXI Protocol Rules:**
- Once VALID is asserted, it must remain asserted until handshake completes
- VALID/READY cannot be de-asserted in the same cycle they are both high
- A master must not wait for AWREADY before driving WVALID (prevents write channel deadlock)

**Key AXI Features:**

| Feature | Description |
|---------|-------------|
| **Out-of-Order** | Transactions with different IDs can complete out of order |
| **Interleaving** | Read data from different transactions can be interleaved |
| **Burst Types** | FIXED (FIFO), INCR (sequential), WRAP (cache line) |
| **Outstanding** | Multiple pending transactions improve throughput |

**Burst Types:**
```
FIXED:  [A][A][A][A]     Same address (FIFO access)
INCR:   [A][A+1][A+2]... Incrementing address
WRAP:   [A+2][A+3][A][A+1] Wraps at boundary (cache line fill)
```

**AXI vs AHB Comparison:**

| Aspect | AXI | AHB |
|--------|-----|-----|
| **Topology** | Point-to-point, multi-channel | Shared bus |
| **Transactions** | Read/Write separated | Multiplexed |
| **Outstanding** | Multiple outstanding | One at a time |
| **Ordering** | Out-of-order supported | In-order only |
| **Complexity** | Higher | Lower |
| **Performance** | Higher throughput | Lower latency |

**Transaction ID (xID):**
- AWID/ARID: Transaction identifier
- Same-ID transactions complete in order
- Different-ID transactions can complete out of order
- Enables efficient memory controller pipelining

### **DDR Memory Timing**

DDR（Double Data Rate）SDRAM 在 clock 的兩個邊緣傳輸資料，有效地將頻寬加倍。理解 DDR timing 參數對於 memory controller 設計和系統 timing closure 至關重要。

**DDR vs SDR:**

```
         CLK
SDR:     ──┐  ┌──┐  ┌──┐  ┌──
           └──┘  └──┘  └──┘
Data:    ──D0────D1────D2────  (1 transfer per cycle)

DDR:     ──┐  ┌──┐  ┌──┐  ┌──
           └──┘  └──┘  └──┘
Data:    ──D0─D1─D2─D3─D4─D5─  (2 transfers per cycle)
```

**Key Timing Parameters:**

| Parameter | Full Name | Description |
|-----------|-----------|-------------|
| **CL** | CAS Latency | Clock cycles from READ command to first data |
| **tRCD** | RAS to CAS Delay | Time to activate row before column access |
| **tRP** | Row Precharge Time | Time to close (precharge) a row |
| **tRAS** | Row Active Time | Minimum time row must be active |
| **tRC** | Row Cycle Time | Minimum time between row activations (tRAS + tRP) |

**Memory Timing Notation:**

DDR memory is often specified as CL-tRCD-tRP-tRAS (e.g., "16-18-18-36"):

```
DDR4-3200 CL16-18-18-36:
  CL   = 16 clocks → 16 × 0.625ns = 10.0ns (CAS latency)
  tRCD = 18 clocks → 18 × 0.625ns = 11.25ns
  tRP  = 18 clocks → 18 × 0.625ns = 11.25ns
  tRAS = 36 clocks → 36 × 0.625ns = 22.5ns

Clock period at DDR4-3200: 1 / 1600MHz = 0.625ns
```

**Read Operation Timing:**

```
        tRCD            CL
    ◄──────────► ◄────────────────►
CLK:  │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │
      ┌─┐       ┌─┐
CMD:  │ACT│     │RD │
      └─┘       └─┘
                              ┌─┬─┬─┬─┐
DQ:   ─────────────────────────│D0│D1│D2│D3│ (burst)
                              └─┴─┴─┴─┘
      │←────── tAA (Access time) ──────→│

tAA = tRCD + CL (total access latency from row activation)
```

**Write Operation Timing:**

```
      tRCD            CWL         tWR
    ◄──────► ◄──────────► ◄───────────►
CLK: │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │ │
     ┌─┐     ┌─┐
CMD: │ACT│   │WR │            ┌───┐
     └─┘     └─┘              │PRE│
                ┌─┬─┬─┬─┐     └───┘
DQ:  ───────────│D0│D1│D2│D3│
                └─┴─┴─┴─┘
                        │←─tWR→│ Write recovery

CWL = CAS Write Latency (typically CL - 1 or CL - 2)
tWR = Write Recovery time (data to precharge)
```

**Absolute vs Clock Cycle Latency:**

| DDR Type | Frequency | Clock Period | CL (cycles) | CL (ns) |
|----------|-----------|--------------|-------------|---------|
| DDR3-1600 | 800 MHz | 1.25 ns | 11 | 13.75 ns |
| DDR4-2400 | 1200 MHz | 0.833 ns | 16 | 13.3 ns |
| DDR4-3200 | 1600 MHz | 0.625 ns | 16 | 10.0 ns |
| DDR5-4800 | 2400 MHz | 0.417 ns | 40 | 16.7 ns |

Note: Higher frequency DDR has more CL cycles but similar absolute latency.

**Memory Access Scenarios:**

| Scenario | Description | Latency |
|----------|-------------|---------|
| **Page Hit** | Row already open, same row | CL |
| **Page Miss** | Different row, need precharge + activate | tRP + tRCD + CL |
| **Page Empty** | No row open | tRCD + CL |

**DQS (Data Strobe):**

DDR uses source-synchronous clocking with DQS signal:

```
Write (DQS edge-aligned with DQ):
DQS:  ────┐  ┌──┐  ┌──┐  ┌────
          └──┘  └──┘  └──┘
DQ:   ────│D0│D1│D2│D3│D4│D5│D6│D7│────
         ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑
      Data valid at DQS edges

Read (DQS center-aligned with DQ):
DQS:  ──────┐  ┌──┐  ┌──┐  ┌────
            └──┘  └──┘  └──┘
DQ:   ────│D0│D1│D2│D3│D4│D5│D6│D7│────
            ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑
         Sample at DQS center
```

**Training and Calibration:**

Modern DDR controllers perform training to find optimal timing:

| Training | Purpose |
|----------|---------|
| **Write Leveling** | Align DQS to CK at memory |
| **Read DQS Gate** | Find when DQS is valid |
| **Write/Read DQ** | Optimize data eye centering |
| **VREF Training** | Calibrate voltage reference |

**Interview Question:** "What determines DDR access latency?"

For a page miss: tRP (close old row) + tRCD (open new row) + CL (column access). For DDR4-3200: ~11ns + 11ns + 10ns = ~32ns. This is why keeping rows open (page hit) dramatically improves performance.

### **EDA Scripting (Tcl)**

Tcl (Tool Command Language) is the standard scripting language for EDA tools (Design Compiler, PrimeTime, ICC).

**Essential Tcl Commands:**

```tcl
# Get collections
get_cells *reg*              # All cells matching pattern
get_pins U1/D                # Specific pin
get_nets clk                 # Clock net
get_ports data_in            # I/O port
get_clocks sys_clk           # Defined clocks

# Iterate over collections
foreach_in_collection cell [get_cells *] {
    set name [get_attribute $cell full_name]
    puts "Cell: $name"
}

# Get attributes
get_attribute [get_cells U1] ref_name    # Cell type
get_attribute [get_pins U1/Q] direction  # Pin direction

# Reporting
report_timing -from [get_pins */D] -to [get_pins */Q]
report_area
report_power

# Constraints
set_max_delay 5.0 -from A -to B
set_false_path -from [get_clocks clk_a] -to [get_clocks clk_b]
```

**Log Analysis (Shell/Perl/Python):**

```bash
# Find all errors in log
grep -i "error" synthesis.log

# Count warnings
grep -c "Warning" synthesis.log

# Extract timing violations
grep "VIOLATED" timing.rpt | awk '{print $2, $NF}'

# Find worst slack
grep "slack" timing.rpt | sort -k2 -n | head -1
```

---

## 面試經驗

### **MTK**
部門：CAI、SPD1、SPD3、ADCT

面試題目： setup/hold calculation, CDC (multi bit), false path & multi cycle differences and settings, input/output delay, synchronous vs asynchronous differences, gray code, write RTL from waveform, IC design flow, SystemVerilog, build adder and multiplier using MUX, async FIFO, build OR using NAND, divide-by-3 circuit, pre/post sim differences, files needed for synthesis, divide-by-1.5 circuit, how cache accelerates CPU, clock gated

### **RTK**
部門：CN、RDC、MM

面試題目：blocking/non-blocking、frequency divider circuit、critical path calculation、build DFF using two latches、low power design、down counter、clock skew effect on setup/hold、setup/hold violation solutions、what coding causes latch、design NAND using MUX、IC design flow、how to determine clock timing during synthesis、can hold time be 0、pipeline、how to set multicycle value、PVT violation

### **NTK**
部門：TCON、iHome

面試題目：divide-by-2 circuit (without using cnt)、draw synthesized circuit from RTL、explain metastability、input/output delay purpose & setting values、pipeline handling、fault coverage、set max/min delay for violation、async rst issues、blocking/non-blocking、build combinational circuit using NAND/NOR、setup/hold negative value cases、why hold time is independent of clk、full adder、number base conversion

### **PHISON**
部門：SSD、EMMC

面試題目：setup/hold inequality、clock gated、IC design flow、synchronous vs asynchronous、frequency divider circuit、build NAND & INV using PMOS and NMOS、CDC (multi bit)、metastability、XOR truth table、multicycle & false path、design XOR using MUX、how many cycles from counter input to output、critical path、how to avoid clock skew/latch、characteristics of hold time in cell library、SystemVerilog purpose

### **SMI**
部門：UFS、SSD

面試題目：CDC、FSM、draw MUX using AND/OR、low power design、timing violation handling methods、IC design flow、SDF contents、latch/DFF differences、glitch causes、build AND using NOR、input/output delay、explain timing report、can two-stage DFF solve all CDC、draw clock/data path of setup/hold、how to place MUX to save area、build XOR using INV and MUX、divide-by-3 circuit、edge/level trigger

### **GUC**
部門：APR、DFT

面試題目：APR flow、power ring、CTS purpose、IR drop、scan chain、test/fault coverage differences、scan reorder、lockup latch、BIST、stuck at fault、transition delay fault、cross talk、electromigration、draw SDFF、boundary scan、why DFT is needed、DRC/LVS、ATPG、how to verify APR function matches RTL、APR command、problems encountered in back-end with advanced process、LEF and DB file contents、wire load model

---

## 參考資料

### CDC
- [https://www.zhihu.com/people/li-hong-jiang-54](https://www.zhihu.com/people/li-hong-jiang-54)
- [Clock Domain Crossing - The Complete Reference Guide](https://thedatabus.in/cdc_complete_guide/)
- [CDC Design & Verification - Cliff Cummings](http://www.sunburst-design.com/papers/CummingsSNUG2008Boston_CDC.pdf)

### Metastability & MTBF
- [Metastability and MTBF Explained](https://thedatabus.in/metastab_mtbf/)
- [Metastability and Synchronizers Tutorial - Ran Ginosar](https://www.cs.unc.edu/~montek/teaching/Comp790-Fall11/Home/Home_files/ginosar-tutorial-dt-2011.pdf)

### Setup/Hold Violations
- [16 Ways To Fix Setup and Hold Time Violations - EDN](https://www.edn.com/ways-to-solve-the-setup-and-hold-time-violation-in-digital-logic/)
- [10 Ways to Fix Setup and Hold Violations](https://www.vlsi-expert.com/2014/01/10-ways-to-fix-setup-and-hold-violation.html)

### 低功耗設計
- [What is Low Power Design? - Synopsys](https://www.synopsys.com/glossary/what-is-low-power-design.html)
- [The Ultimate Guide to Clock Gating - AnySilicon](https://anysilicon.com/the-ultimate-guide-to-clock-gating/)

### Latch vs Flip-Flop & Time Borrowing
- [Difference Between Latch and Flip-Flop - GeeksforGeeks](https://www.geeksforgeeks.org/gate/difference-between-flip-flop-and-latch/)
- [Time Borrowing in Latch-Based Designs - LogicMadness](https://logicmadness.com/time-borrowing/)
- [Time Borrowing Concept in STA - PhysicalDesign4U](https://www.physicaldesign4u.com/2020/05/time-borrowing-concept-in-sta.html)

### Gray Code Conversion
- [Verilog Binary to Gray - ChipVerify](https://www.chipverify.com/verilog/verilog-binary-to-gray)

### Digital IC Interview Experience
- [https://www.dcard.tw/f/tech_job/p/238023076](https://www.dcard.tw/f/tech_job/p/238023076)

### Frequency Divider
- [https://www.cnblogs.com/oomusou/archive/2008/07/31/verilog_clock_divider.html](https://www.cnblogs.com/oomusou/archive/2008/07/31/verilog_clock_divider.html)

### Verilog & ASIC Flow
- [Digital IC Design Interview Guide (CSDN)](https://blog.csdn.net/qq_36045093/article/details/120302713)
- [Digital IC Design Fundamentals (CSDN)](https://blog.csdn.net/qq_36045093/article/details/119741748)
- [Digital IC Classic 100 Questions (CSDN)](https://blog.csdn.net/qq_41394155/article/details/89349935)
- [Backend 100 Questions Q91-100 (CSDN)](https://blog.csdn.net/weixin_39522408/article/details/112765703)
- [Nonblocking Assignments in Verilog Synthesis - Cliff Cummings (SNUG)](http://www.sunburst-design.com/papers/CummingsSNUG2000SJ_NBA.pdf)

### On-Chip Variation (OCV)
- [OCV, AOCV, and POCV - SignOff Semiconductors](https://signoffsemiconductors.com/ocv-aocv-and-pocv/)
- [OCV, AOCV and POCV Comparative Analysis - Team VLSI](https://teamvlsi.com/2020/07/ocv-aocv-and-pocv-in-vlsi-comparative.html)
- [On-Chip Variation for Timing Closure - Tech Design Forum](https://www.techdesignforums.com/practice/guides/on-chip-variation-ocv/)

### DFT & Scan Chain
- [Design for Testability - Synopsys](https://www.synopsys.com/glossary/what-is-design-for-test.html)
- [DFT, Scan and ATPG - VLSI Tutorials](https://vlsitutorials.com/dft-scan-and-atpg/)
- [Scan Chain Architectures - Medium](https://medium.com/@ranaumarnadeem/design-for-testability-scan-chain-architectures-and-variants-623ea712fa52)

### Physical Design Effects
- [Antenna Effect in VLSI - Team VLSI](https://teamvlsi.com/2020/05/antenna-effect-in-vlsi-design.html)
- [Antenna Prevention Techniques - Team VLSI](https://teamvlsi.com/2020/06/antenna-prevention-techniques-in-vlsi.html)
- [Latch-up Prevention in CMOS - ResearchGate](https://www.researchgate.net/publication/366552018_Overview_on_Latch-up_Prevention_in_CMOS_Integrated_Circuits_by_Circuit_Solutions)

### AXI Protocol
- [AXI Channel Handshake Deadlock Prevention - System on Chips](https://www.systemonchips.com/axi-channel-handshake-deadlock-prevention-and-protocol-compliance/)
- [AMBA AXI Protocol Specification - ARM](https://developer.arm.com/documentation/ihi0022/e/)
- [Ready/Valid Handshake Rules - FPGA CPU](https://fpgacpu.ca/fpga/handshake.html)

### Cache Coherence
- [MESI Protocol - Wikipedia](https://en.wikipedia.org/wiki/MESI_protocol)
- [Cache Coherence Protocols - Eureka](https://eureka.patsnap.com/article/cache-coherence-protocols-mesi-moesi-and-directory-based-systems)
- [MESI and MOESI Protocols - ARM Developer](https://developer.arm.com/documentation/den0013/latest/Multi-core-processors/Cache-coherency/MESI-and-MOESI-protocols)

### FSM & State Encoding
- [FSM Encoding: Binary, One-Hot, and Others - Sigasi](https://www.sigasi.com/tech/vhdl-onehot-fsm/)
- [Comparing Binary, Gray, and One-Hot Encoding - All About Circuits](https://www.allaboutcircuits.com/technical-articles/comparing-binary-gray-one-hot-encoding/)

### FPGA Metastability
- [Understanding Metastability in FPGAs - Intel](https://cdrdv2-public.intel.com/650346/wp-01082-quartus-ii-metastability.pdf)
- [Synchronization and Metastability - Steve Golson](https://trilobyte.com/pdf/golson_snug14.pdf)

### Power Intent (UPF/CPF)
- [UPF - VLSI Tutorials](https://vlsitutorials.com/upf-low-power-vlsi/)
- [UPF in VLSI: The Smartest Way Forward - ChipEdge](https://chipedge.com/resources/upf-in-vlsi-the-smartest-way-forward/)
- [Unified Power Format Expands Low-Power IC Design - Synopsys Blog](https://www.synopsys.com/blogs/chip-design/unified-power-format-low-power-ic-design.html)
- [Low Power Design and UPF Flow in IC Design - VLSI-Design](https://funrtl.wordpress.com/2023/03/05/low-power-design-and-upf-flow-in-ic-design/)

### Level Shifters & Isolation Cells
- [Isolation Cells and Level Shifter Cells - VLSI Tutorials](https://vlsitutorials.com/isolation-cells-level-shifter-cells-low-power-vlsi/)
- [Level Shifter Cells - Logic Madness](https://logicmadness.com/level-shifter-cells-in-multi-voltage-designs/)
- [Different Cells for Low Power Design - LMR](https://lmr.fi/int/different-cells-used-for-low-power/)
- [Synthesis: Level Shifters - Medium](https://medium.com/@ranaumarnadeem/synthesis-level-shifters-a9b2273c4ccf)

### IR Drop Analysis
- [IR Drop Analysis in Physical Design - Team VLSI](https://teamvlsi.com/2020/07/ir-analysis-in-asic-design-effects-and.html)
- [IR Drop in VLSI - Eletimes](https://www.eletimes.com/ir-drop-in-vlsi-static-and-dynamic-ir-drop-in-vlsi)
- [How to Fix Dynamic IR Drop - SiliconVLSI](https://siliconvlsi.com/how-to-fix-dynamic-ir-drop/)

### Electromigration
- [Electromigration Effect in VLSI - Team VLSI](https://teamvlsi.com/2020/08/electromigration-effect-in-vlsi.html)
- [What is Electromigration? - Synopsys](https://www.synopsys.com/glossary/what-is-electromigration.html)
- [Electromigration (EM) Analysis in VLSI - Cadence](https://resources.pcb.cadence.com/blog/2020-electromigration-em-analysis-in-vlsi-may-your-chips-live-forever)
- [Understanding Electromigration in VLSI Physical Design - Cadence](https://resources.system-analysis.cadence.com/blog/msa2021-understanding-electromigration-in-vlsi-physical-design)

### MBIST & Memory Testing
- [Memory Testing: MBIST, BIRA & BISR - eInfochips](https://www.einfochips.com/blog/memory-testing-an-insight-into-algorithms-and-self-repair-mechanism/)
- [Memory Built-In Self-Test Basic Concepts - VLSI4Freshers](https://www.vlsi4freshers.com/2019/12/memory-built-in-self-test-mbist-basic.html)
- [Basics of Memory Testing in VLSI - VLSI Universe](https://www.vlsiuniverse.com/basics-of-memory-testing-in-vlsi-memory/)
- [What is Memory Test & Repair in VLSI? - Maven Silicon](https://www.maven-silicon.com/blog/what-is-memory-test/)

### SDC Constraints
- [SDC Design Constraint Examples - Centennial Software](https://www.centennialsoftwaresolutions.com/help/sdc-design-constraint-examples-and-explanations/)
- [SDC File in VLSI - Team VLSI](https://teamvlsi.com/2020/05/sdc-synopsys-design-constraint-file-in.html)
- [Clock Constraints - Intel](https://www.intel.com/content/www/us/en/docs/programmable/683243/24-1/clock-constraints.html)

### Pipeline Hazards & CPU Architecture
- [Hazard (Computer Architecture) - Wikipedia](https://en.wikipedia.org/wiki/Hazard_(computer_architecture))
- [Handling Data Hazards - UMD Computer Architecture](https://www.cs.umd.edu/~meesh/411/CA-online/chapter/handling-data-hazards/index.html)
- [Data Hazards and Forwarding - Fiveable](https://fiveable.me/advanced-computer-architecture/unit-3/data-hazards-forwarding/study-guide/UEfsh4VI6bvLQ7dl)
- [Pipeline Hazards - Witscad](https://witscad.com/course/computer-architecture/chapter/pipeline-hazards)
- [Data Hazards and Handling Methods - GeeksforGeeks](https://www.geeksforgeeks.org/computer-organization-architecture/data-hazards-and-its-handling-methods/)

### Cache Architecture
- [Set-Associative Cache - ScienceDirect](https://www.sciencedirect.com/topics/computer-science/set-associative-cache)
- [Cache Associativity - Algorithmica](https://en.algorithmica.org/hpc/cpu-cache/associativity/)
- [Cache Placement Policies - Wikipedia](https://en.wikipedia.org/wiki/Cache_placement_policies)
- [Notes on Caches - University of Toronto](https://www.eecg.utoronto.ca/~enright/teaching/ece243S/notes/l26-caches.html)

### Liberty File Format & Characterization
- [Liberty File - VLSI Master](https://vlsimaster.com/liberty-file/)
- [What is Library Characterization? - Synopsys](https://www.synopsys.com/glossary/what-is-library-characterization.html)
- [LIB File in Physical Design - Team VLSI](https://teamvlsi.com/2020/05/lib-and-lef-file-in-asic-design.html)
- [Timing Library (.lib) in VLSI - iVLSI](https://ivlsi.com/timing-library-lib-in-vlsi-physical-design/)
- [Liberty Timing File Lecture - UMBC](https://courses.cs.umbc.edu/graduate/CMPE641/Fall08/cpatel2/slides/lect05_LIB.pdf)

### CPPR/CRPR (Clock Path Pessimism Removal)
- [Common Path & Clock Reconvergence Pessimism Removal - VLSI Pro](https://vlsi.pro/common-path-clock-reconvergence-pessimism-removal/)
- [Clock Reconvergence Pessimism Basic - VLSI Expert](https://www.vlsi-expert.com/2011/02/clock-reconvergence-pessimism-crp-basic.html)
- [Common Clock Path Pessimism Removal - VLSI System Design](https://www.vlsisystemdesign.com/common-clock-path-pessimism-removal-cppr-part-1/)
- [OCV and CRPR - Physical Design 4U](https://www.physicaldesign4u.com/2020/07/ocv-on-chip-variation-and-crpr-clock.html)
- [Removing Pessimism and Optimism in Timing Analysis - EE Times](https://www.eetimes.com/removing-pessimism-and-optimism-in-timing-analysis/)

### Multi-Corner Multi-Mode (MCMM)
- [Multi-Corner Multi-Mode Analysis - Semiconductor Engineering](https://semiengineering.com/knowledge_centers/eda-design/methodologies-and-flows/multi-corner-multi-mode-analysis/)
- [MCMM Timing Optimization - Ondevtra](https://ondevtra.com/mcmm-optimization.html)
- [How to Close Timing with Hundreds of Views - EE Journal](https://www.eejournal.com/article/20121206-cadence/)
- [Machine-Learning-Based Multi-Corner Timing Prediction - MDPI](https://www.mdpi.com/2079-9292/11/10/1571)

### Signal Integrity & Crosstalk
- [Signal Integrity and Crosstalk in VLSI - iVLSI](https://ivlsi.com/signal-integrity-and-crosstalk-vlsi-physical-design/)
- [Signal Integrity and Crosstalk - Team VLSI](https://teamvlsi.com/2020/06/signal-integrity-and-crosstalk-in-vlsi.html)
- [How to Deal with Noise/Crosstalk - Chipress](https://chipress.online/2024/11/05/how-to-deal-with-noise-crosstalk-in-physical-design/)
- [Signal Integrity Issues - SiliconVLSI](https://siliconvlsi.com/signal-integrity-issues/)
- [Signal Integrity in VLSI - Mosart Labs](https://mosartlabs.com/why-signal-integrity-is-crucial-in-vlsi-how-to-improve-it/)

### SystemVerilog Assertions (SVA)
- [SystemVerilog Assertions Basics - systemverilog.io](https://www.systemverilog.io/verification/sva-basics/)
- [SystemVerilog Assertions Tutorial - Doulos](https://www.doulos.com/knowhow/systemverilog/systemverilog-tutorials/systemverilog-assertions-tutorial/)
- [Assertions in SystemVerilog - Verification Guide](https://verificationguide.com/systemverilog/systemverilog-assertions/)
- [SystemVerilog Assertions Simplified - eInfochips](https://www.einfochips.com/blog/system-verilog-assertions-simplified/)
- [Using SVA in RTL Code - Design Reuse](https://www.design-reuse.com/articles/10907/using-systemverilog-assertions-in-rtl-code.html)

### Virtual Memory & TLB
- [Translation Lookaside Buffer - Wikipedia](https://en.wikipedia.org/wiki/Translation_lookaside_buffer)
- [Translation Lookaside Buffer (TLB) in Paging - GeeksforGeeks](https://www.geeksforgeeks.org/operating-systems/translation-lookaside-buffer-tlb-in-paging/)
- [Virtual Memory and TLBs - Fiveable](https://fiveable.me/advanced-computer-architecture/unit-7/virtual-memory-translation-lookaside-buffers-tlbs/study-guide/i40ByaEgASybukOQ)
- [What is a TLB? - TechTarget](https://www.techtarget.com/whatis/definition/translation-look-aside-buffer-TLB)
- [Paging: Faster Translations (TLBs) - OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf)

### FIFO Almost Full/Empty
- [Need for Almost Empty and Almost Full Flags - Stack Exchange](https://electronics.stackexchange.com/questions/573847/need-for-almost-empty-and-almost-full-flags-in-a-fifo-buffer)
- [FIFO Architecture, Functions, and Applications - Texas Instruments](https://www.ti.com/lit/an/scaa042a/scaa042a.pdf)
- [Asynchronous FIFO - VLSI Verify](https://vlsiverify.com/verilog/verilog-codes/asynchronous-fifo/)
- [Async FIFO Design - GitHub](https://github.com/ujjwal-2001/Async_FIFO_Design)

### DDR Memory Timing
- [Memory Timings - Wikipedia](https://en.wikipedia.org/wiki/Memory_timings)
- [CAS Latency - Wikipedia](https://en.wikipedia.org/wiki/CAS_latency)
- [Understanding DDR4 Timing Parameters - systemverilog.io](https://www.systemverilog.io/design/understanding-ddr4-timing-parameters/)
- [What Are Memory Timings? - GamersNexus](https://gamersnexus.net/guides/3333-memory-timings-defined-cas-latency-trcd-trp-tras)
- [Understanding DDR SDRAM Timing Parameters - EE Times](https://www.eetimes.com/understanding-ddr-sdram-timing-parameters/)
- [What is CAS Latency? DDR5 Latencies Explained - Corsair](https://www.corsair.com/us/en/explorer/diy-builder/memory/what-is-cas-latency-ddr5-latencies-explained/)

###### tags: `Work`
