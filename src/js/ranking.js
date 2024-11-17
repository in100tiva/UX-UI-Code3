document.addEventListener('DOMContentLoaded', function() {
  // Mock Data
  const mockRankingData = {
      global: [
          { id: 1, name: 'Python Masters', level: 35, xp: 15200, achievements: 25, challenges: 48, score: 18500 },
          { id: 2, name: 'JavaScript Ninjas', level: 32, xp: 14800, achievements: 22, challenges: 45, score: 17900 },
          { id: 3, name: 'Java Warriors', level: 30, xp: 13500, achievements: 20, challenges: 42, score: 16500 },
          { id: 4, name: 'Ruby Rebels', level: 28, xp: 12800, achievements: 18, challenges: 38, score: 15200 },
          { id: 5, name: 'C# Crusaders', level: 27, xp: 12200, achievements: 17, challenges: 36, score: 14800 },
          { id: 6, name: 'PHP Phantoms', level: 25, xp: 11500, achievements: 15, challenges: 34, score: 13900 },
          { id: 7, name: 'Go Guardians', level: 23, xp: 10800, achievements: 14, challenges: 32, score: 13200 },
          { id: 8, name: 'Rust Rangers', level: 22, xp: 10200, achievements: 13, challenges: 30, score: 12600 },
          { id: 9, name: 'Swift Sentinels', level: 20, xp: 9500, achievements: 12, challenges: 28, score: 11800 },
          { id: 10, name: 'Kotlin Knights', level: 19, xp: 9000, achievements: 11, challenges: 26, score: 11200 }
      ],
      school: [],
      guild: []
  };

  // Estado da Aplicação
  let currentRanking = 'global';
  let currentPage = 1;
  const itemsPerPage = 10;

  // Elementos do DOM
  const rankingTable = document.getElementById('rankingTable');
  const currentPageSpan = document.getElementById('currentPage');
  const firstPlaceElement = document.getElementById('firstPlace');
  const secondPlaceElement = document.getElementById('secondPlace');
  const thirdPlaceElement = document.getElementById('thirdPlace');

  // Funções de Utilidade
  const formatNumber = (number) => {
      return new Intl.NumberFormat('pt-BR').format(number);
  };

  const calculateTotalPages = (data) => {
      return Math.ceil(data.length / itemsPerPage);
  };

  // Renderização
  const renderPodium = (data) => {
      if (data.length >= 3) {
          firstPlaceElement.textContent = data[0].name;
          secondPlaceElement.textContent = data[1].name;
          thirdPlaceElement.textContent = data[2].name;
      }
  };

  const renderRankingTable = (data) => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageData = data.slice(startIndex, endIndex);

      const tbody = rankingTable.querySelector('tbody');
      tbody.innerHTML = pageData.map((item, index) => `
          <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 ${index < 3 ? 'font-bold' : ''}">
              <td class="text-gray-900 dark:text-white">
                  <div class="flex items-center">
                      <span class="text-lg mr-2">${startIndex + index + 1}º</span>
                      ${index < 3 ? getMedalIcon(index) : ''}
                  </div>
              </td>
              <td class="text-gray-900 dark:text-white">${item.name}</td>
              <td class="text-gray-900 dark:text-white">
                  <div class="flex items-center">
                      <span class="level-badge mr-2">${item.level}</span>
                  </div>
              </td>
              <td class="text-gray-900 dark:text-white">${formatNumber(item.xp)}</td>
              <td class="text-gray-900 dark:text-white">${formatNumber(item.achievements)}</td>
              <td class="text-gray-900 dark:text-white">${formatNumber(item.challenges)}</td>
              <td class="text-gray-900 dark:text-white font-bold">${formatNumber(item.score)}</td>
          </tr>
      `).join('');

      currentPageSpan.textContent = currentPage;
  };

  const getMedalIcon = (position) => {
      const colors = ['text-yellow-500', 'text-gray-400', 'text-amber-600'];
      return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${colors[position]}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
      `;
  };

  // Event Handlers
  window.switchRanking = (type) => {
      currentRanking = type;
      currentPage = 1;
      
      // Atualizar tabs
      document.querySelectorAll('.tab').forEach(tab => {
          tab.classList.remove('tab-active');
          if (tab.textContent.toLowerCase().includes(type)) {
              tab.classList.add('tab-active');
          }
      });

      updateRanking();
  };

  window.changePage = (direction) => {
      const totalPages = calculateTotalPages(mockRankingData[currentRanking]);
      
      if (direction === 'prev' && currentPage > 1) {
          currentPage--;
      } else if (direction === 'next' && currentPage < totalPages) {
          currentPage++;
      }

      renderRankingTable(mockRankingData[currentRanking]);
  };

  const handlePeriodFilter = () => {
      const periodFilter = document.getElementById('periodFilter');
      periodFilter.addEventListener('change', () => {
          // Implementar lógica de filtro por período
          updateRanking();
      });
  };

  // Atualização do Ranking
  const updateRanking = () => {
      const data = mockRankingData[currentRanking];
      renderPodium(data);
      renderRankingTable(data);
  };

  // Inicialização
  const init = () => {
      // Gerar dados mock para escola e guilda
      mockRankingData.school = mockRankingData.global.map(item => ({...item})).sort(() => Math.random() - 0.5);
      mockRankingData.guild = mockRankingData.global.map(item => ({...item})).sort(() => Math.random() - 0.5);

      handlePeriodFilter();
      updateRanking();
  };

  init();
});