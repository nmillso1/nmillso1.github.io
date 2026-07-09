// ================================================
// AUDIO PLAYER
// Plays assets/ambient.mp3 (prod. Metzmusic)
// Free for YouTube/SoundCloud -- credited in footer
// Download: https://bsta.rs/40xWSc
// BPM: 62 | KEY: Dbm
// ================================================

let audioEl = null;
let isPlaying = false;

function initAudio() {
  if (audioEl) return;
  audioEl = new Audio('assets/ambient.mp3');
  audioEl.loop = true;
  audioEl.volume = 0.35;

  // Fade in
  audioEl.addEventListener('canplaythrough', () => {
    if (isPlaying) audioEl.play().catch(() => {});
  });
}

function toggleAudio() {
  initAudio();
  const vinyl = document.getElementById('vinyl');
  const muteBtn = document.getElementById('muteBtn');

  if (!isPlaying) {
    audioEl.play().catch(err => {
      console.log('Audio blocked by browser until interaction:', err);
    });
    isPlaying = true;
    if (vinyl) vinyl.classList.add('spinning');
    if (muteBtn) muteBtn.textContent = '🔊';
  } else {
    audioEl.pause();
    isPlaying = false;
    if (vinyl) vinyl.classList.remove('spinning');
    if (muteBtn) muteBtn.textContent = '🔈';
  }
}

// Hook up vinyl + mute button
document.addEventListener('DOMContentLoaded', () => {
  const vinyl = document.getElementById('vinyl');
  const muteBtn = document.getElementById('muteBtn');
  if (vinyl) vinyl.addEventListener('click', toggleAudio);
  if (muteBtn) muteBtn.addEventListener('click', toggleAudio);
});
