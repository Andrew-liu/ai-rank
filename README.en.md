<div align="center">
  <h1>My AI Rank</h1>
  <p>
    <a href="https://github.com/Andrew-liu/ai-rank/stargazers"><img src="https://img.shields.io/github/stars/Andrew-liu/ai-rank?style=flat-square&amp;color=c6ff3e" alt="GitHub stars"></a>
    <a href="https://airank.dinosaurliu.com/"><img src="https://img.shields.io/badge/Live-My%20AI%20Rank-c6ff3e?style=flat-square" alt="Live site"></a>
    <a href="https://github.com/Andrew-liu/ai-rank/actions/workflows/deploy.yml"><img src="https://img.shields.io/github/actions/workflow/status/Andrew-liu/ai-rank/deploy.yml?branch=main&amp;label=deploy&amp;style=flat-square" alt="Deploy workflow"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="MIT License"></a>
  </p>
  <p>Create your own tier list for AI models and agents.</p>
  <p>
    <a href="https://airank.dinosaurliu.com/">Live site</a> ·
    <a href="README.md">简体中文</a>
  </p>
</div>

My AI Rank is a browser-based ranking tool for AI models and agents. Drag cards into tiers, customize the entries, then download or copy the completed board as a PNG.

## Features

- Separate tier lists for AI models and AI agents
- One-click switching between Chinese and English
- Drag-and-drop ranking with custom entries and removal controls
- Automatic local persistence for rankings, author details, and language settings
- Download or copy the complete board as a PNG
- Fully static, with no dependencies or backend required

## Run locally

Start any static file server in the project directory:

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## Data and privacy

Rankings, custom entries, names, and handles are stored only in the current browser through `localStorage`. Nothing is uploaded to a server. Clearing the site's browser data also removes this information.

## Deployment

A push to `main` triggers [GitHub Actions](https://github.com/Andrew-liu/ai-rank/actions/workflows/deploy.yml), which validates required files and JavaScript syntax before deploying the site to GitHub Pages.

Before the first deployment, set the Pages source in the repository to:

```text
Settings → Pages → Source → GitHub Actions
```

## Disclaimer

The tiers, preset entries, and user-generated rankings shown by this project are subjective and do not represent official evaluations, performance guarantees, or purchasing advice for any model, product, vendor, or service. Product names, trademarks, and icons belong to their respective owners and are used only for identification and presentation. Please contact the maintainer if any material should be removed.

## License

[MIT](LICENSE)
