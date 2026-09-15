# HausPower: Creative Direction

## Emotional territory
Quiet luxury trust. The electrician the best designers and builders call without making a fuss about it. Dark, architectural, restrained. Borrowed from Bang & Olufsen: technology treated as architecture, precision shown through restraint, and generous negative space that lets a single object carry the page.

## Visual identity

### Palette (tokens live in `src/css/style.css` `:root`)
| Token | Hex | Use |
|---|---|---|
| `--ink` | #0B0D0F | Page background, dark sections |
| `--graphite` | #14181B | Cards, raised dark surfaces |
| `--line` | #2A2F34 | Hairline rules and borders |
| `--ivory` | #EDEBE6 | Primary text on dark |
| `--mist` | #A9AFB4 | Body text on dark |
| `--dim` | #7C8288 | Labels and metadata on dark |
| `--red` | #D72327 | HausPower red. Buttons, indicator dot, brand mark. Used sparingly |
| `--red-deep` | #B81C20 | Button hover, red text on bone |
| `--red-text` | #F0443F | Small red text on dark (passes AA) |
| `--bone` | #F3F1EC | Light "partners" surfaces |
| `--slate` | #5B6166 | Body text on bone |

### WCAG AA contrast audit
| Text / background | Ratio | Use |
|---|---|---|
| ivory #EDEBE6 / ink #0B0D0F | 16.3:1 | Headings, body |
| mist #A9AFB4 / ink #0B0D0F | 8.8:1 | Body copy |
| mist #A9AFB4 / graphite #14181B | 8.1:1 | Card copy |
| dim #7C8288 / ink #0B0D0F | 5.0:1 | Mono labels |
| red-text #F0443F / ink #0B0D0F | 5.2:1 | Small red labels |
| white / red #D72327 | 5.1:1 | Primary button |
| white / red-deep #B81C20 | 6.5:1 | Button hover |
| ink #111417 / bone #F3F1EC | 16.4:1 | Headings on bone |
| slate #5B6166 / bone #F3F1EC | 5.6:1 | Body on bone |
| red-deep #B81C20 / bone #F3F1EC | 5.8:1 | Labels on bone |
Brand red #D72327 on ink measures 3.9:1, so it is only used for non-text marks and large display type.

### Typography
- **Outfit** (the existing brand face, from the HausPower logo system). Weights 300 (display at 40px+ only), 400, 500.
- **IBM Plex Mono** 400 for spec-style labels (section numbers, credential lines). Evokes circuit labelling and panel schedules.
- No serif. B&O restraint favours a single sans voice.
- Scale: hero clamp(2.9rem, 8vw, 7.25rem); section h2 clamp(2.1rem, 4.6vw, 4rem); body 17px (never below 15px); labels 12px mono uppercase, 0.16em tracking.

### Spacing and grid
Open and architectural. 12-column grid, section padding clamp(88px, 12vw, 180px). Asymmetric layouts: text caged in columns 1 to 6, images bleeding to the edge. Mobile collapses to one column with the same type ratios.

### Corners and shadows
Near-square corners (4px) on images and cards, fully round pills on buttons. No drop shadows. Depth comes from hairlines and light.

### Image treatment
Architectural and dark. Night exteriors lit by design, close details of keypads and panels. Slight desaturation (`saturate(.85)`) and a bottom gradient wherever text sits on an image. `object-position` set per image.

### Geometric motif
The indicator dot: a small red circle, like a power LED on a B&O product. Appears in labels, nav active state, and the hero credential box. Paired with 1px hairline rules.

## Motion design language
- Primary easing: `cubic-bezier(0.22, 1, 0.36, 1)` (GSAP `expo.out` / `power3.out`).
- Duration scale: base 0.6s. Micro 0.3s, standard 0.6s, dramatic 1.2s, cinematic 1.8s.
- Enter direction: from below (y 28px) and from the left for labels, guiding the eye down toward the quote CTA.
- Stagger: characters n/a, words 0.06s, elements 0.12s, sections 0.25s.
- Exit: hold (editorial). Only the hero recedes (image scale and dim on scrub).
- Scroll sync: hero parallax and manifesto word reveal are scrubbed; everything else triggers once.
- Choreography groups: label + heading + body enter as one group; service rows enter as a stagger group; testimonial track is one scrubbed unit.
- Progressive enhancement: start states apply only under `html.js`. If JavaScript or GSAP fails, all content is visible. `prefers-reduced-motion` disables all motion.

## Content production system
- Voice: Relaxed precision. Short, sharp sentences. Active voice. Specific nouns. No hype.
- Hero headline formula: [Verb] + [who] + [where]. "Powering Ontario's finest homes." (31 characters)
- Headline budget: hero 20 to 35 characters; section headings 30 to 50.
- Section heading pattern: declarative statements ("Six disciplines. One licensed team.").
- Body: max 3 sentences per paragraph, 2 paragraphs per section.
- CTAs: primary "Request a quote", secondary "Talk to Matt", micro "See the services", "How we work safely".
- Proof: real client reviews edited to short pull quotes, attributed by name, role and city.
- Hard copy rules: no em or en dashes, no "not X, but Y" constructions, no banned buzzwords, no invented stats, years or project counts.

## Site architecture
| Page | URL | Purpose |
|---|---|---|
| Home | `/` | The full story. Full GSAP treatment |
| Services | `/services` | Six disciplines in detail + FAQ |
| Safety & Standards | `/safety-standards` | ECRA/ESA licensing, ESA inspection, eight site protocols |
| About | `/about` | Matt Allen, the SmartHaus story, service area |
| Request a Quote | `/request-a-quote` | The conversion page: form + phone + email |
| 404 | `/404` | Branded recovery page |

Every page ends in the quote CTA. Legacy Duda URLs redirect with 301s (`/our-services` to `/services`, trailing-slash variants to their clean paths).
