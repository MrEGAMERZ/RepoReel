<div align="center">

<br/>

<img src="https://img.shields.io/badge/─────────────────────────────────────────────-transparent?style=flat" alt="">

```
██████╗ ███████╗██████╗  ██████╗ ██████╗ ███████╗███████╗██╗
██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔══██╗██╔════╝██╔════╝██║
██████╔╝█████╗  ██████╔╝██║   ██║██████╔╝█████╗  █████╗  ██║
██╔══██╗██╔══╝  ██╔═══╝ ██║   ██║██╔══██╗██╔══╝  ██╔══╝  ██║
██║  ██║███████╗██║     ╚██████╔╝██║  ██║███████╗███████╗███████╗
╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
```

### **Turn any git repo into a promotional video — in one command.**

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/reproreel?style=flat-square&color=cb3837)](https://www.npmjs.com/package/reproreel)
[![Stars](https://img.shields.io/github/stars/MrEGAMERZ/RepoReel?style=flat-square&color=ffd700)](https://github.com/MrEGAMERZ/RepoReel/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Node.js ≥18](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)](https://nodejs.org)

<br/>

[**Quick Start**](#-quick-start) · [**Video Formats**](#-video-formats) · [**Pricing**](#-pricing) · [**Roadmap**](#-roadmap) · [**Contributing**](#-contributing)

<br/>

</div>

---

## The Problem

You built something genuinely useful. Your README is solid. Your code is clean.

But nobody's discovered it yet — because **the GitHub README is not enough in 2026.**

The projects getting traction have a demo video on their landing page, a 15-second clip on X, a Product Hunt launch video. Creating all of that used to mean:

- 🎙️ Recording 3-4 Loom takes and re-scripting every time
- ✂️ Hours in a video editor you don't know how to use
- 📝 Writing a separate description for every platform
- ⏱️ **Burning a whole day** before you can get back to building

**Most developers skip it.** Great projects stay undiscovered.

RepoReel fixes that.

---

## ⚡ Quick Start

### Option A — Zero-Key (Use Your AI Agent's Subscription)

If you use **Cursor**, **Claude Code**, **Antigravity**, or any AI coding agent, you can skip API keys entirely. Tell your agent:

> *"Pull the RepoReel install script from GitHub and run it. Then read this repo and generate a 60-second Product Hunt launch video using the `skills/launch-video.md` format."*

Your agent analyzes the repo, writes the script, and RepoReel renders the video — **\$0 in API costs.**

---

### Option B — CLI (Manual, 2 minutes)

**1. Install**

```bash
curl -fsSL https://raw.githubusercontent.com/MrEGAMERZ/RepoReel/master/install.sh | bash
```

Or with npm:

```bash
npm install -g reproreel
```

**2. Add your API keys** *(one-time setup)*

```bash
reproreel config set GEMINI_API_KEY=your_key
reproreel config set HF_API_KEY=your_key       # for Wan 3.0 video
# or
reproreel config set RUNWAY_API_KEY=your_key   # for Runway Gen-4
```

**3. Generate your video**

```bash
# 60-second Product Hunt launch video
reproreel launch-video

# Or pick a format explicitly
reproreel video --type product-hunt
reproreel video --type twitter-demo
reproreel video --type explainer
reproreel video --type release-notes
```

Your video lands at `./output.mp4`. Done.

---

## 🎬 What Happens When You Run It

RepoReel runs a 6-stage pipeline, entirely on your machine:

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│  ANALYZE │ → │  STORY   │ → │  SCRIPT  │ → │ FOOTAGE  │ → │  EDIT    │ → │ OUTPUT   │
│          │   │          │   │          │   │          │   │          │   │          │
│ README   │   │ Problem  │   │ Voiceover│   │ AI video │   │ Captions │   │output.mp4│
│ Code AST │   │ Solution │   │ timed to │   │ Wan 3.0  │   │ Music    │   │ ready to │
│ git log  │   │ Demo     │   │ your     │   │ Runway   │   │ Titles   │   │ upload   │
│ pkg files│   │ CTA      │   │ format   │   │ FFmpeg   │   │ Branding │   │          │
└──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
```

No uploads. No cloud. Everything runs locally — your repo never leaves your machine.

---

## 🎭 Video Formats

Each format is a `SKILL.md` — a plain-text spec that tells RepoReel how to structure, pace, and write the video. They're community-contributed, version-controlled, and fully customizable.

| Format | Duration | Best For | Command |
|--------|----------|----------|---------|
| `launch-video` | 60s | Product Hunt, Show HN, homepage hero | `reproreel launch-video` |
| `explainer` | 3 min | Docs site, YouTube, onboarding | `reproreel video --type explainer` |
| `twitter-promo` | 15s | X/Twitter, LinkedIn clips | `reproreel video --type twitter-promo` |
| `release-notes` | 90s | "What's new in v2.0" posts | `reproreel video --type release-notes` |
| `readme-embed` | 60s | Embed directly in your GitHub README | `reproreel video --type readme-embed` |

**Want a new format?** Add a `skills/your-format.md` and submit a PR. It's the easiest contribution you can make — no TypeScript required.

---

## 💰 Pricing

RepoReel is **BYOK** (Bring Your Own Key). You connect your own API keys and pay the providers directly — no markup, no middleman.

| Video Length | Resolution | Cost | Provider |
|-------------|-----------|------|----------|
| 15 seconds | 720p | ~\$0.75 | Runway Gen-4 Turbo |
| 60 seconds | 480p | ~\$1.50 | Wan 3.0 |
| 60 seconds | 1080p | ~\$3.00 | Runway Gen-4 Turbo |
| 3 minutes | 1080p | ~\$9.00 | Wan 3.0 |

Before every generation, RepoReel shows you a cost estimate and asks for confirmation. No surprises.

```
┌─────────────────────────────────┐
│  Estimated generation cost      │
│  • Story + script (LLM): ~$0.01 │
│  • Video (60s @ 480p):  ~$1.50  │
│  • Voiceover (TTS):     ~$0.05  │
│  ─────────────────────────────  │
│  Total:                ~$1.56   │
│  Provider: Wan 3.0 (your key)   │
│                                 │
│  Proceed? [Y/n]                 │
└─────────────────────────────────┘
```

> **No API key?** Use the agent-native workflow (Option A above) — your AI agent's subscription covers the LLM calls, and RepoReel falls back to a Ken Burns static-image video at zero cost.

---

## 🆚 How It Compares

|  | **RepoReel** | RepoClip | Loom | Synthesia |
|--|:-----------:|:--------:|:----:|:---------:|
| CLI-native (`npx reproreel`) | ✅ | ❌ | ❌ | ❌ |
| Works with GitLab & Bitbucket | ✅ | ❌ GitHub only | N/A | N/A |
| BYOK — use your own API credits | ✅ | ❌ | N/A | ❌ |
| Private/local repos, no OAuth | ✅ | Partial | ✅ | N/A |
| Extensible format skills | ✅ | ❌ | N/A | N/A |
| Open source (MIT) | ✅ | ❌ | ❌ | ❌ |
| Custom voice / voice cloning | ✅ | ❌ preset only | ✅ | ✅ |
| Offline / local model fallback | 🔜 | ❌ | ❌ | ❌ |

---

## 🗺️ Roadmap

### ✅ Phase 1 — CLI Core *(Now)*
- [x] Project scaffolding & architecture
- [x] 5 production-quality video skill formats
- [x] Agent-native workflow (zero API key mode)
- [x] Install script (`curl | bash`)
- [ ] Repo analyzer (README + AST + git log)
- [ ] Story generator (LLM-powered narrative)
- [ ] Script writer (timed voiceover)
- [ ] Footage generator (Wan 3.0 + Runway integration)
- [ ] FFmpeg compilation pipeline
- [ ] Local MP4 export

### 🔜 Phase 2 — Polish & Distribution
- [ ] Free watermarked tier (1 video/month, no key needed)
- [ ] Voice cloning support (ElevenLabs)
- [ ] GitLab + Bitbucket support
- [ ] `made-with-reproreel` badge (viral loop)

### 🔮 Phase 3 — Platform
- [ ] `reproreel.dev` — paste URL, get video
- [ ] GitHub Action (auto-generate on every release)
- [ ] Team credit pooling
- [ ] Video analytics

---

## 🤝 Contributing

RepoReel is MIT-licensed and **actively welcoming contributors.** This project grows through community-built skill formats and integrations.

**The highest-impact things you can add:**

| Contribution | What it looks like | Difficulty |
|--------------|--------------------|------------|
| 🎬 New skill format | A `skills/your-format.md` (plain text, no code) | ⭐ Easy |
| 🌐 Platform support | GitLab / Bitbucket in the analyzer | ⭐⭐ Medium |
| 🔌 New AI provider | `src/footage/providers/yourprovider.ts` | ⭐⭐ Medium |
| 🐛 Bug fix | Check [open issues](../../issues) | Varies |
| 📖 Docs & examples | Improve guides, add examples | ⭐ Easy |

**Get started in 60 seconds:**

```bash
git clone https://github.com/MrEGAMERZ/RepoReel.git
cd RepoReel
npm install
npm run dev
```

First-time contributor? Look for [`good-first-issue`](../../issues?q=label%3Agood-first-issue) labels.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## 💬 Community

- 🗣️ [GitHub Discussions](../../discussions) — show your generated videos, ask questions, share ideas
- 🐛 [Issues](../../issues) — bug reports and feature requests  
- 🐦 [X / Twitter](https://x.com) — share your video and tag us

---

## 📄 License

MIT © [MrEGAMERZ](https://github.com/MrEGAMERZ)

---

<div align="center">

**If RepoReel saved you time, a ⭐ goes a long way — it helps other developers find it.**

</div>
