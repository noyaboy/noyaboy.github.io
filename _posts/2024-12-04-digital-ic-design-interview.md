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
  - [Latch vs Flip-flop](#latch-vs-flip-flop)
  - [Metastability](#metastability)
  - [Clock domain crossing (CDC)](#clock-domain-crossing-cdc)
    - [single bit signal](#single-bit-signal)
    - [Multi bit signal](#multi-bit-signal)
  - [Asynchronous FIFO](#asynchronous-fifo)
    - [Gray code Encoding Method](#gray-code-encoding-method)
  - [Synchronous vs Asynchronous Reset](#synchronous-vs-asynchronous-reset)
- [Verilog Fundamentals](#verilog-fundamentals)
  - [Blocking vs Non-blocking Assignments](#blocking-vs-non-blocking-assignments)
  - [FSM (Finite State Machine)](#fsm-finite-state-machine---three-stage-coding)
- [MUX](#mux)
  - [Full adder](#full-adder)
- [ASIC Design Flow](#asic-design-flow)
- [Synthesis](#synthesis)
  - [Technology library](#technology-library)
  - [Undefined interconnect](#undefined-interconnect)
  - [Delay Models](#delay-models)
  - [Clock gating](#clock-gating)
- [STA](#sta)
  - [DTA v.s. STA](#dta-vs-sta)
  - [Pre-simulation vs Post-simulation](#pre-simulation-vs-post-simulation)
  - [Types of timing path](#types-of-timing-path)
  - [Type of STA](#type-of-sta)
  - [Setup & Hold check](#setup--hold-check)
  - [Setup & Hold Violation Solutions](#setup--hold-violation-solutions)
  - [Delay bound of D flip-flop](#delay-bound-of-d-flip-flop)
  - [Special timing path](#special-timing-path)
- [Low Power Design Techniques](#low-power-design-techniques)
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

### Latch vs Flip-flop

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
- With **2 flip-flops**: adequate MTBF for most designs (10s-100s MHz)
- With **3 flip-flops**: mandated for space/medical devices
- With **4 flip-flops**: MTBF can reach 1,000+ years

`Solution (double flip-flop synchronizer)`: Simply add another flip-flop driven by the same clock after the subsequent flip-flop stage. The second flip-flop gives the first flip-flop an entire clock cycle to resolve from any metastable state.

### **Clock domain crossing** (CDC)

**Types of CDC:**

| Type | Description |
|------|-------------|
| **Asynchronous** | Clocks have different frequencies and no phase relationship |
| **Mesochronous** | Same frequency, different phase |
| **Plesiochronous** | Almost same frequency, gradual drift |

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
Limitation of Pulse synchronizer: The interval between two consecutive pulses in the source clock domain must be large enough to satisfy the 3 edge requirement of the destination domain.

**Edge synchronizer**: Similar to pulse synchronizer but outputs a pulse when detecting rising/falling edge in the destination domain.

#### **Multi bit signal**
Cannot use 2F/F synchronizer to synchronize multi-bit data because the delay of 2F/F synchronizer is random - it may take one cycle to synchronize or two cycles, which causes each bit of multi-bits to be unstable.

**Three solutions:**
* **Load signal (MCP - Multi-Cycle Path)**: Use pulse synchronizer to generate load signal. The qualifier pulse enables sampling of the multi-bit bus. Source data must remain stable long enough for safe synchronization.
![Load signal](https://i.imgur.com/gDR7VW7.png)

* **Handshake synchronization**: Source sends "request" signal → destination receives via 2-FF synchronizer → destination sends "ack" back via 2-FF synchronizer → source can update data. Guarantees data integrity but adds latency.

* **Additional two-stage flip-flop**: Use double flip-flop synchronizer to synchronize data to the destination domain, then pass the data through two stages of flip-flops, then compare these 3 stages. If all are equal, it means the value synchronized by the synchronizer is stable.

* **Asynchronous FIFO**

### **Asynchronous FIFO**
Handles multi-bit CDC Problem

Convert read pointer & write pointer to gray code representation. Since gray code only changes one bit at each edge, it can be transferred to the destination domain through 2F/F synchronizer.

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

### **Synchronous vs Asynchronous Reset**

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

## **Verilog Fundamentals**

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
- **Moore Machine**: Output depends only on current state
- **Mealy Machine**: Output depends on current state AND inputs (faster response, but glitch-prone)

**Coding Tips:**
- Use `localparam` or `parameter` for state encoding
- Prefer **one-hot encoding** for high-speed designs (faster decode, more FFs)
- Prefer **binary encoding** for area-constrained designs (fewer FFs)
- Always include `default` case to avoid latches

---

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

```
Sum = a XOR b XOR Cin
Cout = ab + aCin + bCin
     = (a·b) + Cin·(a XOR b)
```

![Full adder](https://i.imgur.com/k9lPhQQ.png)

## **ASIC Design Flow**

```
RTL Design → Functional Simulation → Logic Synthesis → Formal Verification
     ↓
   STA → Floorplanning → Placement → CTS → Routing → Physical Verification → Tape-out
```

| Stage | Description | Key Tools |
|-------|-------------|-----------|
| **RTL Design** | Write Verilog/VHDL code | VS Code, Vim |
| **Functional Simulation** | Verify logic correctness | VCS, ModelSim, Xcelium |
| **Logic Synthesis** | Convert RTL to gate-level netlist | Design Compiler, Genus |
| **Formal Verification** | Prove RTL ≡ Netlist equivalence | Formality, Conformal |
| **STA** | Verify timing constraints | PrimeTime, Tempus |
| **Floorplanning** | Define block placement, power grid | ICC2, Innovus |
| **Placement** | Place standard cells | ICC2, Innovus |
| **CTS** | Build clock distribution network | ICC2, Innovus |
| **Routing** | Connect all signals | ICC2, Innovus |
| **Physical Verification** | DRC, LVS, ERC checks | Calibre, ICV |
| **Tape-out** | Generate GDSII for fabrication | — |

**ASIC vs FPGA Comparison:**

| Aspect | ASIC | FPGA |
|--------|------|------|
| **Reconfigurability** | Fixed after fabrication | Reprogrammable |
| **NRE Cost** | High (millions USD for masks) | Low (development tools) |
| **Unit Cost** | Low at high volume | Higher per unit |
| **Time-to-market** | Months (fabrication) | Days/weeks |
| **Performance** | Highest (custom optimization) | Lower (routing overhead) |
| **Power Efficiency** | Best | Higher power consumption |
| **Application** | Mass production, high performance | Prototyping, low volume, flexibility |

**FPGA Architecture Components:**
- **Logic Elements**: LUT (Look-Up Table) + Flip-flops
- **I/O Blocks**: Configurable for multiple electrical standards (LVDS, LVCMOS, etc.)
- **Embedded RAM**: Configurable as FIFO, dual-port RAM, CAM
- **Clock Resources**: PLLs, clock trees, global/regional routing
- **Hard IP**: DSP blocks, SerDes, embedded processors

## **Synthesis**

### **Technology library**
Technology libraries characterize cells under different PVT (Process, Voltage, Temperature) corners:

| Library | Process | Voltage | Temperature | Use Case |
|---------|---------|---------|-------------|----------|
| **fast.db** | Fast | High | Low | Hold time analysis (best case) |
| **slow.db** | Slow | Low | High | Setup time analysis (worst case) |
| **typical.db** | Typical | Nominal | Nominal | Functional verification |

### **Undefined interconnect**
Can be solved by wire load model

### **Delay Models**

| Model | Description | Accuracy | Use Case |
|-------|-------------|----------|----------|
| **Lumped** | Single delay value per gate | Low | Quick estimation |
| **Distributed** | Per-gate delay based on fanout/load | Medium | Early synthesis |
| **Module-path** | Specify block delays (SDF) | High | Timing-critical designs |

**SDF (Standard Delay Format):**
- Contains timing information for post-synthesis/post-layout simulation
- Includes cell delays, interconnect delays, timing checks
- Used for back-annotation in gate-level simulation

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
- **RTL-based (Intent-based)**: Designer explicitly codes clock gating
- **Tool-generated**: Synthesis tool identifies flip-flops sharing same control logic

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

### **Pre-simulation vs Post-simulation**

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
* reg (clk) → reg (D) : Register to Register
* reg (clk) → OUTPUT : Register to Output
* INPUT → reg (D) : Input to Register
* INPUT (clk) → OUTPUT : Input to Output (combinational)

### **Type of STA**
*  Path-based STA
    - Real situation, considers actual delay of each path
    - Complex computation
    - More accurate
*  Block-based STA
    - Only considers best/worst case of each node
    - More pessimistic
    - Faster computation

### **Setup & Hold check**
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
    - Example: A slow multiplier that takes 2 clock cycles
    - Must explicitly constrain: `set_multicycle_path 2 -setup`

## **Low Power Design Techniques**

| Technique | Target Power | Description | Trade-off |
|-----------|--------------|-------------|-----------|
| **Clock Gating** | Dynamic | Disable clock to inactive blocks | Minimal overhead |
| **Power Gating** | Static (Leakage) | Shut off power supply completely | Wake-up latency |
| **Multi-Vt** | Static | Use high-Vt cells for non-critical paths | Area |
| **DVFS** | Both | Dynamic voltage/frequency scaling | Complexity |
| **Operand Isolation** | Dynamic | Gate inputs to idle functional units | Extra logic |

**Clock Gating vs Power Gating:**
- Clock gating: Reduces α (switching activity) → saves dynamic power
- Power gating: Reduces V to zero → saves both static and dynamic power
- Power gating has longer wake-up time and requires isolation cells

**Power Gating Implementation:**
- Uses sleep transistors (high-Vt PMOS header or NMOS footer)
- Requires isolation cells to prevent floating outputs
- Requires retention registers if state must be preserved

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
- [https://www.zhihu.com/people/li-hong-jiang-54](https://www.zhihu.com/people/li-hong-jiang-54)
- [Clock Domain Crossing - The Complete Reference Guide](https://thedatabus.in/cdc_complete_guide/)
- [CDC Design & Verification - Cliff Cummings](http://www.sunburst-design.com/papers/CummingsSNUG2008Boston_CDC.pdf)

### Metastability & MTBF
- [Metastability and MTBF Explained](https://thedatabus.in/metastab_mtbf/)
- [Metastability and Synchronizers Tutorial - Ran Ginosar](https://www.cs.unc.edu/~montek/teaching/Comp790-Fall11/Home/Home_files/ginosar-tutorial-dt-2011.pdf)

### Setup/Hold Violations
- [16 Ways To Fix Setup and Hold Time Violations - EDN](https://www.edn.com/ways-to-solve-the-setup-and-hold-time-violation-in-digital-logic/)
- [10 Ways to Fix Setup and Hold Violations](https://www.vlsi-expert.com/2014/01/10-ways-to-fix-setup-and-hold-violation.html)

### Low Power Design
- [What is Low Power Design? - Synopsys](https://www.synopsys.com/glossary/what-is-low-power-design.html)
- [The Ultimate Guide to Clock Gating - AnySilicon](https://anysilicon.com/the-ultimate-guide-to-clock-gating/)

### Latch vs Flip-Flop
- [Difference Between Latch and Flip-Flop - GeeksforGeeks](https://www.geeksforgeeks.org/gate/difference-between-flip-flop-and-latch/)

### Gray Code Conversion
- [Verilog Binary to Gray - ChipVerify](https://www.chipverify.com/verilog/verilog-binary-to-gray)

### Digital IC Interview Experience
- [https://www.dcard.tw/f/tech_job/p/238023076](https://www.dcard.tw/f/tech_job/p/238023076)

### Frequency Divider
- [https://www.cnblogs.com/oomusou/archive/2008/07/31/verilog_clock_divider.html](https://www.cnblogs.com/oomusou/archive/2008/07/31/verilog_clock_divider.html)

### Verilog & ASIC Flow
- [Digital IC Design Interview Guide (CSDN)](https://blog.csdn.net/qq_36045093/article/details/120302713)
- [Digital IC Design Fundamentals (CSDN)](https://blog.csdn.net/qq_36045093/article/details/119741748)

###### tags: `Work`
