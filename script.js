// Swiper
var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  mousewheel: true,
  speed: 900
});

const music = document.getElementById("music");
const musicControl = document.getElementById("musicControl");

let isPlaying = false;
let targetVolume = 0.5;

/* Smooth fade-in */
function fadeIn(audio) {
  audio.volume = 0;
  audio.play();
  let vol = 0;
  let interval = setInterval(() => {
    if (vol < targetVolume) {
      vol += 0.02;
      audio.volume = vol;
    } else {
      clearInterval(interval);
    }
  }, 100);
}

/* Volume dip */
function dipVolume() {
  let interval = setInterval(() => {
    if (music.volume > 0.15) {
      music.volume -= 0.02;
    } else {
      clearInterval(interval);
    }
  }, 50);
}

/* Restore volume */
function restoreVolume() {
  let interval = setInterval(() => {
    if (music.volume < targetVolume) {
      music.volume += 0.02;
    } else {
      clearInterval(interval);
    }
  }, 50);
}

/* Typing */
function typeText(element, text, speed = 40) {
  let i = 0;
  element.innerHTML = "";

  dipVolume();

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      restoreVolume();
    }
  }
  typing();
}

/* Slide triggers */
swiper.on('slideChange', () => {
  if (swiper.activeIndex === 0) {
    typeText(
      document.getElementById("typing1"),
      "I made something just for you..."
    );
  }

  if (swiper.activeIndex === 3) {
    typeText(
      document.getElementById("typing2"),
      "You deserve happiness, love, and everything beautiful in life 💫"
    );
  }
});

/* Music toggle */
musicControl.addEventListener("click", () => {
  if (!isPlaying) {
    fadeIn(music);
    musicControl.innerText = "🔊 Playing";
    isPlaying = true;
  } else {
    music.pause();
    musicControl.innerText = "🔇 Muted";
    isPlaying = false;
  }
});

/* Envelope */
function openEnvelope(el) {
  el.classList.add("open");

  if (!isPlaying) {
    fadeIn(music);
    musicControl.innerText = "🔊 Playing";
    isPlaying = true;
  }

  startConfetti();
}

/* Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];

function startConfetti() {
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 3 + 1
    });
  }
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    ctx.fillStyle = `hsl(${Math.random()*360},100%,50%)`;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(animate);
}