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
        btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        btn.style.opacity = '0';
        btn.style.transform = 'rotate(90deg)';

        setTimeout(() => {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            this.apply(this.theme);
            btn.style.opacity = '1';
            btn.style.transform = 'rotate(0deg)';
        }, 300);
    }
};

document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
