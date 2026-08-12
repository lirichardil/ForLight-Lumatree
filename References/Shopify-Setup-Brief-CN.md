# Lumatree × Shopify 后台配置说明书

交付给 Shopify 实施方。**本阶段不需要访问网站源代码。**

---

## 1. 这个项目是什么

Lumatree 是一个木质线性 LED 灯具品牌：**一根共用灯条（Kanon），六种安装方式**。

网站已经建好并在运行，是一个 **Next.js 应用**，包含滚动驱动的固定舞台动画和逐帧序列。这部分不会迁移到 Shopify。

架构是 **headless（无头）**：

```
用户看到的域名     lumatree.com            → Next.js 前端（Vercel 等）
                        ↓ Storefront API (GraphQL)
商品 / 库存 / 价格  Shopify 后台            ← 本文档的范围
                        ↓ 点击结账时跳转
结账 / 支付 / 税费  checkout.lumatree.com   → Shopify 托管结账
```

**请注意：Next.js 前端无法托管在 Shopify 上。** 不要按 Liquid 主题或 Hydrogen 的思路规划——前端已经存在，只需要 Shopify 作为商品与订单后端。

前端读取数据的代码已经写完（`src/lib/sources/shopify.ts`）。它对后台的结构有明确假设，**本文档就是那些假设的完整清单**。后台按此配置好，前端切换一个环境变量即可接通。

---

## 2. 工作范围

### 本阶段负责（Shopify 后台，无需代码）

- 开店、支付、运费区域、税务配置
- 建 6 个灯具商品 + 变体 + metafields
- 建饰面样品商品
- 建 `fixtures` collection 并设手动排序
- 自定义结账域名与品牌化
- 订单/发货邮件模板
- 创建 Storefront API 访问令牌并交付

### 不在本阶段（需要代码，另行安排）

- 前端购物车 UI
- 数据层接通与联调

---

## 3. 销售模式：混合制

**这一点必须理解，否则商品会建错。**

六个型号里只有四个在线直接售卖，另外两个走询价报价。

| 商品 | 模式 | 原因 |
|---|---|---|
| 饰面样品套装 | **直购** | 引流品，包裹寄送 |
| Wall 壁灯 | **直购** | 360mm / 0.85kg，包裹可寄 |
| Floor Task 落地阅读灯 | **直购** | 插电即用，960mm 属包裹范围 |
| Table Task 台式阅读灯 | **直购** | 插电即用 |
| Table Wash 台式洗墙灯 | **直购** | 插电即用 |
| Pendant 吊灯 | **询价** | 硬接线，三种长度，悬挂高度需按现场层高裁定 |
| Floor Wash 落地洗墙灯 | **询价** | 1542mm，托盘货运而非包裹 |
| 备件 | 待定 | 清单未确定，见第 11 节 |

### 询价品也要建进 Shopify

**两个询价型号同样需要完整建立商品和 metafields**，因为网站需要它们的规格、图片和参数来渲染页面。

区别只在于是否可购买：

- **直购品**：设价格、开库存、可加入购物车
- **询价品**：仍需发布到销售渠道（否则 Storefront API 读不到），但设为不可购买 —— 建议开启库存跟踪并将库存设为 0、关闭缺货继续销售

前端已经独立控制了按钮显示（询价品永远显示"询价"而非"加入购物车"），后台的不可售设置是第二道保险。

---

## 4. Metafields 定义

### ⚠️ 最容易出错的一步

每个 metafield 都必须**对 Storefront API 开放访问**。
在 Shopify 后台定义 metafield 时，需要勾选 "Storefront API 访问 / Expose to Storefront API"。

**定义了但未开放的 metafield，前端读出来等于不存在。** 这一条几乎每个人都会踩一次。

### 命名空间：`spec`

| Key | Shopify 类型 | 说明 |
|---|---|---|
| `tagline` | 单行文本 | 一句话标语 |
| `family` | 单行文本 | 必须为 `ARCHITECTURAL` / `TASK` / `WASH` 三者之一，大写 |
| `type` | 单行文本 | 必须为 `PENDANT` / `WALL` / `FLOOR_TASK` / `FLOOR_WASH` / `TABLE_TASK` / `TABLE_WASH` 之一，大写 |
| `profile_mm` | 单行文本 | 型材截面 |
| `lit_length_mm` | 单行文本 | 发光长度 |
| `overall_mm` | 单行文本 | 整体尺寸 |
| `base_mm` | 单行文本 | 底座尺寸，无底座留空 |
| `watts` | 单行文本 | 功率 |
| `lumens` | 单行文本 | 光通量 |
| `beam_angle` | 单行文本 | 配光角 |
| `ugr` | 整数 | 仅 Pendant 和 Wall 有值（均为 9），其余**留空不填** |
| `cri` | 整数 | 全系 92 |
| `kelvin` | 单行文本 | 色温选项 |
| `weight_kg` | 单行文本 | 重量 |
| `control` | **列表** · 单行文本 | 控制方式，多值 |

`family` 和 `type` 的取值是前端类型定义的一部分，**大小写和下划线必须完全一致**，写错会导致该商品渲染异常。

商品描述（正文）用 Shopify 自带的**商品描述**字段，不要建 metafield。

---

## 5. 六个型号的完整数据

以下数值全部转录自厂方规格表。**请勿修改或凑整。**

### 5.1 Pendant 吊灯 —— 询价

| 字段 | 值 |
|---|---|
| Handle | `pendant` |
| 标题 | Pendant |
| `spec.tagline` | Down onto the table, up onto the ceiling. |
| `spec.family` | ARCHITECTURAL |
| `spec.type` | PENDANT |
| `spec.profile_mm` | 42 x 36 |
| `spec.lit_length_mm` | 860 / 1200 / 1500 |
| `spec.overall_mm` | Suspension 500 to 1500 |
| `spec.base_mm` | Ceiling plate 560 x 52 |
| `spec.watts` | 28.2 / 43.3 / 51.7 |
| `spec.lumens` | 3936 / 5910 / 6390 |
| `spec.beam_angle` | 64 down, 160 up |
| `spec.ugr` | 9 |
| `spec.cri` | 92 |
| `spec.kelvin` | 2700K, 3000K, 1800 to 4000K, 2700 to 6500K |
| `spec.weight_kg` | 2.4 / 2.6 / 2.8 |
| `spec.control` | Gesture control / Dim-to-warm / TRIAC leading edge / DALI / Casambi / Matter |

### 5.2 Wall 壁灯 —— 直购

| 字段 | 值 |
|---|---|
| Handle | `wall` |
| 标题 | Wall |
| `spec.tagline` | The bar, held off the wall on a black bracket. |
| `spec.family` | ARCHITECTURAL |
| `spec.type` | WALL |
| `spec.profile_mm` | 38 x 38 |
| `spec.lit_length_mm` | 360 |
| `spec.overall_mm` | Projection 87 |
| `spec.base_mm` | *(留空)* |
| `spec.watts` | 12 (6 down, 6 up) |
| `spec.lumens` | 1740 (960 down, 780 up) |
| `spec.beam_angle` | 64 down, 160 up |
| `spec.ugr` | 9 |
| `spec.cri` | 92 |
| `spec.kelvin` | 2700K, 3000K, 1800 to 4000K, 2700 to 6500K |
| `spec.weight_kg` | 0.85 |
| `spec.control` | Dim-to-warm / TRIAC leading edge / DALI / Casambi / Matter |

### 5.3 Floor Task 落地阅读灯 —— 直购

| 字段 | 值 |
|---|---|
| Handle | `floor-task` |
| 标题 | Floor Task |
| `spec.tagline` | Reading light that reaches over the arm of a chair. |
| `spec.family` | TASK |
| `spec.type` | FLOOR_TASK |
| `spec.profile_mm` | 35 deep arm |
| `spec.lit_length_mm` | 350 |
| `spec.overall_mm` | 960 high |
| `spec.base_mm` | 250 x 120 |
| `spec.watts` | 8 |
| `spec.lumens` | 1040 |
| `spec.beam_angle` | 160 |
| `spec.ugr` | *(留空)* |
| `spec.cri` | 92 |
| `spec.kelvin` | 2700K, 3000K, 4000K, 1800 to 4000K |
| `spec.weight_kg` | 2.9 |
| `spec.control` | Touch dimmer / Dim-to-warm / DALI |

### 5.4 Table Task 台式阅读灯 —— 直购

| 字段 | 值 |
|---|---|
| Handle | `table-task` |
| 标题 | Table Task |
| `spec.tagline` | The same arm, at desk height. |
| `spec.family` | TASK |
| `spec.type` | TABLE_TASK |
| `spec.profile_mm` | 35 deep arm |
| `spec.lit_length_mm` | 350 |
| `spec.overall_mm` | 410 high |
| `spec.base_mm` | 180 x 100 |
| `spec.watts` | 8 |
| `spec.lumens` | 1040 |
| `spec.beam_angle` | 160 |
| `spec.ugr` | *(留空)* |
| `spec.cri` | 92 |
| `spec.kelvin` | 2700K, 3000K, 4000K, 1800 to 4000K |
| `spec.weight_kg` | 1.8 |
| `spec.control` | Touch dimmer / Dim-to-warm / DALI |

### 5.5 Floor Wash 落地洗墙灯 —— 询价

| 字段 | 值 |
|---|---|
| Handle | `floor-wash` |
| 标题 | Floor Wash |
| `spec.tagline` | A metre of light standing in the corner of a room. |
| `spec.family` | WASH |
| `spec.type` | FLOOR_WASH |
| `spec.profile_mm` | 20 x 35 |
| `spec.lit_length_mm` | 1025 |
| `spec.overall_mm` | 1542 high |
| `spec.base_mm` | 250 diameter |
| `spec.watts` | 26 |
| `spec.lumens` | 3380 |
| `spec.beam_angle` | 160 |
| `spec.ugr` | *(留空)* |
| `spec.cri` | 92 |
| `spec.kelvin` | 2700K, 3000K, 4000K, 1800 to 4000K |
| `spec.weight_kg` | 5.6 |
| `spec.control` | Touch dimmer / Dim-to-warm / DALI |

### 5.6 Table Wash 台式洗墙灯 —— 直购

| 字段 | 值 |
|---|---|
| Handle | `table-wash` |
| 标题 | Table Wash |
| `spec.tagline` | The column, shortened for a sideboard. |
| `spec.family` | WASH |
| `spec.type` | TABLE_WASH |
| `spec.profile_mm` | 20 x 35 |
| `spec.lit_length_mm` | 360 |
| `spec.overall_mm` | 467 high |
| `spec.base_mm` | 150 diameter |
| `spec.watts` | 8 |
| `spec.lumens` | 1040 |
| `spec.beam_angle` | 160 |
| `spec.ugr` | *(留空)* |
| `spec.cri` | 92 |
| `spec.kelvin` | 2700K, 3000K, 4000K, 1800 to 4000K |
| `spec.weight_kg` | 1.7 |
| `spec.control` | Touch dimmer / Dim-to-warm / DALI |

商品描述正文另行提供（英文，已定稿）。

---

## 6. 商品选项与变体

### 必须有一个名为 `Finish` 的选项

选项名**必须是 `Finish`**，前端按这个名字读取饰面列表。取值三项，顺序如下：

```
Oak
Walnut
Black Ash
```

六个型号全部相同。

### 变体结构

Shopify 每个商品的选项数量有上限（历史为 3 个，请按实际套餐核实）。Lumatree 的配置维度有四个——长度、饰面、色温、控制方式——**超出上限，必须取舍。**

建议方案：

| 型号 | 选项 1 | 选项 2 | 选项 3 | 变体数 |
|---|---|---|---|---|
| Pendant（询价） | Finish (3) | Colour temperature (4) | Length (3) | 36 |
| Wall | Finish (3) | Colour temperature (4) | — | 12 |
| Floor Task | Finish (3) | Colour temperature (4) | — | 12 |
| Table Task | Finish (3) | Colour temperature (4) | — | 12 |
| Floor Wash（询价） | Finish (3) | Colour temperature (4) | — | 12 |
| Table Wash | Finish (3) | Colour temperature (4) | — | 12 |

**控制方式不做成选项**，理由：

- Pendant 的三个选项已被长度占满，无位置
- 控制方式在 `spec.control` metafield 里作为规格展示已经足够
- 直购品若确需选择控制协议，用**订单行属性（line item property）**，不占选项位

⚠️ **Pendant 的三种长度对应三组不同的功率、光通量和重量**（见 5.1），如果将来 Pendant 转为直购，这三个长度必须是三个变体，各有独立 SKU、价格、库存。目前它是询价品，变体仅用于承载数据。

---

## 7. Collection 配置

建一个 collection：

| 项 | 值 |
|---|---|
| Handle | `fixtures` |
| 内容 | **仅**上述六个灯具 |
| 排序方式 | **手动（Manual）** |

### 两点说明

**样品和备件不要放进这个 collection。** 它们也是 Shopify 商品，`fixtures` collection 正是把它们挡在产品目录页之外的机制。

**排序方式必须设为手动。** 前端查询使用 `sortKey: MANUAL`，在后台拖拽商品的顺序就是网站上的显示顺序。请按以下顺序排列：

```
1. Pendant
2. Wall
3. Floor Task
4. Table Task
5. Floor Wash
6. Table Wash
```

---

## 8. 饰面样品套装

计划中的**第一个上线售卖的商品**，用于最低风险验证整条下单链路。

| 项 | 值 |
|---|---|
| Handle | `finish-sample-set` |
| 标题 | Finish sample set |
| 不放入 | `fixtures` collection |
| 内容物 | Oak / Walnut / Black Ash 三段型材切段 + 全系规格卡 |
| 价格 | **待定，见第 11 节** |

样品形态为**真实型材的短切段，每段带一个加工好的透镜孔**（而非平木片）——需甲方与工厂确认可生产性及长度。

---

## 9. 结账与域名

### 自定义结账域名（重要）

配置 `checkout.lumatree.com` 指向 Shopify，**不要使用默认的 `xxx.myshopify.com`**。

真正损害信任的是付款时域名突然变成陌生地址，而非页面版式的差异。域名一致，用户感知上就是同一个系统。

### 结账品牌化

在套餐允许范围内配置 logo、主色、字体，与主站保持一致。品牌资产另行提供。

> 已知限制：非 Shopify Plus 套餐无法修改结账页版式，仅能改品牌元素。这一点已被接受，无需提案升级 Plus。

### 邮件模板

订单确认、发货通知等模板需做品牌化——这些邮件对"同一个系统"的观感影响很大。

---

## 10. 需要交付的凭证

配置完成后请提供：

1. **Storefront API 访问令牌**
   Shopify 后台 → 设置 → 应用和销售渠道 → 开发应用 → 创建应用 → Storefront API 访问令牌
   所需权限：`unauthenticated_read_product_listings`
   （后续做购物车时需追加 `unauthenticated_write_checkouts`）

2. **店铺域名**，形如 `lumatree.myshopify.com`

3. **确认使用的 API 版本**（Shopify 按季度发版，每版支持 12 个月）

4. 后台协作者权限（供甲方验收）

---

## 11. 需甲方确认的待定项

以下未定，不要自行假设：

1. **价格** —— Wall / Floor Task / Table Task / Table Wash 四个直购型号 + 样品套装
2. **备件清单** —— 需向工厂索取可服务零件列表（驱动器、悬挂套件、壁装支架、配重底盘、触摸调光模块等），清单确定前不建备件商品
3. **样品切段** —— 工厂能否生产带透镜孔的短切段，以及长度
4. **光通量口径** —— 规格表标注的 `1740lm` 等数值，需向工厂确认是**光源光通量**还是**灯具光通量**。若为光源光通量，商品描述需分行标注，不可直接作为灯具出光标称。**Wall 已列入直购，此项在开卖前必须澄清。**
5. **控制协议是否需要下单时选择**，或统一在售后/报价阶段确认

---

## 12. 验收清单

配置完成后逐项核对：

- [ ] 六个灯具商品全部建立，handle 与第 5 节完全一致
- [ ] 全部 15 个 `spec` metafield 已定义，**且每一个都已对 Storefront API 开放**
- [ ] `family` 与 `type` 取值大小写、下划线与文档一致
- [ ] 仅 Pendant 和 Wall 有 `ugr` 值（9），其余四个留空
- [ ] 每个商品都有名为 `Finish` 的选项，含 Oak / Walnut / Black Ash
- [ ] `fixtures` collection 已建，仅含六个灯具，排序为**手动**且顺序如第 7 节
- [ ] 样品套装已建，且**不在** `fixtures` collection 内
- [ ] Pendant 与 Floor Wash 已发布但设为不可购买
- [ ] 其余四个灯具已设价格与库存，可购买
- [ ] 自定义结账域名已生效，非 myshopify.com
- [ ] Storefront API 令牌已创建并交付

---

*本文档描述的结构对应前端 `src/lib/sources/shopify.ts` 的实现。如需变更任一约定（handle、metafield key、collection handle、选项名），请先同步，否则前端读取会失败。*
