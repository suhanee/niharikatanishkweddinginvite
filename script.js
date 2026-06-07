const weddingDate = new Date('2026-12-11T12:00:00').getTime();
const whatsappNumber = '+919123054648'; // Replace with your WhatsApp number with country code, no + sign.

const introScreen = document.getElementById('introScreen');
const mainContent = document.getElementById('mainContent');
const openInvite = document.getElementById('openInvite');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

openInvite.addEventListener('click', async () => {
  introScreen.style.opacity = '0';
  introScreen.style.transform = 'scale(1.03)';
  introScreen.style.transition = 'all 900ms ease';

  setTimeout(() => {
    introScreen.style.display = 'none';
    mainContent.classList.remove('hidden');
    window.scrollTo(0, 0);
    revealOnScroll();
    window.dispatchEvent(new Event('resize'));
  }, 850);

  try {
    await music.play();
    musicBtn.classList.add('playing');
  } catch (err) {
    console.log('Autoplay blocked. User can play music manually.');
  }
});

musicBtn.addEventListener('click', async () => {
  if (music.paused) {
    await music.play();
    musicBtn.classList.add('playing');
  } else {
    music.pause();
    musicBtn.classList.remove('playing');
  }
});

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerHTML = '<p>The celebration has begun!</p>';
    return;
  }

  document.getElementById('days').textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById('hours').textContent = Math.floor((distance / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
  document.getElementById('minutes').textContent = Math.floor((distance / (1000 * 60)) % 60).toString().padStart(2, '0');
  document.getElementById('seconds').textContent = Math.floor((distance / 1000) % 60).toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Scratch-to-reveal countdown
(function initScratch() {
  const canvas = document.getElementById('scratchCanvas');
  const wrap = document.getElementById('scratchWrap');
  const hint = document.getElementById('scratchHint');
  if (!canvas || !wrap) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let revealed = false;

  function paintCover() {
    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#d8b981');
    gradient.addColorStop(0.5, '#b88945');
    gradient.addColorStop(1, '#c7837d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = 'rgba(255, 253, 248, 0.18)';
    ctx.font = "600 1rem 'Montserrat', sans-serif";
    ctx.textAlign = 'center';
    for (let i = 0; i < 6; i++) {
      ctx.fillText('', rect.width / 2, 30 + i * 30);
    }
    ctx.globalCompositeOperation = 'destination-out';
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  function scratch(e) {
    if (!isDrawing || revealed) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    if (hint && !hint.classList.contains('hidden-hint')) hint.classList.add('hidden-hint');
    checkReveal();
  }

  function checkReveal() {
    const { width, height } = canvas;
    const sample = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    const step = 40; // sample every Nth pixel for performance
    let total = 0;
    for (let i = 3; i < sample.length; i += 4 * step) {
      total++;
      if (sample[i] === 0) cleared++;
    }
    if (cleared / total > 0.45) {
      revealed = true;
      canvas.classList.add('revealed');
      if (hint) hint.classList.add('hidden-hint');
    }
  }

  canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
  canvas.addEventListener('mousemove', scratch);
  window.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
  canvas.addEventListener('touchmove', scratch, { passive: false });
  canvas.addEventListener('touchend', () => { isDrawing = false; });

  paintCover();
  window.addEventListener('resize', () => { if (!revealed) paintCover(); });
})();

function createPetal() {
  const petal = document.createElement('span');
  petal.className = 'petal';
  const size = 18 + Math.random() * 18; // 18-36px carnations
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.width = size + 'px';
  petal.style.height = size + 'px';
  petal.style.animationDuration = 8 + Math.random() * 7 + 's';
  petal.style.opacity = 0.55 + Math.random() * 0.35;
  // tint between soft pink, coral, and blush via hue-rotate + saturation
  const hue = -15 + Math.random() * 40;
  const sat = 0.85 + Math.random() * 0.5;
  petal.style.filter = `drop-shadow(0 2px 3px rgba(122,60,56,.18)) hue-rotate(${hue}deg) saturate(${sat})`;
  document.getElementById('petals').appendChild(petal);
  setTimeout(() => petal.remove(), 16000);
}
setInterval(createPetal, 650);

const sections = document.querySelectorAll('.section, footer');
sections.forEach(section => section.classList.add('reveal'));

function revealOnScroll() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) section.classList.add('visible');
  });
}
window.addEventListener('scroll', revealOnScroll);

const rsvpForm = document.getElementById('rsvpForm');
rsvpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('guestName').value.trim();
  const count = document.getElementById('guestCount').value.trim();
  const attendance = document.getElementById('attendance').value;
  const message = document.getElementById('message').value.trim();

  const text = `Wedding RSVP%0A%0AName: ${encodeURIComponent(name)}%0AGuests: ${encodeURIComponent(count)}%0AAttendance: ${encodeURIComponent(attendance)}%0AMessage: ${encodeURIComponent(message || '-')}`;
  window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
});
