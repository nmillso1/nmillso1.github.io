// ================================================
// NOEL'S PORTFOLIO - Main JavaScript
// Handles: theme toggle, avatar walk, animations,
//          audio player, floating elements, scroll
// ================================================

// ---- Theme Toggle ----
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function setTheme(mode) {
  body.classList.remove('dark-mode', 'light-mode');
  body.classList.add(mode + '-mode');
  localStorage.setItem('theme', mode);
  if (themeToggle) {
    themeToggle.textContent = mode === 'dark' ? '☀️' : '🌙';
  }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = body.classList.contains('dark-mode') ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ---- Audio Player ----
let audioCtx = null;
let isPlaying = false;
const vinyl = document.getElementById('vinyl');
const muteBtn = document.getElementById('muteBtn');

// Create lofi ambient sound using Web Audio API
function createLofiAmbient() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Simple ambient chord: notes of Db minor (Dbm) - Db Eb Fb Ab
  const frequencies = [138.59, 155.56, 164.81, 207.65]; // Dbm chord approximation
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gainNode.connect(audioCtx.destination);

  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    osc.type = i % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    oscGain.gain.setValueAtTime(0.15 / frequencies.length, audioCtx.currentTime);
    osc.connect(oscGain);
    oscGain.connect(gainNode);
    osc.start();
  });
}

function toggleAudio() {
  if (!isPlaying) {
    createLofiAmbient();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    isPlaying = true;
    if (vinyl) vinyl.classList.add('spinning');
    if (muteBtn) muteBtn.textContent = '🔊';
  } else {
    if (audioCtx) audioCtx.suspend();
    isPlaying = false;
    if (vinyl) vinyl.classList.remove('spinning');
    if (muteBtn) muteBtn.textContent = '🔈';
  }
}

if (vinyl) vinyl.addEventListener('click', toggleAudio);
if (muteBtn) muteBtn.addEventListener('click', toggleAudio);

// ---- Avatar Walker ----
const avatarEl = document.getElementById('avatarWalker');
const avatarBubble = document.querySelector('.avatar-bubble');

const bubbleSayings = [
  'hello world! ✨',
  'hire me pls 👩‍💻',
  'i love cookies 🍪',
  'SZA is life 🎵',
  'be kind always 💜',
  'debug mode: on 🐛',
  'crocheting tonight 🧶',
  'Ghana represent! 🇬🇭',
];

let avatarPos = -80;
let avatarDirection = 1;
let bubbleTimer = 0;
let currentSaying = 0;

function walkAvatar() {
  if (!avatarEl) return;
  avatarPos += 0.8 * avatarDirection;

  if (avatarPos > window.innerWidth + 80) {
    avatarDirection = -1;
    avatarEl.style.transform = 'scaleX(-1)';
  }
  if (avatarPos < -80) {
    avatarDirection = 1;
    avatarEl.style.transform = 'scaleX(1)';
  }

  avatarEl.style.left = avatarPos + 'px';

  // Show bubble occasionally
  bubbleTimer++;
  if (bubbleTimer > 300) {
    bubbleTimer = 0;
    if (avatarBubble) {
      avatarBubble.textContent = bubbleSayings[currentSaying % bubbleSayings.length];
      avatarBubble.style.opacity = '1';
      currentSaying++;
      setTimeout(() => {
        if (avatarBubble) avatarBubble.style.opacity = '0';
      }, 2500);
    }
  }

  requestAnimationFrame(walkAvatar);
}

walkAvatar();

// ---- Floating Elements ----
function spawnFloatingElement() {
  const container = document.getElementById('floatingElements');
  if (!container) return;

  const emojis = ['🦋', '🍪', '🎵', '🧶', '⭐', '🌸', '✨', '🎶', '🍂', '💜'];
  const el = document.createElement('div');
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.cssText = `
    position: absolute;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    font-size: ${0.8 + Math.random() * 0.8}rem;
    opacity: ${0.3 + Math.random() * 0.4};
    animation: float-bounce ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite;
    pointer-events: none;
  `;
  container.appendChild(el);

  // Clean up after a while
  setTimeout(() => el.remove(), 15000);
}

// Spawn floating elements periodically
setInterval(spawnFloatingElement, 2000);

// Initial batch
for (let i = 0; i < 8; i++) {
  setTimeout(spawnFloatingElement, i * 300);
}

// ---- Scroll Reveal ----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---- Skill Bar Animation ----
const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ---- Active Nav Link ----
const navLinks = document.querySelectorAll('.nav-links a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ---- Pixel cursor trail ----
const stars = [];
document.addEventListener('mousemove', (e) => {
  const star = document.createElement('div');
  star.textContent = ['✨', '⭐', '💜', '🌸'][Math.floor(Math.random() * 4)];
  star.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    font-size: 0.8rem;
    pointer-events: none;
    z-index: 9999;
    animation: star-twinkle 0.8s ease forwards;
    opacity: 1;
  `;
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 800);
});

// ---- Pixel canvas art helper ----
function drawPixelSprite(canvas, spriteData, colors, scale = 4) {
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const w = spriteData[0].length;
  const h = spriteData.length;
  canvas.width = w * scale;
  canvas.height = h * scale;

  spriteData.forEach((row, y) => {
    row.forEach((pixel, x) => {
      if (pixel && colors[pixel]) {
        ctx.fillStyle = colors[pixel];
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    });
  });
}

// ---- PixelPlay Project Animation ----
function animatePixelPlay(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 180;

  let frame = 0;
  const colors = ['#C9A8E2', '#25344F', '#6F4D38', '#A8D8C2', '#E8C97A'];

  function draw() {
    ctx.fillStyle = '#0F1A2A';
    ctx.fillRect(0, 0, 300, 180);

    // Vinyl record
    const cx = 70, cy = 90;
    const angle = frame * 0.05;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();
    ctx.strokeStyle = '#C9A8E2';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Grooves
    for (let r = 15; r < 43; r += 6) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201,168,226,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    // Center
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#C9A8E2';
    ctx.fill();
    ctx.restore();

    // Music notes floating
    const notePositions = [
      { x: 140 + Math.sin(frame * 0.04) * 5, y: 40 - (frame % 60) },
      { x: 165 + Math.cos(frame * 0.03) * 5, y: 55 - (frame % 80) },
      { x: 190 + Math.sin(frame * 0.05) * 5, y: 35 - (frame % 70) },
    ];

    notePositions.forEach((pos, i) => {
      ctx.font = '16px serif';
      ctx.fillStyle = `rgba(201,168,226,${0.3 + Math.sin(frame * 0.05 + i) * 0.3})`;
      ctx.fillText('♪', pos.x, ((pos.y % 150) + 150) % 150 + 30);
    });

    // Waveform
    ctx.beginPath();
    ctx.moveTo(130, 130);
    for (let x = 0; x < 140; x++) {
      const y = 130 + Math.sin((x * 0.15) + frame * 0.1) * 15;
      ctx.lineTo(130 + x, y);
    }
    ctx.strokeStyle = '#A8D8C2';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pixel art text
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillStyle = '#E8C97A';
    ctx.fillText('PixelPlay', 130, 100);
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillStyle = '#617891';
    ctx.fillText('AI Music Player', 130, 115);

    frame++;
    requestAnimationFrame(draw);
  }
  draw();
}

// ---- Diagram Tutor Animation ----
function animateDiagramTutor(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 180;
  let frame = 0;

  function draw() {
    ctx.fillStyle = '#0F1A2A';
    ctx.fillRect(0, 0, 300, 180);

    // Floating window
    ctx.fillStyle = '#1a2a3a';
    ctx.fillRect(30, 20, 240, 140);
    ctx.strokeStyle = '#C9A8E2';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 20, 240, 140);

    // Title bar
    ctx.fillStyle = '#25344F';
    ctx.fillRect(30, 20, 240, 20);
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillStyle = '#C9A8E2';
    ctx.fillText('Diagram Tutor', 40, 33);

    // Animated diagram nodes
    const nodes = [
      { x: 80, y: 90, label: 'Input' },
      { x: 150, y: 70, label: 'AI' },
      { x: 220, y: 90, label: 'Output' },
    ];

    const pulse = Math.sin(frame * 0.05) * 5;

    nodes.forEach((node, i) => {
      // Connection lines
      if (i < nodes.length - 1) {
        ctx.beginPath();
        ctx.moveTo(node.x + 20, node.y);
        ctx.lineTo(nodes[i + 1].x - 20, nodes[i + 1].y);
        ctx.strokeStyle = `rgba(168,216,194,${0.5 + Math.sin(frame * 0.05 + i) * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Arrow
        ctx.beginPath();
        ctx.moveTo(nodes[i + 1].x - 20, nodes[i + 1].y - 4);
        ctx.lineTo(nodes[i + 1].x - 12, nodes[i + 1].y);
        ctx.lineTo(nodes[i + 1].x - 20, nodes[i + 1].y + 4);
        ctx.strokeStyle = '#A8D8C2';
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y + (i === 1 ? pulse : 0), 18, 0, Math.PI * 2);
      ctx.fillStyle = i === 1 ? '#6F4D38' : '#25344F';
      ctx.fill();
      ctx.strokeStyle = i === 1 ? '#E8C97A' : '#C9A8E2';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '5px sans-serif';
      ctx.fillStyle = '#FFF8F0';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + (i === 1 ? pulse : 0) + 2);
    });

    ctx.textAlign = 'left';
    frame++;
    requestAnimationFrame(draw);
  }
  draw();
}

// ---- Bean There Cafe Finder Animation ----
function animateCafeFinder(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 180;
  let frame = 0;

  const cafes = [
    { x: 80, y: 100 }, { x: 140, y: 70 }, { x: 190, y: 120 },
    { x: 230, y: 80 }, { x: 110, y: 130 },
  ];

  function draw() {
    // Map background
    ctx.fillStyle = '#1a2a3a';
    ctx.fillRect(0, 0, 300, 180);

    // Grid lines (map style)
    ctx.strokeStyle = 'rgba(97,120,145,0.2)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 300; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 180); ctx.stroke();
    }
    for (let y = 0; y < 180; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(300, y); ctx.stroke();
    }

    // Roads
    ctx.strokeStyle = 'rgba(97,120,145,0.4)';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(0, 90); ctx.lineTo(300, 90); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(150, 0); ctx.lineTo(150, 180); ctx.stroke();

    // Cafe markers with pulse
    cafes.forEach((cafe, i) => {
      const pulse = Math.sin(frame * 0.05 + i * 0.8) * 4;

      ctx.beginPath();
      ctx.arc(cafe.x, cafe.y, 12 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(111, 77, 56, 0.3)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cafe.x, cafe.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#6F4D38';
      ctx.fill();
      ctx.strokeStyle = '#E8C97A';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '8px serif';
      ctx.textAlign = 'center';
      ctx.fillText('☕', cafe.x, cafe.y + 3);
    });

    ctx.textAlign = 'left';
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillStyle = '#C9A8E2';
    ctx.fillText('Bean There', 10, 20);
    ctx.font = '5px "Press Start 2P", monospace';
    ctx.fillStyle = '#617891';
    ctx.fillText('Cafe Finder', 10, 33);

    frame++;
    requestAnimationFrame(draw);
  }
  draw();
}

// ---- Chat App Animation ----
function animateChatApp(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 180;
  let frame = 0;

  const messages = [
    { text: 'hey! 👋', side: 'left', y: 50 },
    { text: 'hello! 😊', side: 'right', y: 80 },
    { text: 'connected!', side: 'left', y: 110 },
    { text: '5 users online', side: 'right', y: 140 },
  ];

  function draw() {
    ctx.fillStyle = '#0F1A2A';
    ctx.fillRect(0, 0, 300, 180);

    // App frame
    ctx.fillStyle = '#1a2a3a';
    ctx.fillRect(20, 15, 260, 150);
    ctx.strokeStyle = '#617891';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 15, 260, 150);

    // Header
    ctx.fillStyle = '#25344F';
    ctx.fillRect(20, 15, 260, 22);
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.fillStyle = '#A8D8C2';
    ctx.fillText('TCP Chat | 5 clients', 30, 30);

    // Messages appear one by one based on frame
    messages.forEach((msg, i) => {
      if (frame > i * 60) {
        const opacity = Math.min(1, (frame - i * 60) / 30);
        const isLeft = msg.side === 'left';
        const bubbleW = 100;
        const x = isLeft ? 35 : 165;

        ctx.fillStyle = isLeft
          ? `rgba(37, 52, 79, ${opacity})`
          : `rgba(111, 77, 56, ${opacity})`;
        ctx.beginPath();
        ctx.roundRect(x, msg.y, bubbleW, 20, 4);
        ctx.fill();

        ctx.strokeStyle = isLeft
          ? `rgba(168, 216, 194, ${opacity})`
          : `rgba(232, 201, 122, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = '6px sans-serif';
        ctx.fillStyle = `rgba(255,248,240,${opacity})`;
        ctx.textAlign = isLeft ? 'left' : 'right';
        ctx.fillText(msg.text, isLeft ? x + 6 : x + bubbleW - 6, msg.y + 13);
      }
    });

    // Reset and loop
    if (frame > 400) frame = 0;

    ctx.textAlign = 'left';
    frame++;
    requestAnimationFrame(draw);
  }
  draw();
}

// Initialize canvases if on projects page
window.addEventListener('load', () => {
  animatePixelPlay(document.getElementById('canvasPixelPlay'));
  animateDiagramTutor(document.getElementById('canvasDiagramTutor'));
  animateCafeFinder(document.getElementById('canvasCafeFinder'));
  animateChatApp(document.getElementById('canvasChatApp'));
});

// Expose for inline use
window.portfolioJS = {
  drawPixelSprite,
  animatePixelPlay,
  animateDiagramTutor,
  animateCafeFinder,
  animateChatApp,
};

// ================================================
// AVATAR INTEGRATION (uses avatar.js)
// Called after DOMContentLoaded on each page
// ================================================

function initPageAvatar() {
  if (typeof AvatarData === 'undefined') return;

  // Hero page avatar (32x32 scale 8 = 256px)
  const heroCanvas = document.getElementById('heroAvatarCanvas');
  if (heroCanvas) {
    AvatarData.draw(heroCanvas, AvatarData.COLLEGE, 8);
  }

  // About page -- business casual
  const aboutCanvas = document.getElementById('aboutAvatarCanvas');
  if (aboutCanvas) {
    AvatarData.draw(aboutCanvas, AvatarData.BUSINESS, 8);
  }

  // Contact page -- college girl
  const contactCanvas = document.getElementById('contactAvatarCanvas');
  if (contactCanvas) {
    AvatarData.draw(contactCanvas, AvatarData.COLLEGE, 8);
  }

  // Walking avatar on all pages
  const walkCanvas = document.getElementById('avatarCanvas');
  if (walkCanvas) {
    let walkFrame = 0;
    function animateWalk() {
      AvatarData.drawWalk(walkCanvas, walkFrame, 4);
      walkFrame++;
      requestAnimationFrame(animateWalk);
    }
    animateWalk();
  }
}

document.addEventListener('DOMContentLoaded', initPageAvatar);

// ---- Fix: Trigger reveals for elements already in viewport on load ----
function triggerInitialReveals() {
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}

// Run immediately and after a short delay to catch canvas-rendered content
document.addEventListener('DOMContentLoaded', () => {
  triggerInitialReveals();
  setTimeout(triggerInitialReveals, 300);
  setTimeout(triggerInitialReveals, 800);
});

window.addEventListener('scroll', triggerInitialReveals, { passive: true });
