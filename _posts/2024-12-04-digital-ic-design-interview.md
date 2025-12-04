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

### Fundamentals
- [Latch vs Flip-flop](#latch-vs-flip-flop)
- [Metastability](#metastability)
- [Synchronous vs Asynchronous Reset](#synchronous-vs-asynchronous-reset)
- [Race and Hazard](#race-and-hazard)
- [High-Impedance State](#high-impedance-state-tri-state)
- [NMOS vs PMOS](#nmos-vs-pmos)

### Clock Domain Crossing (CDC)
- [CDC Overview](#clock-domain-crossing-cdc)
- [Single-bit Synchronization](#single-bit-signal)
- [Multi-bit Synchronization](#multi-bit-signal)
- [Asynchronous FIFO & Gray Code](#asynchronous-fifo)

### Verilog & RTL Design
- [Blocking vs Non-blocking](#blocking-vs-non-blocking-assignments)
- [FSM Three-Stage Coding](#fsm-finite-state-machine---three-stage-coding)
- [What Causes Latch Inference?](#what-coding-causes-latch-inference)

### Combinational Logic
- [Full Adder](#full-adder)
- [Building Gates Using MUX](#building-gates-using-mux)
- [Building Gates Using NAND](#building-gates-using-nand-only)

### Design Flow
- [Front-End Design](#front-end-design)
- [Back-End Design](#back-end-design)
- [ASIC vs FPGA Comparison](#asic-vs-fpga-comparison)

### FPGA
- [FPGA Architecture](#fpga-architecture)
- [FPGA Configuration Modes](#fpga-configuration-modes)

### Synthesis
- [Technology Library & PVT](#technology-library)
- [Delay Models](#delay-models)
- [SDF File Format](#sdf-file-format)
- [Clock Gating](#clock-gating)

### Static Timing Analysis (STA)
- [DTA vs STA](#dta-vs-sta)
- [Pre-sim vs Post-sim](#pre-simulation-vs-post-simulation)
- [Timing Path Types](#types-of-timing-path)
- [Setup & Hold Analysis](#setup--hold-check)
- [Recovery & Removal Time](#recovery--removal-time)
- [OCV (On-Chip Variation)](#ocv-on-chip-variation)
- [Timing Violation Solutions](#setup--hold-violation-solutions)
- [Special Timing Paths](#special-timing-path)

### Low Power Design
- [Power Reduction Techniques](#low-power-design-techniques)

### Circuit Examples
- [Frequency Dividers](#frequency-divider-circuits)
- [Pipeline Concept](#pipeline-concept)
- [Division Algorithm](#division-algorithm)

### Memory
- [SRAM vs DRAM](#sram-vs-dram)

### Quick Reference Q&A
- [Input/Output Delay](#inputoutput-delay)
- [Clock Skew Effects](#clock-skew-effect-on-setuphold)
- [Hold Time Zero/Negative?](#can-hold-time-be-zero-or-negative)
- [SystemVerilog Purpose](#systemverilog-purpose)
- [Cache & CPU](#how-cache-accelerates-cpu)
- [2-Stage FF CDC Limits](#can-2-stage-ff-solve-all-cdc-problems)
- [Synthesis Files](#files-needed-for-synthesis)
- [Glitch Prevention](#glitch-causes-and-prevention)
- [Dual-Edge Detection](#dual-edge-detection)
- [Common Protocols](#common-protocols)

### Interview Experience
- [MTK](#mtk) | [RTK](#rtk) | [NTK](#ntk) | [PHISON](#phison) | [SMI](#smi) | [GUC](#guc)

### [References](#reference)

---

## Fundamentals

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
- Shared bus architectures
- Bidirectional I/O pins
- Memory data buses

### **NMOS vs PMOS**

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

## Combinational Logic

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

## Design Flow

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

| Aspect | ASIC | FPGA |
|--------|------|------|
| **Reconfigurability** | Fixed after fabrication | Reprogrammable |
| **NRE Cost** | High (millions USD for masks) | Low (development tools) |
| **Unit Cost** | Low at high volume | Higher per unit |
| **Time-to-market** | Months (fabrication) | Days/weeks |
| **Performance** | Highest (custom optimization) | Lower (routing overhead) |
| **Power Efficiency** | Best | Higher power consumption |
| **Application** | Mass production, high performance | Prototyping, low volume, flexibility |

## **FPGA**

### **FPGA Architecture**

FPGA consists of 6 main components:

| Component | Description |
|-----------|-------------|
| **IOB (I/O Block)** | Programmable I/O units for various electrical standards |
| **CLB (Configurable Logic Block)** | Basic logic unit = LUT + Register |
| **Clock Resources** | PLLs, global/regional clock trees |
| **Routing Resources** | Interconnect for signal routing |
| **Block RAM** | Embedded memory blocks |
| **Hard IP** | DSP blocks, SerDes, embedded processors |

#### **CLB (Configurable Logic Block)**

Each CLB contains:
- **LUT (Look-Up Table)**: Implements combinational logic (typically 4-6 inputs)
- **Flip-flops/Registers**: Configurable as D, T, JK, or SR types
- **Carry chain**: Fast arithmetic operations
- **MUX**: Output selection

**How LUT Works:**
- A 4-input LUT stores 2⁴ = 16 bits in SRAM
- Any 4-input Boolean function can be implemented
- Larger functions use multiple LUTs with routing

#### **I/O Block (IOB)**

Each I/O element contains:
- Input register
- Output register
- Output enable register
- Programmable pull-up/pull-down
- Configurable for: LVDS, LVCMOS, SSTL, HSTL, etc.

#### **Routing Resources**

| Type | Description |
|------|-------------|
| **Global routing** | Dedicated lines for clock and reset signals |
| **Long lines** | Inter-bank signal routing |
| **Short lines** | Adjacent logic unit connections |
| **Row connections (R4, R24)** | Horizontal routing within rows |
| **Column connections (C4, C16)** | Vertical routing within columns |

#### **Clock Resources**

Three levels of clock distribution:

| Level | Description |
|-------|-------------|
| **Global clock** | Dedicated CLK pins → global clock tree → all FFs |
| **Regional clock** | BUFR buffers for clock regions |
| **I/O clock** | Local clocks for SerDes/DDR interfaces |

**PLL (Phase-Locked Loop):**
- Frequency multiplication/division
- Phase shifting
- Duty cycle correction
- Clock deskewing

#### **Embedded Memory (Block RAM)**

Configurable memory blocks (e.g., M4K = 4608 bits):

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
- No input stimuli required
- Finds nearly all critical paths
- Fast execution, low memory usage
- Exhaustive path analysis

**STA Disadvantages:**
- Synchronous circuits only
- Cannot verify functionality
- Tricky constraints for special cases:
  - False paths
  - Multicycle paths
  - Multiple clock domains

**DTA Advantages:**
- Works for any circuit type (including asynchronous)
- Verifies both timing and functionality

**DTA Disadvantages:**
- Critical paths may be missed (depends on vectors)
- Very slow simulation
- High memory and compute requirements

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

### **OCV (On-Chip Variation)**

OCV accounts for timing variations within the same chip due to:

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
- Uses probability distributions instead of fixed derates
- Most accurate, reduces pessimism

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

### **Power Components**

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
1. Start with all HVT cells
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

## **Memory**

### **SRAM vs DRAM**

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

## **Common Interview Q&A**

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

Extensions over Verilog for:

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

```
NOT:  Y = (A NAND A) = A'
AND:  Y = ((A NAND B) NAND (A NAND B)) = A·B
OR:   Y = ((A NAND A) NAND (B NAND B)) = A+B
XOR:  Y = ((A NAND (A NAND B)) NAND (B NAND (A NAND B)))
```

### **How Cache Accelerates CPU**

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
