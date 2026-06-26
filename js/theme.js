const ThemeManager = {
    init() {
        this.toggle = document.getElementById('themeToggle');
        this.theme = localStorage.getItem('theme') || 'light';
        this.apply(this.theme);
        this.toggle.addEventListener('click', () => this.switch());
    },
    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },
    switch() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.apply(this.theme);
    }
};

document.addEventListener('DOMContentLoaded', () => ThemeManager.init());