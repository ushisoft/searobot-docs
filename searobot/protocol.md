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

### 急停设置(ID=0x03)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x03） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0：取消急停<br>1：急停 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 取消急停：`ED DE 00 00 03 0C 00 00 DA 01 BD BC`
- 急停：`ED DE 00 00 03 0C 01 00 DB 01 BD BC`

### 清除故障(ID=0x05)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x05） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | Bit0:清除驱动器故障（1：生效）<br>Bit1:清除前防撞杆故障（1：生效）<br>Bit2:清除防后撞杆故障（1：生效） |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 清除驱动器故障：`ED DE 00 00 05 0C 01 00 DD 01 BD BC`
- 清除前防撞杆故障：`ED DE 00 00 05 0C 02 00 DD 01 BD BC`
- 清除防后撞杆故障：`ED DE 00 00 05 0C 04 00 DD 01 BD BC`

### 回冲设置(ID=0x06)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x06） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 1：开启；0：关闭 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 开启回冲：`ED DE 00 00 06 0C 01 00 DE 01 BD BC`
- 关闭回冲：`ED DE 00 00 06 0C 00 00 DD 01 BD BC`

### 读取程序版本的信息(ID=0x07)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x07） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 读取：`ED DE 00 00 07 0C 00 00 DE 01 BD BC`（反馈ID:0X87）

### 查看硬件版本信息(ID=0x08)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x08） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0x0000 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 08 0C 00 00 DF 01 BD BC`（反馈ID:0X88）

### 查看底盘信息(ID=0x09)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x09） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0x0000 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 09 0C 00 00 E0 01 BD BC`（反馈ID:0X89）

### 查看出货日期信息(ID=0x0A)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x0A） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0x0000 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 0A 0C 00 00 E1 01 BD BC`（反馈ID:0X8A）

### 读取驱动器的状态(ID=0xB0)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0xB0） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 1：读取 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 读取：`ED DE 00 00 B0 0C 01 00 88 02 BD BC`

### 开启/关闭驱动器电流、电压上传(ID=0xB1)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0xB1） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0:关闭上传(20Hz)<br>1:开启上传(20Hz) |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 开启：`ED DE 00 00 B1 0C 01 00 89 02 BD BC`
- 关闭：`ED DE 00 00 B1 0C 00 00 88 02 BD BC`

## 底盘数据上传

### 底盘50hz数据回传，线速和轮速模式(ID=0x81)

底盘启动后会自动上传该帧，可使用【20ms 底盘数据上传】关闭上传。

<table border="0" cellpadding="4">
  <tr>
    <th>内容</th>
    <th>字节长度</th>
    <th colspan="3">备注</th>
  </tr>
  <tr>
    <td>FRAME-HEAD</td>
    <td>2(uint16)</td>
    <td colspan="3">帧头（0xDEED）</td>
  </tr>
  <tr>
    <td>FRAME-NUMS</td>
    <td>2(uint16)</td>
    <td colspan="3">帧序号（递增，可用来记录发送的次数）</td>
  </tr>
  <tr>
    <td>FRAME-ID</td>
    <td>1(uint8)</td>
    <td colspan="3">帧ID（0x81）</td>
  </tr>
  <tr>
    <td>FRAME-LEN</td>
    <td>1(uint8)</td>
    <td colspan="3">帧长度</td>
  </tr>
  <tr>
    <td>Data0</td>
    <td>2(uint16)</td>
    <td colspan="3">电压：单位0.1V</td>
  </tr>
  <tr>
    <td rowspan="16">Data1</td>
    <td rowspan="16">2(uint16)</td>
    <td colspan="3">底盘状态</td>
  </tr>
  <tr>
    <td>Bit0</td>
    <td colspan="2">硬件急停（1表示急停）</td>
  </tr>
  <tr>
    <td>Bit1</td>
    <td colspan="2">遥控急停（1表示急停）</td>
  </tr>
  <tr>
    <td>Bit2</td>
    <td colspan="2">软件急停（1表示急停）</td>
  </tr>
  <tr>
    <td>Bit3</td>
    <td colspan="2">遥控掉线（1表示掉线）</td>
  </tr>
  <tr>
    <td>Bit4</td>
    <td colspan="2">前驱动器掉线（1表示掉线）</td>
  </tr>
  <tr>
    <td>Bit5</td>
    <td colspan="2">后驱动器掉线（1表示掉线）</td>
  </tr>
  <tr>
    <td>Bit6</td>
    <td colspan="2">前左驱动器错误（1表示错误）</td>
  </tr>
  <tr>
    <td>Bit7</td>
    <td colspan="2">前右驱动器错误（1表示错误）</td>
  </tr>
  <tr>
    <td>Bit8</td>
    <td colspan="2">后左驱动器错误（1表示错误）</td>
  </tr>
  <tr>
    <td>Bit9</td>
    <td colspan="2">后右驱动器错误（1表示错误）</td>
  </tr>
  <tr>
    <td>Bit10</td>
    <td colspan="2">前防撞杆（1表示触发）</td>
  </tr>
  <tr>
    <td>Bit11</td>
    <td colspan="2">后防撞杆（1表示触发）</td>
  </tr>
  <tr>
    <td>Bit12</td>
    <td colspan="2">回冲设置（1表示开启）</td>
  </tr>
  <tr>
    <td>Bit13-14</td>
    <td colspan="2">保留</td>
  </tr>
  <tr>
    <td>Bit15</td>
    <td colspan="2">保留</td>
  </tr>
  <tr>
    <td>Data2</td>
    <td>2(uint16)</td>
    <td colspan="3">回冲状态（数值）<br>0：寻找中心<br>1：已找到中心<br>2：信号丢失<br>3：铜片接触<br>4：对接成功<br>5：对接错误<br>6：寻充超时<br>7：退出充电状态</td>
  </tr>
  <tr>
    <td>Data3</td>
    <td>2(int16)</td>
    <td colspan="3">Vx:线速度，单位：mm/s</td>
  </tr>
  <tr>
    <td>Data4</td>
    <td>2(int16)</td>
    <td colspan="3">Vz:角速度，单位：0.001rad/s</td>
  </tr>
  <tr>
    <td>Data5</td>
    <td>2(int16)</td>
    <td colspan="3">前左轮速度，单位：mm/s</td>
  </tr>
  <tr>
    <td>Data6</td>
    <td>2(int16)</td>
    <td colspan="3">前右轮速度，单位：mm/s</td>
  </tr>
  <tr>
    <td>Data7</td>
    <td>2(int16)</td>
    <td colspan="3">后左轮速度，单位：mm/s</td>
  </tr>
  <tr>
    <td>Data8</td>
    <td>2(int16)</td>
    <td colspan="3">后右轮速度，单位：mm/s</td>
  </tr>
  <tr>
    <td>Check</td>
    <td>2(uint16)</td>
    <td colspan="3">校验（从Head到Data的和）</td>
  </tr>
  <tr>
    <td>FRAME-END</td>
    <td>2(uint16)</td>
    <td colspan="3">帧尾(0xBCBD)</td>
  </tr>
</table>

### 驱动器信息上传(ID=0xB0)

<table border="0" cellpadding="4">
  <tr>
    <th>内容</th>
    <th>字节长度</th>
    <th colspan="3">备注</th>
  </tr>
  <tr>
    <td>FRAME-HEAD</td>
    <td>2(uint16)</td>
    <td colspan="3">帧头（0xDEED）</td>
  </tr>
  <tr>
    <td>FRAME-NUMS</td>
    <td>2(uint16)</td>
    <td colspan="3">帧序号（递增，可用来记录发送的次数）</td>
  </tr>
  <tr>
    <td>FRAME-ID</td>
    <td>1(uint8)</td>
    <td colspan="3">帧ID（0xB0）</td>
  </tr>
  <tr>
    <td>FRAME-LEN</td>
    <td>1(uint8)</td>
    <td colspan="3">帧长度</td>
  </tr>
  <tr>
    <td rowspan="16">Data0</td>
    <td rowspan="16">2(uint16)</td>
    <td colspan="3">驱动器（前左）错误状态</td>
  </tr>
  <tr>
    <td>Bit0</td>
    <td colspan="2">电池欠压</td>
  </tr>
  <tr>
    <td>Bit1</td>
    <td colspan="2">位置异常</td>
  </tr>
  <tr>
    <td>Bit2</td>
    <td colspan="2">霍尔错误</td>
  </tr>
  <tr>
    <td>Bit3</td>
    <td colspan="2">过流</td>
  </tr>
  <tr>
    <td>Bit4</td>
    <td colspan="2">超载</td>
  </tr>
  <tr>
    <td>Bit5</td>
    <td colspan="2">EEPROM故障</td>
  </tr>
  <tr>
    <td>Bit6</td>
    <td colspan="2">IGBT故障</td>
  </tr>
  <tr>
    <td>Bit7</td>
    <td colspan="2">驱动器过热</td>
  </tr>
  <tr>
    <td>Bit8</td>
    <td colspan="2">电机缺陷</td>
  </tr>
  <tr>
    <td>Bit9</td>
    <td colspan="2">电源超差</td>
  </tr>
  <tr>
    <td>Bit10</td>
    <td colspan="2">速度超差</td>
  </tr>
  <tr>
    <td>Bit11</td>
    <td colspan="2">电机过热</td>
  </tr>
  <tr>
    <td>Bit12</td>
    <td colspan="2">电源过压</td>
  </tr>
  <tr>
    <td>Bit13</td>
    <td colspan="2">飞车故障</td>
  </tr>
  <tr>
    <td>Bit14</td>
    <td colspan="2">驱动器过热</td>
  </tr>
  <tr>
    <td>Data1</td>
    <td>2(uint16)</td>
    <td colspan="3">驱动器（前右）错误状态<br>内容同【Data0 驱动器（前左）错误状态】一样</td>
  </tr>
  <tr>
    <td>Data2</td>
    <td>2(uint16)</td>
    <td colspan="3">驱动器（后左）错误状态<br>内容同【Data0 驱动器（前左）错误状态】一样</td>
  </tr>
  <tr>
    <td>Data3</td>
    <td>2(uint16)</td>
    <td colspan="3">驱动器（后右）错误状态<br>内容同【Data0 驱动器（前左）错误状态】一样</td>
  </tr>
  <tr>
    <td rowspan="14">Data4</td>
    <td rowspan="14">2(uint16)</td>
    <td colspan="3">电机状态（前左）</td>
  </tr>
  <tr>
    <td>Bit0</td>
    <td colspan="2">伺服启动</td>
  </tr>
  <tr>
    <td>Bit1</td>
    <td colspan="2">伺服运行</td>
  </tr>
  <tr>
    <td>Bit2</td>
    <td colspan="2">零速运行</td>
  </tr>
  <tr>
    <td>Bit3</td>
    <td colspan="2">目标速度到达</td>
  </tr>
  <tr>
    <td>Bit4</td>
    <td colspan="2">目标位置到达</td>
  </tr>
  <tr>
    <td>Bit5</td>
    <td colspan="2">转矩限制中</td>
  </tr>
  <tr>
    <td>Bit6</td>
    <td colspan="2">警告</td>
  </tr>
  <tr>
    <td>Bit7</td>
    <td colspan="2">制动输出</td>
  </tr>
  <tr>
    <td>Bit8</td>
    <td colspan="2">原点恢复完成</td>
  </tr>
  <tr>
    <td>Bit9</td>
    <td colspan="2">超过载门槛</td>
  </tr>
  <tr>
    <td>Bit10</td>
    <td colspan="2">错误警告</td>
  </tr>
  <tr>
    <td>Bit11</td>
    <td colspan="2">命令完成</td>
  </tr>
  <tr>
    <td>Bit12</td>
    <td colspan="2">反向堵转</td>
  </tr>
  <tr>
    <td>Data5</td>
    <td>2(uint16)</td>
    <td colspan="3">电机状态（前右）<br>内容同【Data4 电机状态（前左）】一样</td>
  </tr>
  <tr>
    <td>Data6</td>
    <td>2(uint16)</td>
    <td colspan="3">电机状态（后左）<br>内容同【Data4 电机状态（前左）】一样</td>
  </tr>
  <tr>
    <td>Data7</td>
    <td>2(uint16)</td>
    <td colspan="3">电机状态（后右）<br>内容同【Data4 电机状态（前左）】一样</td>
  </tr>
  <tr>
    <td>Data8</td>
    <td>2(int16)</td>
    <td colspan="3">电流（前左）（单位：0.1A）</td>
  </tr>
  <tr>
    <td>Data9</td>
    <td>2(int16)</td>
    <td colspan="3">电流（前右）（单位：0.1A）</td>
  </tr>
  <tr>
    <td>Data10</td>
    <td>2(int16)</td>
    <td colspan="3">电流（后左）（单位：0.1A）</td>
  </tr>
  <tr>
    <td>Data11</td>
    <td>2(int16)</td>
    <td colspan="3">电流（后右）（单位：0.1A）</td>
  </tr>
  <tr>
    <td>Data12</td>
    <td>2(uint16)</td>
    <td colspan="3">最大电流值（前左）（单位：0.1A，只取正值）</td>
  </tr>
  <tr>
    <td>Data13</td>
    <td>2(uint16)</td>
    <td colspan="3">最大电流值（前右）（单位：0.1A，只取正值）</td>
  </tr>
  <tr>
    <td>Data14</td>
    <td>2(uint16)</td>
    <td colspan="3">最大电流值（后左）（单位：0.1A，只取正值）</td>
  </tr>
  <tr>
    <td>Data15</td>
    <td>2(uint16)</td>
    <td colspan="3">最大电流值（后右）（单位：0.1A，只取正值）</td>
  </tr>
  <tr>
    <td>Data16</td>
    <td>2(uint16)</td>
    <td colspan="3">温度（前）（单位：0.1摄氏度）</td>
  </tr>
  <tr>
    <td>Data17</td>
    <td>2(uint16)</td>
    <td colspan="3">温度（后）（单位：0.1摄氏度）</td>
  </tr>
  <tr>
    <td>Data18</td>
    <td>2(uint16)</td>
    <td colspan="3">驱动器电压（前）（单位：0.1V）</td>
  </tr>
  <tr>
    <td>Data19</td>
    <td>2(uint16)</td>
    <td colspan="3">驱动器电压（后）（单位：0.1V）</td>
  </tr>
  <tr>
    <td>Check</td>
    <td>2(uint16)</td>
    <td colspan="3">校验（从Head到Data的和）</td>
  </tr>
  <tr>
    <td>FRAME-END</td>
    <td>2(uint16)</td>
    <td colspan="3">帧尾(0xBCBD)</td>
  </tr>
</table>

### 驱动器电流、电压信息上传(ID=0xB1)

该帧可以开启自动上传，使用【读取驱动器的信息（驱动器电流、电压）(ID=0xB1)】开启关闭上传。

<table border="0" cellpadding="4">
  <tr>
    <td>FRAME-HEAD</td>
    <td>2(uint16)</td>
    <td>帧头（0xDEED）</td>
  </tr>
  <tr>
    <td>FRAME-NUMS</td>
    <td>2(uint16)</td>
    <td>帧序号（递增，可用来记录发送的次数）</td>
  </tr>
  <tr>
    <td>FRAME-ID</td>
    <td>1(uint8)</td>
    <td>帧ID（0xB1）</td>
  </tr>
  <tr>
    <td>FRAME-LEN</td>
    <td>1(uint8)</td>
    <td>帧长度</td>
  </tr>
  <tr>
    <td>Data0</td>
    <td>2(int16)</td>
    <td>电流（前左）（单位：0.1A）</td>
  </tr>
  <tr>
    <td>Data1</td>
    <td>2(int16)</td>
    <td>电流（前右）（单位：0.1A）</td>
  </tr>
  <tr>
    <td>Data2</td>
    <td>2(int16)</td>
    <td>电流（后左）（单位：0.1A）</td>
  </tr>
  <tr>
    <td>Data3</td>
    <td>2(int16)</td>
    <td>电流（后右）（单位：0.1A）</td>
  </tr>
  <tr>
    <td>Data4</td>
    <td>2(uint16)</td>
    <td>驱动器电压（前）（单位：0.1V）</td>
  </tr>
  <tr>
    <td>Data5</td>
    <td>2(uint16)</td>
    <td>驱动器电压（后）（单位：0.1V）</td>
  </tr>
  <tr>
    <td>Check</td>
    <td>2(uint16)</td>
    <td>校验（从Head到Data的和）</td>
  </tr>
  <tr>
    <td>FRAME-END</td>
    <td>2(uint16)</td>
    <td>帧尾(0xBCBD)</td>
  </tr>
</table>

### 程序版本信息上传(ID=0X87)

<table border="0" cellpadding="4">
  <tr>
    <th>内容</th>
    <th>字节长度</th>
    <th>备注</th>
  </tr>
  <tr>
    <td>FRAME-HEAD</td>
    <td>2(uint16)</td>
    <td>帧头（0xDEED）</td>
  </tr>
  <tr>
    <td>FRAME-NUMS</td>
    <td>2(uint16)</td>
    <td>帧序号（递增，可用来记录发送的次数）</td>
  </tr>
  <tr>
    <td>FRAME-ID</td>
    <td>1(uint8)</td>
    <td>帧ID（0x87）</td>
  </tr>
  <tr>
    <td>FRAME-LEN</td>
    <td>1(uint8)</td>
    <td>帧长度</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>2(uint16)</td>
    <td>值</td>
  </tr>
  <tr>
    <td>Check</td>
    <td>2(uint16)</td>
    <td>校验（从Head到Data的和）</td>
  </tr>
  <tr>
    <td>FRAME-END</td>
    <td>2(uint16)</td>
    <td>帧尾(0xBCBD)</td>
  </tr>
</table>

### 硬件版本信息上传(ID=0x88)

<table border="0" cellpadding="4">
  <tr>
    <th>内容</th>
    <th>字节长度</th>
    <th>备注</th>
  </tr>
  <tr>
    <td>FRAME-HEAD</td>
    <td>2(uint16)</td>
    <td>帧头（0xDEED）</td>
  </tr>
  <tr>
    <td>FRAME-NUMS</td>
    <td>2(uint16)</td>
    <td>帧序号（递增，可用来记录发送的次数）</td>
  </tr>
  <tr>
    <td>FRAME-ID</td>
    <td>1(uint8)</td>
    <td>帧ID（0x88）</td>
  </tr>
  <tr>
    <td>FRAME-LEN</td>
    <td>1(uint8)</td>
    <td>帧长度</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>N</td>
    <td>接收到16进制需要转化成ASCII码对应的字母</td>
  </tr>
  <tr>
    <td>Check</td>
    <td>2(uint16)</td>
    <td>校验（从Head到Data的和）</td>
  </tr>
  <tr>
    <td>FRAME-END</td>
    <td>2(uint16)</td>
    <td>帧尾(0xBCBD)</td>
  </tr>
</table>

示例：
- `ED DE 00 00 88 22 5A 48 57 4C 2D 62 72 75 73 68 2D 6D 6F 74 6F 72 2D 63 68 61 73 73 69 73 83 0B BD BC`（对应的ASCII码：ZKWL-brush-motor-chassis）

### 底盘信息上传(ID=0X89)

<table border="0" cellpadding="4">
  <tr>
    <th>内容</th>
    <th>字节长度</th>
    <th>备注</th>
  </tr>
  <tr>
    <td>FRAME-HEAD</td>
    <td>2(uint16)</td>
    <td>帧头（0xDEED）</td>
  </tr>
  <tr>
    <td>FRAME-NUMS</td>
    <td>2(uint16)</td>
    <td>帧序号（递增，可用来记录发送的次数）</td>
  </tr>
  <tr>
    <td>FRAME-ID</td>
    <td>1(uint8)</td>
    <td>帧ID（0x89）</td>
  </tr>
  <tr>
    <td>FRAME-LEN</td>
    <td>1(uint8)</td>
    <td>帧长度</td>
  </tr>
  <tr>
    <td>Data0</td>
    <td>2(uint16)</td>
    <td>轮距</td>
  </tr>
  <tr>
    <td>Data1</td>
    <td>2(uint16)</td>
    <td>轴距</td>
  </tr>
  <tr>
    <td>Data2</td>
    <td>2(uint16)</td>
    <td>轮径</td>
  </tr>
  <tr>
    <td>Data3</td>
    <td>2(uint16)</td>
    <td>减速比</td>
  </tr>
  <tr>
    <td>Data4</td>
    <td>2(uint16)</td>
    <td>编码器线数</td>
  </tr>
  <tr>
    <td>Check</td>
    <td>2(uint16)</td>
    <td>校验（从Head到Data的和）</td>
  </tr>
  <tr>
    <td>FRAME-END</td>
    <td>2(uint16)</td>
    <td>帧尾(0xBCBD)</td>
  </tr>
</table>

示例：
- `ED DE 00 00 89 12 D5 02 F4 01 AA 00 1E 00 E8 03 E5 05 BD BC`; D5 02：轮距725 F4 01：轴距500 AA 00：轮径170 1E 00：减速比30 E8 03：编码器线数1000

### 出货日期信息上传(ID=0X8A)

<table border="0" cellpadding="4">
  <tr>
    <th>内容</th>
    <th>字节长度</th>
    <th>备注</th>
  </tr>
  <tr>
    <td>FRAME-HEAD</td>
    <td>2(uint16)</td>
    <td>帧头（0xDEED）</td>
  </tr>
  <tr>
    <td>FRAME-NUMS</td>
    <td>2(uint16)</td>
    <td>帧序号（递增，可用来记录发送的次数）</td>
  </tr>
  <tr>
    <td>FRAME-ID</td>
    <td>1(uint8)</td>
    <td>帧ID（0x8A）</td>
  </tr>
  <tr>
    <td>FRAME-LEN</td>
    <td>1(uint8)</td>
    <td>帧长度</td>
  </tr>
  <tr>
    <td>Data0</td>
    <td>1(uint8)</td>
    <td>年</td>
  </tr>
  <tr>
    <td>Data1</td>
    <td>1(uint8)</td>
    <td>月</td>
  </tr>
  <tr>
    <td>Data2</td>
    <td>1(uint8)</td>
    <td>日</td>
  </tr>
  <tr>
    <td>Check</td>
    <td>2(uint16)</td>
    <td>校验（从Head到Data的和）</td>
  </tr>
  <tr>
    <td>FRAME-END</td>
    <td>2(uint16)</td>
    <td>帧尾(0xBCBD)</td>
  </tr>
</table>

示例：
- `ED DE 00 00 8A 0D 18 01 02 7D 02 BD BC`; 24年1月2日


