---
title: "Digital IC Design Interview"
date: 2024-12-04
permalink: /blog/digital-ic-design-interview/
excerpt: "Comprehensive notes on digital IC design concepts including metastability, CDC, STA, clock gating, frequency dividers, and interview questions from MTK, RTK, NTK, PHISON, SMI, and GUC."
toc: false
tags:
  - Interview
  - Digital IC Design
---

## Table of Contents
- [ICD Knowledge](#icd-knowledge)
  - [Latch](#latch)
  - [Flip-flop](#flip-flop)
  - [Metastability](#metastability)
  - [Clock domain crossing (CDC)](#clock-domain-crossing-cdc)
    - [single bit signal](#single-bit-signal)
    - [Multi bit signal](#multi-bit-signal)
  - [Asynchronous FIFO](#asynchronous-fifo)
    - [Gray code Encoding Method](#gray-code-encoding-method)
- [MUX](#mux)
  - [Full adder](#full-adder)
- [Synthesis](#synthesis)
  - [Technology library](#technology-library)
  - [Undefined interconnect](#undefined-interconnect)
  - [Clock gated](#clock-gated)
- [STA](#sta)
  - [DTA v.s. STA](#dta-vs-sta)
  - [Types of timing path](#types-of-timing-path)
  - [Type of STA](#type-of-sta)
  - [Setup & Hold check](#setup--hold-check)
  - [Delay bound of D flip-flop](#delay-bound-of-d-flip-flop)
  - [Special timing path](#special-timing-path)
- [Frequency Divider Circuits](#frequency-divider-circuits)
  - [Divide-by-2 Circuit](#divide-by-2-circuit)
    - [Without cnt](#without-cnt)
    - [With cnt](#with-cnt)
  - [Divide-by-N Circuit](#divide-by-n-circuit)
- [Digital IC Interview Experience](#digital-ic-interview-experience)
  - [MTK](#mtk)
  - [RTK](#rtk)
  - [NTK](#ntk)
  - [PHISON](#phison)
  - [SMI](#smi)
  - [GUC](#guc)
- [Reference](#reference)

---

## ICD Knowledge

### Latch
![Latch](https://i.imgur.com/E6NY4ca.png)

### Flip-flop
![Flip-flop](https://i.imgur.com/tv3FbCD.png)

### **Metastability**
Metastability occurs when the time for the flip-flop's output (Q pin) to stabilize is greater than the clk-to-q ($t_{cq}$) time.
![Metastability 1](https://i.imgur.com/y3WG22Q.png)
![Metastability 2](https://i.imgur.com/kp5y9dk.png)

`Solution (double flip-flop synchronizer)`: Simply add another flip-flop driven by the same clock after the subsequent flip-flop stage.

### **Clock domain crossing** (CDC)

#### **single bit signal**
→ Can be solved using double flip-flop synchronizer
However, it is not suitable for pulse signals, so Pulse synchronizer is used instead.

**Pulse synchronizer**: Convert the pulse signal to a level signal through an XOR gate, pass it through a double flip-flop, then convert the level signal back to a pulse signal through another XOR gate.
![Pulse synchronizer](https://i.imgur.com/UuK9bvn.png)
Limitation of Pulse synchronizer: The interval between two consecutive pulses in the source clock domain must be large enough to satisfy the 3 edge requirement of the destination domain.

#### **Multi bit signal**
Cannot use 2F/F synchronizer to synchronize multi-bit data because the delay of 2F/F synchronizer is random - it may take one cycle to synchronize or two cycles, which causes each bit of multi-bits to be unstable.

Three solutions:
* **Load signal**: Use pulse synchronizer to generate load signal
![Load signal](https://i.imgur.com/gDR7VW7.png)

* **Additional two-stage flip-flop**: Use double flip-flop synchronizer to synchronize data to the destination domain, then pass the data through two stages of flip-flops, then compare these 3 stages. If all are equal, it means the value synchronized by the synchronizer is stable.
* **Asynchronous FIFO**

### **Asynchronous FIFO**
Handles multi-bit CDC Problem

Convert read pointer & write pointer to gray code representation. Since gray code only changes one bit at each edge, it can be transferred to the destination domain through 2F/F synchronizer.

#### Gray code Encoding Method
1. Only one bit differs between two adjacent gray codes
2. When the Nth bit of binary code changes from 0 to 1, the subsequent N-1 bits of gray code will be symmetrical to the first half, while the bits before the Nth bit remain the same
![Gray code 1](https://i.imgur.com/Mfsh1nk.png)
![Gray code 2](https://i.imgur.com/CVVPyQy.png)

If the Asynchronous FIFO depth is not a power of 2, use the symmetry property of gray code to change the starting point, ensuring that each adjacent gray code only has one bit change.
![Gray code 3](https://i.imgur.com/yBLXnAv.png)

## **MUX**

### **Full adder**

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

$Sum=a\oplus b \oplus Cin$

$Cout=ab+aCin+bCin$

![Full adder](https://i.imgur.com/k9lPhQQ.png)

## **Synthesis**

### **Technology library**
- fast.db
- slow.db
- typical.db

### **Undefined interconnect**
Can be solved by wire load model

### **Clock gated**
Clock signal arrives only when data is to be switched
→ Reduce dynamic power dissipation
![Clock gated](https://i.imgur.com/oazpEi2.png)

CG with AND gate may have glitch due to unstable enable signal
→ **Glitch prevention**: Enable generated by <span style="color:red">latch with negative clk</span>
![Glitch prevention](https://i.imgur.com/WfrnP41.png)

## STA

### **DTA v.s. STA**
* `DTA (Testbench simulation)`
    Cons.
    1. Impossible to do exhaustive analysis.
    2. Hard to identify the cause of failure.
    3. Need more resource.
* `STA`
    Cons.
    1. Synchronous only.
    2. Tricky constraints on some special case.
        - False path
        - Multicycle path
        - Multiple clocks

### **Types of timing path**
* reg (clk) → reg (D)
* reg (clk) → OUTPUT
* INPUT → reg (D)
* INPUT (clk) → OUTPUT

### **Type of STA**
*  Path-based STA
    - Real situation, considers actual delay of each path
    - Complex computation
*  Block-based STA
    - Only considers best/worst case of each node
    - More pessimistic

### **Setup & Hold check**
* `Setup` (Max delay)

$AT=T_0+T_{clk,latency}+T_{cq}+T_{pd}$

$RT=T_0+T_{clk,latency}-T_{skew}+T_{cycle}-T_{setup}$

$Slack=RT-AT$

![Setup](https://i.imgur.com/MNbkt4s.png)

* `Hold` (Min delay)

$AT=T_0+T_{clk,latency}+T_{cq}+T_{pd}$

$RT=T_0+T_{clk,latency}+T_{skew}+T_{hold}$

$Slack=AT-RT$

![Hold](https://i.imgur.com/ZJxtQoR.png)

### **Delay bound of D flip-flop**

![Delay bound 1](https://i.imgur.com/NLxP60C.png)
![Delay bound 2](https://i.imgur.com/Jd9shRH.png)

### **Special timing path**
* `False paths` - Timing paths ignored by STA
    1. Unexercised path
        - Paths not used under normal conditions
        - e.g., probe for debugging
    2. Irrelevant path
        - Paths that are too slow or where speed doesn't matter
        - e.g., reset
    3. Asynchronous path
        - Paths in different clock domains
        - clock domain crossing (CDC) : transfer data from clk1 to clk2
        - CDC requires advanced timing correction
    4. Logically impossible path
        - Exists in the circuit but data cannot possibly pass through
        - Should be detected by PrimeTime
    5. Combinational loops

* `Multicycle paths` - Timing paths that take more than one cycle

## **Frequency Divider Circuits**

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
               (N[0])   ? (clk_p | clk_n) : (clk_p);

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

## **Digital IC Interview Experience**

### **MTK**
Departments: CAI, SPD1, SPD3, ADCT

Interview Questions: setup/hold calculation, CDC (multi bit), false path & multi cycle differences and settings, input/output delay, synchronous vs asynchronous differences, gray code, write RTL from waveform, IC design flow, SystemVerilog, build adder and multiplier using MUX, async FIFO, build OR using NAND, divide-by-3 circuit, pre/post sim differences, files needed for synthesis, divide-by-1.5 circuit, how cache accelerates CPU, clock gated

### **RTK**
Departments: CN, RDC, MM

Interview Questions: blocking/non-blocking, frequency divider circuit, critical path calculation, build DFF using two latches, low power design, down counter, clock skew effect on setup/hold, setup/hold violation solutions, what coding causes latch, design NAND using MUX, IC design flow, how to determine clock timing during synthesis, can hold time be 0, pipeline, how to set multicycle value, PVT violation

### **NTK**
Departments: TCON, iHome

Interview Questions: divide-by-2 circuit (without using cnt), draw synthesized circuit from RTL, explain metastability, input/output delay purpose & setting values, pipeline handling, fault coverage, set max/min delay for violation, async rst issues, blocking/non-blocking, build combinational circuit using NAND/NOR, setup/hold negative value cases, why hold time is independent of clk, full adder, number base conversion

### **PHISON**
Departments: SSD, EMMC

Interview Questions: setup/hold inequality, clock gated, IC design flow, synchronous vs asynchronous, frequency divider circuit, build NAND & INV using PMOS and NMOS, CDC (multi bit), metastability, XOR truth table, multicycle & false path, design XOR using MUX, how many cycles from counter input to output, critical path, how to avoid clock skew/latch, characteristics of hold time in cell library, SystemVerilog purpose

### **SMI**
Departments: UFS, SSD

Interview Questions: CDC, FSM, draw MUX using AND/OR, low power design, timing violation handling methods, IC design flow, SDF contents, latch/DFF differences, glitch causes, build AND using NOR, input/output delay, explain timing report, can two-stage DFF solve all CDC, draw clock/data path of setup/hold, how to place MUX to save area, build XOR using INV and MUX, divide-by-3 circuit, edge/level trigger

### **GUC**
Departments: APR, DFT

Interview Questions: APR flow, power ring, CTS purpose, IR drop, scan chain, test/fault coverage differences, scan reorder, lockup latch, BIST, stuck at fault, transition delay fault, cross talk, electromigration, draw SDFF, boundary scan, why DFT is needed, DRC/LVS, ATPG, how to verify APR function matches RTL, APR command, problems encountered in back-end with advanced process, LEF and DB file contents, wire load model

## **Reference**

### CDC
[https://www.zhihu.com/people/li-hong-jiang-54](https://www.zhihu.com/people/li-hong-jiang-54)

### Digital IC Interview Experience
[https://www.dcard.tw/f/tech_job/p/238023076](https://www.dcard.tw/f/tech_job/p/238023076)

### Frequency Divider
[https://www.cnblogs.com/oomusou/archive/2008/07/31/verilog_clock_divider.html](https://www.cnblogs.com/oomusou/archive/2008/07/31/verilog_clock_divider.html)

###### tags: `Work`
