interface Particle {
  x: number;
  y: number;
  size: number;
  emoji: string;
  speedX: number;
  speedY: number;
  gravity: number;
  bounceFactor: number;
  bounces: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  rotationSpeedX: number;
  rotationSpeedY: number;
  rotationSpeedZ: number;
}

export const createParticle = (
  x: number,
  y: number,
  emojis: string[]
): Particle => {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const bounceFactor = 0.6;
  return {
    x,
    y,
    size: 15,
    emoji,
    speedX: Math.random() * 6 - 3,
    speedY: Math.random() * 6 - 3,
    gravity: 0.15,
    bounceFactor,
    bounces: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    rotationSpeedX: Math.random() * 0.1 - 0.05,
    rotationSpeedY: Math.random() * 0.1 - 0.05,
    rotationSpeedZ: Math.random() * 0.1 - 0.05,
  };
};

export const particles: Particle[] = [];
export let animationId: number;

export const animateParticles = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bounce: boolean
) => {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.speedY += particle.gravity;

    // Update rotation
    particle.rotationX += particle.rotationSpeedX;
    particle.rotationY += particle.rotationSpeedY;
    particle.rotationZ += particle.rotationSpeedZ;

    // Bounce effect
    if (particle.y + particle.size > height && bounce) {
      if (particle.bounces < 2) {
        particle.y = height - particle.size;
        particle.speedY *= -particle.bounceFactor;
        particle.bounces += 1;
        particle.size *= 1.1; // Increase size by 10% after each bounce
      } else {
        // Allow particle to fall off the bottom of the page
        particle.speedY = Math.abs(particle.speedY);
      }
    }

    // Only draw the particle if it is fully within the visible canvas area
    if (particle.y - particle.size < height && particle.y + particle.size > 0) {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotationZ); // Apply 3D rotation (simplified to 2D rotation for canvas)
      ctx.font = `${particle.size}px serif`;
      ctx.fillText(particle.emoji, -particle.size / 2, particle.size / 2);
      ctx.restore();
    }

    // Remove particles that have fallen completely off the bottom of the page
    if (particle.y > height + particle.size * 2) {
      particles.splice(index, 1);
    }
  });

  // Continue animation if particles remain
  if (particles.length > 0) {
    animationId = requestAnimationFrame(() =>
      animateParticles(ctx, width, height, bounce)
    );
  } else {
    cancelAnimationFrame(animationId);
    animationId = 0; // Reset animationId when animation completes
  }
};
