# 纸序复用路线：成品底座改造与成熟组件组合

日期：2026-10-16（Asia/Shanghai）。工作票：[比较成品底座改造与成熟组件组合的适配证据](https://github.com/The-Ignorant-Person/todo-app/issues/3)，所属地图：[纸序 Paperdo 全端产品规格与复用决策地图](https://github.com/The-Ignorant-Person/todo-app/issues/1)。本报告是规格与决策的证据输入，不批准技术栈，不开始产品实现。

## 结论

保留两条候选路线，当前证据不足以宣布哪条整体成本更低：

- **改造 Super Productivity** 能继承个人任务模型、重复规则、多端工程与既有同步恢复基础；纸序的共享授权和冲突双方保留涉及同步分区、操作日志与客户端协议，不能按“换品牌＋加会员页面”估算。
- **成熟组件组合** 能独立复用日历、编辑器、认证、重复计算和离线存储，但这些组件不自带纸序的共享任务、权益、日期生命周期、跨端发布或整套运营系统。集成契约与端到端验证仍是主体工作。
- 两者并非排他：可以保留可独立复用的上游模块并组合成熟组件。但从 Angular/NgRx 应用抽取模块有依赖剥离和升级维护成本；必须通过实际集成探针计量，不能将复制文件数当作节省量。

优先下一步比较**共享任务＋离线冲突＋撤权**这一相同纵向样本。它能同时暴露两条路线最大的契约风险；已通过的月末日期样本不再重复研究。以下改造等级是基于可见边界的工程判断，非人天报价或完成承诺。

## 证据范围与方法

1. 当前读取项目工作区已有 `docs/product/discovery.md`、`docs/research/tooling-assessment.md`、`docs/research/super-productivity-source-review.md`，沿用全端全套、真实订阅、保留闭源商业化选择、离线普通任务与不可安全合并时保留双方的约束。这些是既有项目记录，本次没有将它们重新判定为用户批准的新技术选择。
2. 本次再次执行 `git rev-parse HEAD`，确认本地隔离源码为 Super Productivity **`6e73465cce53538bd2761a5a4a03b0de25d70eee`**，根版本 **19.2.0**。稀疏 checkout 的文件通过 `git show HEAD:<path>` 实际读取；来源链接固定在该提交。
3. 核查根 README/package.json/LICENSE、任务/项目/重复模型、同步服务 Prisma schema、下载服务和上传处理器、冲突与本地恢复文档；不声称做过全库行为审计。本次未安装该项目依赖、未运行整个应用、未运行新同步或移动端测试。
4. 组件核查为 2026-10-16 可访问官方文档。网页会更新，真正准入时须锁定包版本与许可证。已有日期运行结果来自项目记录；本次没有重跑，也不将记录推广为整个应用通过。

## Super Productivity 的复用与改造面

等级含义：**局部**＝明确适配接口/配置；**跨层**＝模型、服务、UI 与测试同步变化；**协议级**＝同步、授权或兼容性语义变化，需要迁移/旧端策略。等级不能相加得出工期。

| 纸序要求 | 本次核查的事实 | 需要做的改造与估量依据 |
| --- | --- | --- |
| 个人任务与规划 | [任务模型][sp-task] 包含优先级、父子关系、附件、提醒、重复关联；`dueDay` 与 `dueWithTime` 分开表示全天和定时，注明互斥契约。[项目模型][sp-project] 组织任务、backlog、笔记并使用 NgRx EntityState。 | 有可复用领域结构，但与纸序清单/任务/笔记/放弃/共享语义逐字段对照后才能估量。独立抽取不是零成本，项目模型继承 plugin API 与 WorkContext，任务模型继承 plugin API。**跨层**。 |
| 共享与角色 | [schema][sp-schema] 中 Operation、UserSyncState、SyncDevice 按 userId 关联；[下载服务][sp-download] 查询操作时使用 `where: { userId, ... }`；[上传入口][sp-upload] 从认证请求取 userId。该 schema 未定义共享清单成员角色。 | 目前证据支持“同一用户设备同步”的分区。共享至少须设计共享对象/成员表、对象级读写检查、变更分发与游标、撤权后的离线写入处置、客户端缓存隔离；不能仅添加 member 表而复用全部个人同步假设。若保留加密还需明确密钥分发/撤销。**协议级**。不据此断言所有独立服务均无协作。 |
| 真实会员订阅 | [schema][sp-schema] 有用户、验证/恢复令牌、Passkey、存储额度；所读 schema 未定义订单/订阅/权益。 | 账号基础可评估复用。存储额度不是订阅模型；需权益真值来源、支付渠道事件、重放幂等、退款/到期/恢复、跨端购买恢复、离线宽限与后台审计。既有独立商业服务未知。**跨层**。 |
| 保留冲突双方 | [冲突文档][sp-conflict] 明确不同字段可合并、重叠字段采用确定性 LWW；旧设备本地冲突日志和审阅 UI 已移除。某些实体不能字段补丁合并，回退全实体 LWW；删除及批量操作有不同路径。 | 需在丢弃分支前保存双方值/基准/来源，定义持久化和同步的冲突对象、去重、用户选择生成的新操作、重复投递与多设备选择收敛。恢复旧日志文件不等于恢复完整契约。**协议级**，应单独验证 delete/edit、同字段、跨字段、批量与第三设备并发。 |
| 数据恢复 | [本地恢复文档][sp-recovery] 定义全状态替换前快照环（3 份）及恢复 UI，包含桌面和移动备份来源；丢失的重叠字段与文件型提供方不由此覆盖。 | 这是可复用的灾难恢复结构；不能用“有备份”代替逐冲突双方保留。纸序另需账号隔离、版本兼容和恢复后重新同步的验收。**跨层**。 |
| 公历重复 | [重复模型][sp-repeat] 包含按完成日起算、等待完成、跳过逾期、删除实例例外、每月第 N 个星期与月末。 | 可复用程度较高，但模型不等于完整调度。既有项目试验中原函数已得到 2027-01-31 → 02-28 → 03-31；该结果仅覆盖限定函数环境。**局部至跨层**，取决于纸序最终重复生命周期契约。 |
| 农历与法定工作日 | 上述[重复模型][sp-repeat] 的周期为日/周/月/年，快速设置包括 MONDAY_TO_FRIDAY；已评估的[日期函数][sp-next] 使用公历 Date。所读文件没有农历/调休数据接口。 | 需引入农历规则及带版本的中国调休日历，规定数据缺失/更新和离线行为。周一至五不等同法定工作日。**跨层**；未宣称整个插件生态都不存在相关能力。 |
| 跨端 | 固定提交 [README][sp-readme] 声明 Windows/macOS/Linux/Android/iOS/Web；[package.json][sp-package] 有 Electron、Angular、Capacitor Android/iOS 依赖及相应构建脚本。 | 已有工程覆盖值得复用，不能再把 iOS 说成已知空白。但脚本不是签名构建/设备通知验收；HarmonyOS、浏览器插件、穿戴和各宿主小组件的目标等价能力未证实。按端补差距与设备验证；不能默认 WebView 覆盖全部。**按端跨层/未知**。 |
| 品牌与运营配套 | [根 MIT 许可][sp-license] 允许复制修改分发并要求保留版权/许可声明。 | 名称、Logo、视觉、域名、商店素材由纸序替换；第三方依赖/字体/图片单独清单。官网、帮助、订阅、运营后台与发布渠道不能由一个任务客户端自动补齐。顶层 MIT 不是所有资产已许可的审计结论。 |

## 成熟组件的可行边界

下表是组件候选清单，不是已装入纸序的依赖表。

| 组件 | 可复用证据 | 不能替代的工作与下一验证 |
| --- | --- | --- |
| FullCalendar | [官方文档](https://fullcalendar.io/docs) 提供月、TimeGrid、List、拖动/调整尺寸、语言、触摸与无障碍入口；[许可页](https://fullcalendar.io/license) 区分 Standard MIT 与 Premium 商业许可，文档将 Timeline/资源视图标为 Premium。 | 日历是显示/交互层，任务完成、重复实例、离线写入和服务端授权仍属于产品。先把纸序“时间线”需求与具体视图对应，不能因名称近似就采购或自造。验收拖拽全天/定时转换、跨日/时区、移动滚动与触摸冲突、键盘操作；未实测。 |
| rrule 2.8.1 | [官方仓库](https://github.com/jkbrzt/rrule) 支持 RRULE/RRuleSet、例外和序列化；官方强调 floating/UTC/TZID 语义。已有本地记录的标准规则组合 `BYMONTHDAY=28,29,30,31;BYSETPOS=-1` 已通过月末锚点样本。 | 复用计算，不让组件默认行为定义纸序规则。完成日起算、实例完成/撤销、系列修改、提醒调度、农历与调休仍需产品模型。下一项是 DST/跨时区、闰日及完成日起算；不重复已完成月末检查。 |
| Tiptap | [官方概览](https://tiptap.dev/docs/editor/getting-started/overview) 描述基于 ProseMirror 的无固定 UI 编辑器；开源 MIT 与 Pro/Cloud 功能分开。 | 可供自有品牌备注/笔记 UI；内容 schema、迁移、附件存储/授权、中文输入法和粘贴处理要集成验证。不能把版本历史/评论等整个付费套件当作 MIT 核心；编辑器协作也不等于任务共享权限。 |
| Better Auth | [组织插件](https://better-auth.com/docs/plugins/organization) 提供组织、成员、邀请、角色/权限钩子；[Stripe 插件](https://better-auth.com/docs/plugins/stripe) 提供客户、订阅生命周期和 webhook 接入。 | 组织角色可以辅助身份管理，清单级角色/资源归属必须由业务服务执行，不能只校验前端按钮。Stripe 插件不能证明中国运营主体、实际收款通道或应用商店内购已可用。下一验证：邀请撤销、跨清单越权、会话失效、回调重放、权益到期；具体认证/收款方式尚未选定。 |
| RxDB | [官方冲突文档](https://rxdb.info/transactions-conflicts-revisions.html) 区分本地冲突与复制冲突，可注册自定义 conflictHandler；默认解析返回 master、丢弃 fork。 | 自定义 handler 是扩展点，不会自动建立保留双方及选择 UI。需把冲突记录持久化与同步，并证明重放、断线、删除/编辑和恢复后的收敛。不能默认替换 SP 同步后即可完成。 |
| RxDB 存储/许可 | [官方 Premium 页面](https://rxdb.info/premium/) 当前列 Apache-2.0 核心/默认存储与商业 OPFS、SQLite、Filesystem 等存储；免费层列最多 13 个同时打开的 collections。 | 选择存储前须核对目标包版本/具体限制，不照搬旧“全部开源免费”的预算。桌面/移动 SQLite 路线需许可及真实宿主验证。此处不采购、不确定成本优劣。 |

上述组件没有共同保证：鸿蒙原生适配、应用商店上架、穿戴通知、备份导入字段完整性、中文自然语言输入、AI 数据契约、收款资质或整个 SaaS 运维。两条路线都需要为这些范围列独立交付和验收，不缩减既定全套目标。

## 可比较的成本结构

| 维度 | 改造 Super Productivity | 成熟组件组合 |
| --- | --- | --- |
| 已能继承的表面面积 | 已有任务 UI、状态管理、日期和多端工程；保留原架构时潜在节省明显 | 日历/编辑/认证/重复/持久化各自现成；纸序任务流程与外壳需组装 |
| 最大不确定成本 | 改写个人同步分区及冲突语义，同时维持上游数据迁移和版本兼容 | 跨组件的领域契约、持久化一致性、权限与跨端宿主组合 |
| 品牌适配 | 需判断改现有信息结构和样式的面积；不能只数 Logo 文件 | 无固定 UI 的组件便于新视觉，但更多完整页面由项目承担 |
| 长期维护 | 维护 fork 与上游变更冲突；协议级改动更难持续合并 | 维护多个版本、插件许可与接口适配；没有单一上游替项目负责 |
| 已知实测程度 | 仅项目已有限定日期原函数探针，不是整库运行 | 仅项目已有日期组件样本；其余这里是文档级证据 |
| 当前是否能报工期/价格 | 不能，尚无相同纵向样本的集成与升级测量 | 不能，同样缺少集成与平台运行测量 |

这是定性比较而非加权排名。没有因 stars、流行度、语言熟悉程度或“从零更干净”直接选型。

## 下一步验证门槛（规划，尚未执行）

先固定相同输入/预期，再对候选运行，避免为不同路线使用不同标准。以下验证属于后续原型票，不代表本次已获技术路线批准：

1. **共享与离线最小纵向样本**：A 拥有清单，邀请 B，B 离线改标题，A 在线修改同字段；联网后双方版本可见可选；第三设备收到同一结果；C 不可读写。再撤销 B 权限，B 的陈旧离线操作不得重新取得权限，未提交内容如何保留须有明确定义。观察客户端、服务端、数据库及网络失败路径。
2. **冲突耐久性**：同字段、不同字段、delete/edit、批量修改、重复请求、丢失响应、客户端重启；双方候选版本不能在清理日志、同步压缩、备份恢复或升级后静默丢失。记录冲突存储、协议变更及上游测试改动面。
3. **会员一致性**：使用沙箱事件模拟购买、回调重复/乱序、退款、到期、恢复购买和换设备；服务端权益与所有客户端相符。沙箱通过不能代替真实签约/真实收款验收。
4. **日期缺口**：复用已有月末证据，只补闰日、跨时区/DST、完成日重复、删除单次/修改后续、农历闰月及调休更新。固定全天日期、时区与绝对时间各自语义。
5. **平台与升级**：两条路线各完成一个 Web＋Android 或现有可用设备宿主的安装/离线/提醒样本；随后按最终平台矩阵扩展，不能据此宣称全端完成。对 fork 试一次上游合并，对组合路线试一次关键依赖升级，记录冲突文件/适配点而非虚构人天。
6. **准入结果**：形成可重现脚本、失败用例、依赖/许可清单、分平台结果、实测改动面及剩余风险，再提交架构选择供用户决定。预算、设备与外部渠道尚未明确的部分继续标未知。

## 仍未知及不能推出的结论

- 未验证 Super Productivity 整库构建、所有声明平台运行、独立商业服务、完整插件生态与所有素材许可。
- 未验证候选组件之间的实际集成、RxDB 双版本保留、Better Auth 清单级权限或任一真实支付渠道。
- 尚不能给出可靠总人天/总成本，不能声称替换 UI 即可完成滴答等价产品，也不能据此判定组件组合一定更快。
- 现有月末结果只说明两种日期路线都具备该样本的适配途径；它不会消除共享、同步和发行成本。
- REA 是既有研究工具，不是业务底座。当前问题通过固定公开源码已能定位，未为“用了逆向工具”而重复跑无明确问题的全库分析。

[sp-readme]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/README.md
[sp-package]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/package.json
[sp-license]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/LICENSE
[sp-schema]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/packages/super-sync-server/prisma/schema.prisma
[sp-download]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/packages/super-sync-server/src/sync/services/operation-download.service.ts
[sp-upload]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/packages/super-sync-server/src/sync/sync.routes.ops-handler.ts
[sp-project]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/src/app/features/project/project.model.ts
[sp-task]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/src/app/features/tasks/task.model.ts
[sp-repeat]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/src/app/features/task-repeat-cfg/task-repeat-cfg.model.ts
[sp-next]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/src/app/features/task-repeat-cfg/store/get-next-repeat-occurrence.util.ts
[sp-conflict]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/docs/sync-and-op-log/conflict-journal-and-review.md
[sp-recovery]: https://github.com/super-productivity/super-productivity/blob/6e73465cce53538bd2761a5a4a03b0de25d70eee/docs/sync-and-op-log/local-recovery-points.md
