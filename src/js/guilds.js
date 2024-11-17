document.addEventListener('DOMContentLoaded', function() {
  // Estado da Aplicação
  let currentFilter = 'all';
  let searchTerm = '';
  let selectedGuild = null;

  // Mock Data
  const mockGuilds = [
      {
          id: 1,
          name: 'Python Masters',
          level: 35,
          xp: '15.2K',
          members: 25,
          accessCode: 'PYM35X',
          status: 'active',
          leader: 'John Doe',
          createdAt: '2024-01-15',
          achievements: 15,
          completedChallenges: 48
      },
      {
          id: 2,
          name: 'JavaScript Ninjas',
          level: 32,
          xp: '14.8K',
          members: 22,
          accessCode: 'JSN32X',
          status: 'active',
          leader: 'Jane Smith',
          createdAt: '2024-01-20',
          achievements: 12,
          completedChallenges: 45
      },
      {
          id: 3,
          name: 'Java Warriors',
          level: 30,
          xp: '13.5K',
          members: 20,
          accessCode: 'JWR30X',
          status: 'inactive',
          leader: 'Mike Johnson',
          createdAt: '2024-02-01',
          achievements: 10,
          completedChallenges: 42
      }
  ];

  // Elementos do DOM
  const guildsTable = document.getElementById('guildsTable');
  const createGuildForm = document.getElementById('createGuildForm');
  const editGuildForm = document.getElementById('editGuildForm');
  const guildDetailsPanel = document.getElementById('guildDetailsPanel');

  // Funções de Utilidade
  const generateAccessCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
          code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return code;
  };

  const getStatusBadgeClass = (status) => {
      return status === 'active' 
          ? 'badge-success' 
          : 'badge-error';
  };

  const getGuildById = (id) => {
      return mockGuilds.find(guild => guild.id === id);
  };

  // Renderização
  const renderGuildsTable = () => {
      const filteredGuilds = mockGuilds
          .filter(guild => {
              const matchesSearch = guild.name.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesFilter = currentFilter === 'all' || guild.status === currentFilter;
              return matchesSearch && matchesFilter;
          });

      const tbody = guildsTable.querySelector('tbody');
      tbody.innerHTML = filteredGuilds.map(guild => `
          <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="text-gray-900 dark:text-white">${guild.name}</td>
              <td class="text-gray-900 dark:text-white text-center">${guild.level}</td>
              <td class="text-gray-900 dark:text-white text-center">${guild.xp}</td>
              <td class="text-gray-900 dark:text-white text-center">${guild.members}</td>
              <td class="text-gray-900 dark:text-white text-center">
                  <div class="badge ${getStatusBadgeClass(guild.status)}">${guild.status}</div>
              </td>
              <td class="text-gray-900 dark:text-white text-center">
                  <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">${guild.accessCode}</span>
              </td>
              <td>
                  <div class="flex gap-2 justify-center">
                      <button onclick="viewGuildDetails(${guild.id})" class="btn btn-sm btn-ghost">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                      </button>
                      <button onclick="openEditModal(${guild.id})" class="btn btn-sm btn-ghost">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                      </button>
                      <button onclick="deleteGuild(${guild.id})" class="btn btn-sm btn-ghost text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                      </button>
                  </div>
              </td>
          </tr>
      `).join('');

      updateStats();
  };

  const updateStats = () => {
      document.getElementById('totalGuilds').textContent = mockGuilds.length;
      document.getElementById('activeStudents').textContent = mockGuilds.reduce((total, guild) => total + guild.members, 0);
      document.getElementById('averageXP').textContent = calculateAverageXP();
      document.getElementById('retentionRate').textContent = '92%';
  };

  const calculateAverageXP = () => {
      const totalXP = mockGuilds.reduce((sum, guild) => {
          const xp = parseFloat(guild.xp.replace('K', '')) * 1000;
          return sum + xp;
      }, 0);
      return `${(totalXP / mockGuilds.length / 1000).toFixed(1)}K`;
  };

  // Event Handlers
  window.viewGuildDetails = (guildId) => {
      const guild = getGuildById(guildId);
      if (guild) {
          guildDetailsPanel.classList.remove('hidden');
          guildDetailsPanel.innerHTML = `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">${guild.name}</h3>
                      <div class="space-y-2">
                          <p class="text-gray-600 dark:text-gray-400">Líder: ${guild.leader}</p>
                          <p class="text-gray-600 dark:text-gray-400">Data de Criação: ${guild.createdAt}</p>
                          <p class="text-gray-600 dark:text-gray-400">Conquistas: ${guild.achievements}</p>
                          <p class="text-gray-600 dark:text-gray-400">Desafios Completados: ${guild.completedChallenges}</p>
                      </div>
                  </div>
                  <div class="space-y-4">
                      <div class="progress-bar bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div class="bg-indigo-600 dark:bg-indigo-500 h-2" style="width: ${(guild.level / 50) * 100}%"></div>
                      </div>
                      <p class="text-gray-600 dark:text-gray-400">Progresso para o próximo nível</p>
                  </div>
              </div>
          `;
      }
  };

  window.openEditModal = (guildId) => {
      const guild = getGuildById(guildId);
      if (guild) {
          selectedGuild = guild;
          editGuildForm.innerHTML = `
              <div class="form-control">
                  <label class="label">
                      <span class="label-text text-gray-900 dark:text-white">Nome da Guilda</span>
                  </label>
                  <input 
                      type="text" 
                      id="editGuildName" 
                      value="${guild.name}"
                      class="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                      required 
                  />
              </div>
              <div class="form-control">
                  <label class="label">
                      <span class="label-text text-gray-900 dark:text-white">Status</span>
                  </label>
                  <select 
                      id="editGuildStatus"
                      class="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                      <option value="active" ${guild.status === 'active' ? 'selected' : ''}>Ativa</option>
                      <option value="inactive" ${guild.status === 'inactive' ? 'selected' : ''}>Inativa</option>
                  </select>
              </div>
              <div class="modal-action">
                  <label for="editGuildModal" class="btn btn-ghost text-gray-900 dark:text-white">Cancelar</label>
                  <button onclick="updateGuild(event)" class="btn bg-indigo-600 hover:bg-indigo-500 text-white border-none">Salvar</button>
              </div>
          `;
          document.getElementById('editGuildModal').checked = true;
      }
  };

  window.updateGuild = (event) => {
      event.preventDefault();
      if (selectedGuild) {
          selectedGuild.name = document.getElementById('editGuildName').value;
          selectedGuild.status = document.getElementById('editGuildStatus').value;
          renderGuildsTable();
          document.getElementById('editGuildModal').checked = false;
          window.notifications.success('Guilda atualizada com sucesso!');
      }
  };

  window.deleteGuild = (guildId) => {
      if (confirm('Tem certeza que deseja excluir esta guilda?')) {
          const index = mockGuilds.findIndex(guild => guild.id === guildId);
          if (index !== -1) {
              mockGuilds.splice(index, 1);
              renderGuildsTable();
              window.notifications.success('Guilda excluída com sucesso!');
          }
      }
  };

  window.searchGuilds = (term) => {
      searchTerm = term;
      renderGuildsTable();
  };

  window.filterGuilds = (filter) => {
      currentFilter = filter;
      renderGuildsTable();
  };

  // Form Handlers
  const handleCreateGuild = (event) => {
      event.preventDefault();
      const name = document.getElementById('guildName').value;
      const members = parseInt(document.getElementById('studentsCount').value);
      
      const newGuild = {
          id: mockGuilds.length + 1,
          name,
          level: 1,
          xp: '0',
          members,
          accessCode: generateAccessCode(),
          status: 'active',
          leader: 'New Leader',
          createdAt: new Date().toISOString().split('T')[0],
          achievements: 0,
          completedChallenges: 0
      };

      mockGuilds.push(newGuild);
      renderGuildsTable();
      
      document.getElementById('createGuildModal').checked = false;
      createGuildForm.reset();
      
      window.notifications.success('Guilda criada com sucesso!');
  };

  // Event Listeners
  createGuildForm.addEventListener('submit', handleCreateGuild);

  // Inicialização
  const init = () => {
      renderGuildsTable();
  };

  init();
});