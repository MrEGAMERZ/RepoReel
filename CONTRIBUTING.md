# Contributing to RepoReel

First off — thank you for being here. RepoReel is better because of contributors like you.

## What We Need Most

The highest-value contributions right now:

| Area | What to build | Difficulty |
|------|--------------|-----------|
| 🎬 **New skill formats** | Add a `skills/your-format.md` | Easy |
| 🔌 **New AI providers** | Add `src/footage/providers/yourprovider.ts` | Medium |
| 🌐 **Platform support** | GitLab, Bitbucket support in analyzer | Medium |
| 🐛 **Bug fixes** | See [open issues](../../issues) | Varies |
| 📖 **Docs** | Improve README, add examples | Easy |

## Getting Started

```bash
git clone https://github.com/yourusername/RepoReel
cd RepoReel
npm install
npm run dev
```

## Adding a New Skill Format

The easiest contribution. Create `skills/your-format.md`:

```markdown
# Skill: your-format

## Duration
60 seconds

## Structure
- 0-10s: Hook / problem statement
- 10-40s: Demo / solution
- 40-55s: Key features (3 max)
- 55-60s: CTA

## Tone
Professional but energetic. Fast cuts.

## Voiceover Style
Second person ("You're building X..."), conversational.
```

That's it. Submit a PR.

## Adding an AI Provider

Implement the `VideoProvider` interface in `src/footage/providers/`:

```typescript
export interface VideoProvider {
  name: string;
  estimateCost(seconds: number, resolution: string): number;
  generate(prompt: string, options: GenerateOptions): Promise<string>; // returns local file path
}
```

## First-Time Contributors

Look for issues labeled [`good-first-issue`](../../issues?q=label%3Agood-first-issue).

## Pull Request Guidelines

1. One PR per feature/fix
2. Add tests if you're touching the pipeline
3. Update relevant SKILL.md if adding a format
4. Run `npm test` before submitting

## Code of Conduct

Be kind. We're all builders here.
