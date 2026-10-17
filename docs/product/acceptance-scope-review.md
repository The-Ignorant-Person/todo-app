# 纸序首次整体交付：范围审阅工作表

更新：2026-10-17。状态：**范围目标基线已确认**。权威决定见 [冻结纸序全端软件官网与配套的验收范围之结论](https://github.com/The-Ignorant-Person/todo-app/issues/5#issuecomment-6231302779)。本工作表保留调查过程及证据边界，具体名单补证仍未完成；不是第二份决策库，也不是已通过的验收报告。

Q1–Q20 已确认，详情链接在对应段落及范围结论。[按端能力矩阵](platform-capability-matrix.md) 与 [范围收尾提案](scope-final-proposal.md) 的选择均已接受；具体设备组合和外部服务样本不因目标批准而成为已验证支持。

依据：项目本地的 `docs/product/baseline-draft.md`、`docs/research/dida-web-observations.md`，以及可公开访问的 [首轮全端证据矩阵](https://github.com/The-Ignorant-Person/todo-app/blob/32521bda5e8e5208b1b49b8b9471c8aaf84f1817/docs/research/paperdo-reference-20261016.md)。本地文档尚未随本资产发布，不提供失效相对链接。下面的“检查”是拟定方法，不表示已操作或参照产品必然采用这些细节。

## 如何审阅

本票决定哪些能力、哪些端和配套进入首次整体交付。每行还须拆成“平台／系统版本／参照版本／前置条件／动作／预期结果／证据状态”。未确定的平台适用性保留未知；表中的调查入口不代表所有适用端。只有明确平台和预期的用例才可以冻结。

领域规则、算法、具体数值与套餐权益由已有后续票决定，不在范围票中暗自定案；完整地图结束前必须闭合。所有产品验收目前均未执行。

## 软件能力逐项候选

| 基线项 | 首次交付能力与拟检查 | 逐端拆分及尚缺的输入 |
| --- | --- | --- |
| TASK-01 | 快速添加、收集箱、编辑、完成；保存后重开、刷新后数据正确 | Web 已有小样本；其余主客户端各自核对入口和默认字段 |
| TASK-02 | 文件夹、清单、分组、子任务、移动与排序 | 各主客户端分别核对层级、排序和父子关系；穿戴不默认具备完整编辑 |
| TASK-03 | 标签、优先级、智能清单、过滤器、搜索 | 各支持端用相同边界数据检验检索和筛选结果；搜索此前需单列补查 |
| TASK-04 | 详情、笔记、附件、模板、复制、评论、主任务关联 | 拆开编辑、上传失败、模板展开与权限拒绝；格式、大小和额度后续确定 |
| TASK-05 | 删除恢复、放弃／重新开始、任务与笔记互转 | 用完整字段检查操作前后结果；保留期限、恢复位置和状态语义由领域票确定 |
| TASK-06 | 任务历史、清单动态、逐清单通知 | 任务历史和清单动态分别核对；已归档研究只对电脑端清单动态有官方说明 |
| VIEW-01 | 列表、看板、时间线 | 各端分别核对可用视图、切换与拖动，不从 Web 外推 |
| DATE-01 | 日期、时间、时区、日历视图与拖动安排 | 逐一列出日历视图；已知 6／7 入口差异未解，会员真实交互未实测 |
| DATE-02 | 固定周期、完成后重复、月末、闰年、农历、工作日／节假日、艾宾浩斯重复 | 日期计算、完成／跳过操作、实例生成分别建例；不能从月末单例推广 |
| REMIND-01 | 多时点、持续提醒、微信提醒及通知设置 | 发送、触发、系统送达分开检查；后台／锁屏／重启／拒绝权限；研究称持续提醒属移动端 |
| REMIND-02 | 位置提醒 | 参照官方标注 iOS；进入／离开及权限拒绝分别验证，不外推其他平台 |
| TOOL-01 | 四象限 | 归类、手动移动与设置；规则由领域票明确 |
| TOOL-02 | 专注、番茄、记录与统计 | 开始／暂停／结束／中断／修正和跨端一致性；跨端计时契约未定 |
| TOOL-03 | 习惯、倒数／纪念日及统计 | 创建、记录、补记／修正、跨日边界；各端支持范围分别核对 |
| SHARE-01 | 共享邀请、成员管理、角色、指派、退出／撤权 | 所有者及编辑／评论／只读角色的动作矩阵；邀请渠道、自动接受及通知逐项列出 |
| ACCOUNT-01 | 注册、登录、绑定、找回、多因素验证、登录设备管理、注销 | 邮箱／手机／第三方入口逐端核实；具体渠道与恢复规则仍未确定 |
| ACCOUNT-02 | 不注册的本地使用模式 | 首发范围已由 [Q4 确认](https://github.com/The-Ignorant-Person/todo-app/issues/5#issuecomment-6221027002)；无需账号使用本地任务，跨设备同步需要账号。注册后的数据衔接交领域票，逐端实现未验收 |
| DATA-01 | 用户主动备份导入、检查结果、纸序导出 | 原始字段、附件、重复导入、无效文件逐项检查；不承诺持续同步滴答 |
| DATA-04 | 其他应用的一次性迁移：Todoist、Microsoft To Do、Things、OmniFocus、Toodledo、iCal | 六类来源已由 [Q5 确认](https://github.com/The-Ignorant-Person/todo-app/issues/5#issuecomment-6221027002) 纳入候选验收清单；来源格式、字段及失败处理未验证，不推定存在完整导出能力，不扩大为持续同步 |
| DATA-02 | 普通任务离线查看／新建／编辑、联网同步 | 各适用客户端单独断网测试；首次离线启动、附件与共享权限变化另建边界用例 |
| DATA-03 | 无法安全合并时保留双方版本 | 两端并发、删除与编辑、离线后撤权；具体解决操作由领域票及路线原型确定 |
| AI-01 | 助手、语音添加、录音转写／总结 | 主动触发、发送范围、结果检查、取消／失败／重试；语音移动端声明不能外推录音与助手 |
| INTEGRATE-01 | 微信、邮件添加、第三方日历、Notion | 每个来源分别写清创建／订阅／同步方向、授权及撤销；不把一个成功链路当全部通过 |
| INTEGRATE-03 | 企业微信、钉钉、飞书、CalDAV 与课表导入 | 入口已有观察或官方描述；实际支持行为、字段与外部资格仍需确认 |
| INTEGRATE-02 | MCP、CLI、URL Scheme、Siri／快捷指令 | 静态命令清单与授权／撤销／越权／重复请求用例；宿主平台逐项标注 |
| PLATFORM-01 | 全局快捷键、托盘／菜单入口、便签、浏览器收集 | 按 Windows／macOS／Linux、浏览器分项；快捷键冲突、重启和升级恢复 |
| PLATFORM-03 | Gmail／Outlook 邮件附加功能 | 首发范围已由 [Q6 确认](https://github.com/The-Ignorant-Person/todo-app/issues/5#issuecomment-6221027002)，与浏览器收集及邮件地址入口分列；正式分发、宿主版本、授权与邮件转任务契约需补证 |
| PLATFORM-02 | 桌面／主屏／锁屏小组件、穿戴配套 | 系统版本和设备型号单列；刷新、快捷操作、断连及权限拒绝；不能用手机代替手表 |
| BRAND-01 | 应用主题、清单背景、浅色／深色、纸序资产 | 具体视觉进入品牌原型票；本文只提出覆盖范围，深色／主题支持仍需完整清单确认 |

## 官网与运营配套

| 范围项 | 拟验收的用户旅程 | 仍待后续决定 |
| --- | --- | --- |
| 官网与下载 | 首页、功能介绍、各端下载、设备兼容提示、注册／登录、失效链接处理 | 页面结构由品牌原型确定；下载必须指向可用正式版本 |
| 会员与订单 | 套餐展示、购买、权益开通、续期、到期、订单查询、跨端权益 | 定价、免费额度、支付与商店渠道由对应票确定 |
| 教育优惠 | 资格提交、结果告知、优惠购买及失效／不符合资格处理 | 资格规则、验证方式、金额、有效期 |
| 礼品卡 | 购买、交付、兑换、已兑换／无效／失败处理 | 是否指定收件人、有效期、退款和防滥用规则 |
| 退款与发票 | 提交请求、查询处理状态、渠道分流；处理结果与订单及权益一致 | 各渠道办理办法和责任由主体／商业决策确定 |
| 帮助与支持 | 入门、功能教程、FAQ、故障指引、反馈／支持入口与回复 | 支持渠道和响应目标由商业／质量票确定 |
| 更新记录与媒体素材 | 查看版本变化，下载允许使用的纸序标志／介绍素材 | 维护方式和资产使用说明 |
| 条款、隐私、许可 | 页面可访问，说明与实际数据流、组件和权益一致 | 内容需基于最终主体、服务与具体许可制定，当前不声称已合规 |
| 运营后台 | 必要账号、订阅、支付和运行状态，支持请求处理，授权内容排障及访问记录 | 权限角色、访问流程和留存由领域／安全票明确 |
| 正式交付 | 正式域名可访问、真实注册和订阅、约定商店已发布、逐端可安装与验收 | 审核中、仅模拟支付、仅生成安装包均保留未完成状态 |

## 范围冻结后的补证责任

1. 系统下限、架构、Linux 版本目标与穿戴候选池已经分轮确认；仍需把浏览器支持窗口实例化，并锁定必要的镜像／固件／手机配对证据。不能借候选框架限制擅自删除已约定平台。
2. 本地模式、迁移管理端、邮件宿主及主端能力已在 Q14–Q16 明确；日历读写、组件动作、穿戴额外动作、导入路径及例外处理已在 Q17–Q20 确认。
3. [支持证据核实](https://github.com/The-Ignorant-Person/todo-app/issues/14) 和 [支持名单与兼容例外审定](https://github.com/The-Ignorant-Person/todo-app/issues/15)承接真实设备组合／来源样本／教务网学校等缺口。名单审定阻塞架构选择和最终规格；范围目标批准不等于具体领域契约和产品验收完成。

## 兼容范围调查输入（2026-10-17）

以下为本轮只读联网取得的官方商店、下载页与帮助资料，由调查子代理核对；是参照产品声明，不是纸序支持承诺或实机验收。纸序具体最低版本仍待选择。

| 平台 | 本轮可确认的公开信息 | 不能据此确认的部分 |
| --- | --- | --- |
| iPhone／iPad／Apple Watch | [中国 App Store](https://apps.apple.com/cn/app/id626144601) 声明 iOS 15.5、iPadOS 15.5、watchOS 9.0 起 | 各设备、各功能的实际可用性 |
| macOS | [中国 Mac App Store](https://apps.apple.com/cn/app/id966085870) 声明 macOS 12.0 起 | 官网独立包是否同下限；具体 CPU 架构覆盖 |
| Windows | [中国站 Windows 页](https://dida365.com/windows) 提供 x64、ARM64、32 位入口 | 最低 Windows 版本未找到明确官方证据 |
| Linux | [下载中心](https://dida365.com/download?language=zh_CN) 的当前页面配置包含 deb／rpm／AppImage，各有 x64／arm64 | 每个发行版、glibc、桌面环境的最低版本及实际兼容性 |
| Android | [小米应用商店](https://app.mi.com/details?id=cn.ticktick.task&type=pad) 有手机／平板条目 | 最低 Android 版本未知 |
| HarmonyOS | 中国站链接到 [应用市场条目](https://appgallery.huawei.com/app/detail?id=cn.ticktick.task.hm) | 正文未能取得，整款应用最低系统仍未知 |
| Web | 中国站提供网页版入口 | 浏览器最低版本或维护窗口未知 |
| 浏览器扩展 | 中国站当前列 Chrome、Edge、Firefox；[Mozilla 元数据](https://addons.mozilla.org/api/v5/addons/addon/ticktick-todo/) 声明其扩展包 Firefox min 48.0 | 古老扩展包的声明不等于当前服务兼容验证，不用 Firefox 48 作为纸序推荐下限 |
| 穿戴配套 | Apple Watch 有上列商店声明；华为、小米有厂商设备清单 | 必须按“手表型号＋固件＋配对手机系统＋手机应用版本”确定支持；不能以品牌作为单个验收项 |

功能门槛另列：[官方小组件说明](https://help.dida365.com/articles/6950366960659988480) 分别描述 iPhone 锁屏 iOS 16、iPad 锁屏 iPadOS 17、iOS 交互组件／StandBy iOS 17、控制中心控件 iOS 18、macOS 桌面交互组件 macOS 14、Apple Watch 叠放组件 watchOS 10。它们不能代替客户端整体安装下限；系统支持该能力也不等于纸序已实现它。

穿戴补证入口（非穷尽清单）：[华为 GT](https://consumer.huawei.com/cn/support/content/zh-cn15878302/)、[华为 FIT](https://consumer.huawei.com/cn/support/content/zh-cn15903440/)、[华为 WATCH 对应清单](https://consumer.huawei.com/cn/support/content/zh-cn16053381/)、[小米 Watch S1](https://www.mi.com/xiaomiwatchs1)、[小米 Watch S1 Pro](https://www.mi.com/xiaomiwatchs1pro)、[小米 Watch Color 2](https://www.mi.com/xiaomiwatchcolor2)。部分条目对配对手机系统有明确限制，后续必须逐组合提取，不能把产品系列名称直接冻结成支持承诺。

## 已确认兼容目标（Q7–Q9）

以下目标已由用户确认，详见 [第三轮确认](https://github.com/The-Ignorant-Person/todo-app/issues/5#issuecomment-6228264063)。这是纸序需求，不是候选技术已经通过验证，也不宣称滴答未公开的下限已被查明。

| 问题 | 已确认目标 | 取舍与验收 |
| --- | --- | --- |
| Q7 苹果端下限 | iOS／iPadOS 15.5、macOS 12、watchOS 9 作为首发兼容下限；macOS 保留 Intel 与 Apple Silicon；系统特有功能按单项门槛显示 | 与已查参照商店下限对齐；各下限系统安装、核心操作、升级和降级提示单独验收。新版独有的小组件不强求旧系统提供。后续架构必须满足，不能静默提高下限 |
| Q8 Windows 架构 | Windows 10／11，x86（32 位）、x64、ARM64 均保留为首发目标；系统和架构不是任意交叉组合，具体有效组合、版本与版本分支仍需下钻 | 与参照三个下载入口一致；每个实际存在的系统／架构组合独立验收安装、启动、升级、快捷入口和提醒。保留 x86 会缩小技术选择，不能用即将停止维护的框架版本作为长期默认方案 |
| Q9 Web 与扩展 | Web 支持 Chrome、Edge、Firefox、Safari；基线冻结时各最近两个稳定主版本，加仍维护的 Firefox ESR。扩展独立覆盖 Chrome／Edge／Firefox，邮件插件另列 | 固定清单记录实际版本、操作系统与日期；不由原生客户端下限推导 Web 支持。Safari 桌面与 iPhone／iPad 各自验证；不额外声称 Safari 扩展在参照范围内 |

Android、HarmonyOS、Linux 版本目标及穿戴候选池已在 Q10–Q13 确认，详见下文；具体设备与运行组合仍有待补证项。任何一轮确认都不表示整套纸序已经验收。

Windows 架构更正：[微软 FAQ](https://support.microsoft.com/en-us/windows/experience/compatibility/32-bit-and-64-bit-windows-frequently-asked-questions)明确 Windows 11 没有 32 位操作系统版本。因此 Q8 的有效 OS／CPU 目标为 Windows 10 x86、x64、ARM64，以及 Windows 11 x64、ARM64；具体系统版本分支继续锁定。32 位应用在 64 位系统上的运行属于另一条兼容路径，不能叫作 Windows 11 x86 操作系统。

本轮补证仍未取得 Android 的最低 SDK、HarmonyOS 原生包的最低系统，以及 UOS／麒麟／Deepin／Fedora 等发行版的确切版本要求。现有商店与下载入口只证明包或发行版名称存在；这些下限不能作为已核实的参照事实直接填写。

### 候选框架约束证据（2026-10-17）

- [Flutter 支持矩阵](https://docs.flutter.dev/reference/supported-platforms)：本次官方文档对应 3.47，Windows 10／11 仅 x64、ARM64；macOS 12 起；iOS 15 起；Android API 24 起。没有 Windows x86 官方支持目标。原生 iOS 与 Web Safari 支持下限也不同，不能混为一个能力。
- [Tauri Windows 安装器文档](https://v2.tauri.app/distribute/windows-installer/)保留 i686／x64／ARM64 构建路径；[配置文档](https://v2.tauri.app/reference/config/)默认部署值不是所有插件的兼容性证明。[Linux 文档](https://v2.tauri.app/distribute/debian/)建议以目标最旧环境构建，列 Ubuntu 22.04／Debian 12 为 WebKitGTK 4.1 基线示例。
- [Electron 44 发布说明](https://www.electronjs.org/blog/electron-44-0)与 [v44.8.0 README](https://github.com/electron/electron/blob/v44.8.0/README.md)：macOS 13 起，Windows 10 起，已移除 Windows ia32 官方预编译包；[Electron 43 说明](https://www.electronjs.org/blog/electron-43-0)将其列为最后 32 位系列，并注明 2027 年 1 月结束支持。因此不能把留守旧 Electron 当成无维护代价的方案。
- 三者均不能从已列平台支持表直接证明覆盖原生 HarmonyOS、watchOS 或浏览器扩展。这些仍需独立实现与验证路径。

上述仅为范围取舍所需事实，不选择产品框架，不等于依赖已获准进入产品。

## 已确认移动与 Linux 兼容目标（Q10–Q12）

以下目标已由用户接受，决定详见 [第四轮确认](https://github.com/The-Ignorant-Person/todo-app/issues/5#issuecomment-6228375294)。证据限制仍保留。

### Q10 Android

首发以 **Android 8.0／API 26 起，ARM32／ARM64，手机和平板**为目标；不把 x64 模拟器成功当成 Android x64 用户设备支持。这是纸序自己的最低版本选择，滴答最低版本仍未知。

取舍：与 Android 7.0／API 24 起相比，少维护通知渠道之前和小组件固定入口之前的路径，但排除了 Android 7.x。API 24 仍有框架候选可支持；降低维护分支是建议理由，不是宣称 Android 7 无法实现离线任务。Android 9／API 28 会进一步排除 8.x，当前没有必须如此的功能证据。

依据：[通知渠道](https://developer.android.google.cn/develop/ui/compose/notifications/channels?hl=en)、[Android 8 后台限制](https://developer.android.com/about/versions/oreo/background)、[固定小组件](https://developer.android.com/develop/ui/views/appwidgets/discoverability)。最低安装版本不等于目标 API；较新系统的权限和后台限制仍须分别适配，不能承诺提高下限就能保证准点提醒。[SDK 字段](https://developer.android.com/guide/topics/manifest/uses-sdk-element.html)

### Q11 原生 HarmonyOS

保留 **HarmonyOS 5.0.0／API 12 起，原生手机和平板应用**为兼容目标。较新 API 的专属能力单独判断，低版本提供明确不可用提示或可接受替代；必需能力无法降级时须携证据回来决策，不能静默提高安装下限。

官方区分最低兼容、编译、目标 SDK；较新 SDK 编译仍可以声明较低兼容目标，但不证明所用组件或每项能力都可运行。[配置说明及 5.0.0(12) 示例](https://developer.huawei.com/consumer/cn/doc/doccenter-release-notes/overview-511-beta1)、[工程配置](https://developer.huawei.com/consumer/cn/doc/HarmonyOS-Guides/ide-hmos-hvigor-build-profile-app)。API 17（5.0.5）或 API 20（6.0.0）可作为更窄覆盖的备选，本轮不自动选择。

验收使用原生 HarmonyOS 应用包；在旧华为设备或容器中运行 Android APK 不算原生验收。穿戴 API 与手机 API 分列。[华为包术语](https://developer.huawei.com/consumer/cn/doc/doccenter-getting-started/application-package-glossary)

### Q12 Linux：按桌面系统逐行承诺

保留 x64 和 ARM64 两类目标，但只对明确的“发行版＋版本＋桌面环境＋CPU／机型”组合建承诺，不用 deb／rpm／AppImage 格式推导任意 Linux 均兼容。

已选首发版本目标及仍需落实的验证配置：

| 桌面系统 | 已选版本目标及当前参考修订 | ARM64 及证据边界 |
| --- | --- | --- |
| Ubuntu Desktop | 22.04 LTS、24.04 LTS、26.04.1 LTS | 26.04.1 有明确 ARM64 桌面下载；旧两代特定 ARM 桌面镜像尚待锁定。[官方桌面下载](https://ubuntu.com/download/desktop)、[生命周期](https://ubuntu.com/about/release-cycle) |
| Debian + GNOME | 12 LTS、13.7 | amd64、arm64；必须安装桌面后验收通知／托盘等，服务器安装不代替桌面验收。[版本总表](https://www.debian.org/releases/) |
| Fedora Workstation | 44，当前镜像构建 44-1.7 | x86_64、aarch64；本轮未取得完整受维护版本表，不能推断其他旧版本状态。[官方下载](https://fedoraproject.org/workstation/download/) |
| CentOS Stream + 指定桌面环境 | 9、10 | 官方提供 x86_64、aarch64；9 生命周期至 2027-05-31，10 至 2030-05-31。GUI 桌面与应用依赖组合仍需验证，不能用无桌面安装验收。[官方下载](https://www.centos.org/download/) |
| deepin | 25.2.0 | AMD64、ARM64；ARM 建议选择官方列明的飞腾 D2000 作为验证候选，不外推任意 ARM 设备。[官方下载](https://www.deepin.org/zh/download/) |
| 统信 UOS 桌面专业版 | V25，以 2500 为候选基线，实际镜像修订待锁定 | AMD64、ARM64；ARM 先以官方列明的飞腾 D2000 为验证候选。未购买镜像或许可。[官方知识库](https://faq.uniontech.com/desktopv25/e27f/1261) |
| 银河麒麟桌面 | V11（2603 Update1） | x64 Intel／AMD、飞腾桌面版本；飞腾具体机型／位宽元数据待核对，不借用服务器版鲲鹏／ARM64条目。[官方下载](https://www.kylinos.cn/support/trial/download/) |

这些是已选系统覆盖目标，不是镜像或硬件已准备好。表中的镜像修订与具体机型仍有候选项，不能升级为用户已逐项批准的硬件清单。旧 Ubuntu、UOS、麒麟的精确镜像与 ARM 组合还需补证；未经锁定和用户审阅不得把全部 ARM 设备算作已冻结。UOS／银河麒麟均指桌面产品；不扩大到服务器版、龙芯／申威等其他 CPU 或所有同名发行版。未在当前表中选择的旧版仍作为范围调查差异记录，不能宣称参照已不支持。

## Q13 已选穿戴候选池与配对边界

用户已确认把下面 Apple Watch、华为和小米设备池纳入首发候选，并逐型号、固件、配对手机核对，详见 [第四轮确认](https://github.com/The-Ignorant-Person/todo-app/issues/5#issuecomment-6228375294)。**设备池不是滴答逐机兼容事实，也不是纸序已测试名单。** 不因为减少验证工作而直接删掉页面中较新的型号；同样不把页面适用系列外推到所有历史或未来型号。

| 设备池 | 本轮官方资料中的范围 | 必须保留的限制 |
| --- | --- | --- |
| Apple Watch | 已确认 watchOS 9 起；具体可运行的型号另列 | 与 iPhone 配对、系统特有能力分别验证，不要求 Android／鸿蒙手机配对 |
| 华为 GT | GT 3／4／5／6／7 系列及官网列明成员，GT Cyber／Smart Movement、GT Runner／Runner 2、GT 2022 典藏版 | 官网滴答行说明手机任务同步和振动提醒，但未逐型号列固件下限。[GT 列表](https://consumer.huawei.com/cn/support/content/zh-cn15878302/) |
| 华为 FIT | FIT 2、3、4、4 Pro、5、5 Pro | FIT 2 配 iOS 不支持应用市场；其他 iOS、HarmonyOS 5+ 组合不能从市场入口外推功能。[FIT 列表](https://consumer.huawei.com/cn/support/content/zh-cn15903440/) |
| 华为 D | WATCH D、D2、D3、擎云 H9D20 | 官网分两张表且均有滴答行；D2 的 iOS 市场入口可用不等于滴答功能通过。[D 列表](https://consumer.huawei.com/cn/support/content/zh-cn15904928/) |
| 华为 Buds | WATCH Buds、Buds 2 | 依赖手机配对的第三方应用仍有系统适配限制。[Buds 列表](https://consumer.huawei.com/cn/support/content/zh-cn15933525/) |
| 华为 WATCH／Ultimate | WATCH 5、6、6 Pro、十周年款、Ultimate 2、ULTIMATE DESIGN 紫金／星钻绽放 | 滴答行明确为非独立应用，手机范围写“HarmonyOS 4.X 以下设备／第三方安卓设备”；不能把手表系统支持当成手机配对支持。[WATCH 列表](https://consumer.huawei.com/cn/support/content/zh-cn16053381/) |
| 小米 | Watch S1、S1 Pro、Color 2 | 三款产品声明均点名滴答，第三方应用限 Android 手机；整表可配 iPhone 不代表第三方应用可用。[S1](https://www.mi.com/xiaomiwatchs1)、[S1 Pro](https://www.mi.com/xiaomiwatchs1pro)、[Color 2](https://www.mi.com/xiaomiwatchcolor2) |

已确认的配对处理：Apple Watch 按 iPhone 路线；小米三款按 Android 路线；华为逐型号核对 Android／旧鸿蒙手机组合，原生 HarmonyOS 5+ 手机和 iOS 的未知分支继续保留待补证，不承诺所有型号能任意配对，也不把未验证自动写成不适用。

手表应用与手机通知转发分别验收。基础动作已由 Q16 和 Q18 定案，见按端矩阵及收尾资产；只读缓存、断连提示与未送达操作不假报成功纳入，不要求完整详情编辑、附件／协作管理、独立云账号或离线排队写入。具体配对与能力证据仍须补证。

型号成员／尺寸、固件、手机系统、手机应用版本、地区及实际应用市场可用性必须在最终清单中明确。当前资料不能代替这些组合的安装或功能测试；Q20 已明确由补证及名单审定票承接，范围目标冻结不等于这些组合已经验收。

## 后续票的责任边界

- 领域契约票：状态、重复、共享权限、历史／恢复、迁移、同步冲突的具体预期。
- 主体与渠道票：正式运营、各商店、支付与外部资格。
- 架构票与路线原型：组件、各端实现、冲突／撤权和可维护性。
- 商业票：价格、额度、优惠、退款、支持与预算。
- 品牌原型：应用、官网及配套具体界面与文案。
- 质量票：可靠性、性能、无障碍、安全、恢复及真实设备验证门槛。
- 最终规格票：把所有已定结果合成无未决项的逐端可执行用例，交接实施。
