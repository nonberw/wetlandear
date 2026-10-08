# WetlandEar

Static, bilingual (RU / EN) showcase site for open acoustic monitoring of nature reserves in Kazakhstan. No build step.

Live: https://wetlandear.tech (Vercel, deploys on every push to `main`).

## Run locally
```bash
python -m http.server 5190
```
Open http://localhost:5190

## Files
- `index.html`: markup (English text is the no-JS fallback).
- `css/style.css`: tokens, layout, reduced-motion rules. White and blue only.
- `js/i18n.js`: all RU and EN copy. Edit text here. Contact email for the mailto links is here too.
- `js/main.js`: scroll effects (GSAP ScrollTrigger), reveals, language swap, interactive cards, timeline.
- `js/spectrogram.js`, `js/pipeline.js`, `js/globe.js`, `js/demo.js`: hero spectrogram, signal path scene, Earth globe (Three.js), live demo block.
- `vendor/`: local copies of GSAP, ScrollTrigger and Three.js.

## Notes
- Fonts (Manrope, JetBrains Mono) load from Google Fonts. Self-host them if you add a strict Content-Security-Policy.
- The demo block is simulated and labelled "Demo data". Globe coastlines are approximate.
- Add real photos of Korgalzhyn and the station when available.
