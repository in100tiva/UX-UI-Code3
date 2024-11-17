// Configuração Global do Tailwind
window.tailwind.config = {
  darkMode: 'class',
  theme: {
      extend: {
          colors: {
              'game-primary': '#4f46e5',
              'game-secondary': '#818cf8',
              'game-background-light': '#ffffff',
              'game-background-dark': '#1f2937',
              'game-text-light': '#111827',
              'game-text-dark': '#f9fafb',
              'game-text-secondary-light': '#374151',
              'game-text-secondary-dark': '#d1d5db',
          }
      }
  }
};

// Sistema de Notificações Global
class NotificationSystem {
  constructor() {
      this.container = this.createContainer();
      this.notifications = [];
      this.maxNotifications = 3;
  }

  createContainer() {
      const container = document.createElement('div');
      container.className = 'fixed top-4 right-4 z-50 space-y-2';
      document.body.appendChild(container);
      return container;
  }

  show(message, type = 'info', duration = 3000) {
      const notification = this.createNotification(message, type);
      this.notifications.push(notification);
      
      if (this.notifications.length > this.maxNotifications) {
          const oldestNotification = this.notifications.shift();
          this.removeNotification(oldestNotification);
      }

      this.container.appendChild(notification);

      setTimeout(() => {
          notification.classList.remove('opacity-0', 'translate-x-full');
      }, 100);

      setTimeout(() => {
          this.removeNotification(notification);
          this.notifications = this.notifications.filter(n => n !== notification);
      }, duration);

      return notification;
  }

  createNotification(message, type) {
      const notification = document.createElement('div');
      notification.className = `
          transform transition-all duration-300 ease-in-out
          flex items-center px-4 py-3 rounded-lg shadow-lg
          opacity-0 translate-x-full
          ${this.getTypeClasses(type)}
      `;

      const icon = document.createElement('div');
      icon.className = 'flex-shrink-0 mr-3';
      icon.innerHTML = this.getTypeIcon(type);
      notification.appendChild(icon);

      const text = document.createElement('p');
      text.className = 'text-sm font-medium';
      text.textContent = message;
      notification.appendChild(text);

      const closeButton = document.createElement('button');
      closeButton.className = 'ml-4 flex-shrink-0 focus:outline-none';
      closeButton.innerHTML = `
          <svg class="h-4 w-4 opacity-75 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
      `;
      closeButton.onclick = () => this.removeNotification(notification);
      notification.appendChild(closeButton);

      return notification;
  }

  removeNotification(notification) {
      notification.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => {
          if (notification.parentNode === this.container) {
              this.container.removeChild(notification);
          }
      }, 300);
  }

  getTypeClasses(type) {
      switch (type) {
          case 'success':
              return 'bg-green-500 text-white';
          case 'error':
              return 'bg-red-500 text-white';
          case 'warning':
              return 'bg-yellow-500 text-white';
          default:
              return 'bg-indigo-500 text-white';
      }
  }

  getTypeIcon(type) {
      const baseClass = 'h-5 w-5';
      switch (type) {
          case 'success':
              return `<svg class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>`;
          case 'error':
              return `<svg class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>`;
          case 'warning':
              return `<svg class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>`;
          default:
              return `<svg class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>`;
      }
  }

  success(message, duration) {
      return this.show(message, 'success', duration);
  }

  error(message, duration) {
      return this.show(message, 'error', duration);
  }

  warning(message, duration) {
      return this.show(message, 'warning', duration);
  }

  info(message, duration) {
      return this.show(message, 'info', duration);
  }
}

// Inicializar sistema de notificações globalmente
window.notifications = new NotificationSystem();

// Funções Utilitárias Globais
const formatNumber = (number) => {
  return new Intl.NumberFormat('pt-BR').format(number);
};

const formatDate = (dateString) => {
  const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Verificação de Autenticação Global
const checkAuth = () => {
  const authToken = localStorage.getItem('authToken');
  const publicPages = ['/index.html', '/login.html', '/register.html'];
  const currentPage = window.location.pathname;

  if (!authToken && !publicPages.includes(currentPage)) {
      window.location.href = '/index.html';
      return false;
  }
  return true;
};

// Função de Logout Global
const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('rememberedUser');
  localStorage.removeItem('rememberedPassword');
  window.location.href = '/index.html';
};

// Event Listeners Globais
document.addEventListener('DOMContentLoaded', () => {
  // Verificar autenticação em páginas protegidas
  checkAuth();

  // Adicionar listeners para elementos comuns
  const logoutButtons = document.querySelectorAll('[data-action="logout"]');
  logoutButtons.forEach(button => {
      button.addEventListener('click', logout);
  });
});

// Exportar funções e objetos globais
window.utils = {
  formatNumber,
  formatDate,
  generateUniqueId,
  checkAuth,
  logout
};