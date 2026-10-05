<div align="center">

<img src="https://img.shields.io/badge/RepoReel-AI%20Video%20Generator-6C63FF?style=for-the-badge" alt="RepoReel">

# 🎬 RepoReel

### Turn any GitHub repo into a stunning promotional video — in one command.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/yourusername/RepoReel?style=social)](https://github.com/yourusername/RepoReel)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Made with AI](https://img.shields.io/badge/Powered%20by-AI-blue)](https://github.com/yourusername/RepoReel)

[**Demo**](#demo) · [**Quick Start**](#quick-start) · [**How It Works**](#how-it-works) · [**Roadmap**](#roadmap) · [**Contributing**](#contributing)

</div>

---

## The Problem

You built something great. But nobody knows about it.

Making a promotional video for your project means:
- 📹 Recording 3–4 Loom takes while narrating your own code
- ✂️ Manually editing captions, trimming, adding music
- 📝 Writing descriptions from scratch
- ⏱️ **Wasting 4+ hours you could spend building**

Most developers just skip it. Projects go unnoticed. The README is all there is.

**RepoReel fixes that.**

---

## What It Does

```bash
npx reproreel video --type product-hunt
```

That's it. RepoReel will:

1. 🔍 **Scan your repo** — README, code structure, git history, package files
2. 📖 **Write the story** — Problem → Solution → Demo → CTA narrative
3. 🎙️ **Generate the script** — timed voiceover for your chosen video format
4. 🎬 **Create footage** — AI-generated visuals matched to your project's vibe
5. ✂️ **Edit & compile** — transitions, captions, music, branding
6. 💾 **Save locally** — `output.mp4` drops right in your project folder

---

## Quick Start

### The "Zero-Key" Agent-Native Workflow
If you are using an AI agent like **Cursor**, **Claude Code**, or **Antigravity (Gemini)**, you can make the agent do all the heavy lifting using its *own* subscription tokens. You don't need an OpenAI or Gemini API key!

1. Tell your AI Agent to pull the tool:
   > "Pull the RepoReel install script from GitHub and run it."
   
   *(Or just run it yourself:)*
   ```bash
   curl -fsSL https://raw.githubusercontent.com/MrEGAMERZ/RepoReel/master/install.sh | bash
   ```

2. Tell your AI Agent to write the script and render it:
   > "Read my repo and write a 60-second video script based on the format in `skills/launch-video.md`. Save it as `script.json`, then run `reporeel render script.json`."

That's it. Your agent will analyze your repo, write the perfect script (costing you $0 in API keys), and RepoReel will render the final MP4 using the video API.

### Manual CLI Workflow
If you prefer running it manually without an agent:
```bash
# Set your keys once
reporeel config set GEMINI_API_KEY=your_key
reporeel config set HIGGSFIELD_API_KEY=your_key

# Generate a Product Hunt launch video (60 seconds)
reporeel launch-video
```

---

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                        RepoReel Pipeline                     │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  1. ANALYZE  │  2. STORY    │  3. SCRIPT   │  4. FOOTAGE    │
│              │              │              │                │
│  README      │  Problem →   │  Voiceover   │  AI Video      │
│  Code AST    │  Solution →  │  script      │  generation    │
│  git log     │  Demo →      │  timed to    │  (Wan/Runway)  │
│  package.json│  CTA         │  format      │  + screenshots │
├──────────────┴──────────────┴──────────────┴────────────────┤
│                  5. COMPILE & EDIT                           │
│      FFmpeg assembly · captions · transitions · music       │
├─────────────────────────────────────────────────────────────┤
│                  6. OUTPUT: output.mp4                       │
└─────────────────────────────────────────────────────────────┘
```

### Video Formats (Skills)

Each format is defined as a `SKILL.md` — a declarative spec the AI reads to know how to structure the video. Community-contributed formats welcome!

| Format | Duration | Best For |
|--------|----------|----------|
| `product-hunt` | 60s | PH launches, homepage hero |
| `explainer` | 3 min | Docs, YouTube, onboarding |
| `twitter-demo` | 15s | X/Twitter, viral clips |
| `release-notes` | 90s | "What's new in v2.0" posts |
| `readme-video` | 60s | Embed in GitHub README |

---

## Credit System

RepoReel uses a **BYOK (Bring Your Own Key)** model by default.

```bash
reproreel config set RUNWAY_API_KEY=your_key_here
# or
reproreel config set HUGGINGFACE_API_KEY=your_key_here
```

**Estimated cost per video:**

| Video Length | Estimated AI Cost | Provider |
|-------------|-----------------|----------|
| 15 seconds | ~$0.75 | Runway Gen-4 Turbo |
| 60 seconds | ~$3.00 | Runway Gen-4 Turbo |
| 60 seconds | ~$1.50 | Wan 3.0 (480p) |
| 3 minutes | ~$9.00 | Wan 3.0 (1080p) |

> Free tier coming: 1 watermarked video/month included, no key needed.

---

## Why RepoReel Beats The Alternatives

| | RepoReel | RepoClip | Loom | Synthesia |
|--|---------|---------|------|-----------|
| CLI-native | ✅ | ❌ | ❌ | ❌ |
| Multi-platform (GitLab, Bitbucket) | ✅ | ❌ GitHub only | N/A | N/A |
| Custom voices / voice cloning | ✅ | ❌ preset only | ✅ | ✅ |
| 100% local/private repo support | ✅ | Partial | ✅ | N/A |
| BYOK (your API credits) | ✅ | ❌ | N/A | ❌ |
| Open source | ✅ MIT | ❌ | ❌ | ❌ |
| Extensible format skills | ✅ | ❌ | N/A | N/A |
| Works offline (local models) | 🔜 | ❌ | ❌ | ❌ |

---

## Roadmap

### Phase 1 — CLI Core (Now)
- [x] Project scaffolding & architecture
- [ ] Repo analyzer (README + AST + git log)
- [ ] Story generator (LLM-powered narrative)
- [ ] Script writer (timed voiceover)
- [ ] Footage generator (Wan 3.0 + Runway integration)
- [ ] FFmpeg compilation pipeline
- [ ] `product-hunt` and `explainer` skill formats
- [ ] Local MP4 export

### Phase 2 — Polish & Distribution
- [ ] Install script (`curl | bash`)
- [ ] Free watermarked tier (no API key needed)
- [ ] Voice cloning support (ElevenLabs integration)
- [ ] More skill formats (twitter-demo, release-notes)
- [ ] GitLab + Bitbucket support

### Phase 3 — Web UI & Platform
- [ ] `reproreel.dev` — paste URL, get video
- [ ] GitHub Action (auto-generate on release)
- [ ] Team/org credit pooling
- [ ] Analytics (view count, engagement)

---

## Contributing

RepoReel is MIT-licensed and contribution-friendly. The most valuable things you can add:

- 🎬 **New skill formats** — add a `skills/your-format.md`
- 🌐 **Platform support** — GitLab, Bitbucket, local repos
- 🔌 **AI provider integrations** — more video generation APIs
- 🐛 **Bug fixes & performance improvements**

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started. First-time contributors: look for issues labeled [`good-first-issue`](../../issues?q=label%3Agood-first-issue).

---

## Community

- 💬 [Discussions](../../discussions) — ideas, questions, showcase your generated videos
- 🐛 [Issues](../../issues) — bug reports and feature requests
- 🐦 [Twitter/X](https://x.com) — tag us with your generated videos

---

## License

MIT © [Your Name](https://github.com/yourusername)

---

<div align="center">

**If RepoReel saved you time, give it a ⭐ — it helps others find it.**

</div>
