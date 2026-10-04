# RepoReel — Engineering Plan

> Last updated: 2026-10-04

---

## Architecture Overview

```
reproreel/
├── src/
│   ├── cli/                    # CLI entry point (Commander.js)
│   │   ├── index.ts            # main CLI commands
│   │   ├── commands/
│   │   │   ├── init.ts         # reproreel init
│   │   │   ├── video.ts        # reproreel video
│   │   │   └── config.ts       # reproreel config
│   │   └── ui/                 # terminal progress UI (ink/ora)
│   │
│   ├── analyzer/               # Stage 1: Repo Analysis
│   │   ├── index.ts
│   │   ├── readme-parser.ts    # extract title, description, features
│   │   ├── code-scanner.ts     # walk file tree, detect tech stack
│   │   ├── git-log.ts          # recent commits, contributors, age
│   │   └── package-parser.ts   # package.json / pyproject / Cargo.toml
│   │
│   ├── story/                  # Stage 2: Story Creation
│   │   ├── index.ts
│   │   ├── narrative-engine.ts # LLM call → story arc generation
│   │   └── skills/             # SKILL.md format definitions
│   │       ├── product-hunt.md
│   │       ├── explainer.md
│   │       ├── twitter-demo.md
│   │       └── release-notes.md
│   │
│   ├── script/                 # Stage 3: Script Writing
│   │   ├── index.ts
│   │   ├── voiceover.ts        # timed script generation
│   │   └── caption-writer.ts   # on-screen text generation
│   │
│   ├── footage/                # Stage 4: Footage Generation
│   │   ├── index.ts
│   │   ├── providers/
│   │   │   ├── runway.ts       # Runway Gen-4 API
│   │   │   ├── wan.ts          # Wan 3.0 / HuggingFace
│   │   │   └── local.ts        # local model fallback (future)
│   │   ├── screenshot.ts       # code/repo screenshots via Puppeteer
│   │   └── asset-manager.ts    # asset cache, dedup, cleanup
│   │
│   ├── audio/                  # Stage 4b: Audio Generation
│   │   ├── index.ts
│   │   ├── tts.ts              # text-to-speech (OpenAI TTS / ElevenLabs)
│   │   └── music.ts            # background music selection
│   │
│   ├── editor/                 # Stage 5: Compilation
│   │   ├── index.ts
│   │   ├── ffmpeg-pipeline.ts  # main FFmpeg assembly
│   │   ├── caption-renderer.ts # burnt-in captions
│   │   ├── transitions.ts      # cut/fade/zoom logic
│   │   └── branding.ts         # watermark, end card
│   │
│   ├── credits/                # Credit & API key management
│   │   ├── index.ts
│   │   ├── tracker.ts          # track usage per session/project
│   │   ├── estimator.ts        # pre-flight cost estimate
│   │   └── config.ts           # BYOK key storage (~/.reproreel/config)
│   │
│   └── shared/
│       ├── types.ts            # shared TypeScript types
│       ├── logger.ts           # structured logging
│       └── errors.ts           # error classes
│
├── skills/                     # Community skill format definitions
│   ├── product-hunt.md
│   ├── explainer.md
│   ├── twitter-demo.md
│   └── release-notes.md
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── package.json
├── tsconfig.json
├── README.md
├── CONTRIBUTING.md
├── DESIGN.md
└── PLAN.md
```

---

## AI Stack Decision

### LLM (Analysis + Story + Script)
**Primary:** Google Gemini 2.0 Flash (via API)
- Fast, cheap, great at code understanding
- Fallback: OpenAI GPT-4o-mini

**Why:** Gemini 2.0 Flash is ~10x cheaper than GPT-4o for the same quality on code summarization tasks. Budget ~$0.01 per story generation.

### Video Generation
**Primary:** Wan 3.0 (via HuggingFace Inference API)
- Apache 2.0 license — safe for commercial use
- ~$0.05/sec at 480p, ~$0.20/sec at 1080p
- Best quality-to-cost ratio in 2026

**Secondary:** Runway Gen-4 Turbo
- ~$0.05/sec, higher polish
- Better for premium output tier

**Fallback:** Static image + pan/zoom (Ken Burns effect) via FFmpeg
- Zero AI cost, always works, looks decent
- Used when: no API key configured, or user chooses `--no-ai-video`

### Text-to-Speech (Voiceover)
**Primary:** OpenAI TTS (tts-1-hd model)
- ~$15/1M chars, ~$0.045 per 60s script
- Natural, multiple voices

**Future:** ElevenLabs voice cloning
- Users can clone their own voice for personal branding

### Compilation
**FFmpeg** — universal, free, runs everywhere
- No dependency on cloud rendering
- All editing, captioning, assembly done locally

---

## Credit System Design

### BYOK (Bring Your Own Key) — Default
```bash
reproreel config set RUNWAY_API_KEY=sk-xxx
reproreel config set OPENAI_API_KEY=sk-xxx
reproreel config set HF_API_KEY=hf_xxx
```

Keys stored in `~/.reproreel/config` (0600 permissions). Never committed to repo.

### Pre-flight Cost Estimate
Before generating, show:
```
┌─────────────────────────────┐
│ Estimated generation cost:  │
│  • LLM (story+script): ~$0.01 │
│  • Video (60s @ 480p):  ~$3.00 │
│  • TTS voiceover:       ~$0.05 │
│  ─────────────────────────── │
│  Total:                ~$3.06 │
│                              │
│ Using: your Wan API key      │
│ Proceed? [Y/n]              │
└─────────────────────────────┘
```

### Free Tier (Future)
- 1 video/month, watermarked
- Credits provided by RepoReel (our API keys)
- Requires signup at reproreel.dev
- Revenue model: freemium → paid credits

### Credit Ledger (Local)
```json
// ~/.reproreel/usage.json
{
  "sessions": [
    {
      "date": "2026-10-04",
      "project": "my-awesome-project",
      "format": "product-hunt",
      "video_seconds": 60,
      "cost_usd": 3.06,
      "provider": "wan"
    }
  ],
  "total_cost_usd": 3.06
}
```

---

## Competitor Gap Analysis

### What RepoClip Can't Do
1. ❌ GitLab / Bitbucket repos (GitHub-only)
2. ❌ Custom voice / voice cloning
3. ❌ BYOK — you pay RepoClip's credits
4. ❌ CLI-native workflow (web UI only)
5. ❌ Private repos without OAuth dance
6. ❌ Offline / local model support
7. ❌ Extensible format system (no SKILL.md)
8. ❌ GitHub Actions integration

### What MoneyPrinterTurbo / RepoToVideo Can't Do
1. ❌ Deep code understanding (no AST analysis)
2. ❌ Multi-format skills (single output format)
3. ❌ Credit estimation before generation
4. ❌ Professional polish (designed for faceless YouTube, not dev tools)
5. ❌ CLI UX designed for developers

### RepoReel's Differentiated Bets
1. ✅ **CLI-first, developer-native** — `npx reproreel video` in 10 seconds
2. ✅ **Multi-platform** — any git repo, not just GitHub
3. ✅ **BYOK transparency** — you know exactly what's being spent and why
4. ✅ **SKILL.md extensibility** — community-driven video formats
5. ✅ **Local/private repo first** — no OAuth, no upload, runs fully local
6. ✅ **Open source** — MIT, forkable, auditable

---

## OSS Community Growth Strategy

### Week 1: Foundation
- [ ] Rock-solid README with clear value prop and demo GIF/video
- [ ] CONTRIBUTING.md with `good-first-issue` labeled issues
- [ ] Discord or GitHub Discussions set up
- [ ] Post on HackerNews "Show HN: RepoReel — generate a promo video from any repo"

### Month 1: Discoverability
- [ ] Submit to "Awesome AI Video" lists
- [ ] Write "How I built an AI video generator in 100 lines" post on dev.to / Hashnode
- [ ] Reply to Reddit r/MachineLearning, r/programming threads about repo promotion
- [ ] GitHub topics: `ai`, `video-generation`, `cli`, `developer-tools`, `open-source`
- [ ] Twitter/X thread: "I hate making demo videos. So I built a CLI that does it. Here's how."

### Sustained Growth
- [ ] `made-with-reproreel` badge in README of videos it generates (viral loop)
- [ ] Weekly "Reel of the Week" — showcase a community-generated video
- [ ] Contributor spotlight in CHANGELOG
- [ ] Respond to every issue within 24h for first 3 months

### The Flywheel
```
Great video output → devs star/share → more contributors → 
better skill formats → better output → more stars
```

---

## Implementation Phases

### Phase 1 — Working CLI (Target: 2 weeks)
1. `reproreel init` — scans repo, writes `.reproreel.json` context file
2. `reproreel video --type product-hunt` — end-to-end pipeline
3. Static image fallback (no API key needed for first test)
4. Wan 3.0 integration for AI footage

### Phase 2 — Polish (Target: 1 month)
1. All 4 skill formats working
2. Cost estimator UX
3. Voice customization (OpenAI TTS voices)
4. Install script (`curl | bash`)

### Phase 3 — Platform (Target: 3 months)
1. reproreel.dev web UI
2. Free watermarked tier
3. GitHub Action
4. Analytics

---

## Engineering Decisions Log

| Decision | Choice | Reason |
|----------|--------|--------|
| Language | TypeScript | Type safety for complex pipeline, great ecosystem |
| CLI framework | Commander.js | Mature, simple, well-documented |
| Terminal UI | Ora + chalk | Lightweight spinner + colored output |
| Video AI | Wan 3.0 primary | Apache 2.0 license, best cost/quality |
| LLM | Gemini 2.0 Flash | Cheapest for code understanding |
| Compilation | FFmpeg | Universal, free, no cloud dependency |
| Config storage | `~/.reproreel/config` | OS-level, never in repo |
| Package manager | npm / npx | Zero install friction for `npx reproreel` |
