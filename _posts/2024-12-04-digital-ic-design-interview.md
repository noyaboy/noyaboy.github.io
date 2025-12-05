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

### 📋 [面試準備指南](#-面試準備指南)
- [高頻考點排行榜](#-高頻考點排行榜) | [答題策略](#-面試答題策略) | [常見陷阱](#️-常見陷阱與追問) | [複習順序](#-建議的複習順序) | [白板題準備](#-白板題手寫程式準備)

### 基礎概念
- [同步邏輯 vs 異步邏輯](#同步邏輯-vs-異步邏輯)
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
- [線與邏輯與 OC/OD 門](#線與邏輯與-ocod-門)
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
- [卡諾圖化簡](#卡諾圖化簡-karnaugh-map)
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
- [功耗組成](#功耗組成)
- [功耗降低技術](#功耗降低技術)
- [Multi-Vt Cell Library](#multi-vt-cell-library)
- [Clock Gating vs Power Gating](#clock-gating-vs-power-gating)
- [Power Intent (UPF/CPF)](#power-intentupfcpf)
- [Level Shifters 與 Isolation Cells](#level-shifters-與-isolation-cells)

### 電路範例
- [Frequency Dividers](#divide-by-2-circuit)
- [奇數除頻 50% Duty Cycle](#奇數除頻---50-duty-cycle)
- [Glitch-free Clock Mux](#glitch-free-clock-mux)
- [除法演算法](#除法演算法)
- [序列偵測器](#序列偵測器)
- [自動售賣機 FSM](#自動售賣機-fsm經典面試題)
- [Johnson Counter](#johnson-counter)
- [D 觸發器實現計數器](#d-觸發器實現-n-進制計數器經典面試題)
- [Round Robin Arbiter](#round-robin-arbiter)
- [CRC（循環冗餘校驗）](#crc循環冗餘校驗)
- [Booth 與 Wallace Tree 乘法器](#booth-與-wallace-tree-乘法器)
- [LFSR 與 PRBS（偽隨機序列）](#lfsr-與-prbs偽隨機序列)
- [串並轉換與並串轉換](#串並轉換與並串轉換)

### 後端 / 實體設計
- [CTS 與 Clock Uncertainty](#cts-與-clock-uncertainty)
- [Routing Congestion 解決方案](#routing-congestion-解決方案)
- [晶片面積估算](#晶片面積估算)
- [CTS 中的 Buffer vs Inverter](#cts-中的-buffer-vs-inverter)
- [ECO 流程](#ecoengineering-change-order)
- [Scan Chain / DFT](#scan-chain--dft)
- [MBIST](#mbistmemory-built-in-self-test)
- [IR Drop 分析](#ir-drop-分析)
- [Electromigration](#electromigration)
- [Signal Integrity (Crosstalk)](#signal-integrity-crosstalk)
- [Latch-up 效應](#latch-up-效應)
- [Antenna 效應](#antenna-效應)

### 記憶體與 Cache
- [SRAM 與 DRAM](#sram-vs-dram)
- [Flash Memory (NOR vs NAND)](#flash-memory-nor-vs-nand)
- [Write-back 與 Write-through](#write-back-vs-write-through-cache)
- [Cache Associativity](#cache-associativity)
- [MESI Protocol](#mesi-protocol-cache-coherence)

### 匯流排協定
- [常見協定](#common-protocols)（包含 AXI、SPI、I2C、UART、DDR）
- [AXI-Stream 協議](#axi-stream-協議)
- [DDR Memory Timing](#ddr-memory-timing)

### 電腦架構
- [流水線技術](#流水線技術-pipelining)
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

### 📌 [面試前最後提醒](#-面試前最後提醒)
- [面試前一天 Checklist](#-面試前一天-checklist) | [面試中的關鍵技巧](#-面試中的關鍵技巧) | [常見扣分行為](#️-常見扣分行為) | [加分技巧](#-加分技巧) | [必背公式速記](#-必背公式速記)

### [參考資料](#參考資料)

---

## 📋 面試準備指南

> **如何使用這份筆記準備面試？** 這份筆記涵蓋了數位 IC 設計面試的核心主題。根據 MTK、RTK、NTK、PHISON、SMI、GUC 等公司的面試經驗，以下是高頻考點和準備建議。

### 🎯 高頻考點排行榜

根據實際面試經驗統計，以下主題出現頻率最高：

| 排名 | 主題 | 出現頻率 | 必備程度 |
|------|------|----------|----------|
| 1 | **Setup/Hold 時序分析** | ⭐⭐⭐⭐⭐ | 必考 |
| 2 | **CDC（跨時脈域）** | ⭐⭐⭐⭐⭐ | 必考 |
| 3 | **Blocking vs Non-blocking** | ⭐⭐⭐⭐⭐ | 必考 |
| 4 | **Metastability** | ⭐⭐⭐⭐ | 必考 |
| 5 | **Clock Gating / 低功耗** | ⭐⭐⭐⭐ | 高頻 |
| 6 | **除頻電路設計** | ⭐⭐⭐⭐ | 高頻 |
| 7 | **用 MUX/NAND 建構邏輯閘** | ⭐⭐⭐⭐ | 高頻 |
| 8 | **IC 設計流程** | ⭐⭐⭐ | 中頻 |
| 9 | **Gray Code / Async FIFO** | ⭐⭐⭐ | 中頻 |
| 10 | **FSM 設計** | ⭐⭐⭐ | 中頻 |

### 📝 面試答題策略

**技術問題的回答框架：**

1. **先說「是什麼」（What）**：用一句話定義概念
2. **再說「為什麼」（Why）**：解釋這個概念為何重要
3. **最後說「怎麼做」（How）**：給出實際應用或解決方案
4. **準備追問**：面試官通常會根據你的回答深入追問

**範例：「請解釋什麼是 metastability？」**

> ✅ 好的回答：
> 「Metastability 是當 flip-flop 的 setup 或 hold time 被違反時，輸出可能進入不穩定狀態的現象（What）。這在 CDC 設計中特別重要，因為非同步訊號必然會在某個時刻違反 destination flip-flop 的時序要求（Why）。解決方案是使用 2-FF 或 3-FF synchronizer，給第一級 flip-flop 足夠時間從 metastable 狀態恢復（How）。」

### ⚠️ 常見陷阱與追問

| 主題 | 常見追問 | 陷阱提醒 |
|------|----------|----------|
| **Setup/Hold** | 「Hold time 可以是負的嗎？」「Hold 與 clock period 有關嗎？」 | Hold time 與 clock period 無關！ |
| **CDC** | 「2-FF synchronizer 能解決所有 CDC 問題嗎？」 | 不能！Multi-bit 需要 Gray code 或 Async FIFO |
| **Clock Gating** | 「為何要用 latch-based ICG？」 | 避免 enable 訊號產生 glitch |
| **Blocking/Non-blocking** | 「混用會怎樣？」 | 可能造成 simulation/synthesis 不一致 |
| **除頻電路** | 「如何做到 50% duty cycle 的奇數除頻？」 | 需要同時使用 posedge 和 negedge |

### 🔄 建議的複習順序

```
第一輪（基礎觀念，1-2天）：
  基礎概念 → CMOS 基礎 → Verilog/RTL → 組合邏輯

第二輪（核心主題，2-3天）：
  CDC → STA → 低功耗設計 → 合成

第三輪（進階主題，1-2天）：
  後端設計 → FPGA → 電路範例

第四輪（面試衝刺，1天）：
  常見面試問題 → 面試經驗 → 本指南的高頻考點
```

### 💡 白板題/手寫程式準備

面試常要求手寫 Verilog，以下是必須熟練的電路：

1. **2-FF Synchronizer** — CDC 基礎
2. **Divide-by-2, Divide-by-3** — 除頻電路
3. **Dual-edge detection** — 邊緣偵測
4. **FSM (Mealy/Moore)** — 狀態機
5. **Sequence detector** — 序列偵測器
6. **Async FIFO pointer logic** — Gray code 轉換

**手寫程式碼的注意事項：**
- 使用 `always @(posedge clk or negedge rst_n)` 標準寫法
- Sequential logic 用 `<=`（non-blocking）
- Combinational logic 用 `=`（blocking）
- 記得處理 reset 條件
- 變數命名要清楚（如 `sync_ff1`, `sync_ff2`）

### 📊 核心概念速查表

**⏱️ STA 速查：**
```
Setup Check: Data 必須在 clock edge 「之前」穩定
  Slack = Required Time - Arrival Time（正值 = PASS）
  修復：加速 data path 或減慢 capture clock

Hold Check: Data 必須在 clock edge 「之後」保持穩定
  Slack = Arrival Time - Required Time（正值 = PASS）
  修復：減慢 data path（加 buffer）
  ⚠️ Hold 與 clock period 無關！降頻無法修復 hold violation
```

**🔄 CDC 速查：**
```
Single-bit level signal → 2-FF Synchronizer
Single-bit pulse (slow→fast) → Toggle Synchronizer
Single-bit pulse (fast→slow) → Pulse Extender
Multi-bit data → Async FIFO with Gray Code

Gray Code 重點：相鄰值只有 1 bit 不同
  Binary to Gray: gray = bin ^ (bin >> 1)
```

**⚡ 低功耗速查：**
```
Dynamic Power: P = α × C × V² × f
  ↓ α：Clock gating, operand isolation
  ↓ V：DVFS, multi-VDD
  ↓ f：降頻

Static Power (Leakage):
  ↓ Multi-Vt：非關鍵路徑用 HVT
  ↓ Power gating：關閉整個電源域
```

**🔧 Verilog 速查：**
```
Blocking (=)     → Combinational logic
Non-blocking (<=) → Sequential logic
絕對不要混用！

產生 Latch 的寫法：
  - if 沒有 else
  - case 沒有 default
  - sensitivity list 不完整（用 always @(*)）
```

---

## 基礎概念

> **為何這些概念重要？** 在數位 IC 設計面試中，Latch、Flip-flop 和 Metastability 是最基礎也最常被問到的主題。這是因為：(1) 它們是所有 sequential circuits 的核心組成元件；(2) 理解它們的差異直接影響時序分析、功耗最佳化和設計穩定性；(3) Metastability 是跨時脈域設計（CDC）的根本挑戰，幾乎所有現代 SoC 都會遇到。掌握這些概念是理解後續 CDC、STA、低功耗設計等進階主題的必要前提。

### 同步邏輯 vs 異步邏輯

這是數位 IC 面試中最基礎的概念之一。理解同步與異步的差異，是理解後續 CDC、STA 等主題的前提。

| 面向 | 同步邏輯 (Synchronous) | 異步邏輯 (Asynchronous) |
|------|------------------------|-------------------------|
| **Clock** | 所有 flip-flop 共用同一時脈 | 無統一時脈，或使用多個獨立時脈 |
| **狀態變化** | 僅在 clock edge 時發生 | 由輸入訊號變化直接觸發 |
| **時序分析** | 簡單，可用 STA 工具分析 | 複雜，需要特殊分析方法 |
| **Metastability** | 無（若時序約束滿足） | 可能發生（需 synchronizer） |
| **設計難度** | 較低，工具支援完善 | 較高，需手動驗證 |
| **面積** | 較大（clock distribution 佔用） | 較小（無全域 clock tree） |
| **功耗** | 較高（clock tree 持續切換） | 較低（僅需要時切換） |

**同步時序邏輯電路的特點：**
- 所有 flip-flop 的 clock 端連接到同一個時脈源
- 僅當 clock edge 到來時，電路狀態才會改變
- 狀態表中的每個狀態都是穩定的
- 時序設計的實質：確保每個 flip-flop 的 setup/hold time 都被滿足

**異步時序邏輯電路的特點：**
- 電路中沒有統一的時脈
- 可使用不帶 clock 的 latch 和延遲元件作為儲存元件
- 電路狀態的改變由外部輸入直接觸發
- 常見於低功耗設計、多時脈域介面

**時序設計的實質（經典面試題）：**

```
時序設計的實質 = 滿足每一個 flip-flop 的建立時間 (setup time) 和保持時間 (hold time) 要求
```

這句話是許多面試官期待的標準答案。它說明了為何 STA 如此重要：STA 的核心任務就是驗證所有 timing path 是否滿足 setup/hold 約束。

### Latch vs Flip-flop

Latch 與 flip-flop 是數位設計中的基本儲存元件，各自儲存一個位元的資料。關鍵區別在於觸發機制：latch 是 **level-triggered**（位準觸發），表示當 enable 訊號為 active 時，輸出會跟隨輸入（transparent）；而 flip-flop 是 **edge-triggered**（邊緣觸發），僅在 clock 訊號的上升或下降邊緣時擷取輸入。這使得 flip-flop 在同步設計中更為可預測，而 latch 雖有速度優勢但會使時序分析變複雜。

| 特性 | Latch | Flip-Flop |
|---------|-------|-----------|
| **觸發方式** | Level-triggered（enable 時為 transparent）| Edge-triggered（僅在 clock edge 時變化）|
| **敏感度** | enable 為 high 時輸出跟隨輸入 | 僅在 rising/falling edge 時輸出變化 |
| **面積** | 較小，需要較少電路 | 較大，需要較多 gate |
| **速度** | 較快 | 較慢（因 edge detection 邏輯）|
| **功耗** | 較低 | 較高 |
| **時序分析** | 較複雜（可使用 time borrowing）| 較簡單，時序明確 |
| **FPGA 支援** | 不建議使用 | 建議使用 |

**重點：**
- Flip-flop 由兩個背對背的 latch 組成，使用相反極性的 clock（master-slave 架構）
- Latch 允許 **time borrowing**：若一個 half-cycle path 較慢而另一個較快，慢的 path 可從快的 path 借用時間
- 由於時序分析複雜，同步設計中通常避免使用 latch

**Time Borrowing 深入探討：**

Time borrowing 是 latch-based 設計中的強大技術，flip-flop 無法達成。關鍵在於 latch 在整個 enable 階段都是 transparent，而非僅在 edge 時。

```
範例：4 階段 pipeline，比較 latch 與 flip-flop

Flip-flop 架構（每階段限制在 half-period）：
  Stage delays: 8ns, 12ns, 6ns, 10ns (max = 12ns)
  所需週期: 2 × 12ns = 24ns → Fmax = 41.7 MHz

Latch 架構（允許 time borrowing）：
  總延遲: 8 + 12 + 6 + 10 = 36ns
  每階段平均: 36/4 = 9ns
  所需週期: 2 × 9ns = 18ns → Fmax = 55.6 MHz（快 33%！）
```

**為何 latch 對製程變異更有容忍度：** 當製程變異導致某些 path 較慢而其他較快時，latch-based 設計會透過 time borrowing 自動補償。這使得在變異顯著的先進製程中，latch 設計對良率更為友善。

![Latch](https://i.imgur.com/E6NY4ca.png)

![Flip-flop](https://i.imgur.com/tv3FbCD.png)

### **Metastability**

> **為何需要理解 Metastability？** 當設計師將訊號從一個 clock domain 傳遞到另一個時，由於兩個 clocks 之間沒有固定的相位關係，資料訊號必然會在某個時刻違反 destination flip-flop 的 setup 或 hold time。這種違規會導致 flip-flop 進入 metastable 狀態——輸出既非穩定的 0 也非穩定的 1，而是在中間電壓徘徊。若這種不穩定的輸出傳播到下游邏輯，可能導致系統功能錯誤甚至損壞。因此，理解 metastability 是設計可靠 CDC circuits 的基礎。

**什麼是 Metastability？** Metastability 發生在 flip-flop 輸出（Q pin）穩定所需的時間大於正常 clk-to-q（Tcq）時間時。這發生在資料在 clock edge 附近轉換，違反 setup 或 hold time 要求時。此時 flip-flop 內部的 feedback loop 處於不穩定平衡狀態，需要額外時間才能「決定」最終輸出是 0 還是 1。

![Metastability 1](https://i.imgur.com/y3WG22Q.png)
![Metastability 2](https://i.imgur.com/kp5y9dk.png)

**MTBF (Mean Time Between Failures) Formula:**

```
MTBF = e^(Tr/τ) / (T0 × Fclk × Fdata)
```

其中：
- `Tr` = resolution time（可用於 metastability 解決的時間）
- `τ` (tau) = metastability 時間常數（與元件相關）
- `Fclk` = clock 頻率
- `Fdata` = data 轉換頻率

**Resolution time 計算：**
```
Tr = Tclk - (Tsu + Tckq + Tpd)
```

**設計指引：**

Synchronizer 階段數透過公式中的指數項直接影響 MTBF。每增加一級大約可將 MTBF 平方，使 synchronizer 深度的選擇成為基於可靠性需求的關鍵設計決策。

- 使用 **2 個 flip-flop**：對大多數設計足夠（10s-100s MHz）
- 使用 **3 個 flip-flop**：太空/醫療設備強制要求
- 使用 **4 個 flip-flop**：MTBF 可達 1,000 年以上

**實際 MTBF 範例：**
```
已知: Fclk = 100 MHz, Fdata = 10 MHz, τ = 0.3 ns, T0 = 1 ns
當 Tr = 5 ns（100 MHz 下的 2FF synchronizer）：
  MTBF = e^(5/0.3) / (1e-9 × 100e6 × 10e6)
       = e^16.67 / (1e6)
       ≈ 1740 萬秒 ≈ 201 天

當 Tr = 10 ns（3FF synchronizer）：
  MTBF = e^(10/0.3) / (1e6)
       ≈ 2.8e8 年（實際上無限大）
```

`解決方案（double flip-flop synchronizer）`：只需在後續 flip-flop 階段後添加另一個由相同 clock 驅動的 flip-flop。第二個 flip-flop 給予第一個 flip-flop 整個 clock cycle 來從任何 metastable 狀態恢復。

**進階 MTBF 考量：**

| 因素 | 對 MTBF 的影響 | 建議 |
|--------|----------------|----------------|
| **sync 輸出負載重** | 減少 resolution time → MTBF 變差 | 保持 synchronizer 輸出輕載 |
| **較快的 flip-flop 系列** | 較低 setup/hold time → MTBF 較佳 | 使用快速 cell 作為 synchronizer |
| **多個 sync 位置** | 每個都增加失敗機率 | 訊號只同步一次，分發同步後的版本 |
| **溫度/電壓變化** | τ 隨條件變化 | 在最差 corner 下進行特性化 |

**製程節點趨勢：** 在先進製程（28nm 及以下），τ 值約 10ps，T0 約 20ps 是典型的。在 1 GHz 下，資料每 10 個 cycle 變化一次，有一個 clock cycle 用於解決，MTBF 可超過 10^29 年——實際上無限大。

**Altera/Intel 建議：** 使用三個 synchronizer flip-flop 作為標準做法以獲得更好的 metastability 保護，而非僅兩個。

**🎯 常見面試追問：**

| 問題 | 答案重點 |
|------|----------|
| **「Metastability 是什麼？什麼時候會發生？」** | 當 flip-flop 的 setup/hold time 被違反時，輸出可能進入不穩定狀態。在 CDC 設計中必然會發生 |
| **「如何解決 Metastability？」** | 使用 2-FF 或 3-FF synchronizer，給第一級 FF 整個 clock cycle 從 metastable 狀態恢復 |
| **「為何不用 1 個 FF 就好？」** | 1 個 FF 可能將 metastable 狀態直接傳給下游邏輯，造成功能錯誤。第二個 FF 提供 resolution time |
| **「什麼情況需要 3-FF？」** | 高可靠性應用（太空、醫療）或高頻設計，3-FF 可使 MTBF 指數級提升 |
| **「MTBF 公式中哪個參數影響最大？」** | Resolution time (Tr)！因為它在指數項中，Tr 加倍可使 MTBF 提升數個數量級 |

---

## 跨時脈域 (CDC)

> **為何 CDC 是面試熱門主題？** 現代 SoC 通常包含多個 clock domains：CPU 可能運行在 2GHz，DDR 介面在 1.6GHz，USB 控制器在 480MHz，I2C 在 400kHz。這些不同頻率的模組必須相互通訊，而每當訊號跨越 clock domain 邊界時，就會產生 CDC 問題。CDC 設計錯誤是 ASIC 設計中最常見的功能性 bug 來源之一，因為這類錯誤：(1) 在 simulation 中難以重現（需要特定的相位關係）；(2) 可能在 silicon 上間歇性發生；(3) 隨著製程變異和溫度變化而表現不同。因此，面試官會深入考察應試者對 CDC 的理解。

### **CDC 概述**

**什麼是 Clock Domain Crossing？** 當訊號從一個 clock domain 傳遞到另一個 clock domain 時，就會發生 CDC。這是多時脈設計中最具挑戰性的部分。

**為何 CDC 會導致問題？** 由於兩個 clocks 之間沒有固定的相位關係，訊號在 destination domain 被 sample 的時機是不可預測的。當訊號恰好在 destination flip-flop 的 setup/hold window 內變化時，就會違反時序要求並導致 metastability。更糟的是，若直接將多位元訊號（如 bus）跨時脈域傳輸，每個 bit 可能在不同的 cycle 被正確 sample，導致資料錯亂（例如：原本要傳 `0111`，結果收到 `0011`）。

**解決 CDC 的核心思路：** 我們無法避免 metastability 的發生，但可以給 flip-flop 足夠的時間從 metastable 狀態恢復，並確保多位元資料的一致性。這就是各種 CDC synchronizers 的設計原理。

了解 clock 之間的頻率和相位關係，可以幫助選擇最適合的同步策略：

**CDC 類型：**

| 類型 | 說明 |
|------|-------------|
| **Asynchronous** | Clock 有不同頻率且無相位關係——最具挑戰性，需要強健的同步機制 |
| **Mesochronous** | 相同頻率，不同相位——相位偏移固定，需一次性補償 |
| **Plesiochronous** | 幾乎相同頻率，逐漸漂移——需要持續相位追蹤和補償 |

#### **Single bit signal**

**2-FF Synchronizer 的原理：** 對於單一位元訊號的 CDC，最基本且最常用的解決方案是 double flip-flop（2-FF）synchronizer。它的原理很簡單：第一個 flip-flop 可能進入 metastable 狀態，但我們給它整整一個 clock cycle 的時間來恢復穩定；當訊號傳到第二個 flip-flop 時，它已經是穩定的 0 或 1 了。

**為何 2-FF 足夠？** 如前面 MTBF 公式所示，兩級 synchronizer 在大多數應用（數十到數百 MHz）下已能提供足夠的可靠性。對於太空或醫療等高可靠性要求的應用，則使用 3-FF 或 4-FF。

**2-FF 的限制：** 這種方法僅適用於「level」型訊號（訊號會保持足夠長的時間讓 destination domain 能 sample 到）。對於 pulse 訊號（僅持續一個 source clock cycle），destination domain 可能完全錯過這個 pulse，特別是當 source clock 比 destination clock 快時。因此需要使用 Pulse synchronizer。

**最佳實踐：** 避免在 synchronizer flip-flop 前面放置組合邏輯。組合邏輯在穩定前容易產生多次 glitch，增加 metastability 風險。

**Single-bit Synchronizer 類型：**

| Synchronizer | 說明 | 使用情境 |
|--------------|-------------|----------|
| **Level** | 用於靜態訊號的 2-FF synchronizer | 變化緩慢的控制訊號 |
| **Edge** | 偵測跨域的 edge 轉換 | Clock enable、中斷 |
| **Pulse** | 基於 XOR，轉換 pulse→level→pulse | 快速 pulse（req/ack）|

**Pulse synchronizer**：透過 XOR gate 將 pulse 訊號轉換為 level 訊號，通過 double flip-flop，再透過另一個 XOR gate 將 level 訊號轉換回 pulse 訊號。
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

**限制：** 連續 source pulse 之間最少需要 3 個 destination clock cycle。

**Edge synchronizer**：與 pulse synchronizer 類似，但在 destination domain 偵測到 rising/falling edge 時輸出 pulse。

#### **Toggle Synchronizer（慢到快 CDC）**

當從慢速 clock domain 傳輸 pulse 到快速 clock domain 時，destination 可以安全地多次取樣訊號。Toggle synchronizer 在此情況下有效，因為來自慢速 domain 的 pulse 持續時間跨越多個快速 clock cycle。

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

#### **Pulse Extender（快到慢 CDC）**

當從快速 clock domain 傳輸 pulse 到慢速 clock domain 時，單一 cycle 的快速 pulse 可能完全被慢速 clock 錯過。Pulse extender 會延展快速 pulse，確保它至少跨越 2-3 個慢速 clock cycle。

**問題：** 在 500 MHz（2ns）的 1-cycle pulse 傳輸到 50 MHz（20ns 週期）時，可能完全在兩個慢速 clock edge 之間被錯過。

**解決方案：** 使用 feedback acknowledgment 在 source domain 中延展 pulse：

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

**CDC Synchronizer 選擇指南：**

| Source → Dest | 技術 | 延遲 | 備註 |
|--------------|-----------|---------|-------|
| 慢 → 快 | Toggle sync | 2-3 快速 cycle | 簡單、可靠 |
| 快 → 慢 | Pulse extender | 4-6 快速 cycle | 使用 feedback ack |
| 相同頻率 | 2-FF sync | 2 cycle | 最簡單的方法 |
| Multi-bit | Async FIFO | 可變 | 最穩健 |

**🎯 常見面試追問：**

| 問題 | 答案重點 |
|------|----------|
| **「2-FF synchronizer 能解決所有 CDC 問題嗎？」** | 不能！只能處理 single-bit level signals。Multi-bit 需要 Gray code/FIFO，短 pulse 需要 extender |
| **「為何用 2 個 FF 而不是 1 個？」** | 第一個 FF 可能進入 metastable，需要給它一個完整 cycle 恢復穩定 |
| **「可以用 3 個 FF 嗎？」** | 可以！3-FF 用於高可靠性應用（太空、醫療），MTBF 指數級提升 |
| **「synchronizer FF 前面可以放組合邏輯嗎？」** | 不建議！組合邏輯可能產生 glitch，增加 metastability 風險 |
| **「快到慢 CDC，pulse 會被錯過嗎？」** | 會！如果 pulse 寬度 < slow clock period，可能完全被錯過，需用 pulse extender |

#### **Multi bit signal**

**為何 Multi-bit CDC 比 Single-bit 複雜得多？** 假設我們需要將一個 4-bit 計數器從 source domain 傳到 destination domain。若對每個 bit 分別使用 2-FF synchronizer，會發生什麼事？

```
問題示範：Binary counter 3→4 的 CDC
Source domain:  0011 (3) → 0100 (4)  // 3個bits同時變化

在 destination domain 取樣時，每個 bit 的 2-FF 延遲是隨機的（1或2個cycle）：
  - bit[3]: 0→0 (sampled early)  → 0
  - bit[2]: 0→1 (sampled late)   → 1
  - bit[1]: 1→0 (sampled early)  → 1
  - bit[0]: 1→0 (sampled late)   → 0

結果：destination 可能看到 0110 (6)，完全錯誤的值！
```

這種現象稱為「data coherency」問題——多個相關的 bits 必須作為一個整體被一致地擷取。

**Multi-bit CDC 解決方案：**

同步 multi-bit 資料需要確保所有位元被一致地擷取。有幾種技術存在，各有不同的延遲、吞吐量和複雜度之間的權衡：

* **Load signal（MCP - Multi-Cycle Path）**：使用 pulse synchronizer 產生 load signal。Qualifier pulse 啟用 multi-bit bus 的取樣。Source data 必須保持穩定足夠長的時間以安全同步。
![Load signal](https://i.imgur.com/gDR7VW7.png)

* **Handshake synchronization**：Source 發送「request」訊號 → destination 透過 2-FF synchronizer 接收 → destination 透過 2-FF synchronizer 發送「ack」回去 → source 可更新資料。保證資料完整性但增加延遲。

* **額外兩級 flip-flop**：使用 double flip-flop synchronizer 將資料同步到 destination domain，然後讓資料通過兩級 flip-flop，再比較這 3 級。若全部相等，表示 synchronizer 同步的值是穩定的。

* **Asynchronous FIFO**：對於連續資料流最穩健的解決方案，使用 Gray-coded pointer 在 domain 之間安全傳輸讀/寫位址。

### **Asynchronous FIFO**

**什麼情況需要 Asynchronous FIFO？** 當兩個不同 clock domains 之間需要持續、高頻寬的資料傳輸時，Async FIFO 是最穩健的解決方案。例如：(1) DDR controller 與 CPU 之間的資料緩衝；(2) USB PHY 與 USB controller 之間的封包儲存；(3) 任何需要處理 burst 傳輸或 data rate 不匹配的介面。

**Async FIFO 的核心挑戰：** FIFO 需要比較 read pointer 和 write pointer 來判斷 full/empty 狀態。但這兩個 pointers 分別在不同的 clock domain 中更新——write pointer 在 write clock domain，read pointer 在 read clock domain。我們需要將 pointers 跨時脈域同步，同時避免前面提到的 multi-bit data coherency 問題。

**解決方案：Gray Code** 將 read/write pointer 轉換為 Gray code 表示法。由於 Gray code 在每次遞增時只改變一個位元，我們可以安全地使用 2-FF synchronizer 傳輸到另一個 domain，不會發生 data coherency 問題。

**為何 Gray Code 是必要的：**
```
Binary counter（CDC 錯誤做法）：
  3 → 4: 011 → 100（3 個位元同時改變！）
  若在轉換中取樣：可能讀到 000, 001, 010, 100, 101, 110, 111
  → FIFO 可能錯誤報告 full/empty

Gray code counter（CDC 安全做法）：
  3 → 4: 010 → 110（只有 1 個位元改變）
  若在轉換中取樣：不是 010 就是 110
  → 最差情況，pointer 偏移 1（保守的 full/empty）
```

#### Gray code 編碼方法
1. 相鄰的兩個 gray code 之間只有一個位元不同
2. 當 binary code 的第 N 個位元從 0 變為 1 時，gray code 的後續 N-1 個位元會與前半部分對稱，而第 N 個位元之前的位元保持不變

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

若 Asynchronous FIFO 深度不是 2 的冪次，可利用 gray code 的對稱性改變起始點，確保每個相鄰 gray code 僅有一個 bit 變化。
![Gray code 3](https://i.imgur.com/yBLXnAv.png)

### **FIFO Depth Calculation**

計算最小 FIFO 深度對於 asynchronous FIFO 至關重要，可防止當 write rate 暫時超過 read rate 時發生資料遺失。「Leaky Bucket」模型提供了系統性的方法來決定所需深度。

**Leaky Bucket Model:**

將 FIFO 想像成一個水桶：
- 水以 write rate (f_wr) 流入
- 水以 read rate (f_rd) 流出
- 水桶必須足夠大，以容納 burst 期間累積的水量

**Basic Formula (Continuous Burst):**

在連續寫入 B 個 data items 且無 idle cycles 時：

```
FIFO_Depth ≥ B - B × (f_rd / f_wr)
           = B × (1 - f_rd / f_wr)
           = B × (f_wr - f_rd) / f_wr
```

其中：
- B = Burst 長度（連續寫入的 data items 數量）
- f_wr = Write clock 頻率
- f_rd = Read clock 頻率

**範例 1: Simple Burst**
- Write clock: 80 MHz, Read clock: 50 MHz
- Burst 長度: 120 data items（無 idle）

```
Depth ≥ 120 × (1 - 50/80)
      = 120 × (1 - 0.625)
      = 120 × 0.375
      = 45
```

最小 FIFO 深度 = 45 entries

**Idle Cycle 調整:**

若寫入之間有 idle cycles，有效 write rate 會降低：

```
Effective_f_wr = f_wr × (Data_cycles / Total_cycles)

FIFO_Depth ≥ B × (1 - f_rd / Effective_f_wr)
```

**範例 2: 含 Idle Cycles**
- Write: 80 MHz，每 4 個 data cycles 有 1 個 idle cycle（3 data + 1 idle）
- Read: 50 MHz 連續
- Burst: 120 data items

```
Effective_f_wr = 80 × (3/4) = 60 MHz

Depth ≥ 120 × (1 - 50/60)
      = 120 × (1/6)
      = 20
```

**實際考量:**

| 因素 | 對深度的影響 |
|--------|----------------|
| Synchronization latency | 增加 2-4 cycles margin |
| Full/Empty detection delay | 增加額外 entries |
| 2 的冪次限制 | 向上取整至最近的 2^n |
| 安全餘量 | 通常增加 10-20% |

**Gray Code Full/Empty Detection:**

```verilog
// Full: MSB different, other bits same (after sync)
assign full = (wr_ptr_gray[N:N-1] == ~rd_ptr_sync[N:N-1]) &&
              (wr_ptr_gray[N-2:0] == rd_ptr_sync[N-2:0]);

// Empty: pointers identical (after sync)
assign empty = (rd_ptr_gray == wr_ptr_sync);
```

注意：pointer 中額外的 MSB bit 允許在使用 Gray code 時區分 full（pointers 僅在 MSB 不同）和 empty（pointers 相同）狀態。

**為何 Gray Code 在 CDC 中有效（即使 Fast-to-Slow）:**

一個常見的誤解是 Gray code 在從 fast 到 slow clock domain 跨越時會失效，因為在 slow clock 取樣之間可能發生多次 increment。然而，關鍵的洞見是：

```
Fast-to-slow crossing 考量:
  Fast domain increments: 5 → 6 → 7 → 8 (Gray: 111 → 101 → 100 → 110)
  Slow domain 取樣: 可能只看到 5 和 8

為何這是安全的:
  - 在 fast domain 中任一時刻只有一個 bit 在變化
  - Slow domain 看到的是單調遞增的序列
  - 最壞情況下，slow domain 可能跳過數值，但永遠不會看到無效值
  - 這意味著 FIFO 可能回報「比實際更滿」或「比實際更空」
  - 保守（安全）行為：防止 overflow/underflow
```

**實際 FIFO 考量:**
- 實際 FIFO 的 CDC synchronizers 會消耗 2-4 entries 的可用深度
- 務必驗證特定 FIFO IP 在 corner cases 的行為
- 為 streaming 應用決定大小時，需考慮 back-pressure latency

### **FIFO Almost Full/Empty**

除了基本的 full/empty flags，FIFO 通常會實作可程式化的 threshold flags（almost_full、almost_empty）來支援 burst 傳輸並為 flow control 提供早期警告。

**為何需要 Almost Full/Empty:**

```
問題：Writer 無法立即停止
  Writer 看到：FULL flag（太晚了！）
  Writer 已有資料在傳輸中
  結果：FIFO overrun！

解決方案：使用 Almost Full 提供早期警告
  Writer 看到：ALMOST_FULL flag
  Writer 停止發送新資料
  Writer 傳輸中的資料填滿剩餘空間
  結果：無 overrun，優雅地達到 FULL 狀態

ALMOST_FULL 和 FULL 之間的間隙稱為「skid buffer」
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

**常見 Flag 定義:**

| Flag | 條件 | 典型用途 |
|------|-----------|-------------|
| **EMPTY** | rd_ptr == wr_ptr | 阻擋 read 操作 |
| **FULL** | wr_ptr - rd_ptr == DEPTH | 阻擋 write 操作 |
| **ALMOST_EMPTY** | count ≤ AE_threshold | 觸發 DMA refill |
| **ALMOST_FULL** | count ≥ AF_threshold | 施加 back-pressure |
| **HALF_FULL** | count == DEPTH/2 | Flow control 切換 |

**實作方法:**

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

**可程式化 Thresholds:**

許多 FIFO IP 允許在執行時期設定 thresholds：

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

**Threshold 選擇指南:**

| 參數 | 考量 | 典型值 |
|-----------|---------------|---------------|
| **AF_THRESH** | 最大 burst size + CDC latency | DEPTH - 4 到 DEPTH - 8 |
| **AE_THRESH** | underrun 前的最小 read burst | 2 到 4 |
| **CDC Latency** | 每個 synchronizer 2-3 clock cycles | 納入 timing 考量 |

**Burst 傳輸範例:**

```
情境：USB 封包接收（最大 64 bytes）
  - FIFO 深度：128 bytes
  - Read clock 比 write clock 慢

AF_THRESHOLD 計算：
  最大 burst：64 bytes
  CDC latency：3 write cycles
  安全餘量：1 byte

  AF_THRESH = 128 - 64 - 3 - 1 = 60

當 count ≥ 60 時：
  - Assert almost_full
  - 通知 USB controller 對下一個封包回應 NAK
  - 剩餘 68 slots 吸收傳輸中的資料
```

**Gray Code 考量:**

在 async FIFO 中，full/empty flags 使用 synchronized Gray code pointers。對於 almost_full/empty，需要計算 pointers 之間的實際距離：

```verilog
// Option 1: Convert to binary after synchronization
wire [PTR_WIDTH-1:0] wr_ptr_bin_sync = gray_to_bin(wr_ptr_gray_sync);
wire [PTR_WIDTH-1:0] rd_ptr_bin_sync = gray_to_bin(rd_ptr_gray_sync);
wire [PTR_WIDTH-1:0] count = wr_ptr_bin_sync - rd_ptr_bin_sync;

// Option 2: Use conservative thresholds (account for sync uncertainty)
// Almost_full may assert slightly early (safe, but reduced effective depth)
```

**🎯 Async FIFO 常見面試追問：**

| 問題 | 答案重點 |
|------|----------|
| **「為何 Async FIFO 要用 Gray Code？」** | 因為 Gray code 每次只變 1 bit，即使跨時脈域同步時採樣到轉換中的值，最多只差 1，不會產生錯誤的 pointer 值 |
| **「Binary to Gray 轉換公式？」** | `gray = bin ^ (bin >> 1)` — 面試常要求手寫 |
| **「如何判斷 FIFO Full/Empty？」** | Empty: `rd_ptr_gray == wr_ptr_sync`；Full: MSB 相反，其他 bits 相同 |
| **「FIFO 深度不是 2 的冪次怎麼辦？」** | 利用 Gray code 的對稱性，改變起始點使其仍只有 1 bit 變化 |
| **「Fast-to-slow CDC，Gray code 還有效嗎？」** | 有效！Slow domain 可能跳過一些值，但不會看到無效值，只會讓 FIFO 報告「比實際更滿/空」（保守行為） |
| **「FIFO Depth 如何計算？」** | `Depth ≥ B × (1 - f_rd/f_wr)`，B 是 burst 長度，還要加上 sync latency 的 margin |
| **「為何不直接用 full flag 做 flow control？」** | Writer 可能已發出更多寫入，almost_full 提供預先警告，避免 overrun |
| **「Almost_full threshold 如何選擇？」** | DEPTH 減去（max_burst_size + synchronization_latency + safety_margin） |

---

## CMOS 與數位基礎元件

> **為何需要了解 CMOS 基礎？** 數位 IC 設計最終都是由 NMOS 和 PMOS 電晶體實現的。理解這些基礎元件的特性，有助於解釋許多設計現象：為何 PMOS 要比 NMOS 大？為何 transmission gate 需要兩個電晶體？為何 inverter 比 buffer 效率更高？這些知識在面試中經常被用來測試應試者對底層原理的理解。

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

結合兩種方法的最佳實踐 - reset 立即生效，但釋放時與 clock 同步以避免 metastability。

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

| 術語 | 定義 |
|------|------------|
| **Race** | 不同的傳播延遲導致訊號在不同時間到達，造成不可預測的結果 |
| **Hazard** | 由於路徑延遲不等，組合邏輯輸出產生暫時性 glitches（不期望的脈衝）|

**Hazard 類型:**

| 類型 | 描述 | 範例 |
|------|-------------|---------|
| **Static-1** | 輸出應保持 1，但 glitch 到 0 | Y = A + A'（瞬間為 0）|
| **Static-0** | 輸出應保持 0，但 glitch 到 1 | Y = A · A'（瞬間為 1）|
| **Dynamic** | 輸出應變化一次，但變化多次 | 多次 transitions |

**解決方案:**

Hazards 可在邏輯設計層面消除，或透過 sequential elements 遮蔽。選擇取決於是否需要無 glitch 的組合輸出，還是可接受 registered 輸出。

- 在布林表達式中加入冗餘項（consensus term）
- 插入 output register 以過濾 glitches
- 使用 Gray code encoding
- 加入 delay elements 以平衡路徑

```
範例：Y = AB + A'C 當 B=C=1、A 變化時有 hazard
修正：Y = AB + A'C + BC（加入 consensus term BC）
```

### **High-Impedance State (Tri-state)**

高阻抗（Hi-Z）狀態既非邏輯 0 也非邏輯 1。輸出表現為具有極高電阻的開路。

**特性:**
- 輸出與電路電性隔離
- 允許多個驅動器共用一條 bus
- 由 output enable (OE) 訊號控制

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

**使用場景:**

當多個裝置需要驅動同一訊號線時，tri-state 輸出至關重要。若無 tri-state 功能，連接多個輸出會造成競爭並可能損壞電路。高阻抗狀態允許非活動的驅動器電性隔離。

- 共享 bus 架構（如 CPU data bus）
- 雙向 I/O pins（GPIO、memory interfaces）
- Memory data buses（SRAM、DRAM data lines）

### **線與邏輯與 OC/OD 門**

> **經典面試題：什麼是「線與」邏輯？要實現它，在硬體特性上有什麼具體要求？**

**線與 (Wired-AND)** 是指將多個輸出端直接連接在一起，實現「AND」邏輯功能：只要有一個輸出為低電位，整體輸出就為低電位。

**為何普通 CMOS 門不能直接線與？**

```
普通 CMOS 輸出：
  VDD ─┬─ PMOS ─┬─ 輸出
       └─ NMOS ─┘
              │
             GND

問題：若兩個普通 CMOS 門輸出相連，
一個輸出 High (PMOS 導通)，一個輸出 Low (NMOS 導通)
→ VDD 到 GND 形成短路 → 大電流 → 燒毀電路！
```

**OC 門 (Open Collector) / OD 門 (Open Drain)：**

| 類型 | 全名 | 技術 | 輸出結構 |
|------|------|------|----------|
| **OC 門** | Open Collector | BJT (雙極性電晶體) | 僅有 NPN，集電極開路 |
| **OD 門** | Open Drain | MOSFET | 僅有 NMOS，汲極開路 |

```
OD 門結構：                   使用方式：
                                  VDD
                                   │
  輸入 ──┬── NMOS ─┬─ 輸出         Rp (上拉電阻)
         │        │                │
        GND      開路        多個 OD 門 ──┴── 線與輸出
                                   │
                              讀取點（Wired-AND）
```

**線與邏輯的實現：**

```
OD 門 A ──┬── 上拉電阻 Rp ── VDD
OD 門 B ──┘
          │
       輸出 Y = A · B（線與）

當 A=0 或 B=0 時，對應 NMOS 導通，Y 被拉低 → Y=0
當 A=1 且 B=1 時，兩個 NMOS 都截止，Y 被上拉 → Y=1
```

**OC/OD 門的三大應用：**

| 應用 | 說明 |
|------|------|
| **線與邏輯** | 多個輸出共用一條線，實現 AND 功能 |
| **電平轉換** | 改變上拉電阻接的電壓即可改變輸出電平（如 3.3V → 5V）|
| **驅動能力** | 透過外部上拉電阻調整驅動能力 |

**面試常見追問：**

| 問題 | 答案重點 |
|------|----------|
| **「OC/OD 門輸出 High 時電流從哪來？」** | 從外部上拉電阻提供，不是從門內部 |
| **「I²C 為何用 OD 結構？」** | 允許多個裝置共用 SDA/SCL 線，實現線與邏輯和雙向通訊 |
| **「上拉電阻如何選擇？」** | 太大→上升時間慢；太小→低電位時功耗大。需平衡速度與功耗 |

### **NMOS vs PMOS**

NMOS 和 PMOS 是 CMOS 技術中兩種互補的電晶體類型。它們的根本差異在於載流子：NMOS 使用電子，而 PMOS 使用電洞。由於矽中電子遷移率（~1350 cm²/V·s）約為電洞遷移率（~480 cm²/V·s）的 2-3 倍，NMOS 電晶體切換速度更快，在相同驅動強度下可以更小。這就是為何平衡 CMOS inverter 中的 PMOS 電晶體通常比 NMOS 寬 2-3 倍。

| 特性 | NMOS | PMOS |
|----------|------|------|
| **載流子** | 電子 | 電洞 |
| **遷移率** | 較高（約快 2-3 倍）| 較低 |
| **導通條件** | Gate = High (VGS > Vth) | Gate = Low (VGS < Vth) |
| **傳遞特性** | Strong 0, weak 1 | Strong 1, weak 0 |
| **Pull 網路** | Pull-down（至 GND）| Pull-up（至 VDD）|
| **相同驅動力的尺寸** | 較小 | 較大（約 2-3 倍）|

**為何 NMOS 較快:**
- 電子遷移率（~1350 cm²/V·s）> 電洞遷移率（~480 cm²/V·s）
- 在相同電流驅動下，NMOS 可比 PMOS 更小

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

電壓轉移特性（VTC）曲線繪製輸入電壓對輸出電壓的關係，是表徵數位 inverter 品質的關鍵指標。從此曲線可以提取 noise margins、增益和操作邏輯位準。

**五個操作區域:**

| 區域 | Vin 範圍 | NMOS 狀態 | PMOS 狀態 | Vout |
|--------|-----------|------------|------------|------|
| **A** | 0 ≤ Vin ≤ VTHn | Cut-off | Linear | VDD |
| **B** | VTHn < Vin < VM | Saturation | Linear | High |
| **C** | Vin ≈ VM | Saturation | Saturation | VM |
| **D** | VM < Vin < VDD-VTHp | Linear | Saturation | Low |
| **E** | Vin ≥ VDD-VTHp | Linear | Cut-off | 0 |

**切換閾值（VM）:** 在 VM 時，NMOS 和 PMOS 都處於飽和狀態並同時導通，產生 **short-circuit current** - 這是動態功耗的重要組成部分。

**Noise Margins:**

Noise margin 量化輸入能容忍多少雜訊而不影響輸出：

```
NML = VIL - VOL  (Low Noise Margin)
NMH = VOH - VIH  (High Noise Margin)

其中：
  VIL = 被認定為 LOW 的最大輸入電壓
  VIH = 被認定為 HIGH 的最小輸入電壓
  VOL = LOW 的最大輸出電壓
  VOH = HIGH 的最小輸出電壓
```

**調整 VM:** 可透過改變 β ratio（PMOS 對 NMOS 的 W/L 比）來移動切換閾值。增加 PMOS 寬度會使 VM 升高；增加 NMOS 寬度會使 VM 降低。

### **Transmission Gate**

傳輸閘由並聯的 NMOS 和 PMOS 組成，實現 **full-swing** 訊號傳遞（同時傳遞 strong 0 和 strong 1）。

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

**為何需要兩個電晶體？**
- NMOS 傳遞 strong 0 但 weak 1（損失 VTHn）
- PMOS 傳遞 strong 1 但 weak 0（損失 |VTHp|）
- 結合使用：完整的 rail-to-rail 訊號傳遞

**使用 Transmission Gates 的 D-Latch:**

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

    EN=1: TG1 開啟, TG2 關閉 → Transparent（Q 跟隨 D）
    EN=0: TG1 關閉, TG2 開啟 → Latched（Q 保持）
```

**為何在回授中使用 Weak Inverter？** 為避免 **contention** - 當寫入新資料時，weak inverter 的輸出可被較強的輸入訊號輕易覆蓋。

**使用 NMOS/PMOS 建構閘:**

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

> **Verilog 面試的重點是什麼？** 面試官通常不會只問「Verilog 的語法是什麼」，而是測試你對 Verilog 背後硬體概念的理解。最經典的問題是 blocking vs non-blocking assignments——這不只是語法問題，而是關於你是否理解 simulation semantics 與 synthesis 結果的對應關係。另一個常見主題是「什麼寫法會產生 Latch」，這測試你是否知道綜合工具如何將 RTL 映射到硬體。

### **Blocking vs Non-blocking Assignments**

| Assignment | 符號 | 行為 | 使用場景 |
|------------|--------|----------|----------|
| **Blocking** | `=` | 依序執行，阻擋下一條陳述式 | Combinational logic |
| **Non-blocking** | `<=` | 同時執行，在 time step 結束時更新 | Sequential logic |

**關鍵規則:**
- 對 sequential logic（flip-flops、registers）使用 **non-blocking (`<=`)**
- 對 combinational logic 使用 **blocking (`=`)**
- 永遠不要在同一個 always block 中混用 blocking 和 non-blocking

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

**為何重要:** Sequential logic 中的 blocking assignments 可能在合成時產生非預期的組合路徑，導致 simulation/synthesis 不一致。

**Cliff Cummings 的黃金準則**（出自 "Nonblocking Assignments in Verilog Synthesis, Coding Styles That Kill!"）:

1. **準則 #1:** 建模 sequential logic 時，使用 **non-blocking** assignments
2. **準則 #2:** 建模 latches 時，使用 **non-blocking** assignments
3. **準則 #3:** 使用 always block 建模 combinational logic 時，使用 **blocking** assignments
4. **準則 #4:** 在同一個 always block 中同時建模 sequential 和 combinational logic 時，使用 **non-blocking** assignments
5. **準則 #5:** **不要混用** blocking 和 non-blocking 在同一個 always block 中
6. **準則 #6:** 不要從多個 always block 對同一變數進行 assignments

遵循這些準則可消除 90-100% 最常見的 Verilog race conditions。

**Verilog Stratified Event Queue:**

理解 blocking 和 non-blocking *為何*行為不同，需要了解 Verilog 的 simulation event queue：

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

**關鍵洞見:** Non-blocking assignments 在 Active region 評估 RHS，但在 NBA region 更新 LHS。這種分離防止了 sequential logic 中的 race conditions。

**面試陷阱 - 使用 Blocking 的 Shift Register:**
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

**🎯 常見面試追問：**

| 問題 | 答案重點 |
|------|----------|
| **「Blocking 和 Non-blocking 可以混用嗎？」** | 絕對不行！混用會導致 simulation/synthesis 結果不一致，是最常見的 RTL bug 來源 |
| **「為何 sequential logic 要用 Non-blocking？」** | 因為 Non-blocking 在 NBA region 才更新 LHS，確保所有 RHS 在同一時間點被評估，模擬真實 FF 的並行行為 |
| **「Blocking 在 sequential logic 中會產生什麼問題？」** | 會產生 race condition，因為 assignments 立即生效，後面的語句會讀到已更新的值，而非原始值 |
| **「如何快速判斷用哪種？」** | 記住：`always @(posedge clk)` → `<=`；`always @(*)` → `=` |
| **「Verilog Event Queue 有幾個 region？」** | 5 個：Active → Inactive → NBA → Monitor → Future。Blocking 在 Active 執行，Non-blocking 在 NBA 更新 |

### **FSM (Finite State Machine) - 三段式寫法**

推薦的寫法風格，將 sequential 和 combinational logic 分開：

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

**FSM 類型:**

有限狀態機依據其輸出產生方式分類。Moore machine 的輸出僅基於當前狀態，產生無 glitch 的 registered 輸出，但可能需要更多狀態。Mealy machine 的輸出基於當前狀態和輸入，能以更少狀態實現更快響應，但可能在輸出轉換時產生 glitches。

| 面向 | Moore Machine | Mealy Machine |
|--------|---------------|---------------|
| **輸出取決於** | 僅當前狀態 | 當前狀態 + 輸入 |
| **輸出時序** | 在狀態轉換後變化 | 隨輸入立即變化 |
| **延遲** | 1 cycle delay | 無延遲（combinational）|
| **Glitches** | 無 glitch 輸出 | 易產生 glitches |
| **所需狀態數** | 較多狀態 | 較少狀態 |
| **使用場景** | 乾淨輸出、安全關鍵 | 快速響應、面積受限 |

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

**寫法提示:**
- 使用 `localparam` 或 `parameter` 進行 state encoding
- 高速設計優先使用 **one-hot encoding**（解碼快、較多 FFs）
- 面積受限設計優先使用 **binary encoding**（較少 FFs）
- 循序狀態機優先使用 **Gray code encoding**（最小切換）
- 永遠包含 `default` case 以避免產生 latches

**State Encoding 比較:**

| Encoding | Flip-Flops（N 個狀態）| 解碼邏輯 | 最適用於 |
|----------|----------------------|--------------|----------|
| **Binary** | ⌈log₂N⌉ | 複雜（N-bit 比較）| ASIC、面積受限 |
| **One-Hot** | N | 簡單（單 bit 檢查）| FPGA、高速 |
| **Gray** | ⌈log₂N⌉ | 中等 | 循序循環、低功耗 |

**FPGA vs ASIC 權衡:**
- **FPGA**: Flip-flops 豐富（在 CLBs 中）；combinational logic 昂貴（消耗 LUTs）。One-hot 通常較快，且整體資源使用常更少。
- **ASIC**: 每個 flip-flop 需約 25 個電晶體加上 clock distribution；2-input gates 僅需約 4 個電晶體。Binary encoding 通常在面積上勝出。

**合成工具行為:** 現代工具（Vivado、DC）常自動重新編碼 FSMs。Vivado 對 ≤32 狀態的 FSM 預設使用 one-hot。要保留你的編碼，使用合成屬性如 `(* fsm_encoding = "one_hot" *)` 或 `(* fsm_encoding = "sequential" *)`。

### **SystemVerilog Assertions (SVA)**

SystemVerilog Assertions（SVA）是強大的驗證功能，允許設計師直接在 RTL 或 testbench 中嵌入檢查。Assertion 可透過 simulation 動態驗證，或透過 formal verification 工具靜態驗證。

**兩種 Assertion 類型:**

| 類型 | 語法 | 評估方式 | 使用場景 |
|------|--------|------------|----------|
| **Immediate** | `assert (expression)` | Procedural，即時 | 簡單檢查、procedural 程式碼 |
| **Concurrent** | `assert property (...)` | 基於 clock，temporal | Protocol 檢查、多週期行為 |

**Immediate Assertions:**

Immediate assertions 像 procedural 陳述式一樣執行，在當前 simulation 時間檢查條件。

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

Concurrent assertions 基於 clock 且能表達跨越多個週期的時序關係。

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

**蘊含運算子:**

| 運算子 | 名稱 | 含義 |
|----------|------|---------|
| `\|->` | Overlapping | 若前項為真，同一週期檢查後項 |
| `\|=>` | Non-overlapping | 若前項為真，下一週期檢查後項 |

```systemverilog
// Overlapping: check starts same cycle
req |-> gnt;           // When req=1, gnt must be 1 (same cycle)

// Non-overlapping: check starts next cycle
req |=> gnt;           // When req=1, gnt must be 1 (next cycle)
// Equivalent to:
req |-> ##1 gnt;
```

**序列運算子:**

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

**常見 SVA 模式:**

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

**內建函式:**

| 函式 | 描述 |
|----------|-------------|
| `$rose(signal)` | 若訊號從 0→1 轉換則為真 |
| `$fell(signal)` | 若訊號從 1→0 轉換則為真 |
| `$stable(signal)` | 若訊號未變化則為真 |
| `$past(signal, N)` | N 個週期前的訊號值 |
| `$onehot(vector)` | 若恰好一個 bit 被設置則為真 |
| `$onehot0(vector)` | 若零或一個 bit 被設置則為真 |
| `$isunknown(signal)` | 若訊號包含 X 或 Z 則為真 |

**Cover Property:**

除了檢查違規，assertions 還可測量 coverage：

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

**將 Assertions 綁定到設計:**

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

**Assertion 嚴重程度等級:**

```systemverilog
assert property (...) else $info("Info message");
assert property (...) else $warning("Warning message");
assert property (...) else $error("Error message");
assert property (...) else $fatal(1, "Fatal error!");
```

---

## 組合邏輯

### **卡諾圖化簡 (Karnaugh Map)**

卡諾圖是簡化布林函式的圖形化方法。雖然現代 EDA 工具會自動進行邏輯最佳化，但卡諾圖仍是面試中常考的基礎知識，用以測試應試者對數位邏輯的基本功。

**卡諾圖化簡步驟：**

1. 將邏輯函式轉換為最小項表達式
2. 在卡諾圖中填入各最小項的值（0 或 1）
3. 找出相鄰的「1」，畫出最大的 2^n 矩形（圈）
4. 從每個圈中提取不變的變數，組成乘積項
5. 將所有乘積項相加，得到最簡表達式

**2 變數卡諾圖：**

```
      B=0  B=1
A=0 │ m0 │ m1 │   m0 = A'B'
A=1 │ m2 │ m3 │   m3 = AB
```

**3 變數卡諾圖：**

```
        BC=00  BC=01  BC=11  BC=10
A=0  │  m0  │  m1  │  m3  │  m2  │
A=1  │  m4  │  m5  │  m7  │  m6  │

注意：BC 順序為 00, 01, 11, 10（Gray code 順序）
```

**4 變數卡諾圖：**

```
        CD=00  CD=01  CD=11  CD=10
AB=00 │  m0  │  m1  │  m3  │  m2  │
AB=01 │  m4  │  m5  │  m7  │  m6  │
AB=11 │ m12  │ m13  │ m15  │ m14  │
AB=10 │  m8  │  m9  │ m11  │ m10  │
```

**圈選規則：**

| 規則 | 說明 |
|------|------|
| **大小** | 圈內格數必須是 2^n（1, 2, 4, 8, 16...）|
| **形狀** | 必須是矩形（含正方形）|
| **環繞** | 卡諾圖上下、左右相連（視為圓柱體）|
| **重疊** | 同一格可被多個圈包含 |
| **目標** | 用最少的最大圈覆蓋所有「1」|

**範例：化簡 F(A,B,C,D) = Σm(0,1,2,5,8,9,10)**

```
        CD=00  CD=01  CD=11  CD=10
AB=00 │  1   │  1   │  0   │  1   │  ← 圈 m0,m1,m2 → A'D'
AB=01 │  0   │  1   │  0   │  0   │  ← m5 需單獨考慮
AB=11 │  0   │  0   │  0   │  0   │
AB=10 │  1   │  1   │  0   │  1   │  ← 圈 m8,m9,m10 → AD'

圈 m0,m8 (column CD=00): B'C'D'
圈 m1,m5,m9 無法形成 2^n 矩形，需分別處理

最簡結果: F = A'D' + AD' + B'C'D' + A'BC'D
        = D'(A' + A + B'C') + A'BC'D
        = D' + A'BC'D  (進一步化簡)
```

**消除競爭冒險的應用：**

卡諾圖也可用於識別和消除組合邏輯中的競爭冒險（glitch）。當兩個相鄰的「1」圈只有邊界接觸而沒有重疊時，在輸入變化的瞬間可能產生 glitch。解決方法是增加一個冗餘圈覆蓋接觸邊界。

**面試常見追問：**

| 問題 | 答案重點 |
|------|----------|
| **「為何卡諾圖排列用 Gray code 順序？」** | 確保相鄰格只有 1 個變數不同，才能進行邏輯化簡 |
| **「卡諾圖最多處理幾個變數？」** | 實用上限 4-6 個變數；超過 6 變數應使用 Quine-McCluskey 演算法 |
| **「Don't care（X）如何處理？」** | 可視需要當作 0 或 1，選擇能產生更大圈的方式 |

### **Full adder**

Full adder 是算術電路的基本建構模組，將三個單 bit 輸入（兩個運算元和一個 carry-in）相加，產生 sum 和 carry-out。多個 full adders 可串接成 ripple-carry adders 進行多位元加法，但更高效能的架構如 carry-lookahead 或 carry-select adders 用於更高效能需求。

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

建構多位元加法器時，RCA 和 CLA 之間的選擇代表基本的面積-速度權衡。

| 面向 | Ripple Carry Adder (RCA) | Carry Look-ahead Adder (CLA) |
|--------|--------------------------|------------------------------|
| **延遲** | O(N) - 與 bit 寬度線性關係 | O(log N) - 對數關係 |
| **面積** | 較小，N 個 full adders | 較大，額外的 G/P 邏輯 |
| **複雜度** | 簡單串接 | 複雜的 carry 計算 |
| **使用場景** | 低速、面積關鍵 | 高速算術運算 |

**RCA 問題:** Carry 必須依序通過所有階段。對於 N-bit 加法器，最壞情況延遲 = N × (carry propagation delay)。

**CLA 解決方案:** 使用 Generate (G) 和 Propagate (P) 函式平行預先計算 carries：

```
Generate: Gi = Ai · Bi      (bit position i generates carry)
Propagate: Pi = Ai ⊕ Bi     (bit position i propagates carry)

Carry equations:
C1 = G0 + P0·C0
C2 = G1 + P1·G0 + P1·P0·C0
C3 = G2 + P2·G1 + P2·P1·G0 + P2·P1·P0·C0
...
```

**混合架構:** 對於 64-bit 加法器，純 CLA 變得不實際。常見解決方案：
- **Carry-Select Adder**: 平行計算兩種情況（Cin=0、Cin=1），選擇結果
- **Carry-Skip Adder**: 當所有 Pi=1 時跳過 carry
- **Kogge-Stone Adder**: Parallel-prefix 網路，O(log N) 延遲，高面積
- **Brent-Kung Adder**: Kogge-Stone 的面積縮減變體

**面試問題:** 「對於 64-bit 加法器，你會選擇哪種架構？」
**回答:** 混合方法 - 階層式 CLA（4-bit CLA blocks 配合第二層 lookahead）或 Kogge-Stone 以在可接受的面積開銷下達到最高速度。

## 設計流程

> **為何需要了解設計流程？** 面試官經常會問「從 RTL 到 GDSII 的流程是什麼」或「解釋 synthesis 到 tapeout 之間的步驟」。這不是要你背誦步驟清單，而是測試你是否理解每個步驟的目的、輸入輸出，以及步驟之間的依賴關係。例如：為何 CTS 要在 placement 之後？因為需要知道 flip-flops 的位置才能建立 clock tree。為何 timing signoff 要在 routing 之後？因為 routing 之後才有精確的 RC parasitics。

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

| 階段 | 描述 | 主要工具 |
|-------|-------------|-----------|
| **Specification** | 定義客戶需求和架構 | Documentation |
| **Detailed Design** | 模組規劃、介面定義 | Documentation |
| **HDL Coding** | 撰寫 RTL-level Verilog/VHDL | VS Code, Vim, Quartus, Vivado |
| **Pre-Simulation** | 依規格進行功能驗證 | VCS, ModelSim, NC-Verilog, Xcelium |
| **Logic Synthesis** | 將 RTL 轉換為 gate-level netlist | Design Compiler, Synplify, Genus |
| **STA** | 驗證 timing constraints | PrimeTime, Tempus |
| **Formal Verification** | 證明 RTL ≡ Netlist 等價性 | Formality, Conformal |

**Logic Synthesis**: 將 HDL code 轉譯為 gate-level netlist。合成器將 RTL constructs 映射到技術庫中的 standard cells。

### **Back-End Design**

| 階段 | 描述 | 主要工具 |
|-------|-------------|-----------|
| **DFT (Design For Test)** | 插入 scan chains 以提高可測試性 | DFT Compiler, Tessent |
| **Floorplanning** | 定義區塊放置、電源網格、I/O | ICC2, Innovus |
| **Placement** | 最佳化放置 standard cells | ICC2, Innovus |
| **CTS (Clock Tree Synthesis)** | 建立對稱的 clock distribution | ICC2, Innovus |
| **Routing** | 使用金屬層連接所有訊號 | ICC2, Innovus |
| **Physical Verification** | DRC、LVS、ERC 檢查 | Calibre, ICV |
| **Tape-out** | 產生 GDSII 供製造 | — |

**CTS 目的**: 建立平衡的 clock distribution 網路，以最小化所有 flip-flops 之間的 clock skew。

**DFT 目的**: 透過插入 scan chains、BIST 和 boundary scan logic，使設計在製造後可測試。

### **ASIC vs FPGA 比較**

ASICs（Application-Specific Integrated Circuits）和 FPGAs（Field-Programmable Gate Arrays）代表數位設計中不同的權衡。ASICs 提供最高效能和大量生產時的最低單位成本，但需要昂貴的光罩製造且製造後無法修改。FPGAs 提供彈性和快速原型設計，但因可程式化 routing 的開銷而犧牲效能和功耗效率。選擇取決於產量、上市時間，以及設計是否可能需要未來更新。

| 面向 | ASIC | FPGA |
|--------|------|------|
| **可重新配置性** | 製造後固定 | 可重新程式化 |
| **NRE 成本** | 高（光罩數百萬美元）| 低（開發工具）|
| **單位成本** | 大量生產時低 | 單位成本較高 |
| **上市時間** | 數月（製造）| 數天/數週 |
| **效能** | 最高（客製最佳化）| 較低（routing 開銷）|
| **功耗效率** | 最佳 | 功耗較高 |
| **應用** | 量產、高效能 | 原型設計、低量、彈性 |

---

## FPGA

> **FPGA 面試的重點** 雖然許多數位 IC 設計職位以 ASIC 為主，但 FPGA 知識在面試中同樣重要。原因是：(1) 許多公司使用 FPGA 進行 ASIC 原型驗證；(2) 理解 FPGA 架構（LUT、Block RAM、DSP slices）有助於寫出更可綜合的 RTL code；(3) FPGA 時序約束（與 SDC 類似）是實務技能。常見的面試問題包括：FPGA 與 CPLD 的差異、LUT 如何實現組合邏輯、為何 FPGA 需要配置載入。

### **FPGA vs CPLD**

| 面向 | FPGA | CPLD |
|--------|------|------|
| **架構** | LUT-based（Look-Up Tables）| Product-term based（AND-OR arrays）|
| **粒度** | Fine-grained（許多小邏輯區塊）| Coarse-grained（較少大區塊）|
| **密度** | 高（100K+ logic elements）| 低（約至 10K gates）|
| **儲存** | SRAM-based（volatile）| EEPROM/Flash（non-volatile）|
| **開機** | 需要載入配置 | 即時開機操作 |
| **時序** | 可變（取決於 routing）| 可預測（固定 interconnect）|
| **最適用於** | 複雜演算法、DSP、高速 | Control logic、glue logic、state machines |
| **功耗** | 較高（SRAM leakage）| 較低 |
| **成本** | 較高 | 較低 |

**何時使用 FPGA:**

FPGA 在需要高邏輯密度、複雜演算法或頻繁設計更新的應用中表現卓越。其 LUT-based 架構能有效實現任何組合函式，而豐富的 registers 和嵌入式區塊支援複雜設計。

- 複雜的數位訊號處理
- 高速介面（PCIe、DDR）
- ASIC 設計的原型驗證
- 需要嵌入式處理器的應用

**何時使用 CPLD:**

CPLD 適合較簡單的應用，其中確定性時序和即時開機操作至關重要。其 non-volatile 儲存意味著設計在開機後立即可用，無需配置載入。

- 簡單的 control logic
- Boot sequencing
- Level shifting / voltage translation
- 需要即時開機的應用

### **FPGA 架構**

現代 FPGA 以可配置邏輯區塊的陣列組織，周圍環繞可程式化 I/O，並透過階層式 routing 網路互連。此架構透過程式化邏輯函式、記憶體內容和 routing 連接，能實現幾乎任何數位電路。理解 FPGA 能力的關鍵在於了解每種元件類型如何貢獻於整體設計。

| 元件 | 描述 |
|-----------|-------------|
| **IOB (I/O Block)** | 適用各種電氣標準的可程式化 I/O 單元 |
| **CLB (Configurable Logic Block)** | 基本邏輯單元 = LUT + Register |
| **Clock Resources** | PLLs、global/regional clock trees |
| **Routing Resources** | 訊號 routing 的 interconnect |
| **Block RAM** | 嵌入式記憶體區塊 |
| **Hard IP** | DSP blocks、SerDes、嵌入式處理器 |

#### **CLB (Configurable Logic Block)**

Configurable Logic Block 是 FPGA 中的基本運算元件。每個 CLB 可透過其 Look-Up Tables（LUTs）實現任意組合邏輯，並透過其 flip-flops 實現循序邏輯。在單一區塊中結合可程式化邏輯和儲存，能有效實現 datapath 和 control logic。

每個 CLB 包含：
- **LUT (Look-Up Table)**: 實現組合邏輯（通常 4-6 輸入）
- **Flip-flops/Registers**: 可配置為 D、T、JK 或 SR 類型
- **Carry chain**: 快速算術運算
- **MUX**: 輸出選擇

**LUT 運作原理:**
- 4 輸入 LUT 在 SRAM 中儲存 2⁴ = 16 bits
- 可實現任何 4 輸入布林函式
- 較大函式使用多個 LUT 配合 routing

**LUT 範例（2 輸入 AND 閘：Y = A·B）:**
```
輸入作為 SRAM 位置的位址；儲存的值即為輸出。

位址 (BA)    | SRAM 內容    | 輸出 Y
-------------|--------------|----------
    00       |      0       |    0
    01       |      0       |    0
    10       |      0       |    0
    11       |      1       |    1

LUT 程式化為：0001（binary）= AND 的真值表
```

**為何 LUT 強大:** 相同硬體透過改變 SRAM 內容可實現任何 4 輸入函式。XOR、MUX、comparator - 全都使用相同的 LUT 結構。

#### **I/O Block (IOB)**

I/O Blocks 提供 FPGA 內部邏輯與外部世界之間的介面。每個 IOB 可配置支援各種電壓位準和信號標準，能直接連接各種外部裝置而無需位準轉換電路。Registered I/O 路徑透過在晶片邊界放置 flip-flops 來改善時序。

每個 I/O element 包含：
- Input register
- Output register
- Output enable register
- 可程式化 pull-up/pull-down
- 可配置為：LVDS、LVCMOS、SSTL、HSTL 等

#### **Routing Resources**

可程式化 interconnect 佔用 FPGA 矽面積的大部分並顯著影響時序。Routing 以階層方式組織：相鄰區塊的快速本地連接、中距離的較長分段線路，以及 clocks 和 resets 的專用全域網路。Routing 架構決定邏輯互連的效率，且常限制可達成的 clock 頻率。

| 類型 | 描述 |
|------|-------------|
| **Global routing** | clock 和 reset 訊號的專用線路 |
| **Long lines** | Bank 間訊號 routing |
| **Short lines** | 相鄰邏輯單元連接 |
| **Row connections (R4, R24)** | Row 內水平 routing |
| **Column connections (C4, C16)** | Column 內垂直 routing |

#### **Clock Resources**

Clock distribution 對 FPGA 效能和可靠性至關重要。FPGA 提供與一般 routing 分開的專用低 skew clock 網路，以確保所有 flip-flops 在嚴格的時序範圍內看到 clock edges。多層 clock 網路允許設計師在全域覆蓋（所有邏輯）和區域效能（特定區域）之間取得平衡。

| 層級 | 描述 |
|-------|-------------|
| **Global clock** | 專用 CLK pins → global clock tree → 所有 FFs |
| **Regional clock** | clock regions 的 BUFR buffers |
| **I/O clock** | SerDes/DDR interfaces 的本地 clocks |

**PLL (Phase-Locked Loop):**

PLL 是操控輸入 clock 訊號以產生精確控制輸出 clocks 的重要 clock 管理資源。它們使用回授迴路鎖定輸入參考，並能從單一輸入合成多個衍生 clocks。

- 頻率倍增/除頻
- Phase shifting
- Duty cycle 校正
- Clock deskewing

#### **Embedded Memory (Block RAM)**

Block RAMs 是嵌入在整個 FPGA fabric 中的專用記憶體資源。不同於 distributed RAM（在 LUTs 中實現），Block RAMs 提供更大、更省電的儲存，並具有專用 read/write ports。它們可配置為各種寬度和深度以符合應用需求，從窄而深的 FIFOs 到寬而淺的 register files。

| 模式 | 描述 |
|------|-------------|
| **Single-port RAM** | 一個 read/write port |
| **Simple dual-port** | 一個 read port，一個 write port |
| **True dual-port** | 兩個獨立的 read/write ports |
| **ROM** | 具有初始化資料的唯讀 |
| **FIFO** | First-in-first-out buffer |
| **Shift register** | 串列資料儲存 |

### **FPGA 配置模式**

FPGA 配置資料必須在每次開機時載入（volatile SRAM-based）。

#### **JTAG Configuration**

JTAG（IEEE 1149.1）是原本設計用於板級測試的標準介面，但廣泛用於 FPGA 配置和除錯。它透過簡單的 4-wire 介面直接存取配置記憶體，非常適合快速迭代比配置速度更重要的開發環境。

| 訊號 | 方向 | 描述 |
|--------|-----------|-------------|
| **TDI** | Input | Test Data In |
| **TDO** | Output | Test Data Out |
| **TMS** | Input | Test Mode Select |
| **TCK** | Input | Test Clock |
| **TRST** | Input | Test Reset（可選，若不使用則接 GND）|

**使用場景:** 開發、除錯、boundary scan testing。

#### **Master Mode**

FPGA 控制配置流程並提供 clock 給外部記憶體。

| 模式 | 描述 | 速度 |
|------|-------------|-------|
| **Master Serial (AS)** | FPGA 從 serial flash 逐 bit 讀取 | 較慢 |
| **Master Parallel** | FPGA 每 cycle 從 parallel flash 讀取 8+ bits | 較快 |

#### **Slave Mode**

外部處理器/控制器管理配置。

| 模式 | 描述 | 使用場景 |
|------|-------------|----------|
| **Slave Parallel** | 處理器寫入 8-bit 資料 | 處理器控制的開機 |
| **Slave Serial** | 處理器發送 serial bitstream | Pin 受限的設計 |

#### **Multi-Chip Cascade**

多個 FPGA 共享單一配置記憶體：
- 第一個 FPGA 為 **Master** mode
- 後續 FPGA 為 **Slave** mode
- 透過配置 pins 的 daisy-chain 連接
- 減少記憶體晶片數量

**模式選擇:**
- 通常由 3 個 MSEL pins 決定配置模式
- 在開機前或 reset 期間設定

---

## 合成

> **合成是 RTL 與實體設計的橋樑** 合成（Synthesis）將 RTL 描述轉換為 gate-level netlist，是設計流程中承先啟後的關鍵步驟。合成工具需要三項主要輸入：(1) RTL code（設計功能）；(2) Technology library（.lib/.db，描述 standard cells 的特性）；(3) SDC constraints（時序、面積、功耗目標）。輸出是符合 constraints 的 gate-level netlist，可交給後端工具進行 place and route。

**本章與其他概念的關聯：**
- **Technology Library** 定義了 PVT corners，與 STA 中的 timing analysis 直接相關
- **SDC Constraints** 包含 clock 定義、false paths、multicycle paths——這些都是前面 STA 章節討論的概念
- **Clock Gating** 是合成階段自動插入的低功耗優化，與低功耗設計章節呼應

### **Technology library**

Technology library（.lib/.db 檔案）包含 standard cell 的 timing、power 和面積特性資料。由於 transistor 行為會隨製程、供應電壓和操作溫度而變化，cell 需在多個 PVT（Process、Voltage、Temperature）corner 下進行特性化。針對不同分析情境使用適當的 library，可確保設計在所有操作條件下正常運作。

| Library | Process | Voltage | Temperature | Use Case |
|---------|---------|---------|-------------|----------|
| **fast.db** | Fast | High | Low | Hold time analysis (best case) |
| **slow.db** | Slow | Low | High | Setup time analysis (worst case) |
| **typical.db** | Typical | Nominal | Nominal | Functional verification |

### **Liberty File Format (.lib)**

Liberty format 是由 Synopsys 開發的業界標準 ASCII 格式，描述 standard cell 的特性化 timing、power 和 noise 資料。它對 synthesis 和 place-and-route 工具都是必要的。

**Liberty 檔案包含內容:**

| 類別 | 資訊 |
|----------|-------------|
| **Cell Information** | Area、function、pin definitions |
| **Timing Data** | Delay、transition time、setup/hold、recovery/removal |
| **Power Data** | Dynamic power、leakage power、internal power |
| **Noise Data** | Output noise、noise immunity |
| **Operating Conditions** | Process、voltage、temperature (PVT) corners |

**每個 Library 的多個 Liberty 檔案:**

同一 cell library 常有多個 liberty files - 每個 PVT corner 各一個：

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

CCS 比 NLDM voltage-based models 更準確地建模電流波形，這對先進製程節點至關重要，因為波形效應顯著影響 timing。

**Liberty 檔案結構:**

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

**關鍵 Timing 量測:**

```
Delay 量測點（預設）：
  - Input:  transition 的 50%
  - Output: transition 的 50%

Transition（slew）量測：
  - Rise: VDD 的 10% 至 90%
  - Fall: VDD 的 90% 至 10%
  （可能是 20%-80% 或 30%-70%，取決於 foundry）
```

**Look-Up Table（LUT）內插:**

Cell delay 作為輸入 transition time（slew）和輸出電容負載的函式來特性化：

```
delay = f(input_slew, output_load)

LUT 提供離散值；工具對實際條件進行內插：
- 若實際值在表格範圍內：內插
- 若實際值超出表格範圍：外插（較不準確）
```

**Timing Arcs:**

| Arc 類型 | 描述 |
|----------|-------------|
| **Combinational** | 通過 logic cell 的 input-to-output delay |
| **Sequential Setup** | 在 clock edge 的 setup time 檢查 |
| **Sequential Hold** | 在 clock edge 的 hold time 檢查 |
| **Recovery** | Async 訊號釋放到 clock edge |
| **Removal** | Clock edge 到 async 訊號 assertion |

### **未定義的 Interconnect**
可透過 wire load model 解決

### **Delay Models**

Delay models 表示在 timing analysis 期間如何計算訊號傳播時間。模型的選擇影響準確性和執行時間。在設計流程早期，較簡單的模型提供快速回饋；隨著設計成熟和 layout 資訊可用，更準確的模型確保可靠的 timing closure。

| 模型 | 描述 | 準確性 | 使用場景 |
|-------|-------------|----------|----------|
| **Lumped** | 每個 gate 單一 delay 值 | 低 | 快速估算 |
| **Distributed** | 基於 fanout/load 的每 gate delay | 中 | 早期合成 |
| **Module-path** | 指定 block delays（SDF）| 高 | Timing-critical 設計 |

### **SDF 檔案格式**

**SDF（Standard Delay Format）** 包含 post-synthesis/post-layout simulation 的 timing 資訊。

**Delay 格式:** `(min:typ:max)`

| 值 | 描述 | 使用場景 |
|-------|-------------|----------|
| **min** | Best-case delay（fast corner）| Hold time analysis |
| **typ** | Typical delay（nominal corner）| Functional verification |
| **max** | Worst-case delay（slow corner）| Setup time analysis |

**SDF 檔案內容:**

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

**關鍵 SDF 結構:**

| 結構 | 描述 |
|-----------|-------------|
| **IOPATH** | Cell input-to-output delay |
| **INTERCONNECT** | Cells 之間的 wire/net delay |
| **SETUPHOLD** | Setup 和 hold timing 檢查 |
| **PERIOD** | Clock period constraint |
| **WIDTH** | 最小 pulse width |

**在 Simulation 中的使用:**
```tcl
# Verilog simulation with SDF back-annotation
vcs design.v -sdf max:top:timing.sdf
```

### **SDC Constraints**

**SDC（Synopsys Design Constraints）** 是指定 timing、power 和 area constraints 的業界標準格式。SDC 檔案引導 synthesis 和 place-and-route 工具達到設計規格。

**基本 Clock 定義:**

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

**常用 SDC 指令:**

| 指令 | 目的 | 範例 |
|---------|---------|---------|
| `create_clock` | 定義 clock source 和 period | `create_clock -period 10 [get_ports clk]` |
| `create_generated_clock` | 定義衍生 clocks | `create_generated_clock -divide_by 2 -source clk` |
| `set_input_delay` | 約束輸入到達時間 | `set_input_delay -clock clk 3.0 [get_ports din]` |
| `set_output_delay` | 約束輸出需求時間 | `set_output_delay -clock clk 2.5 [get_ports dout]` |
| `set_false_path` | 標記路徑為不計時 | `set_false_path -from clkA -to clkB` |
| `set_multicycle_path` | 允許多週期 | `set_multicycle_path 2 -setup -from [get_pins */Q]` |
| `set_max_delay` | 約束組合路徑 | `set_max_delay 5.0 -from A -to B` |

**Generated Clock 範例:**

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
僅在資料需要切換時 clock 訊號才到達
→ 降低動態功耗（可節省高達 30-50% 功耗）

**功耗方程式:**
```
P_dynamic = α × C_L × V_DD² × f
```

Clock gating 透過停用非活動 registers 的 clock 來降低切換活動（α）。

![Clock gated](https://i.imgur.com/oazpEi2.png)

**實作方法:**
1. **AND gate**: 簡單但易產生 glitches
2. **Integrated Clock Gating (ICG) cell**: Latch-based，無 glitch（較佳）

使用 AND gate 的 CG 可能因 enable 訊號不穩定而產生 glitch
→ **Glitch 防止**: Enable 由<span style="color:red">負緣 clk 的 latch</span> 產生
![Glitch prevention](https://i.imgur.com/WfrnP41.png)

**Clock Gating 類型:**

Clock gating 可由設計師明確插入或由合成工具自動插入。自動 clock gating 通常能以最小面積開銷達成 20-40% 功耗節省。

- **RTL-based（Intent-based）**: 設計師明確編寫 clock gating
- **Tool-generated**: 合成工具識別共享相同控制邏輯的 flip-flops

**🎯 常見面試追問：**

| 問題 | 答案重點 |
|------|----------|
| **「為何用 latch-based ICG 而非 AND gate？」** | AND gate 會產生 glitch！Enable 在 clock high 時變化會產生短脈衝。Latch 在 clock low 時透明，確保 enable 只在 clock low 時改變 |
| **「Clock gating 節省什麼功耗？」** | 主要節省 dynamic power（降低 switching activity α），對 static/leakage power 無影響 |
| **「Power gating 和 clock gating 差在哪？」** | Clock gating 只關 clock（省 dynamic power），power gating 關掉整個電源（省 dynamic + static），但需要 isolation cells 和 retention |
| **「ICG cell 為何用 negative-edge latch？」** | 確保 enable 在 clock 為 low 時被 sample，使 gated clock 只會有完整的 high pulse 或完整的 low，不會有 glitch |

### **Cross Boundary Optimization**

Cross boundary optimization 允許合成工具跨階層模組邊界最佳化邏輯。

| 面向 | 啟用 | 停用 |
|--------|---------|----------|
| **最佳化** | 較好的 QoR（timing、area）| 限於模組範圍 |
| **階層** | 攤平/修改 | 完全保留 |
| **除錯** | 較難（結構已改變）| 較易（結構完整）|
| **ECO** | 較困難 | 較容易 |
| **執行時間** | 較長 | 較短 |

**何時啟用:**
- 效能關鍵設計
- 面積受限設計
- 最終 tape-out 合成

**何時停用:**
- 早期設計探索
- IP blocks（保留介面）
- 適合除錯的 netlists
- 階層式 ECO 需求

```tcl
# Design Compiler commands
set_boundary_optimization [get_designs block_A] true   # enable
set_boundary_optimization [get_designs block_B] false  # disable
compile_ultra -no_boundary_optimization                 # global disable
```

**常見最佳化:**
- 跨邊界常數傳播
- 冗餘邏輯移除
- Buffer/inverter pushing
- 介面處的邏輯重組

## 靜態時序分析 (STA)

> **為何 STA 是 tapeout 的門檻？** 一顆晶片能否正常運作，最終取決於訊號是否能在正確的時間到達正確的位置。若資料在 flip-flop capture 之前沒有穩定（setup violation），或在 capture 之後太快改變（hold violation），電路就會產生錯誤甚至 metastability。由於製造晶片的成本極高（先進製程的 mask 費用可達數百萬美元），任何 timing 問題都可能導致整批晶片報廢。因此，**timing closure**——確保設計在所有 PVT corners 下都符合時序要求——是 tapeout 前的必要條件。STA 是達成 timing closure 的核心工具。

**本章概覽：** 我們將從 STA 的基本原理開始（與 DTA 的比較），接著深入 setup/hold 檢查的機制，然後討論實務中的挑戰（OCV、jitter、CPPR），最後介紹如何修復 timing violations。這些概念環環相扣：理解 setup/hold 才能理解為何需要 OCV derating；理解 OCV 才能理解為何需要 CPPR。

### **DTA v.s. STA**

| 面向 | DTA（Dynamic）| STA（Static）|
|--------|---------------|--------------|
| **方法** | 使用 test vectors + SDF 的 simulation | 遍歷所有 timing paths |
| **輸入需求** | Test vectors/stimuli | 僅 constraints |
| **涵蓋範圍** | 取決於測試品質 | 所有路徑皆分析 |
| **速度** | 非常慢 | 快 |
| **記憶體** | 高 | 低 |
| **電路類型** | 任何（sync/async）| 僅 synchronous |
| **工具** | VCS, ModelSim, NC-Verilog | PrimeTime, Tempus |

**STA 優點:**

靜態時序分析以數學方式計算所有可能的 timing paths，無需 simulation vectors。這使它既全面又高效，能捕捉 simulation 可能遺漏的 timing violations。

- 不需輸入 stimuli
- 找到幾乎所有 critical paths
- 執行快速、記憶體使用低
- 窮舉式路徑分析

**STA 缺點:**

STA 的靜態特性意味著它無法處理非同步邏輯或驗證功能正確性。設計師必須仔細指定不遵循正常 timing 規則的路徑例外。

- 僅適用同步電路
- 無法驗證功能性
- 特殊情況的 constraints 較複雜：
  - False paths
  - Multicycle paths
  - Multiple clock domains

**DTA 優點:**

動態時序分析以實際延遲模擬實際電路行為，適合驗證非同步邏輯並確認功能在 timing constraints 下保持正確。

- 適用於任何電路類型（包括非同步）
- 同時驗證 timing 和功能性

**DTA 缺點:**

基於 simulation 的方法意味著 DTA 的品質取決於 test vectors。達成完整路徑涵蓋幾乎不可能，且執行時間隨設計複雜度顯著增加。

- Critical paths 可能遺漏（取決於 vectors）
- Simulation 非常慢
- 記憶體和運算需求高

### **Pre-simulation vs Post-simulation**

數位設計在多個階段進行 simulation，每個階段揭示不同類型的問題。Pre-simulation（RTL）快速驗證邏輯正確性，而 post-simulation（gate-level with SDF）確認設計以實際延遲符合 timing 需求。兩者皆必要：pre-simulation 及早捕捉功能性 bugs，post-simulation 捕捉 timing 相關的故障。

| 面向 | Pre-simulation | Post-simulation |
|--------|----------------|-----------------|
| **階段** | 合成前 | 合成/P&R 後 |
| **Netlist** | RTL（behavioral）| Gate-level |
| **Timing** | 理想（unit delay 或無延遲）| 來自 SDF 的實際延遲 |
| **目的** | 功能驗證 | Timing 驗證 |
| **速度** | 快 | 慢 |
| **準確性** | 僅邏輯 | 包含 timing 效應 |

**Post-synthesis simulation:** 使用 gate-level netlist + SDF（Standard Delay Format）進行 timing annotation。

**Post-layout simulation:** 最準確，包含實際 routing delays 和 parasitics。

### **Timing 路徑類型**

STA 分析設計中所有可能訊號路徑的 timing。理解路徑類型有助於設定適當的 constraints 和解讀 timing 報告。每種路徑類型有不同的特性和 constraint 需求。

* reg (clk) → reg (D)：Register to Register（最常見，受 clock period 約束）
* reg (clk) → OUTPUT：Register to Output（受 output delay 約束）
* INPUT → reg (D)：Input to Register（受 input delay 約束）
* INPUT (clk) → OUTPUT：Input to Output（組合路徑，受 max delay 約束）

### **STA 類型**

傳播延遲穿過設計有兩種基本方法。Path-based 分析分別追蹤每條獨特路徑以達最高準確性，而 block-based 分析在每個節點使用 arrival time windows 以提高運算效率。大多數商業工具使用 block-based STA，僅對 critical paths 進行路徑枚舉。

*  Path-based STA
    - 實際情況，考慮每條路徑的實際延遲
    - 複雜的計算
    - 更準確
*  Block-based STA
    - 僅考慮每個節點的 best/worst case
    - 較悲觀
    - 計算較快

### **Setup & Hold 檢查**

**回顧：為何需要 setup/hold？** 還記得前面討論的 metastability 嗎？Flip-flop 內部是由 feedback loop 構成的。當 clock edge 來臨時，這個 loop 需要「做出決定」——將輸入的 0 或 1 鎖存下來。如果此時輸入訊號正在變化（從 0 變 1 或從 1 變 0），flip-flop 就無法做出明確的決定，進入 metastable 狀態。

**Setup time** 定義了資料必須在 clock edge **之前**多早穩定，讓 flip-flop 有足夠時間「看清楚」輸入是 0 還是 1。**Hold time** 則定義了資料必須在 clock edge **之後**保持穩定多久，確保 flip-flop 在做決定的過程中輸入不會改變。

**違反的後果：** 違反 setup time 意味著資料太晚到達，flip-flop 來不及看清楚就被迫做決定；違反 hold time 意味著資料變化太快，flip-flop 還沒鎖存完畢輸入就改變了。兩者都可能導致 metastability，產生不可預測的輸出。

* `Setup`（Max delay）- 資料必須在 clock edge **之前**穩定

```
Arrival Time (AT) = T0 + Tclk_latency + Tcq + Tpd
Required Time (RT) = T0 + Tclk_latency - Tskew + Tcycle - Tsetup
Slack = RT - AT  (positive = timing met)
```

![Setup](https://i.imgur.com/MNbkt4s.png)

* `Hold`（Min delay）- 資料必須在 clock edge **之後**保持穩定

```
Arrival Time (AT) = T0 + Tclk_latency + Tcq + Tpd
Required Time (RT) = T0 + Tclk_latency + Tskew + Thold
Slack = AT - RT  (positive = timing met)
```

![Hold](https://i.imgur.com/ZJxtQoR.png)

**為何 Slack 公式不同:**
- **Setup**: 資料必須在 required time 之前到達 → Slack = RT - AT（正值表示足夠早）
- **Hold**: 資料必須在 required time 之後保持 → Slack = AT - RT（正值表示保持夠久）

**實際 Timing 範例:**
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

**關鍵洞見:** Hold time 與 clock period 無關。降低 clock 頻率可修復 setup violations，但無法修復 hold violations。

**🎯 常見面試追問：**

| 問題 | 答案重點 |
|------|----------|
| **「Setup 和 Hold 哪個更難修？」** | Hold 更難修！因為 (1) Hold 與 clock period 無關，降頻沒用；(2) 加 buffer 會影響 setup；(3) 必須優先修 hold，否則晶片無法運作 |
| **「Hold time 可以是負的嗎？」** | 可以！負的 hold time 表示 data 可以在 clock edge 之前就開始變化。這在快速 flip-flop 設計中常見 |
| **「Clock skew 如何影響 setup/hold？」** | Positive skew（capture 晚到）→ 幫助 setup，傷害 hold。這就是 useful skew 的原理 |
| **「Setup violation 的晶片還能用嗎？」** | 可以降頻使用。但 Hold violation 的晶片就是報廢（"DUMP the chip"） |

### **Recovery & Removal Time**

這些 timing 檢查適用於相對於 clock 的**非同步控制訊號**（reset、set、clear）。

| Timing 檢查 | 定義 |
|--------------|------------|
| **Recovery Time** | Async 訊號釋放到下一個 active clock edge 的最小時間 |
| **Removal Time** | Active clock edge 到 async 訊號 assertion 的最小時間 |

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

**為何重要:**
- 違規會導致 flip-flop 的 metastability
- 對 asynchronous reset with synchronous release 設計至關重要
- STA 工具自動檢查這些

### **Clock Jitter**

Clock jitter 是 clock edges 偏離其理想位置的現象，由 clock 產生和分配電路中的雜訊造成。Jitter 有效地減少可用的 timing margin，因為實際 clock edge 可能比預期更早或更晚到達。在高速設計中，jitter 可能消耗相當大比例的 timing budget。

| 類型 | 描述 |
|------|-------------|
| **Period Jitter** | 週期間 clock period 的變化 |
| **Cycle-to-Cycle Jitter** | 相鄰 clock periods 之間的差異 |
| **Long-term Jitter** | 多個週期累積的 timing 誤差 |

**Jitter 來源:**

多種雜訊來源貢獻於 clock jitter，電源雜訊通常是晶片上 PLLs 的主要因素。

- PLL/DLL 雜訊（phase detector、VCO 非理想性）
- 電源雜訊（IR drop、switching noise）
- 熱雜訊（隨機電子運動）
- 來自相鄰訊號的 crosstalk

**對 Timing 的影響:**
```
Setup 檢查：Tjitter 減少可用的 setup margin
Hold 檢查：若 edges 偏移，Tjitter 可能造成 hold violations
```

**STA 中的 Jitter:**
- 建模為 clock uncertainty
- 加入 setup/hold timing budgets
- 典型值：晶片上 PLLs 為 50-200 ps

**降低 Jitter:**

Jitter 降低著重於最小化雜訊來源並為 clock 產生電路提供乾淨的參考訊號。電源雜訊通常是 PLL jitter 的主要貢獻者。

- 為 PLLs 使用乾淨電源（專用 LDO regulators）
- 適當的去耦電容（不同頻率用不同值）
- 將 clock 訊號與雜訊訊號隔離（guard rings、間距）
- 使用專用 clock routing 資源（FPGAs 中的 global clock networks）

### **OCV (On-Chip Variation)**

**為何需要 OCV？** 傳統的 corner-based 分析（如 slow corner、fast corner）假設晶片上所有的 cells 都處於相同的 PVT 條件。但在實際晶片上，這是不可能的：晶片的一角可能比另一角熱 10°C；電源網路的 IR drop 導致不同位置的電壓略有不同；製造過程中的隨機變異使得相同設計的 cells 有不同的延遲特性。

**OCV 的影響：** 考慮一個簡單的 setup 檢查。Launch path 和 capture path 都經過某些 clock buffers。如果 launch path 的 buffers 恰好比較慢，而 capture path 的 buffers 恰好比較快，就會產生比預期更大的 clock skew，可能導致原本通過的 timing 檢查失敗。

On-Chip Variation 透過應用 derating factors（加速或減速特定路徑）來模擬這種晶粒內變異，提供更實際且保守的分析。

| 因素 | 描述 |
|--------|-------------|
| **Process (P)** | 晶粒上的製造變異（摻雜、氧化層厚度）|
| **Voltage (V)** | IR drop、電源雜訊 |
| **Temperature (T)** | 晶片上的溫度梯度 |

**OCV Derating:**

STA 應用 OCV derating factors 以考慮最壞情況變異：

```
Launch path: Use slower cells (max delay) × (1 + OCV_late)
Capture path: Use faster cells (min delay) × (1 - OCV_early)
```

**AOCV (Advanced OCV):**
- 位置感知 derating
- 較近的 cells 變異較小
- 比 flat OCV 更準確

**POCV/SOCV (Parametric/Statistical OCV):**
- 統計 timing 分析
- 使用機率分佈取代固定 derates（使用來自 Monte-Carlo HSPICE 的 delay σ）
- 最準確，減少 pessimism
- 假設 delay 服從常態分佈；sign-off 預設使用 3σ

**技術節點建議:**

| 技術節點 | 建議的變異方法 | 原理 |
|----------------|------------------------------|-----------|
| **90nm 以上** | OCV（flat derates）| 舊節點準確度足夠 |
| **65nm - 40nm** | AOCV（depth/distance aware）| Depth 減少隨機變異影響 |
| **28nm - 20nm** | AOCV 或 POCV | 過渡區，POCV 逐漸普及 |
| **16nm 及以下** | POCV/SOCV/LVF | Sign-off 必要；顯著減少 pessimism |

**為何 Flat OCV 過度悲觀:** 固定 derates 假設路徑中所有 cells 同時都快或都慢。實際上，在深層路徑中隨機變異傾向於相互抵消 — 有些 cells 快，有些慢。AOCV 和 POCV 建模這種統計現實。

### **CPPR/CRPR (Clock Path Pessimism Removal)**

當 STA 對 launch 和 capture clock 的相同實體 clock path 套用不同的 derating factor 時，就會產生 clock path pessimism。CPPR（Common Path Pessimism Removal）會自動修正這種人為的 pessimism。

**為何需要 CPPR:**

在 OCV 模式下，STA 對 launch clock path 套用 late derating，對 capture clock path 套用 early derating。然而，這些路徑的一部分實際上是相同的 — 從 clock source 到 tree 分支處的 common clock path。

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

**Pessimism 問題:**

```
無 CPPR：
  Common path delay（late derate）：1.0 ns × 1.2 = 1.20 ns
  Common path delay（early derate）：1.0 ns × 0.8 = 0.80 ns
  人為增加的 skew：1.20 - 0.80 = 0.40 ns pessimism！

有 CPPR：
  CPPR 調整從 skew 計算中移除 0.40 ns
  更實際的 timing，無不必要的 margin
```

**CPPR vs CRPR:**

| 術語 | 全名 | 原因 | 修正 |
|------|-----------|-------|------------|
| **CPPR** | Common Path Pessimism Removal | Common clock path 上的 OCV derating | 從 common path 移除 delta |
| **CRPR** | Clock Reconvergence Pessimism Removal | 通過不同邏輯後會合的 clock paths | 移除不實際的路徑組合 |

**CRPR 範例（Clock Reconvergence）:**

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

**何時 CPPR/CRPR 重要:**

| 情境 | 影響 |
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

> **為何低功耗設計如此重要？** 功耗是現代 IC 設計的三大關鍵指標之一（PPA：Power, Performance, Area）。在 mobile 和 IoT 應用中，功耗直接決定電池續航力；在高效能運算中，功耗決定散熱需求和電費成本；在先進製程中，leakage power 已成為與 dynamic power 同等重要的問題。因此，低功耗設計已成為面試的熱門主題。

**本章與其他概念的關聯：**
- **Clock Gating** 利用前面討論的 Latch 特性來產生 glitch-free 的 gated clock
- **Multi-Vt** 是 PVT variation 的延伸——不同 Vt 的 cells 有不同的 speed-leakage trade-off
- **Power Gating** 會引入類似 CDC 的問題——被關閉的 domain 重新上電時需要同步
- **Level Shifters** 在不同 VDD domains 之間轉換訊號，類似 CDC synchronizers 在不同 clock domains 之間同步訊號

### **功耗組成**

CMOS 電路的功耗由兩個主要部分組成：動態功耗（switching 時消耗）和靜態功耗（idle 時也會消耗）。隨著製程技術縮小到更小節點，由於更薄的 gate oxide 和降低的 threshold voltage 導致更高的 leakage current，靜態功耗變得越來越重要。

**動態功耗：**
```
P_dynamic = α × C_L × V_DD² × f
```
- α = switching activity（0 到 1）
- C_L = load capacitance
- V_DD = supply voltage
- f = clock 頻率

**靜態功耗（Leakage）：**

| Leakage 類型 | 描述 |
|--------------|-------------|
| **Subthreshold** | VGS < Vth 時通過 channel 的電流（現代製程節點的主導因素）|
| **Gate oxide** | 通過薄 gate oxide 的穿隧電流 |
| **Junction** | 反向偏壓 PN junction 的 leakage |

### **功耗降低技術**

存在多種降低功耗的技術，每種技術針對不同的功耗組成，並適用於不同的設計階段。技術的選擇取決於功耗預算需求、效能限制和實現複雜度。

| 技術 | 目標功耗 | 描述 | 權衡 |
|-----------|--------------|-------------|-----------|
| **Clock Gating** | 動態功耗 | 關閉非活動區塊的 clock | 開銷最小 |
| **Power Gating** | 靜態功耗（Leakage）| 完全關閉電源供應 | Wake-up 延遲 |
| **Multi-Vt** | 靜態功耗 | 非關鍵路徑使用 high-Vt cells | 面積 |
| **DVFS** | 兩者 | 動態電壓/頻率調整 | 複雜度 |
| **Operand Isolation** | 動態功耗 | 閘控 idle 功能單元的輸入 | 額外邏輯 |
| **Multi-VDD** | 兩者 | 每個區塊使用不同電壓域 | 需要 level shifters |

### **Multi-Vt Cell Library**

| Cell 類型 | Threshold | 速度 | Leakage | 使用情境 |
|-----------|-----------|-------|---------|----------|
| **HVT**（High-Vt）| 高 | 最慢 | 最低 | 非關鍵路徑 |
| **SVT/RVT**（Standard）| 中等 | 中等 | 中等 | 預設 cells |
| **LVT**（Low-Vt）| 低 | 快速 | 高 | 關鍵時序路徑 |
| **SLVT**（Super Low-Vt）| 極低 | 最快 | 最高 | 最關鍵路徑 |

**速度 vs Leakage：** HVT < SVT < LVT < SLVT

**Multi-Vt 最佳化策略：**

現代合成和最佳化工具會自動選擇 cell Vt 類型，以在滿足時序的同時最小化 leakage。一般做法是保守的：預設使用較慢、低 leakage 的 cells，僅在需要時選擇性地升級。

1. 從全部 HVT cells 開始（最小化 leakage 基準）
2. 將關鍵路徑上的 cells 替換為 LVT/SLVT
3. 在 timing closure 和 leakage 預算之間取得平衡

### **Clock Gating vs Power Gating**

| 面向 | Clock Gating | Power Gating |
|--------|--------------|--------------|
| **降低** | α（switching activity）| V（降至零）|
| **節省** | 僅動態功耗 | 動態 + 靜態功耗 |
| **喚醒時間** | 即時（下個 clock）| 慢（μs 至 ms）|
| **狀態** | 保留 | 遺失（需要 retention）|
| **開銷** | ICG cells | Sleep transistors、isolation、retention |

**Power Gating 實現：**
- 使用 sleep transistors（high-Vt PMOS header 或 NMOS footer）
- 需要 isolation cells 以防止 floating outputs
- 若需保留狀態則需要 retention registers

### **Power Intent（UPF/CPF）**

Power intent 檔案描述設計中如何管理電源——哪些區塊可以關閉、使用什麼電壓，以及訊號如何跨越 power domain 邊界。

**UPF vs CPF：**

| 面向 | UPF（Unified Power Format）| CPF（Common Power Format）|
|--------|---------------------------|---------------------------|
| **標準** | IEEE 1801 | Si2 |
| **支持廠商** | Synopsys、Mentor、Cadence | 最初為 Cadence |
| **業界採用度** | 更廣泛使用 | Legacy 設計 |
| **語法** | 基於 Tcl | 基於 Tcl |

**關鍵 UPF 概念：**

| 概念 | 描述 |
|---------|-------------|
| **Power Domain** | 共享相同電源供應的 cells 群組 |
| **Power State** | 操作模式（ON、OFF、RETENTION）|
| **Power Switch** | 用於 power gating 的 header/footer transistor |
| **Isolation Cell** | 當 domain 為 OFF 時將輸出 clamp |
| **Level Shifter** | 在 domains 之間轉換電壓 |
| **Retention Register** | 在 power-down 期間保留狀態 |

**基本 UPF 範例：**

```tcl
# 定義 power domains
create_power_domain PD_TOP -include_scope
create_power_domain PD_CPU -elements {cpu_inst}

# 定義電源供應
create_supply_net VDD
create_supply_net VSS
create_supply_net VDD_CPU

# 將供應連接到 domains
create_supply_set SS_TOP -function {power VDD} -function {ground VSS}
create_supply_set SS_CPU -function {power VDD_CPU} -function {ground VSS}

# 新增 power switch
create_power_switch SW_CPU \
    -domain PD_CPU \
    -input_supply_port {vin VDD} \
    -output_supply_port {vout VDD_CPU} \
    -control_port {sleep sleep_cpu} \
    -on_state {on_state vin {!sleep}}

# 新增 isolation
set_isolation ISO_CPU \
    -domain PD_CPU \
    -applies_to outputs \
    -clamp_value 0 \
    -isolation_signal iso_en
```

**Power Intent 在設計流程中的角色：**

```
RTL + UPF → Synthesis → Power-aware netlist
         → Verification（formal + simulation）
         → P&R with power planning
         → Sign-off with power analysis
```

### **Level Shifters 與 Isolation Cells**

在多電壓設計中，跨越 power domains 的訊號需要特殊 cells 以確保正確操作並防止損壞或故障。

**Level Shifters：**

Level shifters 在跨越不同電壓 domains 時轉換訊號電壓位準。

| 類型 | 方向 | 複雜度 | 使用情境 |
|------|-----------|------------|----------|
| **L2H**（Low-to-High）| 0.8V → 1.0V | 複雜（需要 boost circuit）| 最常見 |
| **H2L**（High-to-Low）| 1.0V → 0.8V | 簡單（使用較低 VDD 的 buffer）| 較少見 |
| **Bidirectional** | 任一方向 | 最複雜 | DVFS 設計 |

```
Level Shifter 電路（L2H）：
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

**Isolation Cells：**

Isolation cells 在 power domain 關閉時防止未定義（floating）值傳播。

| Clamp 值 | Cell 類型 | 行為 |
|-------------|-----------|----------|
| **0** | AND-based | isolated 時 Output = 0 |
| **1** | OR-based | isolated 時 Output = 1 |
| **Hold** | Latch-based | Output = 最後一個值 |

```verilog
// AND-based isolation（clamp 到 0）
// iso_en = 1 表示 isolated（output 被 clamped）
assign isolated_out = data_in & ~iso_en;

// OR-based isolation（clamp 到 1）
assign isolated_out = data_in | iso_en;
```

**Enable Level Shifter（ELS）：**

在單一 cell 中結合 level shifting 和 isolation——當兩者都需要時可節省面積。

```
典型 cell 插入順序：
  [Power-gated domain] → [Isolation] → [Level Shifter] → [Always-on domain]

使用 ELS：
  [Power-gated domain] → [Enable Level Shifter] → [Always-on domain]
```

**實體設計考量：**

- Level shifters 放置在 power domain 邊界
- 必須能存取兩個電壓 rails
- 通常是 double-height cells（跨越兩列 standard cells）
- 工具根據 UPF/CPF 規格自動插入

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

### **奇數除頻 - 50% Duty Cycle**

**挑戰：** 偶數除頻達到 50% duty cycle 很簡單（在計數一半時 toggle）。奇數除頻（如 divide-by-3）較為棘手，因為輸出會有 33% 或 66% duty cycle。

**解決方案：** 同時使用 clock 的上升和下降邊緣，並以 OR/XOR 結合：

```
Divide-by-3 達到 50% Duty Cycle 的方法：

1. 在 rising edge 建立 counter（0、1、2）
2. 產生 clk_p：當 cnt 達到 threshold 時 toggle（posedge）
3. 產生 clk_n：當 cnt 達到 threshold 時 toggle（negedge）
4. Output = clk_p OR clk_n（或某些模式使用 XOR）

        clk:    ─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─
                 └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘
        cnt:     0   1   2   0   1   2   0   1   2
        clk_p:  ─────┐     ┌─────────┐     ┌─────────
                     └─────┘         └─────┘
        clk_n:  ───────┐     ┌─────────┐     ┌───────
                       └─────┘         └─────┘
        output: ─────┐   ┌───────────┐   ┌───────────
        (OR)         └───┘           └───┘

negedge 訊號「填補」了間隙，達到 50% duty cycle。
```

**原理：** Negative-edge triggered 訊號相位偏移了半個 clock period，因此當 OR 在一起時，組合輸出具有相等的 high 和 low 時間。

**FPGA 考量：** 此技術產生 combinational 輸出，不應直接驅動 FPGA clock 網路。請使用 PLL/DLL 進行正確的 clock 產生。

**🎯 除頻電路常見面試追問：**

| 問題 | 答案重點 |
|------|----------|
| **「如何實現 Divide-by-2？」** | 最簡單：`always @(posedge clk) o_clk <= ~o_clk;`，每個 rising edge toggle 一次 |
| **「Divide-by-N 電路需要多少 bits 的 counter？」** | `⌈log₂(N)⌉` bits，例如 divide-by-5 需要 3 bits |
| **「奇數除頻如何達到 50% duty cycle？」** | 同時用 posedge 和 negedge counters，用 OR 結合兩者的輸出，negedge 訊號「填補」間隙 |
| **「為何不能只用一個 counter 做奇數除頻 50% duty cycle？」** | 因為奇數無法平均分成兩半，單一 counter 只能產生 (N-1)/2N 或 (N+1)/2N 的 duty cycle |
| **「Divide-by-1.5 可能嗎？」** | 不能直接用數位電路實現分數除頻，需用 PLL 或特殊技巧（如 divide-by-3 配合 DDR） |
| **「手寫 Divide-by-3 的 Verilog？」** | 關鍵：兩個 counters（posedge/negedge）、threshold 比較、OR 結合輸出 |

### **Glitch-free Clock Mux**

動態切換 clock 來源時（例如用於電源管理），標準 MUX 可能產生 glitches 導致電路故障。

**簡單 MUX 的問題：**
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

**解決方案：Break-Before-Make with Feedback**

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

關鍵重點：
1. Negative-edge FFs 確保切換發生在 clock LOW 時
2. Feedback 確保「break-before-make」（舊 clock 停止後新 clock 才開始）
3. Synchronizers 防止 async select 造成的 metastability
```

**Verilog 實現：**
```verilog
module glitch_free_clk_mux (
    input  clk_a, clk_b,
    input  sel,           // 0=clk_a, 1=clk_b
    output clk_out
);

reg sel_a_sync1, sel_a_sync2, sel_a_neg;
reg sel_b_sync1, sel_b_sync2, sel_b_neg;

// 同步 select 到 clk_a domain
always @(posedge clk_a) begin
    sel_a_sync1 <= ~sel & ~sel_b_neg;  // 包含 feedback
    sel_a_sync2 <= sel_a_sync1;
end

// 在 clk_a 的 negative edge 暫存
always @(negedge clk_a)
    sel_a_neg <= sel_a_sync2;

// 同步 select 到 clk_b domain
always @(posedge clk_b) begin
    sel_b_sync1 <= sel & ~sel_a_neg;   // 包含 feedback
    sel_b_sync2 <= sel_b_sync1;
end

// 在 clk_b 的 negative edge 暫存
always @(negedge clk_b)
    sel_b_neg <= sel_b_sync2;

// Gated clocks
wire clk_a_gated = clk_a & sel_a_neg;
wire clk_b_gated = clk_b & sel_b_neg;

assign clk_out = clk_a_gated | clk_b_gated;

endmodule
```

**面試問題：** 「為何使用 negative-edge triggered FFs？」
**回答：** 確保 enable 訊號僅在 clock 為 LOW 時變化，防止輸出產生任何 partial clock pulses（glitches）。

### **除法演算法**

使用 **shift-subtract**（restoring division）方法的硬體除法：

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
    // 初始化：dividend 在低位元，高位元為零
    temp_dividend = {{WIDTH{1'b0}}, dividend};
    temp_divisor  = {divisor, {WIDTH{1'b0}}};

    for (i = 0; i < WIDTH; i = i + 1) begin
        // 左移 1 位
        temp_dividend = {temp_dividend[2*WIDTH-2:0], 1'b0};

        // 比較並相減
        if (temp_dividend[2*WIDTH-1:WIDTH] >= divisor) begin
            temp_dividend[2*WIDTH-1:WIDTH] = temp_dividend[2*WIDTH-1:WIDTH] - divisor;
            temp_dividend[0] = 1'b1;  // 設定 quotient bit
        end
    end

    quotient  = temp_dividend[WIDTH-1:0];
    remainder = temp_dividend[2*WIDTH-1:WIDTH];
end

endmodule
```

**演算法步驟：**
1. 將 dividend 放在低半部，高半部為零
2. 對於每個 bit 位置：
   - 將組合暫存器左移 1 位
   - 若高半部 ≥ divisor，減去 divisor 並設定 quotient bit = 1
   - 否則 quotient bit = 0
3. 經過 WIDTH 次迭代後：quotient 在低半部，remainder 在高半部

**範例（8 ÷ 3）：**
```
初始：    [0000][1000]  (dividend=8, divisor=3)
左移：    [0001][000_]  upper=1 < 3, Q=0
左移：    [0010][00_0]  upper=2 < 3, Q=0
左移：    [0100][0_00]  upper=4 ≥ 3, 相減: [0001][0_01]
左移：    [0010][_010]  upper=2 < 3, Q=0
結果：    quotient=0010(2), remainder=0010(2)
          8 ÷ 3 = 2 餘 2 ✓
```

### **序列偵測器**

在串列輸入流中偵測特定 bit pattern（常見面試題）。

**範例：偵測 "1011"（overlapping）**

```
狀態圖：
S0 (idle) --1--> S1 (得到 "1")
S0        --0--> S0
S1        --0--> S2 (得到 "10")
S1        --1--> S1 (得到 "1")
S2        --1--> S3 (得到 "101")
S2        --0--> S0
S3        --1--> S1 + OUTPUT (得到 "1011", output=1)
S3        --0--> S2 (得到 "10")
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

**關鍵重點：**
- **Overlapping 偵測**：偵測到 "1011" 後，可立即開始偵測下一個序列
- **Non-overlapping**：偵測後返回 S0
- 狀態數 = pattern 長度（對於簡單 patterns）

### **自動售賣機 FSM（經典面試題）**

> **第25題：設計一個自動飲料售賣機，飲料10分錢，硬幣有5分和10分兩種，並考慮找零。**

這是數位 IC 面試中最經典的 FSM 設計題之一。關鍵在於正確定義狀態、輸入和輸出。

**問題分析：**
- 輸入：`coin_5`（投入5分）、`coin_10`（投入10分）
- 輸出：`dispense`（出飲料）、`change`（找零5分）
- 飲料價格：10分

**狀態定義：**

| 狀態 | 含義 | 累計金額 |
|------|------|----------|
| S0 | 初始狀態 | 0 分 |
| S1 | 已投入 5 分 | 5 分 |

**狀態轉移表：**

| 當前狀態 | 輸入 | 下一狀態 | dispense | change |
|----------|------|----------|----------|--------|
| S0 | 無投幣 | S0 | 0 | 0 |
| S0 | coin_5 | S1 | 0 | 0 |
| S0 | coin_10 | S0 | 1 | 0 |
| S1 | 無投幣 | S1 | 0 | 0 |
| S1 | coin_5 | S0 | 1 | 0 |
| S1 | coin_10 | S0 | 1 | 1 |

```verilog
module vending_machine (
    input  clk,
    input  rst_n,
    input  coin_5,      // 投入 5 分
    input  coin_10,     // 投入 10 分
    output reg dispense, // 出飲料
    output reg change    // 找零 5 分
);

// 狀態定義
localparam S0 = 1'b0;   // 累計 0 分
localparam S1 = 1'b1;   // 累計 5 分

reg state, next_state;

// 狀態暫存器
always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        state <= S0;
    else
        state <= next_state;
end

// 次態邏輯 + 輸出邏輯 (Mealy machine)
always @(*) begin
    // 預設值
    next_state = state;
    dispense = 1'b0;
    change = 1'b0;

    case (state)
        S0: begin
            if (coin_10) begin
                dispense = 1'b1;    // 10分 → 直接出飲料
                next_state = S0;
            end
            else if (coin_5) begin
                next_state = S1;    // 累計 5 分
            end
        end

        S1: begin
            if (coin_10) begin
                dispense = 1'b1;    // 5+10=15分 → 出飲料
                change = 1'b1;      // 找零 5 分
                next_state = S0;
            end
            else if (coin_5) begin
                dispense = 1'b1;    // 5+5=10分 → 出飲料
                next_state = S0;
            end
        end
    endcase
end

endmodule
```

**面試進階追問：**

| 問題 | 答案重點 |
|------|----------|
| **「如果飲料價格是 15 分呢？」** | 需要增加 S2 狀態（累計 10 分），狀態機變成 3 個狀態 |
| **「如何處理同時投入兩個硬幣？」** | 實際硬體中不可能同時，但若需處理可用優先級邏輯 |
| **「Moore vs Mealy 哪個更適合？」** | Mealy 更適合，因為輸出需要立即反應投幣動作 |
| **「如何擴展支援退幣功能？」** | 增加 `refund` 輸入和對應的狀態轉移 |

### **Johnson Counter**

Johnson counter（twisted ring counter）是一個具有反相回授的 shift register。

**N-bit Johnson counter 循環經過 2N 個狀態：**

```
4-bit Johnson Counter 狀態：
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
        q <= {~q[0], q[N-1:1]};  // 右移，將反相 LSB 移至 MSB
end

endmodule
```

**Johnson vs Ring Counter：**

| 面向 | Ring Counter | Johnson Counter |
|--------|--------------|-----------------|
| **狀態數** | N 個狀態 | 2N 個狀態 |
| **回授** | 直接（Q[0] → Q[N-1]）| 反相（~Q[0] → Q[N-1]）|
| **自啟動** | 否 | 否 |
| **解碼** | 每狀態 1 個 gate | 每狀態 1 個 gate |

**應用：**
- 2N 除頻
- 多相位 clock 產生
- 無 glitch 解碼（每次轉換只有 1 bit 變化）

### **D 觸發器實現 N 進制計數器（經典面試題）**

> **第75題（華為）：用 D 觸發器做個 4 進制的計數器**

這是測試時序邏輯設計基礎的經典題目。需要理解 D flip-flop 的特性並設計適當的回授邏輯。

**4 進制計數器設計（計數 0→1→2→3→0...）：**

**分析：**
- 需要 2 個 D flip-flop（2 bits 可表示 0-3）
- 狀態轉移：00 → 01 → 10 → 11 → 00

**狀態轉移表：**

| 現態 Q1Q0 | 次態 Q1'Q0' | D1 | D0 |
|-----------|-------------|----|----|
| 00 | 01 | 0 | 1 |
| 01 | 10 | 1 | 0 |
| 10 | 11 | 1 | 1 |
| 11 | 00 | 0 | 0 |

**從卡諾圖推導 D 輸入：**

```
D0 = Q0'（Q0 的反相）
D1 = Q1 ⊕ Q0（Q1 與 Q0 的 XOR）
```

```verilog
// 方法一：行為級描述（最常用）
module counter_4_behavioral (
    input  clk,
    input  rst_n,
    output reg [1:0] count
);

always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        count <= 2'b00;
    else if (count == 2'b11)
        count <= 2'b00;
    else
        count <= count + 1'b1;
end

endmodule

// 方法二：結構級描述（展示 D-FF 特性）
module counter_4_structural (
    input  clk,
    input  rst_n,
    output reg q1, q0
);

wire d1, d0;

// D 輸入的組合邏輯
assign d0 = ~q0;           // D0 = Q0'
assign d1 = q1 ^ q0;       // D1 = Q1 XOR Q0

// D flip-flops
always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        q1 <= 1'b0;
        q0 <= 1'b0;
    end else begin
        q1 <= d1;
        q0 <= d0;
    end
end

endmodule
```

**擴展：任意 N 進制計數器**

```verilog
// 通用 N 進制計數器
module counter_n #(
    parameter N = 10  // 10 進制計數器
)(
    input  clk,
    input  rst_n,
    output reg [$clog2(N)-1:0] count
);

always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        count <= 0;
    else if (count == N - 1)
        count <= 0;
    else
        count <= count + 1'b1;
end

endmodule
```

**面試進階追問：**

| 問題 | 答案重點 |
|------|----------|
| **「如何用 D-FF 做 3 進制計數器？」** | 狀態 00→01→10→00，需要在 count==2 時歸零 |
| **「同步計數器 vs 異步計數器？」** | 同步：所有 FF 共用時脈，切換同時；異步：前級輸出驅動後級時脈，有 ripple delay |
| **「為何同步計數器更常用？」** | 時序可預測，可進行 STA 分析，適合高速設計 |
| **「如何做可預置初值的計數器？」** | 加入 load 訊號和 data 輸入，load 有效時載入初值 |

### **Round Robin Arbiter**

Round-robin arbiter 以公平、輪替的方式授予多個請求者存取權。每次授權後，優先權輪轉，使最後被授權的請求者具有最低優先權。

**關鍵需求：**
- 單週期仲裁（每個 cycle 授權不同請求者）
- 環繞（從最後一個請求者輪轉到第一個）
- Work-conserving（有 pending requests 時無 idle cycles）

**使用 Thermometer Mask 實現：**

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

// 對 masked requests 的 priority encoder
assign masked_grant = masked_req & (~masked_req + 1);  // 隔離最低設定位元

// 對所有 requests 的 priority encoder（fallback）
assign unmasked_grant = req & (~req + 1);

// 若有 masked request 則使用 masked，否則使用 unmasked
wire [N-1:0] next_grant = |masked_req ? masked_grant : unmasked_grant;

always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        grant <= 0;
        mask <= {N{1'b1}};
    end else if (|req) begin
        grant <= next_grant;
        // 更新 mask：所有高於授權位置的位元 = 1
        mask <= ~((next_grant << 1) - 1) | next_grant;
    end else begin
        grant <= 0;
    end
end

endmodule
```

**Thermometer Mask 運作原理：**
```
4 個 requestors 的範例（req[3:0]）：

初始：mask = 1111, req = 1010
  masked_req = 1010 & 1111 = 1010
  grant = 0010（最低設定位元）
  new mask = 1100（遮蔽已授權及以下位元）

下一次：mask = 1100, req = 1010
  masked_req = 1010 & 1100 = 1000
  grant = 1000
  new mask = 0000 → 環繞至 1111

下一次：mask = 1111, req = 1010
  grant = 0010（回到開始）
```

**應用：**
- Bus 仲裁（AMBA interconnect）
- Memory controller 請求處理
- Network-on-Chip routing
- DMA channel 排程

### **CRC（循環冗餘校驗）**

CRC（Cyclic Redundancy Check）是通訊領域中最常用的錯誤檢測方法，用於確保資料傳輸的可靠性。

**基本原理：**

CRC 透過將資料視為多項式，與生成多項式（Generator Polynomial）進行模 2 除法，得到餘數作為校驗碼。

```
發送端：
  原始資料 D(x) × x^r ÷ G(x) = Q(x) ... R(x)
  傳送：D(x) × x^r + R(x)（原始資料後接 CRC 校驗碼）

接收端：
  收到資料 ÷ G(x)
  餘數 = 0 → 資料正確
  餘數 ≠ 0 → 資料有誤
```

**常見 CRC 標準：**

| 標準 | 多項式 | 位寬 | 應用 |
|------|--------|------|------|
| **CRC-8** | x⁸+x²+x+1 | 8 bit | I2C、ATM |
| **CRC-16** | x¹⁶+x¹⁵+x²+1 | 16 bit | USB、Modbus |
| **CRC-32** | x³²+x²⁶+x²³+...+1 | 32 bit | Ethernet、ZIP |

**Verilog 實現（並行計算）：**

```verilog
// CRC-8 並行實現（以 x^8 + x^2 + x + 1 為例）
module crc8_parallel (
    input  clk,
    input  rst_n,
    input  data_valid,
    input  [7:0] data_in,
    output reg [7:0] crc_out
);

// CRC 多項式：x^8 + x^2 + x + 1 = 0x07
// 並行 CRC 計算矩陣（根據多項式推導）
wire [7:0] next_crc;

assign next_crc[0] = crc_out[0] ^ crc_out[6] ^ crc_out[7] ^ data_in[0] ^ data_in[6] ^ data_in[7];
assign next_crc[1] = crc_out[0] ^ crc_out[1] ^ crc_out[6] ^ data_in[0] ^ data_in[1] ^ data_in[6];
assign next_crc[2] = crc_out[0] ^ crc_out[1] ^ crc_out[2] ^ crc_out[6] ^ data_in[0] ^ data_in[1] ^ data_in[2] ^ data_in[6];
assign next_crc[3] = crc_out[1] ^ crc_out[2] ^ crc_out[3] ^ crc_out[7] ^ data_in[1] ^ data_in[2] ^ data_in[3] ^ data_in[7];
assign next_crc[4] = crc_out[2] ^ crc_out[3] ^ crc_out[4] ^ data_in[2] ^ data_in[3] ^ data_in[4];
assign next_crc[5] = crc_out[3] ^ crc_out[4] ^ crc_out[5] ^ data_in[3] ^ data_in[4] ^ data_in[5];
assign next_crc[6] = crc_out[4] ^ crc_out[5] ^ crc_out[6] ^ data_in[4] ^ data_in[5] ^ data_in[6];
assign next_crc[7] = crc_out[5] ^ crc_out[6] ^ crc_out[7] ^ data_in[5] ^ data_in[6] ^ data_in[7];

always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        crc_out <= 8'hFF;  // 初始值
    else if (data_valid)
        crc_out <= next_crc;
end

endmodule
```

**CRC vs 其他錯誤檢測：**

| 方法 | 檢錯能力 | 硬體成本 | 應用場景 |
|------|----------|----------|----------|
| **Parity** | 單 bit | 最低 | 記憶體 |
| **Checksum** | 多 bit（弱）| 低 | IP header |
| **CRC** | 多 bit（強）| 中 | Ethernet、儲存 |
| **ECC** | 可糾錯 | 高 | DRAM、Flash |

**面試常見問題：**

| 問題 | 答案要點 |
|------|----------|
| **「CRC 和 Parity 有什麼區別？」** | Parity 只能檢測奇數個 bit 錯誤；CRC 可檢測 burst error 和多 bit 錯誤 |
| **「為什麼用 XOR 實現？」** | 模 2 除法的本質就是 XOR 操作，硬體實現簡單高效 |
| **「如何選擇 CRC 多項式？」** | 根據資料長度、錯誤模式選擇標準多項式（如 Ethernet 用 CRC-32） |

### **Booth 與 Wallace Tree 乘法器**

乘法器是 DSP 和 CPU 中的關鍵運算單元。由於乘法操作邏輯複雜，往往處於 critical path 上，優化乘法器對系統性能影響很大。

**基本陣列乘法器的問題：**

```
對於 N-bit × N-bit 乘法：
  - 產生 N² 個 partial products
  - 需要 (N-1) 層加法器
  - Delay = O(N²)，面積 = O(N²)
```

#### **Booth 演算法**

Booth 演算法透過編碼減少部分積的數量，特別對有符號數乘法效率更高。

**Radix-2 Booth 編碼：**

```
檢視乘數 Y 相鄰兩位 (Yi, Yi-1)：
  00 → 0（不操作）
  01 → +1（加 X）
  10 → -1（減 X）
  11 → 0（不操作）

假設 Y-1 = 0
```

**Radix-4 Booth 編碼（Modified Booth）：**

```
檢視乘數 Y 三位 (Y2i+1, Y2i, Y2i-1)：
  000, 111 → 0
  001, 010 → +X
  011      → +2X
  100      → -2X
  101, 110 → -X

優點：部分積數量減半（N/2 個）
```

**Radix-4 Booth 部分積生成：**

```verilog
// Radix-4 Booth 編碼部分積生成
module booth_pp_gen (
    input  signed [15:0] multiplicand,  // X
    input  [2:0] booth_code,            // {Y2i+1, Y2i, Y2i-1}
    output reg signed [16:0] partial_product
);

always @(*) begin
    case (booth_code)
        3'b000, 3'b111: partial_product = 17'd0;           // 0
        3'b001, 3'b010: partial_product = {multiplicand[15], multiplicand};  // +X
        3'b011:         partial_product = {multiplicand, 1'b0};              // +2X
        3'b100:         partial_product = -{multiplicand, 1'b0};             // -2X
        3'b101, 3'b110: partial_product = -{multiplicand[15], multiplicand}; // -X
        default:        partial_product = 17'd0;
    endcase
end

endmodule
```

#### **Wallace Tree**

Wallace Tree 透過並行壓縮部分積，減少加法層數。

**核心思想：使用 3:2 壓縮器（全加器）**

```
傳統逐層相加：N-1 層延遲
Wallace Tree：log₁.₅(N) ≈ 1.71 log₂(N) 層延遲

8 個部分積的 Wallace Tree：
  第 1 層：8 → 6（使用 2 個 3:2 壓縮器）
  第 2 層：6 → 4
  第 3 層：4 → 3
  第 4 層：3 → 2
  最後：2 個數用 CPA（Carry Propagate Adder）相加
```

**3:2 壓縮器（全加器）：**

```verilog
// 3:2 Compressor = Full Adder
module compressor_3_2 (
    input  a, b, c,
    output sum, carry
);
    assign sum   = a ^ b ^ c;
    assign carry = (a & b) | (b & c) | (a & c);
endmodule
```

**4:2 壓縮器（提高效率）：**

```verilog
// 4:2 Compressor
// 輸入：4 個數 + 1 個進位輸入
// 輸出：2 個數 + 1 個進位輸出
module compressor_4_2 (
    input  a, b, c, d, cin,
    output sum, carry, cout
);
    wire t = a ^ b ^ c ^ d;
    assign sum   = t ^ cin;
    assign cout  = (a & b) | (c & d);  // 不依賴 cin，可並行
    assign carry = t ? cin : d;
endmodule
```

**Booth-Wallace 乘法器架構：**

```
                    ┌─────────────────┐
    Multiplicand ──►│  Booth Encoder  │──► N/2 個 Partial Products
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Wallace Tree   │──► 2 個數（Sum, Carry）
                    │  (Compressors)  │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Final Adder    │──► Product
                    │  (CPA/CLA)      │
                    └─────────────────┘
```

**性能比較：**

| 乘法器類型 | 部分積數 | 延遲複雜度 | 面積 | 適用場景 |
|------------|----------|------------|------|----------|
| **陣列乘法器** | N² | O(N) | 大 | 教學用途 |
| **Booth** | N/2 | O(N) | 中 | 減少部分積 |
| **Wallace Tree** | N | O(log N) | 中 | 減少延遲 |
| **Booth + Wallace** | N/2 | O(log N) | 最優 | 高性能處理器 |

**面試常見問題：**

| 問題 | 答案要點 |
|------|----------|
| **「Booth 演算法的優點？」** | 減少部分積數量，對有符號數直接處理，減少面積和功耗 |
| **「為什麼用 Radix-4 而非 Radix-2？」** | 部分積減半，但編碼稍複雜（需處理 ±2X） |
| **「Wallace Tree 如何減少延遲？」** | 並行壓縮多個部分積，延遲從 O(N) 降為 O(log N) |
| **「4:2 壓縮器比 3:2 好在哪？」** | cout 不依賴 cin，可更快地並行計算 |

### **LFSR 與 PRBS（偽隨機序列）**

LFSR（Linear Feedback Shift Register，線性反饋移位暫存器）是數位電路中產生偽隨機序列的經典方法，廣泛用於測試、加密和通訊。

**LFSR 基本結構：**

```
Fibonacci 結構（外部 XOR）：
┌──────────────────────────────────┐
│                                  │
▼                                  │
[D3]──►[D2]──►[D1]──►[D0]──►Out   │
  │      │                         │
  └──XOR─┴─────────────────────────┘
     ↑
  反饋多項式決定哪些位參與 XOR

Galois 結構（內部 XOR）：
┌───────────────────────────────────┐
│      ↓XOR        ↓XOR            │
[D3]──►[D2]──►[D1]──►[D0]──►Out ───┘
```

**最大長度序列（M-sequence）：**

使用本原多項式（Primitive Polynomial）時，N-bit LFSR 可產生 2^N - 1 個不重複狀態。

**常用 PRBS 多項式：**

| 序列 | 多項式 | 長度 | 應用 |
|------|--------|------|------|
| **PRBS-7** | x⁷ + x⁶ + 1 | 127 | 短距測試 |
| **PRBS-9** | x⁹ + x⁵ + 1 | 511 | 音頻測試 |
| **PRBS-15** | x¹⁵ + x¹⁴ + 1 | 32767 | 通訊 |
| **PRBS-23** | x²³ + x¹⁸ + 1 | 8M | 高速 SerDes |
| **PRBS-31** | x³¹ + x²⁸ + 1 | 2G | 誤碼率測試 |

**Verilog 實現（PRBS-7）：**

```verilog
// PRBS-7 生成器（x^7 + x^6 + 1）
module prbs7_gen (
    input  clk,
    input  rst_n,
    input  enable,
    output prbs_out,
    output reg [6:0] lfsr
);

wire feedback = lfsr[6] ^ lfsr[5];  // x^7 XOR x^6

always @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        lfsr <= 7'b1111111;  // 非零種子
    else if (enable)
        lfsr <= {lfsr[5:0], feedback};
end

assign prbs_out = lfsr[6];

endmodule
```

**LFSR 應用場景：**

| 應用 | 說明 |
|------|------|
| **BIST** | 測試向量生成和響應壓縮 |
| **Scrambler** | 資料擾碼（消除連續 0/1） |
| **CRC** | 循環冗餘校驗（Galois 結構） |
| **加密** | 流密碼種子 |
| **計數器替代** | 低功耗偽計數（每次只翻轉 1-2 bit） |

**面試常見問題：**

| 問題 | 答案要點 |
|------|----------|
| **「LFSR 為什麼不能初始化為全 0？」** | 0 XOR 0 = 0，會永遠卡在全 0 狀態（鎖定狀態） |
| **「如何達到最大長度序列？」** | 使用本原多項式，確保反饋抽頭正確 |
| **「Fibonacci 和 Galois 結構的區別？」** | Fibonacci 外部 XOR 結構簡單；Galois 內部 XOR 延遲更低 |
| **「PRBS 用於 SerDes 測試的優點？」** | 包含所有可能的位模式組合，可測試 ISI 和抖動 |

### **串並轉換與並串轉換**

串並轉換（Serial-to-Parallel）和並串轉換（Parallel-to-Serial）是數位通訊的基礎電路，核心思想是用面積換速度。

**串轉並（Serial-to-Parallel）：**

```
Serial In ──►[Shift Register]──► Parallel Out[N-1:0]

時序圖：
CLK:      ─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─
Serial:   ──D0─D1─D2─D3─D4─D5─D6─D7──
                              ↓
Parallel: ──────────────────[D7:D0]── (每 8 個 clock 輸出一次)
```

**Verilog 實現（串轉並）：**

```verilog
// 8-bit 串轉並（MSB first）
module serial_to_parallel #(
    parameter WIDTH = 8
)(
    input  clk,
    input  rst_n,
    input  serial_in,
    input  serial_valid,
    output reg [WIDTH-1:0] parallel_out,
    output reg parallel_valid
);

reg [WIDTH-1:0] shift_reg;
reg [$clog2(WIDTH)-1:0] cnt;

always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        shift_reg      <= {WIDTH{1'b0}};
        cnt            <= 0;
        parallel_out   <= {WIDTH{1'b0}};
        parallel_valid <= 1'b0;
    end else if (serial_valid) begin
        shift_reg <= {shift_reg[WIDTH-2:0], serial_in};  // 左移，新位進 LSB

        if (cnt == WIDTH - 1) begin
            parallel_out   <= {shift_reg[WIDTH-2:0], serial_in};
            parallel_valid <= 1'b1;
            cnt            <= 0;
        end else begin
            parallel_valid <= 1'b0;
            cnt            <= cnt + 1;
        end
    end else begin
        parallel_valid <= 1'b0;
    end
end

endmodule
```

**並轉串（Parallel-to-Serial）：**

```verilog
// 8-bit 並轉串（MSB first）
module parallel_to_serial #(
    parameter WIDTH = 8
)(
    input  clk,
    input  rst_n,
    input  [WIDTH-1:0] parallel_in,
    input  load,           // 載入並行資料
    output serial_out,
    output busy
);

reg [WIDTH-1:0] shift_reg;
reg [$clog2(WIDTH):0] cnt;

always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        shift_reg <= {WIDTH{1'b0}};
        cnt       <= 0;
    end else if (load && cnt == 0) begin
        shift_reg <= parallel_in;
        cnt       <= WIDTH;
    end else if (cnt > 0) begin
        shift_reg <= {shift_reg[WIDTH-2:0], 1'b0};  // 左移
        cnt       <= cnt - 1;
    end
end

assign serial_out = shift_reg[WIDTH-1];  // MSB first
assign busy = (cnt != 0);

endmodule
```

**實現方式比較：**

| 方法 | 適用場景 | 優點 | 缺點 |
|------|----------|------|------|
| **移位暫存器** | 資料量小 | 簡單、低延遲 | 固定位寬 |
| **FIFO** | 跨時鐘域 | 彈性大、解耦 | 面積較大 |
| **雙埠 RAM** | 大資料量 | 高吞吐量 | 複雜度高 |

**面試常見問題：**

| 問題 | 答案要點 |
|------|----------|
| **「串轉並的核心電路是什麼？」** | 移位暫存器 + 計數器，每 N 個 clock 輸出一次並行資料 |
| **「MSB first 和 LSB first 怎麼切換？」** | MSB first 左移新位進 LSB；LSB first 右移新位進 MSB |
| **「如何處理不同速率的轉換？」** | 使用 FIFO 或雙埠 RAM 進行速率匹配 |
| **「SerDes 和簡單串並轉換的區別？」** | SerDes 包含 PLL/CDR、編碼（8b/10b）、均衡等高速功能 |

---

## 後端 / 實體設計

> **從 RTL 到 Silicon：後端設計的角色** 前面討論的 STA 概念（setup/hold、OCV、CPPR）都是在後端設計流程中實際執行和驗證的。後端設計師的工作是將合成後的 netlist 轉化為實際的 GDSII 版圖，同時確保設計在所有 PVT corners 下都能達成 timing closure。這個過程涉及：(1) Floorplanning — 決定各模組的位置；(2) Placement — 放置 standard cells；(3) CTS — 建立低 skew 的 clock tree；(4) Routing — 連接所有訊號線。每個步驟都會影響 timing，因此需要反覆迭代直到達成收斂。

**本章與前面概念的關聯：**
- **CTS（Clock Tree Synthesis）** 直接影響 STA 中討論的 clock skew 和 uncertainty
- **IR Drop 分析** 與 OCV 概念相關——電壓降會影響 cell delay
- **Crosstalk 和 Signal Integrity** 會增加額外的 timing uncertainty
- **DFT/Scan Chain** 是確保製造後晶片可測試性的關鍵

### **CTS 與 Clock Uncertainty**

**什麼是 CTS？** Clock Tree Synthesis 是在 placement 後插入 clock buffers，將 clock 訊號從 clock source 均勻地分配到所有 flip-flops 的過程。目標是最小化不同 flip-flops 之間的 clock skew，同時控制 clock transition time 和 power consumption。

**為何 CTS 如此重要？** 回顧 STA 中的 setup/hold 檢查：clock skew 直接出現在這些公式中。若 clock skew 過大，即使 data path delay 符合預期，也可能導致 timing violation。因此，良好的 CTS 是達成 timing closure 的基礎。

Clock uncertainty 考量 clock 網路中的時序變異：

| 階段 | Setup Uncertainty | Hold Uncertainty |
|-------|-------------------|------------------|
| **Pre-CTS** | PLL jitter + 估計的 skew | 估計的 skew |
| **Post-CTS** | 僅 PLL jitter | 0（實際 skew 已知）|

**為何 uncertainty 在 CTS 後改變：**
- Pre-CTS：Clock tree 尚不存在，因此 skew 必須估計
- Post-CTS：實際 clock tree 已建立，計算真實 skew

**CTS 最佳化目標：**
- 最小化所有 flip-flops 之間的 clock skew
- 平衡 insertion delay
- 達到目標 transition times
- 最小化功耗

**CTS 最佳實踐：**

有效的 CTS 需要平衡多個相互競爭的目標。過於激進的 skew 目標會增加 buffer 數量和功耗，而過於寬鬆的目標可能導致 hold violations。從實際可行的 constraints 開始並迭代。

- 選擇適當的 clock root 位置
- 使用最小 RC 的金屬層進行 clock routing
- 考慮使用雙倍寬度 routing 以降低電阻
- 設定合理的最大 fanout 限制
- 避免過於緊密的 skew 目標（導致過度 buffering）

### **Routing Congestion 解決方案**

當 routing 需求超過可用 tracks 時會發生 congestion。

| 位置 | 解決方案 |
|----------|-----------|
| **記憶體之間** | 增加間距、旋轉 RAM 方向、對齊 address/data pins |
| **Macro 周圍** | 新增 keepout zones、placement blockages、halo regions |
| **Standard cell 區域** | Congestion-driven placement、降低 cell density、避免 pin-dense cells |
| **Power routing** | 最佳化 power grid、使用較寬的 straps |

**Congestion 分析：**
```tcl
# ICC2 congestion 分析
report_congestion -routing_stage global
report_congestion -routing_stage detail
```

**預防策略：**

Routing congestion 最好在設計流程早期處理。在 detailed routing 後修復 congestion 代價高昂，可能需要 floorplan 變更而影響 timing closure。

- 使用 congestion-driven placement
- 設定 cell density 限制（例如 70-80%）
- 在 congested 區域新增 routing blockages
- 增加 routing 資源（更多金屬層）

### **晶片面積估算**

**Core-limited 設計：**
```
總面積 = Core Area + Power Ring + PAD Ring

Core Area = RAM Area + Macro Area + Standard Cell Area

RAM Area = 本身面積 + Power Ring + Keepout

Standard Cell Area = (Gate Count × 每個 Gate 的面積) / Utilization
```

**Utilization 指南：**

| 金屬層數 | 典型 Utilization |
|--------------|---------------------|
| 4-5 層 | 50-60% |
| 6-7 層 | 60-70% |
| 8+ 層 | 70-80% |

**IO-limited 設計：**
- 總面積由 IOs 數量決定，而非邏輯
- 解決方案：staggered IO、flip-chip、窄 IO cells

### **CTS 中的 Buffer vs Inverter**

| 面向 | Buffer | Inverter |
|--------|--------|----------|
| **邏輯** | Non-inverting | Inverting |
| **面積** | 較大（2 個 inverters）| 較小 |
| **功耗** | 較高 | 較低 |
| **延遲** | 較高 | 較低 |
| **修改** | 較容易新增/移除 | 需成對使用 |

**何時使用：**
- **Buffers**：邏輯較簡單，ECO 修改較容易
- **Inverters**：PPA（Power、Performance、Area）較佳，但必須成對使用

### **ECO（Engineering Change Order）**

ECO 是進行後期設計修改的流程。

| ECO 類型 | 描述 | 限制 |
|----------|-------------|-------------|
| **Pre-mask** | GDSII tape-out 之前 | 允許任何 netlist 變更 |
| **Post-mask** | Masks 製造之後 | 僅限 spare cells、metal-only 變更 |

**Pre-mask ECO 流程：**
1. 修改 RTL 或 netlist
2. ECO place and route
3. 增量驗證（DRC、LVS、timing）

**Post-mask ECO 流程：**
1. 識別可用的 spare cells 或 gate array cells
2. 將邏輯變更映射到 spare cells
3. Metal-only routing 變更
4. 驗證功能保持不變

**Spare Cell 策略：**

Spare cells 是預先放置的邏輯元件，可在 mask 製造後透過 metal-only ECO 連接。適當的 spare cell 規劃可節省數週時程和數百萬 mask 成本。

- 在實現階段插入 spare cells（約佔設計的 2-5%）
- 均勻分布在晶片各處
- 包含混合的 cell 類型（INV、NAND、NOR、FF）

**SDC 開發：**

| Constraint 類型 | 來源 |
|-----------------|--------|
| **Clock 定義** | 設計規格（頻率、duty cycle）|
| **IO timing** | 系統需求、板級時序 |
| **False paths** | 設計架構（互斥模式）|
| **Multicycle paths** | 設計意圖（刻意較慢的路徑）|

### **Scan Chain / DFT**

**為何需要 DFT？** 即使設計在 simulation 中完全正確，製造過程仍可能引入缺陷——transistor 可能 stuck-at 0/1、metal 可能斷線或短路、via 可能接觸不良。這些製造缺陷必須在晶片出貨前被檢測出來，否則會造成 field failures 和品質問題。

**問題：Sequential circuits 難以測試** 考慮一個有 1000 個 flip-flops 的設計。要測試每個 flip-flop 的行為，我們需要先設定其前置電路的狀態，然後施加輸入，再觀察輸出。但由於 flip-flops 是 sequential 的，要設定特定的內部狀態可能需要非常複雜的 input sequences。這使得完整測試變得幾乎不可能。

**解決方案：Scan Chain** 透過將所有 flip-flops 連接成一條 shift register chain，我們可以直接 shift 進任何想要的內部狀態，執行一個 clock cycle，然後 shift 出結果。這將困難的 sequential testing 轉換為簡單的 combinational testing。

DFT（Design for Testability）插入測試結構以實現製造測試。

```
Normal Mode:        Scan Mode:
   D → [FF] → Q        SI → [FF] → SO
       ↑                    ↑
      CLK                  CLK + SE
```

**Scan Cell 操作：**

| 模式 | SE（Scan Enable）| 行為 |
|------|------------------|----------|
| **Normal** | 0 | D → Q（functional mode）|
| **Shift** | 1 | SI → Q（scan data 通過 chain 移位）|
| **Capture** | 0 | 擷取回應到 scan FFs |

**Scan Test 流程：**

Scan test 流程將循序測試轉換為三階段操作。透過控制 scan enable（SE），測試機可載入任何所需狀態、觀察一個 clock cycle 的功能行為，並讀出結果。

1. **Shift-in**：SE=1，將 test pattern clock 進 scan chain
2. **Capture**：SE=0，施加一個 functional clock，擷取回應
3. **Shift-out**：SE=1，clock 出擷取的回應，同時 shift 進下一個 pattern

**DFT 方法：**

| 方法 | 描述 | 使用情境 |
|--------|-------------|----------|
| **Scan Chain** | 用於 sequential test 的 FF 替換 | Logic testing |
| **MBIST** | Memory built-in self-test | RAM/ROM testing |
| **Boundary Scan** | IEEE 1149.1（JTAG）| Board-level testing |
| **ATPG** | Automatic test pattern generation | Fault coverage |

**Scan Insertion 流程（DC）：**
```tcl
# 在 Design Compiler 中
set_scan_configuration -chain_count 4
set_dft_signal -view existing_dft -type ScanClock -port clk
set_dft_signal -view spec -type ScanEnable -port SE
insert_dft
```

**Scan Chain Compression：**

隨著設計規模增大，由於測試時間和測試機記憶體限制，full scan chains 變得不切實際。壓縮技術在大幅減少測試資料量的同時維持 fault coverage。

- Full scan 需要許多測試 pins 和長測試時間
- Compression（如 DFTMAX、Tessent）將測試資料量減少 10-100 倍
- 使用 decompressor（輸入）和 compactor（輸出）

**Fault Coverage 目標：**

| Coverage 等級 | 應用 | 備註 |
|----------------|-------------|-------|
| **85-90%** | Partial scan，成本敏感 | 某些消費性產品可接受 |
| **95%+** | 業界標準 | 大多數 foundries 的政策要求 |
| **98-99%** | 高可靠度 | 汽車、航太、醫療 |

**Fault Models：**

| 模型 | 偵測內容 | 測試類型 |
|-------|-----------------|-----------|
| **Stuck-at** | 永久性短路到 VDD/GND | Static patterns |
| **Transition** | Slow-to-rise/fall 延遲 | At-speed patterns |
| **Path Delay** | 特定路徑的 timing failures | At-speed patterns |
| **IDDQ** | 透過靜態電流偵測 bridging faults | Current measurement |

**ATPG 策略：** 施加隨機 patterns 直到新 pattern 偵測 <0.5% 的未偵測 faults，然後對剩餘 faults 施加 deterministic tests——這在最大化 coverage 的同時最小化測試時間。

### **MBIST（Memory Built-In Self-Test）**

MBIST 直接在晶片內記憶體中加入測試和修復電路，實現無需外部測試設備的自主測試。由於記憶體佔現代 SoC 面積的 50-70%，記憶體測試對良率至關重要。

**MBIST 架構：**

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

**March Test 演算法：**

March 演算法系統性地在「行進」通過記憶體位址時寫入和讀取 patterns。它們被設計來有效偵測特定 fault 類型。

| 演算法 | 複雜度 | 偵測的 Faults |
|-----------|------------|-----------------|
| **MATS** | 4n | Stuck-at faults（SAF）|
| **March C-** | 10n | SAF、address decoder faults（AF）、transition faults |
| **March LR** | 14n | SAF、AF、realistic linked faults |
| **SMarchCKBD** | 可變 | SAF、coupling faults、neighborhood pattern sensitivity |

**March C- 演算法表示法：**

```
⇑(w0); ⇑(r0,w1); ⇑(r1,w0); ⇓(r0,w1); ⇓(r1,w0); ⇕(r0)

⇑ = 位址遞增順序
⇓ = 位址遞減順序
⇕ = 任一方向
w0/w1 = 寫入 0/1
r0/r1 = 讀取（預期 0/1）
```

**目標 Fault 類型：**

| Fault 類型 | 描述 | 偵測方法 |
|------------|-------------|------------------|
| **Stuck-at（SAF）** | Cell stuck 在 0 或 1 | 寫入相反值，讀回 |
| **Transition（TF）** | 無法 transition 0→1 或 1→0 | 寫入、讀取、寫入相反、讀取 |
| **Coupling（CF）** | 一個 cell 影響另一個 | 使用 aggressor/victim cells 的 pattern |
| **Address Decoder（AF）** | 存取錯誤位址 | 帶位址唯一性檢查的 March |

**記憶體修復（BISR）：**

Built-In Self-Repair 使用冗餘 rows/columns 替換故障 cells：

```
┌────────────────────────────────────┐
│        Memory Array                │
│  ┌─────┬─────┬─────┬─────┐        │
│  │     │     │ ✗   │     │ ← 故障 cell
│  ├─────┼─────┼─────┼─────┤        │
│  │     │     │     │     │        │
│  ├─────┼─────┼─────┼─────┤        │
│  │ Spare Row                │ ← 替換用
│  └─────┴─────┴─────┴─────┘        │
└────────────────────────────────────┘
```

**MBIST vs Logic Scan：**

| 面向 | MBIST | Scan Chain |
|--------|-------|------------|
| **目標** | 記憶體（SRAM、ROM、RF）| Sequential logic（flip-flops）|
| **測試產生** | 晶片內演算法 | 外部 ATPG |
| **Pattern 儲存** | 無（晶片內產生）| 測試機記憶體 |
| **測試時間** | 快速 | 取決於 scan chain 長度 |
| **面積開銷** | 記憶體的 3-5% | 邏輯的 ~15% |

### **IR Drop 分析**

**回顧：IR Drop 與 OCV 的關聯** 還記得前面 STA 章節討論的 OCV 嗎？其中一個 OCV 因素就是「Voltage variation」——晶片不同位置可能看到不同的供應電壓。IR drop 正是造成這種電壓變異的主要原因。

**什麼是 IR Drop？** IR drop 是由於 power distribution network（PDN）中的電阻，造成電源端與實際電路元件之間的電壓差（V = I × R）。離 VDD pad 越遠的 cells，看到的電壓越低。

**為何 IR Drop 會影響 timing？** Cell delay 與供應電壓成反比：電壓越低，電晶體驅動力越弱，delay 越大。因此，過大的 IR drop 會導致：(1) Setup violations（paths 變慢）；(2) 功能錯誤（邏輯位準無法正確切換）；(3) 在先進製程中，10% 的電壓下降可能造成 20% 以上的 delay 增加。

**Static vs Dynamic IR Drop：**

| 面向 | Static IR Drop | Dynamic IR Drop |
|--------|----------------|-----------------|
| **原因** | 通過電阻性 PDN 的平均電流 | Switching 時的突發電流尖峰 |
| **分析** | 無向量（平均功耗）| 基於向量（最差 switching 情況）|
| **頻率** | 穩態 | 暫態（在 clock cycle 內）|
| **影響** | 均勻電壓降低 | 局部電壓下降（hot spots）|

**IR Drop 機制：**

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
    └──► Cell N（累積下降）

距離 VDD pad 較遠的 cells 看到較低電壓！
```

**對 Timing 的影響：**

```
Cell delay ∝ 1 / (VDD - Vth)

若 VDD 從 1.0V 降至 0.9V 且 Vth = 0.3V：
  原始 delay 因子：1 / (1.0 - 0.3) = 1.43
  有 IR drop 時：1 / (0.9 - 0.3) = 1.67

  Delay 增加：慢約 17%！
```

**典型 IR Drop 預算：**

| 應用 | 最大 Static IR Drop | 最大 Dynamic IR Drop |
|-------------|-------------------|---------------------|
| **Mobile SoC** | VDD 的 3-5% | VDD 的 8-10% |
| **高效能** | VDD 的 5-8% | VDD 的 10-12% |
| **車用** | VDD 的 2-3% | VDD 的 5-7% |

**修復 IR Drop Violations：**

| 問題 | Static IR Drop 修復 | Dynamic IR Drop 修復 |
|-------|-------------------|---------------------|
| **Power grid** | 更寬的 straps、更多層 | 相同 + mesh 密度 |
| **Decaps** | N/A | 新增 decoupling capacitors |
| **Placement** | 分散高功耗 cells | 避免 switching hot spots |
| **Pads** | 新增 VDD/VSS bumps/pads | 相同，靠近 hot spots |

### **Electromigration**

Electromigration（EM）是由於載流電子的動量轉移，造成 interconnects 中金屬原子逐漸移動的現象。隨時間推移，這會造成 voids（開路）或 hillocks（短路），導致電路失效。

**Black's Equation（MTTF）：**

```
MTTF = A × J^(-n) × exp(Ea / kT)

其中：
  A  = 材料常數
  J  = 電流密度（A/cm²）
  n  = 電流指數（通常為 1-2）
  Ea = 活化能（Cu 約為 ~0.7-0.9 eV）
  k  = Boltzmann 常數
  T  = 溫度（Kelvin）
```

**關鍵洞見：** 電流密度加倍會使 MTTF 降低 2 到 4 倍（取決於 n）。

**失效機制：**

```
電子流 →  →  →  →  →  →
                ↓     ↓
           ┌────────────────────┐
           │ █████    ░░░  █████│ ← Void 形成
           │ Metal interconnect │
           │ █████████████  ░░░ │ ← Hillock 形成
           └────────────────────┘
```

**電流密度限制：**

| 金屬層 | 典型 Jmax（DC）| 典型 Jmax（AC/RMS）|
|-------------|------------------|----------------------|
| **M1-M3** | 1-2 mA/μm | 3-5 mA/μm |
| **M4-M6** | 2-4 mA/μm | 5-8 mA/μm |
| **頂層金屬** | 4-8 mA/μm | 10-15 mA/μm |

**EM 預防技術：**

| 技術 | 描述 |
|-----------|-------------|
| **Wire widening** | 增加截面積以降低 J |
| **Via doubling** | 多個 vias 降低每個 via 的電流 |
| **避免 90° 彎角** | 尖角處的電流集中效應 |
| **Cu capping layers** | CoWP、Ta barrier 改善 EM 抵抗力 |
| **Blech length** | 短導線（<~10μm）為「EM immortal」|

**Blech Length 效應：**

低於臨界長度（Blech length）時，機械背應力會阻止 void 形成：

```
Blech length ≈ Ω·σ_crit / (e·ρ·J)

對於典型 Cu interconnects：~10-50 μm

若導線長度 < Blech length → 無 EM 失效！
```

**EM 驗證流程：**

```
Post-route netlist + Spice simulation
           ↓
電流提取（DC + AC/RMS）
           ↓
依 PDK 限制進行 EM rule checking
           ↓
修復 violations：加寬導線、新增 vias
           ↓
重新驗證直到通過
```

### **Signal Integrity (Crosstalk)**

**為何 Crosstalk 在先進製程越來越嚴重？** 隨著製程微縮，導線間距越來越小，但導線高度因電阻考量無法同比例縮小。這導致相鄰導線之間的耦合電容（coupling capacitance）佔總電容的比例越來越高——在 7nm 以下製程，耦合電容可能超過 50%。

**Crosstalk 與 STA 的關聯：** 當一條「aggressor」導線切換時，透過耦合電容會在相鄰的「victim」導線上感應出雜訊。這有兩種影響：(1) 若 victim 靜止，可能產生 glitch 導致功能錯誤；(2) 若 victim 正在切換，會改變其 delay——同向切換會加速，反向切換會減慢。這種 crosstalk-induced delay 是 STA 必須考慮的 timing uncertainty 來源之一。

Signal integrity（SI）指電氣訊號在 interconnect 中傳播時的品質。不良的 SI 會導致 timing 錯誤、資料損壞和矽片失效。在先進製程（28nm 及以下），SI 問題佔 post-silicon bug 的 30% 以上。

**Crosstalk 類型：**

| 類型 | 機制 | 描述 |
|------|-----------|-------------|
| **電容性（靜電）** | Mutual capacitance | 電壓變化透過電場耦合到相鄰 net |
| **電感性** | Mutual inductance | 電流變化產生磁場耦合 |

由於導線間距緊密，電容性 crosstalk 在大多數數位設計中佔主導地位。

**Crosstalk 效應：**

```
Aggressor：造成干擾的 switching net
Victim：接收雜訊的受影響 net

兩個主要效應：
1. Crosstalk Glitch（功能性）：靜態 victim 上的雜訊脈衝
2. Crosstalk Delay（時序性）：加速或減慢 victim 的轉換
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

**Crosstalk Delay：**

| 轉換方向 | 對 Victim 的影響 | 結果 |
|---------------------|------------------|--------|
| **同向**（↑↑ 或 ↓↓）| Miller 效應降低 Cc | Victim 較快（speed-up）|
| **反向**（↑↓ 或 ↓↑）| Miller 效應增加 Cc | Victim 較慢（slow-down）|

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

**Crosstalk 緩解技術：**

| 技術 | 描述 | 權衡 |
|-----------|-------------|-----------|
| **間距** | 增加導線間距 | Routing 資源 |
| **屏蔽** | 在 aggressor/victim 之間插入接地導線 | 金屬密度、routing |
| **Buffer 插入** | 增強 victim driver | 面積、功耗 |
| **Net 排序** | 優先 route 時序關鍵 nets | 工具執行時間 |
| **層分配** | 對交叉 nets 使用不同層 | Via 數量 |

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

### **Latch-up 效應**

Latch-up 是 CMOS 中的寄生 thyristor（PNPN）效應，可能導致永久損壞。

**機制：**
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

寄生 PNP 和 NPN 電晶體形成 thyristor（SCR）結構。一旦觸發，會從 VDD 到 GND 形成低電阻路徑。

**觸發條件：**

當足夠的電流流過寄生 BJT 基極區域以導通 thyristor 結構時，會觸發 Latch-up。一旦觸發，即使觸發源移除，正回授迴路仍會維持導通。

- I/O pins 上的電壓尖峰（超過 VDD 或低於 GND）
- ESD 事件（突然的電荷注入）
- 高接面溫度（增加 leakage，降低觸發閾值）
- 過量電流注入（來自外部電路）

**預防方法：**

預防策略旨在降低寄生 BJT 增益，並在 thyristor 觸發前提供低電阻路徑以消散電荷。

| 方法 | 描述 |
|--------|-------------|
| **Guard rings** | 環繞電晶體的 substrate/well contacts |
| **Butted contacts** | Source 直接連接到 well/substrate |
| **增加 well 間距** | NMOS 和 PMOS 之間更大的距離 |
| **ESD 保護** | I/O pins 上的 clamp 電路 |
| **降低 substrate 電阻** | 重摻雜、更多 substrate contacts |

**設計規則：**

Foundries 提供特定的設計規則以確保 latch-up 免疫力。這些規則是 tape-out 的強制要求，並在 DRC（Design Rule Check）中驗證。

- 電晶體到 well tap 的最大距離
- 最小 guard ring 寬度
- I/O cells 需要強健的 latch-up 保護

**Guard Rings 運作原理：**

Guard rings 是解耦寄生雙極電晶體的擴散區：
- **少數載子 guard rings**：在少數載子到達寄生集極接面前收集它們
- **多數載子 guard rings**：連接到 VDD/VSS 以降低有效的 well/substrate 電阻

關鍵在於 guard rings 作為「集極」，在擴散載子觸發 thyristor 之前攔截它們並分流到電源軌。

**ESD 與 Latch-up 的關係：** ESD 保護單元是常見的 latch-up 觸發源。當 ESD 通過 I/O pad 進入時，保護電路可能將少數載子注入 substrate。ESD 單元周圍的 guard rings 至關重要。

**進階技術：**
- Deep trench isolation 阻擋少數載子擴散
- 重摻雜 substrates 降低寄生 BJT 增益
- SOI（Silicon-On-Insulator）substrates 完全消除 thyristor 結構

### **Antenna 效應**

Antenna 效應發生在製造過程中，當金屬 interconnects 在 plasma etching 期間收集電荷時，可能損壞 gate oxide。

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

### **Flash Memory (NOR vs NAND)**

Flash Memory 是非揮發性記憶體（Non-Volatile Memory），斷電後資料仍會保留。這使它與 SRAM/DRAM 有根本性的差異。Flash Memory 常見於程式儲存（Firmware）、SSD 和 USB 隨身碟。

| Feature | NOR Flash | NAND Flash |
|---------|-----------|------------|
| **讀取速度** | 快（random access）| 較慢（page-based）|
| **寫入速度** | 慢 | 快 |
| **密度** | 較低 | 較高 |
| **成本** | 較高 | 較低 |
| **介面** | 類似 SRAM（可直接定址）| 需要 controller |
| **XIP 支援** | 支援（Execute-In-Place）| 不支援 |
| **典型應用** | Firmware、Bootloader | SSD、SD Card、USB |

**NOR Flash 特點：**
- 支援 byte-level random access
- 可直接執行程式（XIP，Execute-In-Place），無需先載入 RAM
- 常用於儲存 BIOS、Bootloader 等需要直接執行的程式碼
- 讀取快但寫入/抹除慢

**NAND Flash 特點：**
- 以 page（如 4KB）為單位讀寫，以 block（如 128KB）為單位抹除
- 密度高、成本低，適合大容量儲存
- 需要 controller 處理壞塊管理（bad block management）和磨損均衡（wear leveling）
- 用於 SSD、eMMC、UFS 等大容量儲存

**三種記憶體比較（經典面試題）：**

| 特性 | SRAM | DRAM | Flash |
|------|------|------|-------|
| **揮發性** | 揮發（斷電失去資料）| 揮發 | 非揮發 |
| **刷新** | 不需要 | 需要（~64ms）| 不需要 |
| **速度** | 最快 | 中等 | 較慢 |
| **密度** | 最低（6T）| 中等（1T1C）| 最高 |
| **成本** | 最高 | 中等 | 最低 |
| **用途** | CPU Cache | 主記憶體（RAM）| 程式/資料儲存 |

**面試常見追問：**
- 「SRAM 為何不需要 refresh？」— 因為使用 cross-coupled inverters，只要供電就能保持狀態
- 「DRAM 為何需要 refresh？」— 因為電容會漏電，需要定期補充電荷
- 「NOR 和 NAND Flash 的命名由來？」— 來自其 cell 的內部連接方式，NOR 用並聯結構（類似 NOR gate），NAND 用串聯結構（類似 NAND gate）

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

### **流水線技術 (Pipelining)**

> **為何 Pipeline 是經典面試題？** 「如何提高同步電路速度」是數位 IC 設計的經典問題。Pipeline 是最核心的答案之一。面試官常問：「Pipeline 如何提高 throughput？」、「Pipeline 有什麼代價？」、「有幾級 pipeline 最好？」

流水線是將一個長的組合邏輯路徑切分為多個較短的階段，並在各階段之間插入 register。這允許多個操作同時處於不同階段，從而提高 throughput（吞吐量）。

**基本原理：**

```
不使用 Pipeline:
  Tclk ≥ Tcq + Tlogic_total + Tsetup
  Fmax = 1 / Tclk

使用 N 級 Pipeline:
  Tclk ≥ Tcq + (Tlogic_total / N) + Tsetup
  Fmax = N / (Tcq + (Tlogic_total / N) + Tsetup)
```

**Pipeline 的效益與代價：**

| 面向 | 不使用 Pipeline | 使用 N 級 Pipeline |
|------|-----------------|-------------------|
| **Throughput** | 1 / T_total | 1 / T_stage（理想提高 N 倍）|
| **Latency** | T_total | N × T_stage + (N-1) × Tcq（略增）|
| **面積** | 基準 | 增加（多 N-1 組 registers）|
| **功耗** | 基準 | 增加（register 切換功耗）|
| **最高頻率** | 較低 | 較高 |

**範例計算：**

```
假設一個組合邏輯電路延遲為 10ns，Tcq = 0.5ns，Tsetup = 0.5ns

不使用 Pipeline:
  Tclk = 0.5 + 10 + 0.5 = 11ns
  Fmax = 90.9 MHz

使用 4 級 Pipeline:
  Tclk = 0.5 + 2.5 + 0.5 = 3.5ns
  Fmax = 285.7 MHz（約提升 3.1 倍！）

代價：
  - Latency 從 11ns 增加到 4 × 3.5ns = 14ns
  - 需要額外 3 組 pipeline registers
```

**Pipeline 設計的關鍵考量：**

1. **階段平衡**：各階段延遲應盡量相等，最慢的階段決定整體頻率
2. **Hazard 處理**：資料相依性可能導致 pipeline stall 或需要 forwarding
3. **深度選擇**：過深的 pipeline 會增加 latency 和 hazard penalty

**何時使用 Pipeline（面試常問）：**

| 適合使用 | 不適合使用 |
|----------|------------|
| 高 throughput 需求（DSP、圖像處理）| 低 latency 需求（控制邏輯）|
| 組合邏輯路徑過長 | 組合邏輯已足夠短 |
| 可接受 latency 增加 | 單次操作 latency 關鍵 |
| 資料流有規律性 | 資料相依性嚴重 |

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

**🎯 MUX/NAND 建構邏輯閘常見面試追問：**

| 問題 | 答案重點 |
|------|----------|
| **「用 2:1 MUX 實現 AND gate？」** | `Y = B ? A : 0`，B 為 select，A 和 0 為輸入 |
| **「用 2:1 MUX 實現 OR gate？」** | `Y = B ? 1 : A`，B 為 select，1 和 A 為輸入 |
| **「用 2:1 MUX 實現 XOR gate？」** | `Y = B ? ~A : A`，需要 A 的反相（需另一個 MUX 或 inverter） |
| **「為何 NAND 和 NOR 稱為 universal gates？」** | 因為只用 NAND（或只用 NOR）就能實現任何 Boolean function |
| **「用 NAND 實現 NOT？」** | `Y = A NAND A = A'`，兩個輸入接同一訊號 |
| **「用 NAND 實現 AND？」** | 需要 2 個 NAND：`Y = (A NAND B) NAND (A NAND B)` |
| **「用 NAND 實現 OR？」** | `Y = (A NAND A) NAND (B NAND B)` = A' NAND B' = A + B |
| **「為何 FPGA 用 LUT 實現邏輯？」** | N 輸入 LUT 本質上是 2^N:1 MUX + SRAM，可實現任何 N 輸入 Boolean function |

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

#### **AXI-Stream 協議**

AXI-Stream（AXIS）是 AXI 協議家族中最簡單的一個，專門用於高速點對點的串流資料傳輸，不涉及記憶體位址。

**AXI-Stream vs AXI-Full：**

| 面向 | AXI-Full | AXI-Stream |
|------|----------|------------|
| **通道數** | 5 個（AW, W, B, AR, R）| 1 個 |
| **位址** | 需要位址 | 無位址 |
| **方向** | 雙向（讀/寫）| 單向 |
| **拓撲** | Master ↔ Slave | Source → Destination |
| **應用** | 記憶體存取 | 影像處理、DSP、網路封包 |

**核心訊號：**

| 訊號 | 方向 | 說明 |
|------|------|------|
| **TDATA** | Source → Dest | 資料匯流排 |
| **TVALID** | Source → Dest | 資料有效訊號 |
| **TREADY** | Dest → Source | 接收端準備好 |
| **TLAST** | Source → Dest | 封包最後一筆資料 |
| **TKEEP** | Source → Dest | 有效位元組指示（每 byte 1 bit）|
| **TSTRB** | Source → Dest | 資料/位置位元組指示 |
| **TID** | Source → Dest | 資料流識別碼 |
| **TDEST** | Source → Dest | 路由識別碼 |
| **TUSER** | Source → Dest | 使用者自定義訊號 |

**握手機制（與 AXI-Full 相同）：**

```
        TVALID ────►┌─────┐
        TDATA  ────►│     │
                    │ DST │
        TREADY ◄────│     │
                    └─────┘

傳輸條件：TVALID = 1 AND TREADY = 1
```

**三種握手場景：**

```
場景 1：Source 先準備好
CLK:     ─┐  ┌──┐  ┌──┐  ┌──
TVALID:  ────────┐
TDATA:   ────────[D0]────
TREADY:  ────────────┐
                     ↑ 傳輸發生

場景 2：Destination 先準備好
CLK:     ─┐  ┌──┐  ┌──┐  ┌──
TREADY:  ────────┐
TVALID:  ────────────┐
TDATA:   ────────────[D0]
                     ↑ 傳輸發生

場景 3：同時準備好
CLK:     ─┐  ┌──┐  ┌──┐  ┌──
TVALID:  ────────┐
TREADY:  ────────┐
TDATA:   ────────[D0]
                 ↑ 傳輸發生
```

**TLAST 與封包結構：**

```
一個 Packet 包含多個 Transfer：

CLK:     ─┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──
TVALID:  ────┐                       ┌───
TDATA:   ────[D0][D1][D2][D3]────────
TLAST:   ──────────────────┐   ┌─────
                           ↑
                     封包結束
```

**Verilog 範例：AXI-Stream 打拍（Pipeline Register）**

```verilog
// AXI-Stream Pipeline Register（無氣泡傳輸）
module axis_register #(
    parameter DATA_WIDTH = 32
)(
    input  clk, rst_n,
    // Slave interface (input)
    input  [DATA_WIDTH-1:0] s_tdata,
    input  s_tvalid,
    input  s_tlast,
    output s_tready,
    // Master interface (output)
    output reg [DATA_WIDTH-1:0] m_tdata,
    output reg m_tvalid,
    output reg m_tlast,
    input  m_tready
);

// 當下游準備好或輸出無效時，可接收新資料
assign s_tready = m_tready || !m_tvalid;

always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        m_tvalid <= 1'b0;
        m_tdata  <= {DATA_WIDTH{1'b0}};
        m_tlast  <= 1'b0;
    end else if (s_tready) begin
        m_tvalid <= s_tvalid;
        m_tdata  <= s_tdata;
        m_tlast  <= s_tlast;
    end
end

endmodule
```

**反壓（Backpressure）處理：**

```verilog
// 當下游無法接收時，上游必須保持資料
always @(posedge clk) begin
    if (s_tvalid && !s_tready) begin
        // 下游反壓中，保持當前資料
        // 不能丟棄！
    end
end
```

**面試常見問題：**

| 問題 | 答案要點 |
|------|----------|
| **「AXI-Stream 和 AXI-Full 差在哪？」** | AXIS 無位址、單向、適合串流；AXI-Full 有位址、雙向、適合記憶體存取 |
| **「TLAST 的用途？」** | 標示封包邊界，讓下游知道一筆完整資料的結束 |
| **「如何處理反壓？」** | 當 TREADY=0 時必須保持 TDATA 和 TVALID，直到握手完成 |
| **「TKEEP 和 TSTRB 的區別？」** | TKEEP 標示有效位元組，TSTRB 區分資料位元組與位置位元組 |

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

## 📌 面試前最後提醒

> **讀完這份筆記後，你已經掌握了數位 IC 設計面試的核心知識。以下是面試當天的關鍵提醒。**

### ✅ 面試前一天 Checklist

- [ ] 複習「核心概念速查表」（STA、CDC、低功耗、Verilog）
- [ ] 確認能手寫：2-FF Synchronizer、Divide-by-3、Dual-edge detector
- [ ] 複習 Setup/Hold 公式，確認 Hold 與 clock period 無關
- [ ] 準備「為何選擇數位 IC 設計」的回答
- [ ] 查詢該公司的主要產品線和技術方向

### 🎯 面試中的關鍵技巧

**回答問題的黃金框架：**
1. **What**：一句話定義（展示你知道這是什麼）
2. **Why**：為何重要（展示你理解背後的動機）
3. **How**：如何解決/實現（展示你有實作能力）
4. **Trade-off**：提及權衡考量（展示你有深度思考）

**範例：** 當被問到「什麼是 Clock Gating？」

> ❌ 差的回答：「Clock gating 就是用 gate 控制 clock。」
>
> ✅ 好的回答：「Clock gating 是一種低功耗技術（What），透過在非活動模組關閉 clock 來降低動態功耗（Why）。實作上通常用 latch-based ICG cell 而非簡單的 AND gate，因為 AND gate 在 enable 變化時可能產生 glitch（How）。權衡是會增加少量面積和 clock tree 複雜度，但通常能節省 30-50% 的動態功耗（Trade-off）。」

### ⚠️ 常見扣分行為

| 行為 | 為何扣分 | 正確做法 |
|------|----------|----------|
| **回答「不知道」就結束** | 顯示缺乏思考能力 | 說出你知道的相關知識，展示推理過程 |
| **只背誦定義** | 顯示缺乏理解 | 連結到實際應用場景 |
| **忽略追問** | 錯失展示深度的機會 | 追問是加分機會，要認真回答 |
| **手寫程式太慢** | 顯示不夠熟練 | 事前多練習，記住 template |
| **Setup/Hold 混淆** | 這是基礎中的基礎 | 確保公式和概念完全清楚 |

### 🏆 加分技巧

- **主動提及 trade-offs**：每個設計決策都有權衡，展示你理解這點
- **連結到實際經驗**：提及你做過的專案如何應用這些概念
- **問好問題**：面試最後問關於技術方向、團隊文化的問題
- **展示學習能力**：若不會，說明你會如何去學習

### 📝 必背公式速記

```
Setup Slack = Required Time - Arrival Time  (正 = PASS)
Hold Slack  = Arrival Time - Required Time  (正 = PASS)

Dynamic Power: P = α × C × V² × f
Gray Code: gray = bin ^ (bin >> 1)

FIFO Depth ≥ Burst × (1 - f_rd/f_wr)
MTBF = e^(Tr/τ) / (T0 × Fclk × Fdata)
```

**祝面試順利！🎉**

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
