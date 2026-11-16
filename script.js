// Ждём, пока страница загрузится
document.addEventListener('DOMContentLoaded', () => {

    // ===== ПОЯВЛЕНИЕ БЛОКОВ ПРИ ПРОКРУТКЕ ВНИЗ =====
    // Создаём "наблюдателя", который следит, когда элемент попадает на экран
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Элемент появился на экране — запускаем анимацию
                entry.target.classList.add('in-view');
                // Больше за ним не следим (чтобы анимация не повторялась)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15  // Анимация стартует, когда 15% элемента видно на экране
    });

    // Находим все блоки с классом fade-in-scroll и ставим их под наблюдение
    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });

});
// ===== 3D-ВРАЩЕНИЕ ЛОГОТИПА + ПАРАЛЛАКС ПРИ ПРОКРУТКЕ =====
(function() {
    const logo = document.querySelector('.hero-logo');
    const overlay = document.querySelector('.hero-overlay');
    const heroTitle = document.querySelector('.hero h2');
    const heroSub = document.querySelector('.hero-subtitle');
    const heroText = document.querySelector('.hero-text');

    if (!logo) return;

    // Ограничиваем значение от 0 до 1
    function clamp(v, min, max) {
        return Math.min(Math.max(v, min), max);
    }

    // Плавное обновление по скроллу (requestAnimationFrame = без лагов)
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

        // 1) Логотип вращается в 3D при прокрутке (как предмет на Apple)
        const rotY = progress * 360;          // полный оборот вокруг вертикальной оси
        const rotX = progress * 25;           // лёгкий наклон
        const scale = 1 - progress * 0.25;    // чуть уменьшается
        const opacity = 1 - progress * 0.6;   // и растворяется
        logo.style.transform =
            `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`;
        logo.style.opacity = opacity;

        // 2) Параллакс фона — движется медленнее контента
        if (overlay) {
            overlay.style.transform = `translateY(${y * 0.3}px)`;
        }

        // 3) Текст заголовка тоже слегка уходит в параллакс
        if (heroTitle) heroTitle.style.transform = `translateY(${y * 0.15}px)`;
        if (heroSub)   heroSub.style.transform   = `translateY(${y * 0.2}px)`;
        if (heroText)  heroText.style.transform  = `translateY(${y * 0.25}px)`;

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // на случай, если страницу открыли уже прокрученной
})();
