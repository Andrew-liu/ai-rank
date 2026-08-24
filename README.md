<div align="center">
  <h1>My AI Rank</h1>
  <p>
    <a href="https://github.com/Andrew-liu/ai-rank/stargazers"><img src="https://img.shields.io/github/stars/Andrew-liu/ai-rank?style=flat-square&amp;color=c6ff3e" alt="GitHub stars"></a>
    <a href="https://airank.dinosaurliu.com/"><img src="https://img.shields.io/badge/Live-My%20AI%20Rank-c6ff3e?style=flat-square" alt="Live site"></a>
    <a href="https://github.com/Andrew-liu/ai-rank/actions/workflows/deploy.yml"><img src="https://img.shields.io/github/actions/workflow/status/Andrew-liu/ai-rank/deploy.yml?branch=main&amp;label=deploy&amp;style=flat-square" alt="Deploy workflow"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="MIT License"></a>
  </p>
  <p>创建属于你的 AI 模型与 Agent 分级榜单。</p>
  <p>
    <a href="https://airank.dinosaurliu.com/">在线体验</a> ·
    <a href="README.en.md">English</a>
  </p>
</div>

My AI Rank 是一个可直接在浏览器中使用的 AI 排名工具。将模型或 Agent 卡片拖入不同档位，自定义榜单内容，并导出或复制为 PNG。

## 功能介绍

- 分别创建 AI 模型与 AI Agent 榜单
- 中文、英文界面一键切换
- 拖拽卡片完成分级，支持添加和移除自定义条目
- 自动在浏览器本地保存榜单、作者信息与语言设置
- 将完整榜单下载或复制为 PNG
- 纯静态实现，无需安装依赖或后端服务

## 本地运行

在项目目录启动任意静态文件服务器：

```bash
python3 -m http.server 8080
```

打开 `http://127.0.0.1:8080/`。

## 数据与隐私

榜单、自定义条目、姓名和账号信息仅保存在当前浏览器的 `localStorage` 中，不会上传到服务器。清理浏览器站点数据会同时清除这些内容。

## 部署

推送到 `main` 分支后，[GitHub Actions](https://github.com/Andrew-liu/ai-rank/actions/workflows/deploy.yml) 会检查必要文件和 JavaScript 语法，并自动部署到 GitHub Pages。

首次部署前，请在仓库中将 Pages 来源设置为：

```text
Settings → Pages → Source → GitHub Actions
```

## 免责声明

本项目展示的分级、预设条目与用户生成榜单均属于主观整理，不构成对任何模型、产品、厂商或服务的官方评价、性能保证或购买建议。相关名称、商标与图标归各自权利人所有，仅用于识别和展示；如有侵权，请联系移除。

## License

[MIT](LICENSE)
