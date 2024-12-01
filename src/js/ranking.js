// ranking.js

// Dados de exemplo para os rankings
const globalRankingData = [
    { name: 'Escola A', level: 25, xp: 50000, achievements: 42, completedChallenges: 120, score: 8500 },
    { name: 'Escola B', level: 22, xp: 40000, achievements: 36, completedChallenges: 100, score: 7800 },
    { name: 'Escola C', level: 28, xp: 60000, achievements: 48, completedChallenges: 130, score: 9200 },
    { name: 'Escola D', level: 20, xp: 35000, achievements: 30, completedChallenges: 90, score: 7000 },
    { name: 'Escola E', level: 24, xp: 45000, achievements: 40, completedChallenges: 110, score: 8100 }
];

const schoolRankingData = [
    { name: 'Guilda A', members: 25, totalLevels: 550, totalXp: 800000, totalAchievements: 800, totalCompletedChallenges: 2000, totalScore: 150000 },
    { name: 'Guilda B', members: 20, totalLevels: 450, totalXp: 650000, totalAchievements: 700, totalCompletedChallenges: 1800, totalScore: 120000 },
    { name: 'Guilda C', members: 30, totalLevels: 650, totalXp: 950000, totalAchievements: 900, totalCompletedChallenges: 2200, totalScore: 180000 },
    { name: 'Guilda D', members: 18, totalLevels: 400, totalXp: 550000, totalAchievements: 600, totalCompletedChallenges: 1600, totalScore: 100000 },
    { name: 'Guilda E', members: 22, totalLevels: 500, totalXp: 700000, totalAchievements: 750, totalCompletedChallenges: 1900, totalScore: 130000 }
];

const guildRankingData = [
    { name: 'Jogador A', level: 35, xp: 80000, achievements: 60, completedChallenges: 150, score: 12000 },
    { name: 'Jogador B', level: 32, xp: 70000, achievements: 55, completedChallenges: 130, score: 10500 },
    { name: 'Jogador C', level: 38, xp: 90000, achievements: 65, completedChallenges: 170, score: 13500 },
    { name: 'Jogador D', level: 30, xp: 60000, achievements: 50, completedChallenges: 120, score: 9000 },
    { name: 'Jogador E', level: 33, xp: 75000, achievements: 58, completedChallenges: 140, score: 11000 }
];

// Função para renderizar o ranking global focado nas escolas
function renderGlobalRanking(data) {
    const rankingTable = document.getElementById('rankingTable');
    rankingTable.innerHTML = '';

    data.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.level}</td>
            <td>${player.xp}</td>
            <td>${player.achievements}</td>
            <td>${player.completedChallenges}</td>
            <td>${player.score}</td>
        `;
        rankingTable.appendChild(row);
    });
}

// Função para renderizar o ranking da escola focado nas guildas
function renderSchoolRanking(data) {
    const rankingTable = document.getElementById('rankingTable');
    rankingTable.innerHTML = '';

    data.forEach((guild, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${guild.name}</td>
            <td>${guild.members}</td>
            <td>${guild.totalLevels}</td>
            <td>${guild.totalXp}</td>
            <td>${guild.totalAchievements}</td>
            <td>${guild.totalCompletedChallenges}</td>
            <td>${guild.totalScore}</td>
        `;
        rankingTable.appendChild(row);
    });
}

// Função para renderizar o ranking da guilda focado nos membros da guilda top 1
function renderGuildRanking(data) {
    const rankingTable = document.getElementById('rankingTable');
    rankingTable.innerHTML = '';

    data.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.level}</td>
            <td>${player.xp}</td>
            <td>${player.achievements}</td>
            <td>${player.completedChallenges}</td>
            <td>${player.score}</td>
        `;
        rankingTable.appendChild(row);
    });
}

// Função para criar a seção de classificação completa
function createRankingSection() {
    const rankingContainer = document.createElement('div');
    rankingContainer.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6';

    const headerContainer = document.createElement('div');
    headerContainer.className = 'flex justify-between items-center mb-6';

    const header = document.createElement('h2');
    header.className = 'text-xl font-bold text-gray-900 dark:text-white';
    header.textContent = 'Classificação Completa';
    headerContainer.appendChild(header);

    const tableContainer = document.createElement('div');
    tableContainer.className = 'overflow-x-auto';

    const table = document.createElement('table');
    table.className = 'table w-full';

    const thead = document.createElement('thead');
    const theadRow = document.createElement('tr');
    theadRow.innerHTML = `
        <th class="text-gray-900 dark:text-white">Posição</th>
        <th class="text-gray-900 dark:text-white">Nome</th>
        <th class="text-gray-900 dark:text-white">Nível</th>
        <th class="text-gray-900 dark:text-white">XP</th>
        <th class="text-gray-900 dark:text-white">Conquistas</th>
        <th class="text-gray-900 dark:text-white">Desafios Concluídos</th>
        <th class="text-gray-900 dark:text-white">Pontuação</th>
        <th class="text-gray-900 dark:text-white" style="display: none;">Pontuação Total</th>
    `;

    thead.appendChild(theadRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.id = 'rankingTable';
    table.appendChild(tbody);

    tableContainer.appendChild(table);
    rankingContainer.appendChild(headerContainer);
    rankingContainer.appendChild(tableContainer);

    return rankingContainer;
}

// Função para alternar entre os diferentes rankings
function switchRanking(type) {
    const headers = document.querySelectorAll('thead th');
    const rankingTable = document.getElementById('rankingTable');

    // Limpar a tabela
    rankingTable.innerHTML = '';

    switch (type) {
        case 'global':
            headers[2].textContent = 'Nível';
            headers[3].textContent = 'XP';
            headers[4].textContent = 'Conquistas';
            headers[5].textContent = 'Desafios Concluídos';
            headers[6].textContent = 'Pontuação';
            headers[7].style.display = 'none';
            renderGlobalRanking(globalRankingData);
            break;
        case 'school':
            headers[2].textContent = 'Membros';
            headers[3].textContent = 'Total de Níveis';
            headers[4].textContent = 'Total de XP';
            headers[5].textContent = 'Total de Conquistas';
            headers[6].textContent = 'Total de Desafios Concluídos';
            headers[7].style.display = '';
            headers[7].textContent = 'Pontuação Total';
            renderSchoolRanking(schoolRankingData);
            break;
        case 'guild':
            headers[2].textContent = 'Nível';
            headers[3].textContent = 'XP';
            headers[4].textContent = 'Conquistas';
            headers[5].textContent = 'Desafios Concluídos';
            headers[6].textContent = 'Pontuação';
            headers[7].style.display = 'none';
            renderGuildRanking(guildRankingData);
            break;
        default:
            break;
    }
}

// Adicionar a seção de classificação completa ao DOM
const mainContent = document.querySelector('.container.mx-auto.px-6');
mainContent.appendChild(createRankingSection());


