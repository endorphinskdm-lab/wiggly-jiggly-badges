# Wiggly, Jiggly, Squiggly Me! — Badge Reward Pages

Interactive badge reward pages for the *Wiggly, Jiggly, Squiggly Me!* kids coloring book.

Each coloring page has a printed QR code. When a child scans it (with a parent's phone), they land on a badge page with a confetti animation, a message from Remy, and a **download button** to save their sticker.

---

## Repo Structure

```
index.html              ← full badge collection page (all 24 badges)
badges/                 ← 24 individual badge pages
images/                 ← drop your 24 renamed PNGs here
rename_badges.py        ← run this on your PC to rename Apple Playground files
generate.js             ← run this to regenerate all HTML pages
README.md
```

### Image filenames expected in images/
```
body-explorer.png        brain-boss.png          eagle-eye.png
super-listener.png       sniff-champion.png      taste-bud-hero.png
brush-superstar.png      heart-hero.png          highway-star.png
deep-breather.png        gus-best-friend.png     wiggle-master.png
poop-scientist.png       hard-worker.png         clean-machine.png
bone-dancer.png          helmet-guardian.png     flex-champion.png
shield-master.png        keratin-kid.png         stack-attack.png
fingertip-genius.png     lifelong-adventurer.png body-master.png
```

---

## Step 1 — Rename your images

1. Put `rename_badges.py` in the same folder as your PNG files
2. Open terminal / command prompt in that folder and run:
   ```
   python rename_badges.py
   ```
3. A `renamed/` folder appears with all 24 files correctly named
4. Upload the contents of `renamed/` into the `images/` folder of this repo

---

## Step 2 — Deploy on GitHub Pages

1. Push this whole repo to GitHub
2. Go to **Settings → Pages → Source → main branch → Save**
3. Your live URLs:
   ```
   https://yourusername.github.io/repo-name/                     ← collection
   https://yourusername.github.io/repo-name/badges/heart.html   ← page 8
   https://yourusername.github.io/repo-name/badges/brain.html   ← page 2
   ```

---

## Step 3 — Generate QR codes

Go to **goqr.me** (free). One QR code per badge URL. Download as PNG.
Drop into the corner of each Canva coloring page at about 2×2 cm.

Add near each QR code:
> *"All done coloring? Ask a grown-up to scan this!"*

---

## Step 4 — What the child sees

1. Parent scans QR code → badge page opens
2. Confetti animation fires + badge pops in
3. Remy delivers a funny message
4. **Download my badge sticker** — saves PNG to phone
5. **See my full collection** — shows all 24 badges

---

## Updating content

Edit the `BADGES` array in `generate.js` then run `node generate.js`.
Push to GitHub — live within seconds.

---

## Notes

- Badge pages show emoji fallbacks if images are not uploaded yet — safe to deploy early
- Download button uses canvas so it works on mobile Safari and all browsers
- Pure static HTML — free to host on GitHub Pages forever
