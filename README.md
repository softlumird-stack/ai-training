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

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Set **Source** to `Deploy from a branch`.
5. Choose branch `main` and folder `/root`.
6. Save and wait for GitHub Pages to publish.

## Files

- `index.html` - slide content.
- `styles.css` - Lumi visual system, layout, transitions.
- `app.js` - slide navigation and 3-second smooth transitions.
- `Font/` - local SVN Gilroy font files.
- `*.png` - Lumi logo and slide backgrounds.

## Note

Before publishing publicly, confirm that the included images and font files are approved for public distribution.
