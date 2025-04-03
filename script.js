document.addEventListener('DOMContentLoaded', function() {
    // Таймер обратного отсчета
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const millisecondsEl = document.getElementById('milliseconds');
    
    let totalSeconds = 10 * 60; // 10 минут
    let interval = null;
    
    function startTimer() {
        interval = setInterval(updateTimer, 10);
    }
    
    function updateTimer() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor(Math.random() * 100); // Симуляция миллисекунд
        
        minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
        millisecondsEl.textContent = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
        
        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            // Перезапуск таймера по достижении 00:00:00
            clearInterval(interval);
            totalSeconds = 10 * 60;
            startTimer();
        }
    }
    
    // Запуск таймера при загрузке страницы
    startTimer();
    
    // Эффект параллакса на пузырьках
    const bubbles = document.querySelectorAll('.bubble');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const percentX = mouseX / windowWidth - 0.5;
        const percentY = mouseY / windowHeight - 0.5;
        
        bubbles.forEach(bubble => {
            const speed = bubble.getAttribute('data-speed');
            const x = percentX * speed * 20;
            const y = percentY * speed * 20;
            
            bubble.style.setProperty('--x', x);
            bubble.style.setProperty('--y', y);
        });
    });
    
    // Эффект наведения для иконок и кнопок
    const gemIcon = document.querySelector('.premium-btn img');
    const menuItems = document.querySelectorAll('.dashboard-menu li');
    
    if (gemIcon) {
        gemIcon.addEventListener('mouseover', function() {
            this.style.filter = 'brightness(1.2)';
        });
        
        gemIcon.addEventListener('mouseout', function() {
            this.style.filter = '';
        });
    }
    
    menuItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.color = '#9564AA';
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.color = '';
            this.style.transform = '';
        });
    });

    // Бургер-меню
    const burgerMenu = document.querySelector('.burger-menu');
    const dashboard = document.querySelector('.dashboard');
    
    if (burgerMenu && dashboard) {
        // Проверяем ширину экрана
        function checkWidth() {
            if (window.innerWidth <= 320) {
                burgerMenu.style.display = 'flex';
                dashboard.style.display = 'block';
            } else {
                burgerMenu.style.display = 'none';
                dashboard.style.display = 'block';
                dashboard.classList.remove('active');
            }
        }

        // Проверяем при загрузке и при изменении размера окна
        checkWidth();
        window.addEventListener('resize', checkWidth);

        burgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Переключаем классы
            this.classList.toggle('active');
            dashboard.classList.toggle('active');
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!dashboard.contains(e.target) && !burgerMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                dashboard.classList.remove('active');
            }
        });
    }

    // Mobile Cards Slider
    const creditCardsWrapper = document.querySelector('.credit-cards-wrapper');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let isMobile = window.innerWidth <= 320;

    function initMobileSlider() {
        if (!isMobile) return;

        const cards = creditCardsWrapper.querySelectorAll('.credit-card');
        cards.forEach((card, index) => {
            card.style.transform = `translateX(${index * 100}%)`;
        });
    }

    function goToSlide(slideIndex) {
        if (!isMobile) return;

        const cards = creditCardsWrapper.querySelectorAll('.credit-card');
        cards.forEach((card, index) => {
            card.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
            card.style.transition = 'transform 0.3s ease';
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });

        currentSlide = slideIndex;
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isMobile) return;
            goToSlide(index);
        });
    });

    // Check window resize
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 320;
        if (isMobile) {
            initMobileSlider();
        } else {
            // Reset transforms for desktop
            const cards = creditCardsWrapper.querySelectorAll('.credit-card');
            cards.forEach(card => {
                card.style.transform = '';
                card.style.transition = '';
            });
        }
    });

    // Initialize slider if mobile
    if (isMobile) {
        initMobileSlider();
    }
}); 