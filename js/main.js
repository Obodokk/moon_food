// ===== ОСНОВНОЙ ФАЙЛ ИНИЦИАЛИЗАЦИИ =====

// Инициализация всего приложения
function initApp() {
    // Инициализация меню
    initMenu();
    
    // Инициализация анимаций
    initAnimations();
    
    // Инициализация обработчиков событий
    initEventHandlers();
    
    // Показываем первую категорию по умолчанию
    showCategory('shaurma');
    
    // Убираем полосу загрузки
    setTimeout(() => {
        const loadingBar = document.querySelector('.loading-bar');
        if (loadingBar) {
            loadingBar.style.opacity = '0';
            setTimeout(() => {
                loadingBar.remove();
            }, 500);
        }
    }, 2000);
}

// Инициализация меню
function initMenu() {
    renderCategories();
    renderPromotions();
    renderSocialLinks();
}

// Рендер категорий меню
function renderCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;
    
    container.innerHTML = categories.map(category => `
        <button class="category-btn" data-category="${category.id}">
            ${category.icon} ${category.name}
        </button>
    `).join('');
}

// Рендер акций
function renderPromotions() {
    const container = document.getElementById('promotions-container');
    if (!container) return;
    
    container.innerHTML = promotionsData.map(promo => `
        <div class="promo-card fade-in-up">
            <h3>${promo.title}</h3>
            <p>${promo.description}</p>
        </div>
    `).join('');
}

// Рендер социальных ссылок
function renderSocialLinks() {
    const container = document.getElementById('social-links-container');
    if (!container) return;
    
    container.innerHTML = socialLinksData.map(link => `
        <a href="${link.url}" target="_blank" class="social-link">
            ${link.icon} ${link.name}
        </a>
    `).join('');
}

// Показать выбранную категорию меню
function showCategory(categoryId) {
    const container = document.getElementById('menu-items');
    if (!container || !menuData[categoryId]) return;
    
    // Обновляем активную кнопку
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${categoryId}"]`).classList.add('active');
    
    // Анимация исчезновения
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        // Рендерим элементы меню
        container.innerHTML = menuData[categoryId].map((item, index) => `
            <div class="menu-item" style="animation-delay: ${index * 0.1}s">
                <h3>${item.name}</h3>
                <div class="price">${item.price}</div>
                <div class="composition">${item.composition}</div>
                
                <div class="details-container">
                    <details class="details-item">
                        <summary class="details-summary">📖 Легенда блюда</summary>
                        <div class="details-content">
                            <p>${item.legend}</p>
                        </div>
                    </details>
                    
                    <details class="details-item">
                        <summary class="details-summary">💬 Отзыв скамера</summary>
                        <div class="details-content">
                            <div class="review">"${item.review}"</div>
                            <div class="author">— ${item.author}</div>
                        </div>
                    </details>
                </div>
                
                <button class="order-btn" data-item="${item.name}">
                    🚀 ЗАКАЗАТЬ (РИСКОВАТЬ)
                </button>
            </div>
        `).join('');
        
        // Анимация появления
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        container.style.transition = 'all 0.5s ease';
    }, 300);
}

// Инициализация обработчиков событий
function initEventHandlers() {
    // Обработчики для кнопок категорий
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            const category = e.target.dataset.category;
            showCategory(category);
        }
    });
    
    // Обработчик для большой кнопки заказа
    const bigOrderBtn = document.getElementById('big-order-btn');
    if (bigOrderBtn) {
        bigOrderBtn.addEventListener('click', () => {
            // Анимация нажатия
            bigOrderBtn.style.animation = 'none';
            setTimeout(() => {
                bigOrderBtn.style.animation = 'bigButtonPulse 3s infinite';
            }, 10);
            
            showOrderModal('big');
        });
    }
    
    // Обработчики для кнопок заказа в меню
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('order-btn')) {
            const itemName = e.target.dataset.item || e.target.closest('.order-btn')?.dataset.item;
            
            // Анимация нажатия
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 150);
            
            showOrderModal('item', itemName);
        }
    });
    
    // Обработчик для социальных ссылок (аналитика)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('social-link')) {
            console.log('Social link clicked:', e.target.href);
            // Здесь можно добавить аналитику
        }
    });
}

// Показать модальное окно заказа
function showOrderModal(type, itemName = '') {
    const messages = {
        item: `🚀 "${itemName}" добавлен в корзину!\n\nПредупреждение: товар может исчезнуть из корзины в любой момент!`,
        big: '⚠️ ВНИМАНИЕ! Заказ может быть отменен в любой момент без объяснения причин. Деньги не возвращаются. Вы соглашаетесь с тем, что можете получить пустую тарелку с NFT.'
    };
    
    alert(messages[type] || messages.big);
}

// Запуск приложения когда DOM загружен
document.addEventListener('DOMContentLoaded', initApp);

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});