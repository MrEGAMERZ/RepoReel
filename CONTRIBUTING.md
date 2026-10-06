# Contributing to RepoReel

First off — thanks for being here. Every contribution, big or small, makes RepoReel better for every developer who uses it.

---

## What We Need Most

| Area | What to build | Difficulty |
|------|---------------|------------|
| 🎬 **New skill formats** | Add a `skills/your-format.md` (plain text, no code required) | ⭐ Easy |
| 🌐 **Platform support** | GitLab, Bitbucket support in the analyzer | ⭐⭐ Medium |
| 🔌 **New AI providers** | Add `src/footage/providers/yourprovider.ts` | ⭐⭐ Medium |
| 🐛 **Bug fixes** | See [open issues](../../issues) | Varies |
| 📖 **Docs & examples** | Improve README, add generated video examples | ⭐ Easy |

---

## Getting Started

```bash
git clone https://github.com/MrEGAMERZ/RepoReel.git
cd RepoReel
npm install
npm run dev
```

That's it. `npm run dev` runs the CLI in dev mode against your current directory.

---

## Adding a New Skill Format

The easiest contribution — no TypeScript needed. Create `skills/your-format.md`:

```markdown
# Skill: your-format

## Purpose
One sentence: who is this video for and what should it make them do?

## Duration
45 seconds

## Target Audience
Describe who is watching. Be specific. "Developers who..." not "everyone".

## Narrative Structure

| Timestamp | Beat | Voiceover Goal | Visual Goal |
|-----------|------|----------------|-------------|
| 0–5s      | Hook | Start with the pain. No intro. | Show the broken old way |
| 5–30s     | Demo | Introduce the product. Show the magic moment. | Product in action |
| 30–40s    | Proof | One credibility signal. | Stars, commits, tech |
| 40–45s    | CTA  | One action. No alternatives. | Bold URL on screen |

## Tone
Conversational. Fast cuts. Second person ("You're...").
```

Submit a PR with your new file. That's the whole contribution.

---

## Adding an AI Video Provider

Implement the `VideoProvider` interface in `src/footage/providers/`:

```typescript
export interface VideoProvider {
  name: string;
  estimateCost(seconds: number, resolution: string): number;
  generate(prompt: string, options: GenerateOptions): Promise<string>; // returns local file path
}
```

See [`src/footage/providers/runway.ts`](src/footage/providers/) for a reference implementation.

---

## Pull Request Guidelines

1. **One PR per feature or fix** — keep them focused and easy to review
2. **Add tests** if you're touching the pipeline (`npm test`)
3. **Update the relevant SKILL.md** if your PR changes behavior for a format
4. **Run `npm run lint`** before submitting

---

## First-Time Contributors

Look for [`good-first-issue`](../../issues?q=label%3Agood-first-issue) labels. These are specifically scoped for contributors who are new to the codebase.

---

## Code of Conduct

Be kind. We're all builders here.
