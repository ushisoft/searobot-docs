# 通讯协议（串口）

::: info 版本信息
协议版本：1.0.3.241127
:::

## 通讯参数

| 参数 | 值 |
|------|-----|
| 波特率 | 115200 |
| 数据位 | 8 |
| 校验位 | None |
| 停止位 | 1 |

## 上位机下发指令

::: tip 使用说明
- 当遥控器未开启时，可直接由上位机通讯控制
- 在遥控器模式下需要将SWB开关拨到中间档位
:::

### 20ms 底盘数据上传(ID=0x01)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x01） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0：关闭20ms数据上传<br>1：开启20ms数据反馈 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 关闭20ms数据上传：`ED DE 01 00 01 0C 00 00 D9 01 BD BC`
- 开启20ms数据反馈：`ED DE 01 00 01 0C 01 00 DA 01 BD BC`
- 命令返回：0x81

### 底盘数据指令控制、线速模式(ID=0x02)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x02） |
| FRAME-LEN | 1(uint8) | 帧长度（0x12） |
| Data0 | 2(uint16) | 0x0000（线速模式） |
| Data1 | 2(int16) | Vx (x轴速度) 单位：mm/s |
| Data2 | 4(float) | Vz (z轴速度) 单位：rad/s |
| Data3 | - | - |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- Vx=200, Vz=0：`ED DE 00 00 02 12 00 00 C8 00 00 00 00 00 A7 02 BD BC`

### 底盘数据指令控制、轮速度模式(ID=0x02)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x02） |
| FRAME-LEN | 1(uint8) | 帧长度（0x12） |
| Data0 | 2(uint16) | 0x0001（轮速模式） |
| Data1 | 2(int16) | 左侧速度单位：mm/s(前左轮和后左轮速度一致) |
| Data2 | 2(int16) | 右侧速度单位：mm/s(前右轮和后右轮速度一致) |
| Data3 | 2(uint16) | 保留 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- Lsp=200, Rsp=193：`ED DE 00 00 02 12 01 00 C8 00 C1 00 00 00 69 03 BD BC` 