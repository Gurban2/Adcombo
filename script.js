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
    const gemIcon = document.querySelector('.fa-gem');
    const menuItems = document.querySelectorAll('.dashboard-menu li');
    
    gemIcon.addEventListener('mouseover', function() {
        this.style.color = '#FFCF2D';
    });
    
    gemIcon.addEventListener('mouseout', function() {
        this.style.color = '';
    });
    
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
}); 