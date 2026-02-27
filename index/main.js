/**
 * RAINBOW SIX SIEGE - JavaScript Principal
 * Funcionalidades: Navegación, Autenticación, Filtros, Animaciones
 */

// ============================================
// DATOS DEL JUEGO
// ============================================

const operators = [
    {
        id: 1,
        name: 'ASH',
        role: 'attacker',
        roleName: 'Atacante',
        ability: 'Lanzagranadas M320 CREM',
        image: 'images/Ash.jpg'
    },
    {
        id: 2,
        name: 'THERMITE',
        role: 'attacker',
        roleName: 'Atacante',
        ability: 'Carga Exotérmica',
        image: 'images/Thermite_2.jpg'
    },
    {
        id: 3,
        name: 'SLEDGE',
        role: 'attacker',
        roleName: 'Atacante',
        ability: 'Mazo de Demolición',
        image: 'images/SLEDGE.jpg'
    },
    {
        id: 4,
        name: 'ROOK',
        role: 'defender',
        roleName: 'Defensor',
        ability: 'Chaleco Blindado',
        image: 'images/Rook.jpg'
    },
    {
        id: 5,
        name: 'JÄGER',
        role: 'defender',
        roleName: 'Defensor',
        ability: 'Sistema de Defensa Activa',
        image: 'images/jäger.jpg'
    },
    {
        id: 6,
        name: 'BANDIT',
        role: 'defender',
        roleName: 'Defensor',
        ability: 'Cables de Alta Tensión',
        image: 'images/BANDIT.jpg'
    }
];

const maps = [
    {
        id: 1,
        name: 'BANCO',
        location: 'EE.UU.',
        image: 'images/Banco.png'
    },
    {
        id: 2,
        name: 'CONSULADO',
        location: 'Marruecos',
        image: 'images/Consulado.jpg'
    },
    {
        id: 3,
        name: 'OREGON',
        location: 'EE.UU.',
        image: 'images/Oregón.jpg'
    },
    {
        id: 4,
        name: 'CHALET',
        location: 'Francia',
        image: 'images/Chalet.jpg'
    }
];

const gameModes = [
    {
        id: 1,
        name: 'BUSCAR Y DESTRUIR',
        description: 'Los atacantes deben localizar y desactivar una bomba mientras los defensores la protegen.',
        icon: 'fa-bullseye',
        players: '5v5'
    },
    {
        id: 2,
        name: 'REHÉN',
        description: 'Rescata o defiende a un rehén. El trabajo en equipo es crucial para la victoria.',
        icon: 'fa-shield-alt',
        players: '5v5'
    },
    {
        id: 3,
        name: 'SEGURIDAD DEL ÁREA',
        description: 'Controla la zona objetivo. Los atacantes deben capturarla, los defensores protegerla.',
        icon: 'fa-crosshairs',
        players: '5v5'
    },
    {
        id: 4,
        name: 'ENTRENAMIENTO',
        description: 'Práctica contra IA para mejorar tus habilidades antes de enfrentarte a jugadores reales.',
        icon: 'fa-gamepad',
        players: '5 vs IA'
    }
];

const platforms = [
    {
        id: 1,
        name: 'PC',
        icon: 'fa-desktop',
        stores: ['Ubisoft Connect', 'Steam', 'Epic Games']
    },
    {
        id: 2,
        name: 'PlayStation',
        icon: 'fa-playstation',
        stores: ['PS4', 'PS5']
    },
    {
        id: 3,
        name: 'Xbox',
        icon: 'fa-xbox',
        stores: ['Xbox One', 'Xbox Series X|S']
    }
];

const news = [
    {
        id: 1,
        title: 'Nueva Temporada: Operación Vector Glare',
        date: '2024-01-15',
        category: 'Actualización',
        image: 'images/news-1.jpg'
    },
    {
        id: 2,
        title: 'Campeonato Mundial 2024',
        date: '2024-01-10',
        category: 'Esports',
        image: 'images/hero-bg.jpg'
    },
    {
        id: 3,
        title: 'Nuevo Operador: SENS',
        date: '2024-01-05',
        category: 'Personajes',
        image: 'images/operator-1.jpg'
    }
];

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================

let currentUser = null;
let currentFilter = 'all';

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// ============================================
// RENDERIZADO DE CONTENIDO
// ============================================

function renderOperators(filter = 'all') {
    const grid = $('#operatorsGrid');
    if (!grid) return;

    const filteredOperators = filter === 'all' 
        ? operators 
        : operators.filter(op => op.role === filter);

    grid.innerHTML = filteredOperators.map(operator => `
        <div class="operator-card" data-role="${operator.role}">
            <div class="operator-image">
                <img src="${operator.image}" alt="${operator.name}" loading="lazy">
            </div>
            <div class="operator-info">
                <span class="operator-role ${operator.role}">${operator.roleName}</span>
                <h3 class="operator-name">${operator.name}</h3>
                <p class="operator-ability">${operator.ability}</p>
            </div>
        </div>
    `).join('');
}

function renderMaps() {
    const grid = $('#mapsGrid');
    if (!grid) return;

    grid.innerHTML = maps.map(map => `
        <div class="map-card">
            <div class="map-image">
                <img src="${map.image}" alt="${map.name}" loading="lazy">
            </div>
            <div class="map-info">
                <p class="map-location">${map.location}</p>
                <h3 class="map-name">${map.name}</h3>
            </div>
        </div>
    `).join('');
}

function renderModes() {
    const grid = $('#modesGrid');
    if (!grid) return;

    grid.innerHTML = gameModes.map(mode => `
        <div class="mode-card">
            <div class="mode-icon">
                <i class="fas ${mode.icon}"></i>
            </div>
            <div class="mode-content">
                <h3>
                    ${mode.name}
                    <span class="mode-players">${mode.players}</span>
                </h3>
                <p>${mode.description}</p>
            </div>
        </div>
    `).join('');
}

function renderPlatforms() {
    const grid = $('#platformsGrid');
    if (!grid) return;

    grid.innerHTML = platforms.map(platform => `
        <div class="platform-card">
            <div class="platform-icon">
                <i class="fab ${platform.icon}"></i>
            </div>
            <h3>${platform.name}</h3>
            <div class="platform-stores">
                ${platform.stores.map(store => `<p>${store}</p>`).join('')}
            </div>
            <button class="btn btn-primary">
                <i class="fas fa-download"></i> Descargar
            </button>
        </div>
    `).join('');
}

function renderNews() {
    const grid = $('#newsGrid');
    if (!grid) return;

    grid.innerHTML = news.map(item => `
        <article class="news-card">
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="news-category">${item.category}</span>
            </div>
            <div class="news-content">
                <div class="news-date">
                    <i class="far fa-clock"></i>
                    <span>${formatDate(item.date)}</span>
                </div>
                <h3 class="news-title">${item.title}</h3>
                <span class="news-link">
                    Leer más <i class="fas fa-chevron-right"></i>
                </span>
            </div>
        </article>
    `).join('');
}

function renderUserSection() {
    const userSection = $('#userSection');
    if (!userSection) return;

    if (currentUser) {
        userSection.innerHTML = `
            <div class="user-logged">
                <div class="user-info">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-details">
                        <p class="user-name">${currentUser.name}</p>
                        <p class="user-email">${currentUser.email}</p>
                    </div>
                </div>
                <button class="btn-logout" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
            </div>
        `;

        // Agregar evento al botón de logout
        $('#logoutBtn')?.addEventListener('click', handleLogout);
    } else {
        userSection.innerHTML = `
            <button class="btn btn-primary btn-full" id="loginBtn">
                <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
            </button>
        `;

        // Agregar evento al botón de login
        $('#loginBtn')?.addEventListener('click', () => {
            openModal('loginModal');
        });
    }
}

// ============================================
// NAVEGACIÓN
// ============================================

function initNavigation() {
    const navLinks = $$('.nav-link');
    const sections = $$('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Actualizar navegación activa
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Mostrar sección correspondiente
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });

            // Cerrar sidebar en móvil
            if (window.innerWidth < 1024) {
                closeSidebar();
            }

            // Scroll al inicio
            window.scrollTo(0, 0);
        });
    });
}

// ============================================
// SIDEBAR MÓVIL
// ============================================

function initSidebar() {
    const mobileMenuBtn = $('#mobileMenuBtn');
    const sidebar = $('#sidebar');
    const overlay = $('#sidebarOverlay');

    mobileMenuBtn?.addEventListener('click', toggleSidebar);
    overlay?.addEventListener('click', closeSidebar);
}

function toggleSidebar() {
    const sidebar = $('#sidebar');
    const overlay = $('#sidebarOverlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = $('#sidebar');
    const overlay = $('#sidebarOverlay');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// ============================================
// FILTROS DE OPERADORES
// ============================================

function initFilters() {
    const filterBtns = $$('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Renderizar operadores filtrados
            renderOperators(filter);
        });
    });
}

// ============================================
// MODAL DE LOGIN
// ============================================

function initModal() {
    const modal = $('#loginModal');
    const closeBtn = $('#closeModal');
    const loginForm = $('#loginForm');

    // Cerrar modal al hacer clic fuera
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal('loginModal');
        }
    });

    // Cerrar modal con botón X
    closeBtn?.addEventListener('click', () => {
        closeModal('loginModal');
    });

    // Manejar submit del formulario
    loginForm?.addEventListener('submit', handleLogin);
}

function openModal(modalId) {
    const modal = $(`#${modalId}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = $(`#${modalId}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = $('#email').value;
    const password = $('#password').value;

    // Simulación de login
    if (email && password) {
        currentUser = {
            name: 'Operador',
            email: email
        };

        // Guardar en localStorage
        localStorage.setItem('r6_user', JSON.stringify(currentUser));

        // Actualizar UI
        renderUserSection();
        closeModal('loginModal');

        // Limpiar formulario
        e.target.reset();

        // Mostrar notificación
        showNotification('Sesión iniciada correctamente', 'success');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('r6_user');
    renderUserSection();
    showNotification('Sesión cerrada', 'info');
}

// ============================================
// NOTIFICACIONES
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 200, 0, 0.9)' : 'rgba(255, 107, 0, 0.9)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// ANIMACIONES AL SCROLL
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    const animatedElements = $$('.feature-card, .operator-card, .map-card, .mode-card, .news-card, .platform-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// EFECTO PARALLAX EN HERO
// ============================================

function initParallax() {
    const heroBg = $('.hero-bg img');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroBg.style.transform = `translateY(${rate}px)`;
    });
}

// ============================================
// CARGAR USUARIO DESDE LOCALSTORAGE
// ============================================

function loadUser() {
    const savedUser = localStorage.getItem('r6_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Cargar usuario guardado
    loadUser();

    // Renderizar contenido
    renderOperators();
    renderMaps();
    renderModes();
    renderPlatforms();
    renderNews();
    renderUserSection();

    // Inicializar funcionalidades
    initNavigation();
    initSidebar();
    initFilters();
    initModal();
    initScrollAnimations();
    initParallax();

    // Verificar hash en URL para navegación directa
    const hash = window.location.hash.slice(1);
    if (hash) {
        const navLink = $(`.nav-link[data-section="${hash}"]`);
        if (navLink) {
            navLink.click();
        }
    }
});

// Manejar redimensionamiento de ventana
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        closeSidebar();
    }
});

// Prevenir clic derecho en imágenes (opcional, para proteger contenido)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Agregar keyframes para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
