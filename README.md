# Vanrish Technology — homepage redesign

Self-contained static rebuild of https://vanrish.com/ (homepage). Plain HTML/CSS/JS, no build step.

## Preview
```bash
cd vanrish-redesign
python3 -m http.server 8080   # or: npx serve .
# open http://localhost:8080
```
Internal links (`/casestudy/`, `/aiagents/`, `/industries/?ind=…`) point at live-site paths, so they 404 locally until deployed to vanrish.com.

## Structure
```
index.html          homepage (inline SVG icon sprite at top of <body>)
css/styles.css      tokens + all styles (mobile-first)
js/main.js          nav, Calendly popup, chat toggle, GSAP/Lenis motion
js/chat.js          copied unchanged from live site (POSTs to /chatbot-api.php)
assets/clients/     client logos (from client_img/)
assets/partners/    partner logos (from content/img/index/)
assets/brand/       Vanrish logo + favicon
```

## Design tokens
| Token | Value | Use |
|---|---|---|
| `--ink` | `#0B1220` | dark sections, primary text on light |
| `--paper` | `#F7FAFC` | warm off-white alternate sections |
| `--white` | `#FFFFFF` | base background |
| `--muted` | `#545B64` | secondary text on light (AA 7:1) |
| `--muted-dark` | `#A3ABB5` | secondary text on dark (AA 8:1) |
| `--accent` | `#1D4ED8` | primary blue: buttons with white text |
| `--accent-ink` | `#1D4ED8` | blue text/icons on light (≥4.5:1) |

Fonts (Google Fonts): **Fraunces** (display, light weight, optical size 144), **IBM Plex Sans** (body/UI), **IBM Plex Mono** (eyebrows, labels, numbering).
Spacing: 8px scale `--s1`…`--s16` (8→128px). Radius 4px. Max width 1200px.
Icons: one hand-drawn 1.5px-stroke inline SVG set (`#i-data`, `#i-api`, …) replacing emoji/Icons8/PNG icons.

## Motion
GSAP 3.12 + ScrollTrigger + Lenis from jsDelivr. Hero line-mask headline reveal, staggered fade-rise on scroll (`ScrollTrigger.batch`), slow logo marquee (pauses on hover/focus), slight hero grid parallax. Only `transform`/`opacity` animate. With `prefers-reduced-motion: reduce` (or if the CDN fails) nothing animates and all content is visible.

## Preserved hooks
- Calendly: any `[data-calendly]` link opens `https://calendly.com/rajnish-vanrish/30min` popup; falls back to `/talk-to-experts/`.
- Chat: same IDs (`#chatbot`, `#chat-body`, `#user-input`), `toggleChat()` and `sendMessage('/chatbot-api.php')`.
- All original nav destinations, case-study links per client logo, LinkedIn post links, social links, Terms/Privacy.

## Still to wire / decide
- Contact form: the live form has no `action`; here it's a client-side stub (`js/main.js`). Needs a real endpoint.
- YouTube link: live site had no real channel URL; currently `https://www.youtube.com/`.
- Cox Automotive, WeightWatchers, Wayne Brothers, IoT logo had no case study page → link to `/casestudy/`.
- Case-study card → page mapping was carried over from the live markup; confirm the metrics match the linked pages.
- Logo: header/footer render `vanrish-logo_new.png` inverted to white; a proper SVG/white logo would be sharper.
- Inner pages still use the old design; reuse `css/styles.css` tokens when rebuilding them.
- Check the live server returning HTTP 403 on the homepage (bot/WAF filtering) — bad for SEO.

Secondary accents: `--green: #10B981` on navy; `--green-ink: #047857` for accessible highlights on light surfaces.
