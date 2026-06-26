const CursorGlow = {
    el: null,

    init() {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        this.el = document.getElementById('cursorGlow');
        if (!this.el) return;
        document.addEventListener('mousemove', (e) => this.move(e));
        document.addEventListener('mouseleave', () => this.hide());
        document.addEventListener('mouseenter', () => this.show());
    },

    move(e) {
        this.el.style.left = e.clientX + 'px';
        this.el.style.top = e.clientY + 'px';
        this.show();
    },

    show() {
        this.el.style.opacity = '1';
    },

    hide() {
        this.el.style.opacity = '0';
    }
};

document.addEventListener('DOMContentLoaded', () => CursorGlow.init());