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

    // ===== 2. 3D-ВРАЩЕНИЕ ЛОГОТИПА ПРИ СКРОЛЛЕ =====
    const logo = document.querySelector('.hero-logo');
    const wrapper = document.querySelector('.hero-logo-wrapper');

    if (logo && wrapper) {
        // Добавляем perspective к родителю (важно для 3D!)
        wrapper.style.perspective = '1200px';
        logo.style.transformOrigin = 'center center';

        let ticking = false;

        function update() {
            const y = window.scrollY;
            const vh = window.innerHeight;
            // progress от 0 до 1 за первый экран
            const progress = Math.min(y / (vh * 0.8), 1);

            // Плавное вращение
            const rotY = progress * 180;   // поворот на 180 градусов
            const rotX = progress * 15;    // лёгкий наклон
            const scale = 1 - progress * 0.3;  // уменьшается
            const opacity = 1 - progress * 0.7;  // растворяется

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

        update(); // запускаем сразу
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
