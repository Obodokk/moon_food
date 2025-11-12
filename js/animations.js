// ===== АНИМАЦИИ И ВИЗУАЛЬНЫЕ ЭФФЕКТЫ =====

// Создание космической пыли
function createSpaceDust() {
    const dustContainer = document.getElementById('spaceDust');
    const dustCount = 50;
    
    for (let i = 0; i < dustCount; i++) {
        const dust = document.createElement('div');
        dust.className = 'dust-particle';
        
        // Случайные параметры для разнообразия
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 15;
        
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        dust.style.left = `${left}vw`;
        dust.style.animationDelay = `${delay}s`;
        dust.style.animationDuration = `${duration}s`;
        
        dustContainer.appendChild(dust);
    }
}

// Matrix эффект для фона
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('matrixBg');
    
    container.appendChild(canvas);
    
    function resize() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = "rgba(10, 10, 31, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#39ff14";
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Параллакс эффект для космической пыли
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const dust = document.querySelector('.space-dust');
        if (dust) {
            dust.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Плавная прокрутка к якорям
function initSmoothScroll() {
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
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });

    // Наблюдаем за элементами, которые должны анимироваться
    document.querySelectorAll('.menu-item, .promo-card, .social-link').forEach(el => {
        observer.observe(el);
    });
}

// Анимация для аккордеона (детали меню)
function initAccordion() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('details-summary')) {
            const details = e.target.closest('.details-item');
            const content = details.querySelector('.details-content');
            
            if (details.hasAttribute('open')) {
                // Закрываем
                content.style.maxHeight = '0';
                content.style.padding = '0 15px';
                setTimeout(() => {
                    details.removeAttribute('open');
                }, 300);
            } else {
                // Открываем
                details.setAttribute('open', '');
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.padding = '15px';
                }, 10);
            }
        }
    });
}

// Инициализация всех анимаций
function initAnimations() {
    createSpaceDust();
    createMatrixEffect();
    initParallax();
    initSmoothScroll();
    initScrollAnimations();
    initAccordion();
}