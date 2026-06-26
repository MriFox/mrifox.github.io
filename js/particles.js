const ParticleWave = {
    init() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const hero = document.getElementById('hero');
        if (!hero) return;

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particleCanvas';
        this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
        hero.style.position = 'relative';
        hero.insertBefore(this.canvas, hero.firstChild);

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -1000, y: -1000 };
        this.maxParticles = 60;
        this.resize();

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        hero.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });

        window.addEventListener('resize', () => this.resize());

        this.createParticles();
        this.animate();
    },

    resize() {
        const hero = document.getElementById('hero');
        if (!hero) return;
        this.canvas.width = hero.offsetWidth;
        this.canvas.height = hero.offsetHeight;
    },

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                baseX: Math.random() * this.canvas.width,
                baseY: Math.random() * this.canvas.height
            });
        }
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const color = isDark ? '129,140,248' : '99,102,241';

        this.particles.forEach(p => {
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 120;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                p.x -= (dx / dist) * force * 2;
                p.y -= (dy / dist) * force * 2;
            } else {
                p.x += (p.baseX - p.x) * 0.01;
                p.y += (p.baseY - p.y) * 0.01;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            p.baseX += p.vx * 0.1;
            p.baseY += p.vy * 0.1;

            if (p.baseX < 0 || p.baseX > this.canvas.width) p.vx *= -1;
            if (p.baseY < 0 || p.baseY > this.canvas.height) p.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
            this.ctx.fill();
        });

        this.drawConnections(color);

        this.rafId = requestAnimationFrame(() => this.animate());
    },

    drawConnections(color) {
        const maxDist = 80;
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => ParticleWave.init());
