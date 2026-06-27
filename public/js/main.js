const initScrollReveal = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('[data-reveal]');

    if (reduced || !('IntersectionObserver' in window)) {
        targets.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((el) => observer.observe(el));
};

const initDarkMode = () => {
    const toggleMode = document.getElementById('toggle-mode');
    toggleMode?.addEventListener('click', () => {
        if (document.getElementById('container')?.classList.contains('dark')) {
            document.getElementById('container')?.classList.remove('dark');
        } else {
            document.getElementById('container')?.classList.toggle('dark');
        }
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initScrollReveal();
        initDarkMode();
    }, { once: true });
} else {
    initScrollReveal();
    initDarkMode();
}
