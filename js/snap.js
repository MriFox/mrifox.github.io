const SnapScroll = {
    init() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.matchMedia('(max-width: 768px)').matches) return;
        document.documentElement.style.scrollSnapType = 'y mandatory';
        document.querySelectorAll('section, #hero').forEach(el => {
            el.style.scrollSnapAlign = 'start';
        });
    }
};

document.addEventListener('DOMContentLoaded', () => SnapScroll.init());
