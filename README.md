# AI Coding with Codex - Tech Talk Report

Static web presentation for the Lumi post-event report: **AI Coding with Codex**.

## Run locally

Open `index.html` directly in a browser, or run a local static server:

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at:

```text
.github/workflows/deploy-pages.yml
```

Every push to `main` deploys the static site to GitHub Pages.

Public URL:

```text
https://softlumird-stack.github.io/ai-training/
```

If Pages is not enabled yet, go to **Settings → Pages** and set the source to **GitHub Actions**.

## Files

- `index.html` - slide content.
- `styles.css` - Lumi visual system, layout, transitions.
- `app.js` - slide navigation and 3-second smooth transitions.
- `Font/` - local SVN Gilroy font files.
- `*.png` - Lumi logo and slide backgrounds.

## Note

Before publishing publicly, confirm that the included images and font files are approved for public distribution.
