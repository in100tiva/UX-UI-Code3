document.addEventListener('DOMContentLoaded', function() {
  // Mock Data para Desafios
  const mockDailyChallenges = [
      {
          id: 1,
          title: 'Debugar 3 bugs',
          description: 'Encontre e corrija 3 bugs em códigos Python',
          xp: 100,
          type: 'daily',
          deadline: '23:59:59',
          difficulty: 'Fácil'
      },
      {
          id: 2,
          title: 'Escrever Testes',
          description: 'Criar 5 testes unitários',
          xp: 150,
          type: 'daily',
          deadline: '23:59:59',
          difficulty: 'Médio'
      }
  ];

  const mockWeeklyChallenges = [
      {
          id: 3,
          title: 'Criar API REST',
          description: 'Desenvolver uma API REST com 3 endpoints',
          xp: 500,
          type: 'weekly',
          deadline: '3 dias',
          difficulty: 'Difícil'
      },
      {
          id: 4,
          title: 'Refatorar Código',
          description: 'Refatorar um código legado aplicando padrões de projeto',
          xp: 400,
          type: 'weekly',
          deadline: '3 dias',
          difficulty: 'Médio'
      }
  ];

  const mockSpecialEvents = [
      {
          id: 5,
          title: 'Hackathon de Python',
          description: 'Competição de 24h de programação',
          xp: 1000,
          type: 'special',
          date: '15/11/2024',
          reward: 'Certificado + Prêmio Especial'
      },
      {
          id: 6,
          title: 'Code Challenge JS',
          description: 'Maratona de desafios JavaScript',
          xp: 800,
          type: 'special',
          date: '20/11/2024',
          reward: 'Badge Exclusiva'
      }
  ];

  const mockActiveChallenges = [
      {
          id: 7,
          title: 'Implementar Autenticação',
          type: 'weekly',
          progress: 75,
          xp: 300,
          deadline: '2 dias',
          status: 'in_progress'
      },
      {
          id: 8,
          title: 'Otimizar Queries',
          type: 'daily',
          progress: 50,
          xp: 200,
          deadline: '5 horas',
          status: 'in_progress'
      }
  ];

  const mockCompletedChallenges = [
      {
          id: 9,
          title: 'Criar Componente React',
          type: 'daily',
          xp: 150,
          completedDate: '2024-11-16'
      },
      {
          id: 10,
          title: 'Deploy Aplicação',
          type: 'weekly',
          xp: 400,
          completedDate: '2024-11-15'
      }
  ];

  // Funções de Renderização
  const renderDailyChallenges = () => {
      const container = document.getElementById('dailyChallenges');
      container.innerHTML = mockDailyChallenges.map(challenge => `
          <div class="card bg-gray-50 dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow">
              <div class="card-body p-4">
                  <div class="flex justify-between items-start">
                      <h3 class="card-title text-gray-900 dark:text-white text-lg">${challenge.title}</h3>
                      <span class="badge badge-primary">${challenge.xp}XP</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">${challenge.description}</p>
                  <div class="flex justify-between items-center mt-4">
                      <span class="text-sm text-gray-500 dark:text-gray-400">Prazo: ${challenge.deadline}</span>
                      <button onclick="acceptChallenge(${challenge.id})" class="btn btn-sm btn-primary">Aceitar</button>
                  </div>
              </div>
          </div>
      `).join('');
  };

  const renderWeeklyChallenges = () => {
      const container = document.getElementById('weeklyChallenges');
      container.innerHTML = mockWeeklyChallenges.map(challenge => `
          <div class="card bg-gray-50 dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow">
              <div class="card-body p-4">
                  <div class="flex justify-between items-start">
                      <h3 class="card-title text-gray-900 dark:text-white text-lg">${challenge.title}</h3>
                      <span class="badge badge-secondary">${challenge.xp}XP</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">${challenge.description}</p>
                  <div class="flex justify-between items-center mt-4">
                      <span class="text-sm text-gray-500 dark:text-gray-400">Prazo: ${challenge.deadline}</span>
                      <button onclick="acceptChallenge(${challenge.id})" class="btn btn-sm btn-secondary">Aceitar</button>
                  </div>
              </div>
          </div>
      `).join('');
  };

  const renderSpecialEvents = () => {
      const container = document.getElementById('specialEvents');
      container.innerHTML = mockSpecialEvents.map(event => `
          <div class="card bg-gray-50 dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow">
              <div class="card-body p-4">
                  <div class="flex justify-between items-start">
                      <h3 class="card-title text-gray-900 dark:text-white text-lg">${event.title}</h3>
                      <span class="badge badge-accent">${event.xp}XP</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">${event.description}</p>
                  <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">Recompensa: ${event.reward}</p>
                  <div class="flex justify-between items-center mt-4">
                      <span class="text-sm text-gray-500 dark:text-gray-400">Data: ${event.date}</span>
                      <button onclick="registerEvent(${event.id})" class="btn btn-sm btn-accent">Inscrever-se</button>
                  </div>
              </div>
          </div>
      `).join('');
  };

  const renderActiveChallenges = () => {
      const tbody = document.querySelector('#activeChallengesTable tbody');
      tbody.innerHTML = mockActiveChallenges.map(challenge => `
          <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="text-gray-900 dark:text-white">${challenge.title}</td>
              <td class="text-gray-900 dark:text-white">${challenge.type}</td>
              <td class="text-gray-900 dark:text-white">
                  <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div class="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" style="width: ${challenge.progress}%"></div>
                  </div>
                  <span class="text-sm text-gray-500 dark:text-gray-400">${challenge.progress}%</span>
              </td>
              <td class="text-gray-900 dark:text-white">${challenge.xp}XP</td>
              <td class="text-gray-900 dark:text-white">${challenge.deadline}</td>
              <td>
                  <button onclick="submitChallenge(${challenge.id})" class="btn btn-sm btn-success">Entregar</button>
              </td>
          </tr>
      `).join('');
  };

  const renderCompletedChallenges = () => {
      const tbody = document.querySelector('#completedChallengesTable tbody');
      tbody.innerHTML = mockCompletedChallenges.map(challenge => `
          <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="text-gray-900 dark:text-white">${challenge.title}</td>
              <td class="text-gray-900 dark:text-white">${challenge.type}</td>
              <td class="text-gray-900 dark:text-white">${challenge.xp}XP</td>
              <td class="text-gray-900 dark:text-white">${formatDate(challenge.completedDate)}</td>
          </tr>
      `).join('');
  };

  // Funções de Utilidade
  const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
  };

  // Funções de Ação
  window.acceptChallenge = (challengeId) => {
      // Implementar lógica de aceitar desafio
      window.notifications.success(`Desafio #${challengeId} aceito com sucesso!`);
      // Atualizar lista de desafios ativos
      renderActiveChallenges();
  };

  window.registerEvent = (eventId) => {
      // Implementar lógica de inscrição em evento
      window.notifications.success(`Inscrição no evento #${eventId} realizada com sucesso!`);
  };

  window.submitChallenge = (challengeId) => {
      // Implementar lógica de entrega de desafio
      window.notifications.success(`Desafio #${challengeId} entregue com sucesso!`);
      // Atualizar listas de desafios
      renderActiveChallenges();
      renderCompletedChallenges();
  };

  // Inicialização
  const init = () => {
      renderDailyChallenges();
      renderWeeklyChallenges();
      renderSpecialEvents();
      renderActiveChallenges();
      renderCompletedChallenges();
  };

  init();
});