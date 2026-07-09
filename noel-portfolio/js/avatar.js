// ================================================
// NOEL'S AVATAR SYSTEM
// Hero: 128x128 pixel art photo (avatar_hero.png)
// Walk: Original cute chibi sprite
// ================================================

// ── Walk sprite color palette ──
const AV = {
  _: null,
  S: '#7A4528', s: '#9B6040', d: '#5C3317',
  H: '#2C1A0E', h: '#4A2C1A', L: '#3D2310',
  f: '#D4826E', g: '#E8C97A',
  e: '#2C1A0E', W: '#FFF8F0',
  P: '#C47A5A', K: '#D4926A',
  A: '#7B5EA7', B: '#9B7EC7', C: '#5B3E87',
  T: '#FFF8F0', t: '#E8DCC8',
  N: '#E8C97A', R: '#D4A870',
  J: '#3A5A8A', j: '#4A6A9A',
  X: '#6B3D1E', G: '#6F4D38',
};

// Original cute first avatar walk sprite 16x18
const WALK_SPRITE = [
  ['_','_','H','H','H','H','H','H','H','H','H','H','_','_','_','_'],
  ['_','H','h','L','h','H','H','H','h','L','h','H','H','_','_','_'],
  ['_','H','h','L','L','L','h','h','L','L','h','H','H','_','_','_'],
  ['H','H','H','H','H','S','S','S','S','H','H','H','H','_','_','_'],
  ['H','H','_','S','e','W','e','e','W','e','S','H','H','_','_','_'],
  ['H','H','_','S','S','P','P','P','P','S','S','H','H','_','_','_'],
  ['_','H','H','H','S','S','d','d','S','S','H','H','H','_','_','_'],
  ['_','_','A','A','A','T','T','T','T','A','A','A','_','_','_','_'],
  ['_','A','B','A','A','A','A','A','A','A','A','B','A','_','_','_'],
  ['_','A','A','C','A','A','A','A','A','A','C','A','A','_','_','_'],
  ['A','A','A','A','S','A','A','A','A','S','A','A','A','A','_','_'],
  ['_','_','_','A','A','A','A','A','A','A','A','A','_','_','_','_'],
  ['_','_','_','_','A','A','A','A','A','A','A','_','_','_','_','_'],
  ['_','_','_','_','A','A','_','_','A','A','_','_','_','_','_','_'],
  ['_','_','_','_','A','_','_','_','_','A','_','_','_','_','_','_'],
  ['_','_','_','_','G','G','_','_','G','G','_','_','_','_','_','_'],
  ['_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_'],
  ['_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_'],
];

// Walk animation frames (legs alternate)
const WALK_FRAME_A = [
  ['_','_','H','H','H','H','H','H','H','H','H','H','_','_','_','_'],
  ['_','H','h','L','h','H','H','H','h','L','h','H','H','_','_','_'],
  ['_','H','h','L','L','L','h','h','L','L','h','H','H','_','_','_'],
  ['H','H','H','H','H','S','S','S','S','H','H','H','H','_','_','_'],
  ['H','H','_','S','e','W','e','e','W','e','S','H','H','_','_','_'],
  ['H','H','_','S','S','P','P','P','P','S','S','H','H','_','_','_'],
  ['_','H','H','H','S','S','d','d','S','S','H','H','H','_','_','_'],
  ['_','_','A','A','A','T','T','T','T','A','A','A','_','_','_','_'],
  ['_','A','B','A','A','A','A','A','A','A','A','B','A','_','_','_'],
  ['_','A','A','C','A','X','A','A','A','A','C','A','A','_','_','_'],
  ['A','A','A','A','S','A','A','A','A','S','A','A','A','A','_','_'],
  ['_','_','_','A','A','A','A','A','A','A','A','A','_','_','_','_'],
  ['_','_','_','_','A','A','_','_','A','A','_','_','_','_','_','_'],
  // Frame A: left leg forward, right leg back
  ['_','_','_','A','A','_','_','_','_','A','_','_','_','_','_','_'],
  ['_','_','A','A','_','_','_','_','_','A','A','_','_','_','_','_'],
  ['_','_','G','G','_','_','_','_','_','G','G','_','_','_','_','_'],
  ['_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_'],
  ['_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_'],
];

const WALK_FRAME_B = [
  ['_','_','H','H','H','H','H','H','H','H','H','H','_','_','_','_'],
  ['_','H','h','L','h','H','H','H','h','L','h','H','H','_','_','_'],
  ['_','H','h','L','L','L','h','h','L','L','h','H','H','_','_','_'],
  ['H','H','H','H','H','S','S','S','S','H','H','H','H','_','_','_'],
  ['H','H','_','S','e','W','e','e','W','e','S','H','H','_','_','_'],
  ['H','H','_','S','S','P','P','P','P','S','S','H','H','_','_','_'],
  ['_','H','H','H','S','S','d','d','S','S','H','H','H','_','_','_'],
  ['_','_','A','A','A','T','T','T','T','A','A','A','_','_','_','_'],
  ['_','A','B','A','A','A','A','A','A','A','A','B','A','_','_','_'],
  ['_','A','A','C','A','A','A','A','X','A','C','A','A','_','_','_'],
  ['A','A','A','A','S','A','A','A','A','S','A','A','A','A','_','_'],
  ['_','_','_','A','A','A','A','A','A','A','A','A','_','_','_','_'],
  ['_','_','_','_','A','A','_','_','A','A','_','_','_','_','_','_'],
  // Frame B: right leg forward, left leg back
  ['_','_','_','A','_','_','_','_','A','A','_','_','_','_','_','_'],
  ['_','_','A','A','_','_','_','_','_','A','A','_','_','_','_','_'],
  ['_','_','G','G','_','_','_','_','_','G','G','_','_','_','_','_'],
  ['_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_'],
  ['_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_'],
];

function drawWalkFrame(canvas, frame, scale) {
  const sprite = frame % 2 === 0 ? WALK_FRAME_A : WALK_FRAME_B;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  canvas.width = sprite[0].length * scale;
  canvas.height = sprite.length * scale;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sprite.forEach((row, y) => {
    row.forEach((cell, x) => {
      const color = AV[cell];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    });
  });
}

// Draw hero using the photo-based PNG
function drawHeroAvatar(canvas) {
  if (!canvas) return;
  const img = new Image();
  img.onload = () => {
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, 128, 128);
  };
  img.src = 'assets/avatar_hero.png';
}

// Initialize all avatars on the page
function initAvatars() {
  // Hero ring avatar
  const heroCanvas = document.getElementById('heroAvatarCanvas');
  if (heroCanvas) drawHeroAvatar(heroCanvas);

  // About page avatar (same photo)
  const aboutCanvas = document.getElementById('aboutAvatarCanvas');
  if (aboutCanvas) drawHeroAvatar(aboutCanvas);

  // Contact page avatar (same photo)
  const contactCanvas = document.getElementById('contactAvatarCanvas');
  if (contactCanvas) drawHeroAvatar(contactCanvas);

  // Walking avatar -- animated
  const walkCanvas = document.getElementById('avatarCanvas');
  if (walkCanvas) {
    let frame = 0;
    function animateWalk() {
      drawWalkFrame(walkCanvas, Math.floor(frame / 12), 4);
      frame++;
      if (frame > 999) frame = 0;
      requestAnimationFrame(animateWalk);
    }
    animateWalk();
  }
}

document.addEventListener('DOMContentLoaded', initAvatars);
window.AvatarData = { drawWalkFrame, drawHeroAvatar };
