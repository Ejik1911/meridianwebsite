// ===== ЖДЁМ ПОЛНОЙ ЗАГРУЗКИ СТРАНИЦЫ =====
document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. ПОЯВЛЕНИЕ БЛОКОВ ПРИ ПРОКРУТКЕ ВНИЗ
    // ========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // 2. 3D-ВРАЩЕНИЕ ЛОГОТИПА + ПАРАЛЛАКС
    // ========================================
    const logo = document.querySelector('.hero-logo');
    const overlay = document.querySelector('.hero-overlay');
    const heroTitle = document.querySelector('.hero h2');
    const heroSub = document.querySelector('.hero-subtitle');
    const heroText = document.querySelector('.hero-text');

    // Если логотипа нет на странице — выходим, чтобы не было ошибок
    if (logo) {
        // Ограничиваем значение от 0 до 1
        function clamp(v, min, max) {
            return Math.min(Math.max(v, min), max);
        }

        let ticking = false;

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }

        function update() {
            const y = window.scrollY;
            const vh = window.innerHeight;
            // progress: 0 вверху, 1 когда прокрутили на один экран вниз
            const progress = clamp(y / (vh * 0.9), 0, 1);

            // 1) Логотип вращается в 3D при прокрутке
            const rotY = progress * 360;
            const rotX = progress * 25;
            const scale = 1 - progress * 0.25;
            const opacity = 1 - progress * 0.6;
            logo.style.transform =
                `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`;
            logo.style.opacity = opacity;

            // 2) Параллакс фона
            if (overlay) {
                overlay.style.transform = `translateY(${y * 0.3}px)`;
            }

            // 3) Текст заголовка тоже уходит в параллакс
            if (heroTitle) heroTitle.style.transform = `translateY(${y * 0.15}px)`;
            if (heroSub)   heroSub.style.transform   = `translateY(${y * 0.2}px)`;
            if (heroText)  heroText.style.transform  = `translateY(${y * 0.25}px)`;

            ticking = false;
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        update();
    }

    // ========================================
    // 3. ПЛАВНАЯ ПРОКРУТКА ПО ССЫЛКАМ МЕНЮ
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
