const CardTilt = {
    init() {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        this.observe();
    },

    observe() {
        const grid = document.getElementById('worksGrid');
        if (!grid) return;

        this.bindCards(grid.querySelectorAll('.work-card'));

        const observer = new MutationObserver(() => {
            this.bindCards(grid.querySelectorAll('.work-card'));
        });
        observer.observe(grid, { childList: true });
    },

    bindCards(cards) {
        cards.forEach(card => {
            if (card._tiltBound) return;
            card._tiltBound = true;
            card.addEventListener('mousemove', (e) => this.onMove(e, card));
            card.addEventListener('mouseleave', () => this.onLeave(card));
        });
    },

    onMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    },

    onLeave(card) {
        card.style.transform = '';
    }
};

document.addEventListener('DOMContentLoaded', () => CardTilt.init());