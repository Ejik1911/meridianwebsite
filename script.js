// ========================================
// Meridian Invest Russia - Скрипт сайта
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. АНИМАЦИЯ ПРИ СКРОЛЛЕ
    // ========================================
    
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Функция для добавления класса visible
    function checkScroll() {
        const elements = document.querySelectorAll('.fade-in-scroll');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Запускаем при загрузке
    checkScroll();
    
    // Запускаем при скролле
    window.addEventListener('scroll', checkScroll);
    
    // ========================================
    // 2. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // 3. АНИМАЦИЯ ШАПКИ ПРИ СКРОЛЛЕ
    // ========================================
    
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // 4. ОБРАБОТКА ФОРМЫ
    // ========================================
    
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Не отменяем отправку, чтобы Formspree мог обработать
            // Но показываем сообщение пользователю
            
            // Получаем все поля формы
            const formData = new FormData(form);
            
            // Отправляем через fetch (если подключен Formspree)
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
                    form.reset();
                } else {
                    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
                }
            }).catch(error => {
                alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
            });
            
            e.preventDefault();
        });
    }
    
    // ========================================
    // 5. АКТИВНАЯ ССЫЛКА В МЕНЮ ПРИ СКРОЛЛЕ
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
});