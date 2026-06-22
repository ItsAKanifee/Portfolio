document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.hamburger');
    const header = document.querySelector('header');
    const nav = document.getElementById('primary-nav');
    if (!btn || !header || !nav) return;

    const setExpanded = (expanded) => {
        btn.setAttribute('aria-expanded', expanded);
    };

    btn.addEventListener('click', (e) => {
        const open = header.classList.toggle('menu-open');
        setExpanded(open);
    });

    // Close when clicking outside header
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && header.classList.contains('menu-open')) {
            header.classList.remove('menu-open');
            setExpanded(false);
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && header.classList.contains('menu-open')) {
            header.classList.remove('menu-open');
            setExpanded(false);
        }
    });

    // Ensure nav closes when a nav link is clicked (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        if (header.classList.contains('menu-open')) {
            header.classList.remove('menu-open');
            setExpanded(false);
        }
    }));
});
