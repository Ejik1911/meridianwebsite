document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. ПОЯВЛЕНИЕ БЛОКОВ ПРИ ПРОКРУТКЕ =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });

    // ===== 2. ПЛАВНОЕ 3D-ВРАЩЕНИЕ ЛОГОТИПА ПРИ СКРОЛЛЕ =====
    const logo = document.querySelector('.hero-logo');
    const wrapper = document.querySelector('.hero-logo-wrapper');

    if (logo && wrapper) {
        wrapper.style.perspective = '1500px';
        logo.style.transformOrigin = 'center center';
        logo.style.willChange = 'transform, opacity';

        let ticking = false;

        function update() {
            const y = window.scrollY;
            const vh = window.innerHeight;
            // progress от 0 до 1 за первый экран
            const progress = Math.min(y / (vh * 1.2), 1); // увеличил с 0.8 до 1.2 для более медленного вращения

            // Плавное вращение с easing (замедление в конце)
            const eased = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            const rotY = eased * 120;   // поворот на 120 градусов (было 180)
            const rotX = eased * 10;    // лёгкий наклон
            const scale = 1 - eased * 0.2;  // уменьшается на 20%
            const opacity = 1 - eased * 0.5;  // растворяется на 50%

            logo.style.transform = 
                `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`;
            logo.style.opacity = opacity;

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });

        update();
    }

    // ===== 3. ПЛАВНАЯ ПРОКРУТКА ПО МЕНЮ =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
