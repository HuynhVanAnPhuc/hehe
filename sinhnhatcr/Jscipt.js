const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.speed = 3 + Math.random() * 3;
    this.particles = [];
    this.exploded = false;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y < this.targetY) {
        this.explode();
      }
    } else {
      this.particles.forEach(p => p.update());
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      this.particles.forEach(p => p.draw());
    }
  }

  explode() {
    this.exploded = true;
    for (let i = 0; i < 30; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 5;
    this.life = 100;
    this.color = color;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.speed *= 0.95;
    this.life -= 1;
  }

  draw() {
    if (this.life > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }

  fireworks.forEach((fw, index) => {
    fw.update();
    fw.draw();
    if (fw.exploded && fw.particles.every(p => p.life <= 0)) {
      fireworks.splice(index, 1);
    }
  });
}

animate();

// Tạo hoa giấy
function createConfetti() {
  const confetti = document.createElement('div');
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '-10px';
  confetti.style.borderRadius = '50%';
  confetti.style.animationDuration = (3 + Math.random() * 3) + 's';
  document.getElementById('confetti-container').appendChild(confetti);

  setTimeout(() => confetti.remove(), 7000);
}

// Tạo trái tim bay lên
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '100vh';
  heart.style.animationDuration = (4 + Math.random() * 3) + 's';
  document.getElementById('heart-container').appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

// Tạo liên tục
setInterval(createConfetti, 200);
setInterval(createHeart, 1000);
