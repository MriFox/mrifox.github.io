const ThemeManager = {
    init() {
        this.toggle = document.getElementById('themeToggle');
        this.theme = localStorage.getItem('theme') || 'light';
        this.apply(this.theme);
        this.toggle.addEventListener('click', (e) => this.switch(e));
    },
    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },
    switch(e) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            this.apply(this.theme);
            return;
        }

        const btn = this.toggle;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const maxDist = Math.sqrt(
            Math.max(cx, window.innerWidth - cx) ** 2 +
            Math.max(cy, window.innerHeight - cy) ** 2
        ) * 1.5;

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 9998;
            clip-path: circle(0px at ${cx}px ${cy}px);
            transition: clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            background: ${this.theme === 'light' ? 'var(--color-bg)' : 'var(--color-bg)'};
        `;
        document.body.appendChild(overlay);

        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.apply(this.theme);

        overlay.style.background = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim();

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.style.clipPath = `circle(${maxDist}px at ${cx}px ${cy}px)`;
            });
        });

        overlay.addEventListener('transitionend', () => {
            overlay.remove();
        }, { once: true });

        setTimeout(() => overlay.remove(), 700);
    }
};

document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
