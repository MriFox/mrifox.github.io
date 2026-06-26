const Parallax = {
    init() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        this.elements = document.querySelectorAll('[data-parallax]');
        if (!this.elements.length) return;
        this.ticking = false;
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener('scroll', this.onScroll, { passive: true });
    },

    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                this.elements.forEach(el => {
                    const speed = parseFloat(el.dataset.parallax) || 0.3;
                    const rect = el.parentElement.getBoundingClientRect();
                    const offset = (scrollY + rect.top) * speed;
                    el.style.transform = `translateY(${offset}px)`;
                });
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Parallax.init());
