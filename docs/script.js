window.onload = () => {
  const canvas = document.querySelector('canvas#canvas')
  const c = canvas.getContext('2d')
  
  canvas.width = innerWidth
  canvas.height = innerHeight
  
  let particles = []
  
  class Particle {
    constructor(x, y, xVel, yVel, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.xVel = xVel;
      this.yVel = yVel;
    }
    update() {
      this.x += this.xVel;
      this.y += this.yVel;
      if (this.x + this.size > canvas.width || 
         this.x - this.size < 0) {
        this.xVel *= -1;
      }
      if (this.y + this.size > canvas.height || 
         this.y - this.size < 0) {
        this.yVel *= -1
      }
    }
    draw() {
      c.beginPath()
      c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      c.fillStyle = 'rgb(157 173 147 / 0.5)';
      c.fill()
      c.closePath()
    }
  }
  
  const init = (qty) => {
    const speed = 3;
    const size = 2;
    for (let i = 0; i < qty; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const xVel = Math.random() * speed - (speed / 2)
      const yVel = Math.random() * speed - (speed / 2)
      particles.push(new Particle(x, y, xVel, yVel, size))
    }
  }
  init(12)
  
  const animate = () => {
    c.clearRect(0,0,canvas.width,canvas.height)
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const xDist = particles[i].x - particles[j].x
        const yDist = particles[i].y - particles[j].y
        const distance = Math.sqrt(xDist**2 + yDist**2)
        const maxDistance = 400;
        let opacity = (1 - distance/maxDistance) / 2;
        if (distance < maxDistance) {
          c.beginPath();
          c.moveTo(particles[i].x, particles[i].y);
          c.lineTo(particles[j].x, particles[j].y);
          c.strokeStyle = `rgb(101 128 84 / ${opacity})`;
          c.stroke(); 
        }
        for (let k = 0; k < particles.length; k++) {
          const xDist2 = particles[j].x - particles[k].x
          const yDist2 = particles[j].y - particles[k].y
          const distance2 = Math.sqrt(xDist2**2 + yDist2**2)
          const opacity2 = 1 - (distance + distance2) / (maxDistance);
          if (distance < maxDistance && distance2 < maxDistance) {
            c.beginPath()
            c.moveTo(particles[i].x, particles[i].y)
            c.lineTo(particles[j].x, particles[j].y)
            c.lineTo(particles[k].x, particles[k].y)
            c.closePath()
            c.fillStyle = `rgb(157 173 147 / ${opacity2})`
            c.fill()
          } 
        }
      }
        particles[i].update()
        particles[i].draw()
    }
    
    requestAnimationFrame(animate)
  }
  animate();
  
  addEventListener('resize', e => {
    canvas.width = innerWidth
    canvas.height = innerHeight
  })
}