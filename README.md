<div align="center">

<img src="docs/img/logo.svg" width="72" alt="Canify logo" />

# Canify

**现代、轻量的 CAN / CANopen 上位机**

[中文](README.md) | [English](README.en.md)

[![Release](https://img.shields.io/github/v/release/vaxowt/canify?label=%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC)](https://github.com/vaxowt/canify/releases/latest)
[![Windows](https://img.shields.io/badge/Windows-10%2F11%20x64-0078D4?logo=windows11&logoColor=white)](https://github.com/vaxowt/canify/releases/latest)
[![Linux](https://img.shields.io/badge/Linux-x86__64-FCC624?logo=linux&logoColor=black)](https://github.com/vaxowt/canify/releases/latest)
[![License](https://img.shields.io/badge/License-Freeware-red)](LICENSE)
[![官网](https://img.shields.io/badge/%E5%AE%98%E7%BD%91-vaxowt.github.io%2Fcanify-4F8CFF)](https://vaxowt.github.io/canify/)

</div>

---

Canify 是一款运行在桌面端的 CAN 总线分析仪：连接一块十几块钱的 SLCAN 适配器，即可完成总线监控、DBC 信号解码、实时绘图、报文发送与 CANopen 节点调试。安装即用，无需运行环境，所有数据只留在本机。

![Canify 主界面](docs/img/hero-dark.png)

## ✨ 功能特性

### 连接与帧表

- **SLCAN 串口驱动**：支持 CANable（SLCAN 固件）、MKS CANable、cantact、Arduino CAN 扩展板等常见廉价适配器，码率 10 kbps – 1 Mbps；内置**虚拟总线**（回环），没有硬件也能完整体验
- **聚合 / 逐帧双模式帧表**：按 ID 聚合（计数、帧率、最近时间、新帧闪烁）或逐帧滚动追踪，虚拟滚动应对高负载总线不卡顿
- **实时过滤器**：ID 列表 / 区间（十六进制）、数据字节条件，多条件 AND / OR 组合
- **一键导出 CSV**，帧表可随时暂停 / 继续，缓冲上限可配置

### 发送与序列

- **多帧发送列表**：ID / 扩展帧 / DLC / 数据 / 周期逐行配置，单发或周期发送，断连自动全停
- **序列录制与回放**：录制应用内发出的**所有**帧（含 CANopen 面板的 SDO / NMT 操作），按帧间隔原样回放；支持拖动发送指针、批量编辑间隔与 ID、保存 / 加载序列文件

### DBC 与实时绘图

- **DBC 信号解码**：导入 `.dbc` 后帧表内直接展开物理值信号（含单位、值表），原始值 / 物理值对照
- **信号绘图**：勾选 DBC 信号即加入绘图，每个绘图最多 8 条曲线、可开多个绘图面板；LTTB 降采样 + 限频渲染，高负载下依旧流畅
- **十字测量**：框选缩放、双击恢复滚动，测量模式下双十字线读数并显示 Δt / Δv，可吸附到曲线样本

### CANopen 一站式调试

- **被动解码**：节点表（NMT 状态、心跳间隔）、SDO 事务日志（请求 / 响应自动配对，ABORT 原因解析）、EMCY 急停解码
- **主动操作**：SDO 读写（含分段传输）、NMT 主站控制（Start / Stop / PreOp / Reset）
- **EDS 对象字典**：导入 `.eds` 后浏览对象字典、单点读写、一键读取全部标准对象
- **PDO 配置编辑器**：可视化编辑 RPDO / TPDO 映射与通信参数，按规范流程（禁用 → 写映射 → 写通信参数 → 重新启用）一键下发，支持读回
- **CiA 402 伺服控制**：状态机可视化（状态字 / 控制字逐位解读）、Shutdown / Switch On / Enable Operation 等快捷指令、PP / PV 等运行模式与运动参数下发，首次使能带安全确认

### 界面与体验

- **可停靠布局**：显示区与控制区均可自由分屏、重组，布局自动记忆
- **深色 / 浅色主题**，**中文 / English 界面**一键切换
- **轻量原生**：Tauri 2 + Rust 构建，安装包小、启动快，无运行时依赖

## 📦 下载安装

前往 [**Releases**](https://github.com/vaxowt/canify/releases/latest) 下载对应平台的安装包：

| 平台 | 文件 | 说明 |
|---|---|---|
| Windows 10/11 x64 | `canify_<版本>_x64-setup.exe` | 安装版 |
| Windows 10/11 x64 | `canify_<版本>_x64-portable.zip` | 免安装绿色版 |
| Debian / Ubuntu | `canify_<版本>_amd64.deb` | `sudo dpkg -i canify_*.deb` |
| Fedora / RHEL | `canify-<版本>-1.x86_64.rpm` | `sudo rpm -i canify-*.rpm` |
| 通用 Linux | `canify_<版本>_amd64.AppImage` | 直接运行，无需 FUSE2 |

> Windows 版依赖 WebView2 运行时（Win10/11 一般自带）；缺失时安装器会引导联网安装。
>
> 版本号由源码仓库的 git tag 自动生成（如 `0.2.0`），「设置 → 关于」页可查看当前版本。

## 🚀 快速上手

1. **连接设备**：在「连接」面板选择 `SLCAN (serial)`，选中串口与码率（如 500 kbps），点击「连接」。没有硬件？选择 `Virtual Bus` 虚拟总线即可体验全部界面功能。
2. **导入 DBC**：在「DBC」面板导入 `.dbc` 文件，帧表中即可展开解码信号，勾选信号并点击「添加到绘图」开始实时绘图。
3. **调试 CANopen**：在「CANopen」面板观察节点与 SDO 日志；导入 `.eds` 后可浏览对象字典、配置 PDO、控制 CiA 402 伺服。

> **Linux 串口权限**：将用户加入 `dialout` 组（Debian/Ubuntu）或 `uucp` 组（Arch）后重新登录：
>
> ```bash
> sudo usermod -aG dialout $USER   # Debian / Ubuntu
> sudo usermod -aG uucp $USER      # Arch
> ```

## 🔌 支持的硬件

| 适配器 | 接口 | 备注 |
|---|---|---|
| CANable / MKS CANable / cantact（SLCAN 固件） | 串口 | 推荐，十余元即可入手 |
| Arduino + CAN 扩展板（SLCAN 固件） | 串口 | MCP2515 / MCP2518 方案 |
| 任何实现 slcan 协议的串口设备 | 串口 | Linux `/dev/ttyUSB*`、Windows COM 口 |
| 虚拟总线 | 内置 | 回环模式，开发与演示用 |

> SocketCAN（Linux `can0`）已在规划中，详见[路线图](#-路线图)。

## 🖼 更多截图

<details>
<summary><b>点击展开</b></summary>

| | |
|---|---|
| ![实时绘图与十字测量](docs/img/plot-measure.png) | ![CANopen 节点监控](docs/img/canopen-nodes.png) |
| **实时绘图与十字测量** | **CANopen 节点监控** |
| ![CiA 402 伺服控制](docs/img/canopen-402.png) | ![对象字典浏览器](docs/img/canopen-od.png) |
| **CiA 402 伺服控制** | **对象字典浏览器** |
| ![PDO 配置编辑器](docs/img/canopen-pdo.png) | ![多帧发送](docs/img/send-panel.png) |
| **PDO 配置编辑器** | **多帧发送** |
| ![序列录制与回放](docs/img/sequence-replay.png) | ![浅色主题](docs/img/hero-light.png) |
| **序列录制与回放** | **浅色主题** |

</details>

## 🗺 路线图

- [ ] SocketCAN 驱动（Linux 原生 `can0` 接口）
- [ ] CAN FD（帧模型已预留）
- [ ] 更多日志格式（Vector .asc、PCAP、candump）
- [ ] 多通道同时连接
- [ ] macOS 版本

## ❓ FAQ

**Canify 收费吗？**
免费使用，无需注册、无功能限制。

**支持 CAN FD 吗？**
暂不支持经典 CAN FD 帧的收发，已在路线图中。当前帧数据模型为 CAN FD 预留了载荷长度。

**支持 macOS 吗？**
暂未提供 macOS 安装包，已在路线图中。

**我的数据会上传吗？**
不会。Canify 完全本地运行，无云端、无遥测、无任何外联请求。

**Linux 下打开串口提示权限不足？**
参见[快速上手](#-快速上手)中的串口权限说明。

**开放源代码吗？**
Canify 是免费但闭源的软件，以二进制安装包形式发布。欢迎通过 [Issues](https://github.com/vaxowt/canify/issues) 反馈问题与功能建议。

## 🔒 隐私与安全

Canify 不包含任何数据收集、崩溃上报或统计组件；除用户主动保存 / 导出文件外，不产生任何网络或外部连接。所有总线数据仅存在于本机内存中。

## 📄 许可证

Canify 为专有免费软件（Freeware），使用与再分发条款见 [LICENSE](LICENSE)。

Canify 构建于众多优秀的开源项目之上，感谢：

[Tauri](https://tauri.app/) · [Vue 3](https://vuejs.org/) · [Pinia](https://pinia.vuejs.org/) · [uPlot](https://github.com/leeoniya/uPlot) · [dockview](https://dockview.dev/) · [can-dbc](https://github.com/oxibus/can-dbc) · [serialport-rs](https://github.com/serialport/serialport-rs)
