document.addEventListener('DOMContentLoaded', function () {
    // Dados iniciais para Guildas
    let guilds = [
        { id: 1, name: 'Python Masters', level: 35, xp: '15.2K', members: 25, accessCode: 'PYM35X', status: 'active' },
        { id: 2, name: 'JavaScript Ninjas', level: 32, xp: '14.8K', members: 22, accessCode: 'JSN32X', status: 'active' },
        { id: 3, name: 'Java Warriors', level: 30, xp: '13.5K', members: 20, accessCode: 'JWR30X', status: 'inactive' }
    ];

    // Mock Data para Eventos, Conquistas e Atividades
    const recentActivitiesData = [
        { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Python Masters completou desafio', time: 'Há 2 horas' },
        { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Nova conquista desbloqueada', time: 'Há 5 horas' },
    ];

    const upcomingEventsData = [
        { title: 'Hackathon de Python', date: '15/11/2024', description: 'Competição de programação em Python' },
        { title: 'Desafio JavaScript', date: '20/11/2024', description: 'Desafio de desenvolvimento web' },
    ];

    const recentAchievementsData = [
        { title: 'Master Coder', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', color: 'amber' },
        { title: 'Bug Hunter', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'purple' },
        { title: 'Clean Coder', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'emerald' },
    ];

    // Elementos do DOM
    const guildsTableBody = document.querySelector('.table tbody');
    const createGuildForm = document.getElementById('createGuildForm');
    const recentActivities = document.getElementById('recentActivities');
    const upcomingEvents = document.getElementById('upcomingEvents');
    const recentAchievements = document.getElementById('recentAchievements');

    // Funções de Utilidade
    const generateAccessCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    };

    // Renderizar Guildas
    const renderGuildsTable = () => {
        guildsTableBody.innerHTML = guilds.map(guild => `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="text-gray-900 dark:text-white">${guild.name}</td>
                <td class="text-center text-gray-900 dark:text-white">${guild.level}</td>
                <td class="text-center text-gray-900 dark:text-white">${guild.xp}</td>
                <td class="text-center text-gray-900 dark:text-white">${guild.members}</td>
                <td class="text-center text-gray-900 dark:text-white">
                    <span class="badge ${guild.status === 'active' ? 'badge-success' : 'badge-error'}">${guild.status}</span>
                </td>
                <td class="text-center text-gray-900 dark:text-white">${guild.accessCode}</td>
                <td class="flex justify-center space-x-2">
                    <button class="btn btn-sm btn-ghost" onclick="viewGuildDetails(${guild.id})" aria-label="Ver detalhes">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                    <button class="btn btn-sm btn-ghost" onclick="editGuild(${guild.id})" aria-label="Editar guilda">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button class="btn btn-sm btn-ghost text-red-500" onclick="deleteGuild(${guild.id})" aria-label="Deletar guilda">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </td>
            </tr>
        `).join('');
    };

    // Renderizar Atividades Recentes
    const renderRecentActivities = () => {
        recentActivities.innerHTML = recentActivitiesData.map(activity => `
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
    const renderUpcomingEvents = () => {
        upcomingEvents.innerHTML = upcomingEventsData.map(event => `
            <div class="card bg-gray-50 dark:bg-gray-700 shadow-md">
                <div class="card-body p-4">
                    <h3 class="card-title text-gray-900 dark:text-white text-lg">${event.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400">${event.date}</p>
                    <p class="text-gray-600 dark:text-gray-400">${event.description}</p>
                </div>
            </div>
        `).join('');
    };

    // Renderizar Conquistas Recentes
    const renderRecentAchievements = () => {
        recentAchievements.innerHTML = recentAchievementsData.map(achievement => `
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

    // Submeter Formulário de Criação
    createGuildForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const guildName = document.getElementById('guildName').value.trim();
        const membersCount = parseInt(document.getElementById('studentsCount').value, 10);

        if (guildName && membersCount > 0) {
            const newGuild = {
                id: guilds.length + 1,
                name: guildName,
                level: 1,
                xp: '0',
                members: membersCount,
                accessCode: generateAccessCode(),
                status: 'active'
            };
            guilds.push(newGuild);
            renderGuildsTable();
            createGuildForm.reset();
            document.getElementById('createGuildModal').checked = false; // Fecha o modal
            alert('Guilda criada com sucesso!');
        } else {
            alert('Preencha todos os campos corretamente.');
        }
    });

    // Visualizar Detalhes da Guilda
    window.viewGuildDetails = (id) => {
        const guild = guilds.find(g => g.id === id);
        if (guild) {
            alert(`Detalhes da Guilda:\nNome: ${guild.name}\nLíder: Guild Leader`);
        }
    };

    // Editar Guilda
    window.editGuild = (id) => {
        const guild = guilds.find(g => g.id === id);
        if (guild) {
            const newName = prompt('Editar nome da guilda:', guild.name);
            if (newName) {
                guild.name = newName;
                renderGuildsTable();
            }
        }
    };

    // Deletar Guilda
    window.deleteGuild = (id) => {
        const confirmed = confirm('Tem certeza que deseja deletar esta guilda?');
        if (confirmed) {
            guilds = guilds.filter(g => g.id !== id);
            renderGuildsTable();
        }
    };

    // Inicializar
    renderGuildsTable();
    renderRecentActivities();
    renderUpcomingEvents();
    renderRecentAchievements();
});
