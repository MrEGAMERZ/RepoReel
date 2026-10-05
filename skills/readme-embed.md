# Skill: readme-embed

## Purpose
A clean, professional **45-second** silent-first video clip designed to be embedded directly inside a GitHub README as an animated GIF or autoplay MP4. No voiceover is required. This video must communicate the entire product value through visuals and on-screen text alone, because GitHub README embeds play silently.

---

## Duration
**Exact: 45 seconds**

---

## Target Audience
A developer browsing GitHub who just landed on the repository's README. They are about to decide in the next 10 seconds whether to read further or hit the back button. This video is the visual version of the first paragraph of the README.

---

## Core Principle
> "No sound. No voiceover. Every message must be visible."
> Design every frame as if the viewer has their headphones unplugged. Use on-screen text, animated code, and UI transitions to tell the full story. This is visual storytelling at its purest.

---

## Narrative Structure

| Timestamp | Beat | On-Screen Text | Visual |
|-----------|------|----------------|--------|
| 0–5s | **The Product Title** | Project name + one-line tagline | Clean logo reveal, dark background, elegant typography |
| 5–20s | **The Problem** | "The old way" label | Split screen — slow painful workflow animated |
| 20–38s | **The Magic** | Step labels: "1. Install → 2. Run → 3. Done" | Terminal commands appearing, then the generated output |
| 38–45s | **The CTA** | Install command + GitHub URL | Dark background, white text, clean and minimal |

---

## Tone & Style
- **Voice:** NONE — this video is entirely visual
- **Captions:** All text must be large, high-contrast, and legible in a small GitHub README embed (minimum 18pt equivalent)
- **Pacing:** Slow and deliberate — 4–8s per scene, never rushed
- **Loopability:** REQUIRED — the final frame must blend into the first frame for infinite loop
- **Aspect Ratio:** 16:9 for README embed (standard GitHub width)
- **File target:** Optimized GIF (< 5MB) OR silent MP4 (< 10MB) for embed performance

---

## Visual Design Requirements
Since this will be embedded in a README, visual quality is everything. The viewer can pause and zoom.

- **Color palette:** Only use colors that look good on BOTH GitHub light mode and dark mode backgrounds
  - Safe: Dark charcoal `#1e1e2e` background, `#cdd6f4` white text, `#89b4fa` blue accents
  - Avoid: Pure white backgrounds (blinding in dark mode), neon colors (ugly in light mode)
- **Typography:** Use monospace fonts for code (`JetBrains Mono`, `Fira Code`), sans-serif for labels
- **No watermark:** This embed represents the project itself — no RepoReel branding visible

---

## Visual Prompt Formula
> **[Static or Very Slow Camera] + [Subject] + [On-Screen Text Overlay] + [Dark/Light-Mode Safe Colors] + [Minimal Clean Aesthetic]**

### Reusable Visual Prompt Library for This Skill

**Title Card (0-5s):**
> "Clean dark charcoal background, large bold project name fades in with an elegant scale animation, subtitle tagline appears beneath with a typewriter effect, subtle purple gradient accent line, minimalist tech aesthetic, no camera movement, high clarity"

**Problem Scene (5-20s):**
> "Side-by-side static composition, left panel labeled 'Before' shows a cluttered workflow — multiple terminal tabs, slow progress bars, frustrated developer animation, red accent border. Right panel empty with a subtle question mark. Flat design aesthetic, clean edges, emoji-free, GitHub README compatible color palette"

**Magic Moment (20-38s):**
> "Dark terminal window with clean monospace font, command being typed character by character in amber color, progress bar filling smoothly from left to right, then a final transition reveal showing the generated output file with a satisfying green checkmark icon. Static camera, no shake, extreme clarity"

**CTA End Card (38-45s):**
> "Minimal dark background, installation command in a styled code block with syntax highlighting, GitHub repo URL below, subtle pulsing glow around the text, then a smooth fade that loops back to the title card. Absolutely clean and professional."

---

## Negative Prompts
`voiceover, sound effects, music visualizer, camera shake, talking head, complex scene, multiple characters, outdoor scene, sunlight, natural environment, watermark, logo badge, neon overuse, motion blur`

---

## Script Constraints
- **NO spoken voiceover** — write all messaging as on-screen text
- On-screen text must be max 8 words per line, max 2 lines visible at once
- Every transition must be a clean fade or slide — no flashy wipes or zoom bombs
- The install command MUST appear verbatim and exactly as the user would type it
- Export settings: GIF at 20fps for compatibility, MP4 at 30fps for quality
