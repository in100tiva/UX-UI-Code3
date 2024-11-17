document.addEventListener('DOMContentLoaded', function() {
  // Verificar autenticação
  if (!localStorage.getItem('authToken')) {
      window.location.href = '/index.html';
      return;
  }

  // Elementos do DOM
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notificationMessage');
  const recentActivities = document.getElementById('recentActivities');
  const upcomingEvents = document.getElementById('upcomingEvents');
  const recentAchievements = document.getElementById('recentAchievements');

  // Funções de Utilidade
  const showNotification = (message, type = 'success') => {
      notificationMessage.textContent = message;
      notification.classList.remove('hidden', 'bg-green-500', 'bg-red-500', 'bg-yellow-500');
      
      switch(type) {
          case 'success':
              notification.classList.add('bg-green-500');
              break;
          case 'error':
              notification.classList.add('bg-red-500');
              break;
          case 'warning':
              notification.classList.add('bg-yellow-500');
              break;
      }
      
      notification.classList.remove('hidden');
      setTimeout(() => {
          notification.classList.add('hidden');
      }, 3000);
  };

  // Mock Data
  const mockActivities = [
      {
          type: 'challenge',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          title: 'Python Masters completou desafio',
          time: 'Há 2 horas'
      },
      {
          type: 'achievement',
          icon: 'M13 10V3L4 14h7v7l9-11h-7z',
          title: 'Nova conquista desbloqueada',
          time: 'Há 5 horas'
      }
  ];

  const mockEvents = [
      {
          title: 'Hackathon de Python',
          date: '15/11/2024',
          description: 'Competição de programação em Python'
      },
      {
          title: 'Desafio JavaScript',
          date: '20/11/2024',
          description: 'Desafio de desenvolvimento web'
      }
  ];

  const mockAchievements = [
      {
          title: 'Master Coder',
          icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
          color: 'amber'
      },
      {
          title: 'Bug Hunter',
          icon: 'M13 10V3L4 14h7v7l9-11h-7z',
          color: 'purple'
      },
      {
          title: 'Clean Coder',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          color: 'emerald'
      }
  ];

  // Renderizar Atividades Recentes
  const renderActivities = () => {
      recentActivities.innerHTML = mockActivities.map(activity => `
          <div class="flex items-center space-x-4">
              <div class="bg-indigo-600 dark:bg-indigo-500 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${activity.icon}" />
                  </svg>
              </div>
              <div>
                  <p class="text-gray-900 dark:text-white font-medium">${activity.title}</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">${activity.time}</p>
              </div>
          </div>
      `).join('');
  };

  // Renderizar Próximos Eventos
  const renderEvents = () => {
      upcomingEvents.innerHTML = mockEvents.map(event => `
          <div class="card bg-gray-50 dark:bg-gray-700 shadow-md">
              <div class="card-body p-4">
                  <h3 class="card-title text-gray-900 dark:text-white text-lg">${event.title}</h3>
                  <p class="text-gray-600 dark:text-gray-400">${event.date}</p>
                  <div class="card-actions justify-end">
                      <button class="btn bg-indigo-600 hover:bg-indigo-500 text-white border-none">Inscrever</button>
                  </div>
              </div>
          </div>
      `).join('');
  };

  // Renderizar Conquistas Recentes
  const renderAchievements = () => {
      recentAchievements.innerHTML = mockAchievements.map(achievement => `
          <div class="flex flex-col items-center">
              <div class="w-12 h-12 rounded-full bg-${achievement.color}-600 dark:bg-${achievement.color}-500 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${achievement.icon}" />
                  </svg>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400 text-center">${achievement.title}</span>
          </div>
      `).join('');
  };

  // Atualizar Dados do Dashboard
  const updateDashboard = () => {
      renderActivities();
      renderEvents();
      renderAchievements();
  };

  // Event Listeners
  document.addEventListener('guildCreated', () => {
      showNotification('Guilda criada com sucesso!');
      updateDashboard();
  });

  // Inicialização
  updateDashboard();

  // Atualização periódica (a cada 5 minutos)
  setInterval(updateDashboard, 5 * 60 * 1000);
});