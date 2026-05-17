const fs = require('fs');

const BADGES = [
  { id: 1,  slug: "whole-body",       img: "body-explorer.png",      name: "Body Explorer",      char: "Remy",                color: "#FF6B9D", light: "#FFE0E8", dark: "#993556", remy: "You found me! I live inside YOU and I explore every single part. Welcome to the adventure!" },
  { id: 2,  slug: "brain",            img: "brain-boss.png",          name: "Brain Boss",          char: "Prof. Wrinkles",      color: "#7F77DD", light: "#EEEDFE", dark: "#3C3489", remy: "Prof. Wrinkles wanted me to tell you he is VERY impressed. He calculated the probability of that. It was high." },
  { id: 3,  slug: "eyes",             img: "eagle-eye.png",           name: "Eagle Eye",           char: "The Blinkers",        color: "#378ADD", light: "#E6F1FB", dark: "#0C447C", remy: "The Blinkers saw you coming from a mile away. They see EVERYTHING. Even when you think they don't." },
  { id: 4,  slug: "ears",             img: "super-listener.png",      name: "Super Listener",      char: "The Ears",            color: "#5DCAA5", light: "#E1F5EE", dark: "#085041", remy: "Shhhh. The ears heard every single crayon stroke you made. Every. Single. One." },
  { id: 5,  slug: "nose",             img: "sniff-champion.png",      name: "Sniff Champion",      char: "The Nose",            color: "#EF9F27", light: "#FAEEDA", dark: "#633806", remy: "The nose says your coloring smelled wonderful. I didn't ask how it knew that." },
  { id: 6,  slug: "mouth",            img: "taste-bud-hero.png",      name: "Taste Bud Hero",      char: "The Tongue",          color: "#D4537E", light: "#FBEAF0", dark: "#72243E", remy: "The tongue gave this page two thumbs up. Well... it tried. It doesn't have thumbs." },
  { id: 7,  slug: "teeth",            img: "brush-superstar.png",     name: "Brush Superstar",     char: "The Teeth",           color: "#85B7EB", light: "#E6F1FB", dark: "#185FA5", remy: "The teeth are SO sparkly right now. Mostly because you should go brush them. Hint hint." },
  { id: 8,  slug: "heart",            img: "heart-hero.png",          name: "Heart Hero",          char: "Thumper",             color: "#FF6B9D", light: "#FFE0E8", dark: "#993556", remy: "Thumper is SO happy you colored him! He's been jumping for joy all day. Thump thump thump!" },
  { id: 9,  slug: "blood",            img: "highway-star.png",        name: "Highway Star",        char: "Remy",                color: "#E24B4A", light: "#FCEBEB", dark: "#791F1F", remy: "This is MY road! I zoom through it all day delivering oxygen. It's a great job. I love it." },
  { id: 10, slug: "lungs",            img: "deep-breather.png",       name: "Deep Breather",       char: "The Puff Twins",      color: "#1D9E75", light: "#E1F5EE", dark: "#085041", remy: "The Puff Twins say: breathe in... breathe out. Good. They filled me up with fresh air just for you!" },
  { id: 11, slug: "stomach",          img: "gus-best-friend.png",     name: "Gus's Best Friend",   char: "Gus",                 color: "#EF9F27", light: "#FAEEDA", dark: "#633806", remy: "Gus says thanks for visiting. Also he's hungry. He's always hungry. Please send snacks." },
  { id: 12, slug: "small-intestine",  img: "wiggle-master.png",       name: "Wiggle Master",       char: "The Small Intestine", color: "#D4537E", light: "#FBEAF0", dark: "#72243E", remy: "Wiggly, jiggly, squiggly — just like me! This is basically my favourite road in the whole body." },
  { id: 13, slug: "large-intestine",  img: "poop-scientist.png",      name: "Poop Scientist",      char: "The Large Intestine", color: "#BA7517", light: "#FAEEDA", dark: "#633806", remy: "You unlocked the POOP badge. This is science. Be proud. I took a wrong turn here once. We don't talk about that." },
  { id: 14, slug: "liver",            img: "hard-worker.png",         name: "Hard Worker",         char: "The Liver",           color: "#639922", light: "#EAF3DE", dark: "#27500A", remy: "The liver is doing 500 jobs right now AND celebrated your badge. Truly the MVP of the body." },
  { id: 15, slug: "kidneys",          img: "clean-machine.png",       name: "Clean Machine",       char: "The Filter Twins",    color: "#378ADD", light: "#E6F1FB", dark: "#0C447C", remy: "The Filter Twins made me squeaky clean before I came to tell you this. They do NOT mess around." },
  { id: 16, slug: "skeleton",         img: "bone-dancer.png",         name: "Bone Dancer",         char: "Mr. Clacksworth",     color: "#888780", light: "#F1EFE8", dark: "#444441", remy: "Mr. Clacksworth tipped his top hat and said you are a person of impeccable taste. Then he danced." },
  { id: 17, slug: "skull",            img: "helmet-guardian.png",     name: "Helmet Guardian",     char: "The Skull",           color: "#534AB7", light: "#EEEDFE", dark: "#3C3489", remy: "The skull is very proud of its job protecting Prof. Wrinkles. It flexed at me. Skulls can flex, apparently." },
  { id: 18, slug: "muscles",          img: "flex-champion.png",       name: "Flex Champion",       char: "The Muscles",         color: "#D85A30", light: "#FAECE7", dark: "#712B13", remy: "The muscles used 200 of themselves to do a victory pose when they heard you unlocked this badge!" },
  { id: 19, slug: "skin",             img: "shield-master.png",       name: "Shield Master",       char: "Skin",                color: "#97C459", light: "#EAF3DE", dark: "#27500A", remy: "Skin kept ALL the germs out today so I could deliver your badge safely. It never gets a day off!" },
  { id: 20, slug: "hair-nails",       img: "keratin-kid.png",         name: "Keratin Kid",         char: "Hair and Nails",      color: "#AFA9EC", light: "#EEEDFE", dark: "#26215C", remy: "Did you know you have something in common with a rhino? Keratin! You are basically a rhino. A very small one." },
  { id: 21, slug: "spine",            img: "stack-attack.png",        name: "Stack Attack",        char: "The Spine",           color: "#1D9E75", light: "#E1F5EE", dark: "#085041", remy: "I zoomed up the spine like a roller coaster today. Up, up, up! Best commute in the body!" },
  { id: 22, slug: "hands",            img: "fingertip-genius.png",    name: "Fingertip Genius",    char: "The Hands",           color: "#378ADD", light: "#E6F1FB", dark: "#0C447C", remy: "Your fingertips sent a million messages to your brain while you were coloring. True story." },
  { id: 23, slug: "feet",             img: "lifelong-adventurer.png", name: "Lifelong Adventurer", char: "The Feet",            color: "#D85A30", light: "#FAECE7", dark: "#712B13", remy: "Your feet are going to carry you around the whole Earth three times in your lifetime. That is a LOT of steps!" },
  { id: 24, slug: "whole-body-outro", img: "body-master.png",         name: "Body Master",         char: "Everyone!",           color: "#EF9F27", light: "#FAEEDA", dark: "#633806", remy: "YOU DID IT! You explored the whole amazing body with me! You are officially the most curious kid I know. See you in Book 2!" },
];

const FALLBACK_EMOJI = [
  '🔴','🧠','👁️','👂','👃','👅','🦷','❤️',
  '🔴','🫁','🫃','🌀','💩','⭐','✨','💀',
  '🛡️','💪','🌟','✂️','🏗️','👋','👣','🏆'
];

// ─── Individual badge page ─────────────────────────────────────────────────────
// On load: saves this badge as unlocked in localStorage.
// Download: uses fetch → blob → object URL so it works on GitHub Pages (no CORS canvas issue).
function badgePage(b, idx) {
  const fallback = FALLBACK_EMOJI[idx];
  const dlName   = b.name.replace(/'/g,'').replace(/[^a-z0-9]/gi,'-').toLowerCase() + '-badge.png';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${b.name} — Wiggly, Jiggly, Squiggly Me!</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff5f8;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px}
  .card{background:#fff;border-radius:28px;padding:32px 24px;max-width:380px;width:100%;text-align:center;border:2px solid ${b.light};position:relative;z-index:1}
  .book-tag{font-size:11px;font-weight:700;letter-spacing:0.1em;color:${b.color};margin-bottom:4px;text-transform:uppercase}
  .page-label{font-size:13px;color:#aaa;margin-bottom:20px}
  .badge-wrap{position:relative;width:160px;height:160px;margin:0 auto 16px}
  .badge-ring{width:160px;height:160px;border-radius:50%;background:${b.light};border:4px solid ${b.color};display:flex;align-items:center;justify-content:center;overflow:hidden;animation:float 3s ease-in-out infinite}
  .badge-ring img{width:130px;height:130px;object-fit:contain;border-radius:50%}
  .badge-fallback{width:110px;height:110px;border-radius:50%;background:${b.color};display:none;align-items:center;justify-content:center;font-size:52px}
  .star{position:absolute;font-size:16px;animation:shimmer 2s infinite;color:${b.color}}
  .badge-name{font-size:24px;font-weight:700;color:${b.dark};margin-bottom:3px}
  .char-name{font-size:13px;color:${b.color};margin-bottom:18px}
  .remy-box{background:${b.light};border-radius:14px;padding:14px 16px;margin-bottom:16px;border-left:4px solid ${b.color}}
  .remy-text{font-size:14px;color:${b.dark};line-height:1.6;font-style:italic}
  .remy-sig{font-size:11px;color:${b.color};margin-top:6px;font-weight:700}
  .page-num{font-size:12px;color:#bbb;margin-bottom:18px}
  .btn-row{display:flex;flex-direction:column;gap:10px}
  .btn{display:block;border-radius:50px;padding:13px 20px;font-size:15px;font-weight:600;text-decoration:none;text-align:center;cursor:pointer;border:none;width:100%;font-family:inherit;transition:opacity .15s}
  .btn:active{opacity:.8;transform:scale(.97)}
  .btn-download{background:${b.color};color:#fff}
  .btn-collection{background:${b.light};color:${b.dark}}
  .dl-status{font-size:12px;color:#aaa;margin-top:6px;min-height:18px}
  .confetti-wrap{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:0}
  .c{position:absolute;border-radius:2px;animation:fall linear forwards}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes shimmer{0%,100%{opacity:0.3}50%{opacity:1}}
  @keyframes fall{0%{opacity:1;transform:translateY(-10px) rotate(0deg)}100%{opacity:0;transform:translateY(105vh) rotate(720deg)}}
  @keyframes pop{0%{transform:scale(0) rotate(-12deg)}60%{transform:scale(1.15) rotate(3deg)}80%{transform:scale(0.93)}100%{transform:scale(1)}}
  @keyframes fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .popin{animation:pop 0.65s cubic-bezier(.36,.07,.19,.97) forwards}
  .fi{animation:fadein 0.5s ease forwards;opacity:0}
  .d1{animation-delay:.45s}.d2{animation-delay:.8s}.d3{animation-delay:1.05s}.d4{animation-delay:1.3s}
</style>
</head>
<body>
<div class="confetti-wrap" id="cf"></div>
<div class="card">
  <div class="book-tag">Wiggly, Jiggly, Squiggly Me!</div>
  <div class="page-label">Page ${b.id} — Badge unlocked! 🎉</div>

  <div class="badge-wrap popin">
    <div class="badge-ring">
      <img id="badgeImg" src="../images/${b.img}" alt="${b.name} sticker"
           onerror="this.style.display='none';document.getElementById('badgeFb').style.display='flex'">
      <div class="badge-fallback" id="badgeFb">${fallback}</div>
    </div>
    <span class="star" style="top:2px;left:8px;animation-delay:.2s">✦</span>
    <span class="star" style="top:16px;right:-6px;animation-delay:.7s;font-size:11px">✦</span>
    <span class="star" style="bottom:8px;left:-4px;animation-delay:1.1s;font-size:13px">✦</span>
  </div>

  <div class="badge-name fi d1">${b.name}</div>
  <div class="char-name fi d1">featuring ${b.char}</div>

  <div class="remy-box fi d2">
    <div class="remy-text">"${b.remy}"</div>
    <div class="remy-sig">— Remy the Red Blood Cell 🔴</div>
  </div>

  <div class="page-num fi d3">Badge ${b.id} of 24</div>

  <div class="btn-row fi d4">
    <button class="btn btn-download" id="dlBtn">⬇ Download my badge sticker</button>
    <div class="dl-status" id="dlStatus"></div>
    <a class="btn btn-collection" href="../index.html">See my full collection →</a>
  </div>
</div>

<script>
// ── 1. Mark this badge as unlocked in localStorage ──────────────────────────
try {
  var unlocked = JSON.parse(localStorage.getItem('wjsm_unlocked') || '[]');
  if (unlocked.indexOf('${b.slug}') === -1) unlocked.push('${b.slug}');
  localStorage.setItem('wjsm_unlocked', JSON.stringify(unlocked));
} catch(e) {}

// ── 2. Download button — fetch → blob → object URL (works on GitHub Pages) ──
document.getElementById('dlBtn').addEventListener('click', function() {
  var btn    = this;
  var status = document.getElementById('dlStatus');
  var imgSrc = '../images/${b.img}';

  btn.textContent = 'Downloading…';
  btn.style.opacity = '0.7';
  status.textContent = '';

  fetch(imgSrc)
    .then(function(r) {
      if (!r.ok) throw new Error('Image not found');
      return r.blob();
    })
    .then(function(blob) {
      var url = URL.createObjectURL(blob);
      var a   = document.createElement('a');
      a.href     = url;
      a.download = '${dlName}';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
      btn.textContent = '✓ Downloaded!';
      btn.style.opacity = '1';
      status.textContent = 'Saved to your downloads folder!';
      setTimeout(function() {
        btn.textContent = '⬇ Download my badge sticker';
        status.textContent = '';
      }, 3000);
    })
    .catch(function() {
      // Fallback: open image directly in new tab so user can long-press save
      window.open(imgSrc, '_blank');
      btn.textContent = '⬇ Download my badge sticker';
      btn.style.opacity = '1';
      status.textContent = 'Tip: press and hold the image to save it!';
    });
});

// ── 3. Confetti ──────────────────────────────────────────────────────────────
var cols = ['${b.color}','${b.light}','#FFE066','#ffffff','#C0DD97','#B5D4F4'];
var cf   = document.getElementById('cf');
for (var i = 0; i < 35; i++) {
  (function(i) {
    setTimeout(function() {
      var el = document.createElement('div');
      el.className = 'c';
      el.style.left = Math.round(Math.random() * 100) + '%';
      el.style.top  = '-12px';
      el.style.background = cols[Math.floor(Math.random() * cols.length)];
      var sz = (Math.floor(Math.random() * 7) + 6) + 'px';
      el.style.width = el.style.height = sz;
      el.style.animationDuration = (Math.random() * 1.8 + 1.2).toFixed(1) + 's';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
      cf.appendChild(el);
      setTimeout(function() { el.remove(); }, 3500);
    }, i * 70);
  })(i);
}
</script>
</body>
</html>`;
}

// ─── Collection / index page ───────────────────────────────────────────────────
// Locked badges show a padlock. Only badges unlocked via QR (localStorage) are clickable.
// A "Reset progress" button lets parents clear and start again.
function indexPage() {
  const badgeData = JSON.stringify(BADGES.map(b => ({ slug: b.slug, name: b.name, img: b.img, color: b.color, light: b.light, dark: b.dark, id: b.id, href: `badges/${b.slug}.html` })));
  const fallbacks  = JSON.stringify(FALLBACK_EMOJI);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Badge Collection — Wiggly, Jiggly, Squiggly Me!</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff5f8;min-height:100vh;padding:28px 16px 56px}
  .header{text-align:center;margin-bottom:24px}
  .logo{font-size:11px;font-weight:700;letter-spacing:0.1em;color:#FF6B9D;text-transform:uppercase;margin-bottom:6px}
  h1{font-size:26px;font-weight:700;color:#3C3489;line-height:1.25;margin-bottom:6px}
  .sub{font-size:14px;color:#999;margin-bottom:8px}
  .progress-bar-wrap{max-width:340px;margin:0 auto 4px;height:10px;background:#eee;border-radius:10px;overflow:hidden}
  .progress-bar-fill{height:100%;background:linear-gradient(90deg,#FF6B9D,#7F77DD);border-radius:10px;transition:width .5s}
  .progress-label{font-size:12px;color:#aaa;margin-bottom:20px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:12px;max-width:720px;margin:0 auto}

  /* unlocked card */
  .badge-card{background:#fff;border-radius:16px;border:2px solid #eee;padding:16px 10px;text-align:center;text-decoration:none;display:block;transition:transform .15s,box-shadow .15s;cursor:pointer}
  .badge-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.08)}
  .badge-card:active{transform:scale(.97)}

  /* locked card */
  .badge-locked{background:#f7f7f7;border-radius:16px;border:2px dashed #ddd;padding:16px 10px;text-align:center;display:block;cursor:default;opacity:.6}

  .badge-icon{width:68px;height:68px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;overflow:hidden}
  .badge-icon img{width:58px;height:58px;object-fit:contain;border-radius:50%}
  .badge-fb{width:58px;height:58px;border-radius:50%;display:none;align-items:center;justify-content:center;font-size:26px}
  .lock-icon{font-size:28px;color:#ccc}
  .badge-title{font-size:12px;font-weight:700;margin-bottom:3px;line-height:1.3}
  .badge-sub{font-size:11px}
  .badge-locked .badge-title{color:#bbb}
  .badge-locked .badge-sub{color:#ccc}

  .reset-wrap{text-align:center;margin-top:28px}
  .reset-btn{background:none;border:1px solid #ddd;border-radius:20px;padding:8px 20px;font-size:12px;color:#aaa;cursor:pointer;font-family:inherit}
  .reset-btn:hover{background:#f0f0f0}
  .footer{text-align:center;margin-top:16px;font-size:12px;color:#ccc}
</style>
</head>
<body>
<div class="header">
  <div class="logo">Wiggly, Jiggly, Squiggly Me!</div>
  <h1>Your Badge Collection 🏆</h1>
  <div class="sub">Scan the QR code on each coloring page to unlock badges!</div>
  <div class="progress-bar-wrap"><div class="progress-bar-fill" id="progressFill" style="width:0%"></div></div>
  <div class="progress-label" id="progressLabel">Loading…</div>
</div>

<div class="grid" id="grid"></div>

<div class="reset-wrap">
  <button class="reset-btn" id="resetBtn">Reset progress</button>
</div>
<div class="footer">Wiggly, Jiggly, Squiggly Me! &copy; 2025 &nbsp;·&nbsp; Keep coloring! 🔴</div>

<script>
var BADGES   = ${badgeData};
var FALLBACK = ${fallbacks};

function getUnlocked() {
  try { return JSON.parse(localStorage.getItem('wjsm_unlocked') || '[]'); } catch(e) { return []; }
}

function render() {
  var unlocked = getUnlocked();
  var count    = 0;
  var grid     = document.getElementById('grid');
  grid.innerHTML = '';

  BADGES.forEach(function(b, idx) {
    var isUnlocked = unlocked.indexOf(b.slug) !== -1;
    if (isUnlocked) count++;

    var el = document.createElement(isUnlocked ? 'a' : 'div');
    el.className = isUnlocked ? 'badge-card' : 'badge-locked';
    if (isUnlocked) { el.href = b.href; el.style.borderColor = b.light; }

    if (isUnlocked) {
      el.innerHTML =
        '<div class="badge-icon" style="background:' + b.light + ';border:3px solid ' + b.color + '">' +
          '<img src="images/' + b.img + '" alt="' + b.name + '" ' +
               'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="badge-fb" style="background:' + b.color + '">' + FALLBACK[idx] + '</div>' +
        '</div>' +
        '<div class="badge-title" style="color:' + b.dark + '">' + b.name + '</div>' +
        '<div class="badge-sub" style="color:' + b.color + '">Page ' + b.id + '</div>';
    } else {
      el.innerHTML =
        '<div class="badge-icon" style="background:#f0f0f0;border:3px solid #ddd">' +
          '<div class="lock-icon">🔒</div>' +
        '</div>' +
        '<div class="badge-title">Page ' + b.id + '</div>' +
        '<div class="badge-sub">Scan to unlock</div>';
    }

    grid.appendChild(el);
  });

  // Progress bar
  var pct = Math.round((count / BADGES.length) * 100);
  document.getElementById('progressFill').style.width  = pct + '%';
  document.getElementById('progressLabel').textContent =
    count === BADGES.length
      ? '🎉 All ' + BADGES.length + ' badges collected! Amazing!'
      : count + ' of ' + BADGES.length + ' badges unlocked — keep coloring!';
}

document.getElementById('resetBtn').addEventListener('click', function() {
  if (confirm('Reset all badge progress? This cannot be undone.')) {
    try { localStorage.removeItem('wjsm_unlocked'); } catch(e) {}
    render();
  }
});

render();
</script>
</body>
</html>`;
}

// ─── Write everything ──────────────────────────────────────────────────────────
fs.mkdirSync('./badges', { recursive: true });
fs.mkdirSync('./images', { recursive: true });
fs.writeFileSync('./images/.gitkeep', '# Drop your 24 renamed PNG files here\n');

BADGES.forEach((b, idx) => {
  fs.writeFileSync(`./badges/${b.slug}.html`, badgePage(b, idx));
  console.log(`✓  badges/${b.slug}.html`);
});

fs.writeFileSync('./index.html', indexPage());
console.log('✓  index.html\n');
console.log(`All done! ${BADGES.length} badge pages + collection page.`);
