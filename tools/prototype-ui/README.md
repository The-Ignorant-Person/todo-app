# 纸序交互设计原型

仅用于视觉与交互决策，非产品代码。React 组件共享一份内存状态，刷新即重置；没有同步、支付或账号服务。

运行（项目根目录，PowerShell）：

```powershell
Push-Location tools/prototype-ui
npm ci --ignore-scripts
npm run build
Pop-Location
node tools/brand-prototype-server.mjs
```

已存在 4178 服务时，只需构建并刷新。服务仅监听 `127.0.0.1`，只提供既有原型白名单文件。

- 首页：`http://127.0.0.1:4178/docs/product/prototypes/brand-unified-prototype.html?scene=home`
- 工作区：同一地址 `?scene=app`
- 帮助、会员：`?scene=help` / `?scene=membership`

`src/main.jsx` 是可编辑源文件；构建到 `docs/product/prototypes/brand-unified.js` 和 `.css`。不要直接修改构建文件。React 组件身份保持稳定，避免每次输入重建编辑器。

实际使用 Radix Dialog、Popover、DropdownMenu、Tooltip、Checkbox；React DayPicker 日历；cmdk 搜索；Sonner 撤销提示；Lucide 图标。没有把 shadcn/ui 的名称当成已经安装或复制其组件的证据。所有直接版本和传递依赖由 lockfile 固定；这些是原型候选，尚不是全端产品依赖批准。

示例日期固定为 2026-10-18，便于重复核对。键盘：N 聚焦添加；Ctrl/Cmd K 搜索；Esc 关闭当前弹层。离线模拟在工作区右上角“本地体验”。

`THIRD_PARTY_NOTICES.txt` 由构建扫描实际输入包的许可证生成。用户确认的品牌概念图另见 `docs/brand-guidelines.md`；当前标志仍是概念板的显示裁切，不是新绘制的生产矢量。
