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
