document.addEventListener('DOMContentLoaded', function() {
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

          // Adicionar ao DOM
          this.container.appendChild(notification);

          // Animar entrada
          setTimeout(() => {
              notification.classList.remove('opacity-0', 'translate-x-full');
          }, 100);

          // Configurar remoção automática
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

          // Ícone
          const icon = document.createElement('div');
          icon.className = 'flex-shrink-0 mr-3';
          icon.innerHTML = this.getTypeIcon(type);
          notification.appendChild(icon);

          // Mensagem
          const text = document.createElement('p');
          text.className = 'text-sm font-medium';
          text.textContent = message;
          notification.appendChild(text);

          // Botão de fechar
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
                  return `
                      <svg class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                  `;
              case 'error':
                  return `
                      <svg class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                  `;
              case 'warning':
                  return `
                      <svg class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                  `;
              default:
                  return `
                      <svg class="${baseClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                  `;
          }
      }

      // Métodos de conveniência
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

  // Criar instância global
  window.notifications = new NotificationSystem();

  // Event Listeners para eventos do sistema
  document.addEventListener('guildCreated', (event) => {
      window.notifications.success(`Guilda ${event.detail.name} criada com sucesso!`);
  });

  document.addEventListener('achievementUnlocked', (event) => {
      window.notifications.success(`Nova conquista desbloqueada: ${event.detail.title}`);
  });

  document.addEventListener('challengeCompleted', (event) => {
      window.notifications.success(`Desafio concluído! +${event.detail.xp}XP`);
  });

  document.addEventListener('levelUp', (event) => {
      window.notifications.success(`Nível ${event.detail.level} alcançado!`);
  });

  document.addEventListener('error', (event) => {
      window.notifications.error(event.detail.message);
  });
});