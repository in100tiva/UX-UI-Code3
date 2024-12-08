document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo para os rankings
    const globalRankingData = [
        { 
            id: 1,
            name: 'Escola Tech Masters', 
            level: 45, 
            xp: 95000, 
            achievements: 89, 
            completedChallenges: 245, 
            score: 15800,
            trend: 'up',
            details: {
                location: 'São Paulo, SP',
                foundedDate: '2020',
                totalStudents: 580,
                totalGuilds: 12,
                activeProjects: 35,
                topGuilds: ['Python Masters', 'JavaScript Ninjas', 'Data Science Pros'],
                weeklyGrowth: '12%',
                monthlyGrowth: '45%',
                topAchievements: [
                    'Escola do Ano 2023',
                    'Maior Taxa de Conclusão',
                    'Melhor Desempenho em Hackathons'
                ],
                recentEvents: [
                    'Hackathon de IA - 1º Lugar',
                    'Maratona de Programação Regional',
                    'Workshop de Blockchain'
                ]
            }
        },
        { 
            id: 2,
            name: 'Code Academy Pro', 
            level: 42, 
            xp: 88000, 
            achievements: 76, 
            completedChallenges: 220, 
            score: 14500,
            trend: 'down',
            details: {
                location: 'Rio de Janeiro, RJ',
                foundedDate: '2021',
                totalStudents: 420,
                totalGuilds: 8,
                activeProjects: 28,
                topGuilds: ['Web Dev Elite', 'Mobile Masters', 'Cloud Computing'],
                weeklyGrowth: '8%',
                monthlyGrowth: '35%',
                topAchievements: [
                    'Melhor Projeto Inovador 2023',
                    'Destaque em Cloud Computing',
                    'Top 3 Escolas Emergentes'
                ],
                recentEvents: [
                    'Feira de Projetos',
                    'Semana de Tecnologia',
                    'Meetup de Desenvolvimento'
                ]
            }
        }
    ];

    const schoolRankingData = [
        {
            id: 1,
            name: 'Python Masters A',
            members: 25,
            totalLevels: 850,
            totalXp: 1500000,
            totalAchievements: 450,
            totalChallenges: 1200,
            score: 28500,
            trend: 'up',
            details: {
                guildMaster: 'Ana Silva',
                createdAt: '2023-01-15',
                specialization: 'Backend Development',
                activeProjects: 8,
                completionRate: '92%',
                meetingSchedule: 'Segundas e Quartas',
                topMembers: [
                    { name: 'João Silva', role: 'Tech Lead', level: 35 },
                    { name: 'Maria Santos', role: 'Senior Dev', level: 32 },
                    { name: 'Carlos Oliveira', role: 'DevOps', level: 30 }
                ],
                currentProjects: [
                    'API REST para E-commerce',
                    'Sistema de Automação',
                    'Microserviços em Python'
                ],
                recentAchievements: [
                    'Melhor Projeto do Mês',
                    'Taxa de Conclusão 100%',
                    'Hackathon Vencedor'
                ],
                skillMatrix: {
                    python: '95%',
                    django: '88%',
                    flask: '82%',
                    docker: '78%'
                }
            }
        },
        {
            id: 2,
            name: 'JavaScript Ninjas B',
            members: 22,
            totalLevels: 780,
            totalXp: 1350000,
            totalAchievements: 380,
            totalChallenges: 1050,
            score: 25800,
            trend: 'up',
            details: {
                guildMaster: 'Pedro Souza',
                createdAt: '2023-02-01',
                specialization: 'Frontend Development',
                activeProjects: 6,
                completionRate: '88%',
                meetingSchedule: 'Terças e Quintas',
                topMembers: [
                    { name: 'Ana Costa', role: 'Frontend Lead', level: 33 },
                    { name: 'Lucas Mendes', role: 'UX Specialist', level: 31 },
                    { name: 'Julia Lima', role: 'React Dev', level: 29 }
                ],
                currentProjects: [
                    'Dashboard Analytics',
                    'E-commerce Frontend',
                    'Mobile App React Native'
                ],
                recentAchievements: [
                    'Melhor UI/UX',
                    'Projeto Mais Inovador',
                    'Destaque em Performance'
                ],
                skillMatrix: {
                    javascript: '92%',
                    react: '90%',
                    typescript: '85%',
                    nodejs: '80%'
                }
            }
        }
    ];

    const guildRankingData = [
        {
            id: 1,
            name: 'João Silva',
            level: 35,
            xp: 45000,
            achievements: 42,
            completedChallenges: 128,
            score: 8500,
            trend: 'up',
            details: {
                guild: 'Python Masters',
                joinDate: '2023-01-15',
                role: 'Tech Lead',
                specialization: 'Backend Development',
                languages: ['Python', 'JavaScript', 'Java'],
                frameworks: ['Django', 'Flask', 'FastAPI'],
                badges: [
                    'Python Master',
                    'Clean Code Champion',
                    'Bug Hunter Elite'
                ],
                currentProjects: [
                    'API Gateway Implementation',
                    'Machine Learning Pipeline'
                ],
                recentAchievements: [
                    { name: 'Contribuidor do Mês', date: '2024-02-01' },
                    { name: '100 Desafios Concluídos', date: '2024-01-15' },
                    { name: 'Mentor Destaque', date: '2023-12-20' }
                ],
                activityGraph: [85, 90, 88, 92, 95, 89, 91],
                skillLevels: {
                    coding: 92,
                    problemSolving: 88,
                    teamwork: 95,
                    leadership: 85
                },
                mentoring: {
                    studentsHelped: 15,
                    averageRating: 4.8,
                    totalHours: 45
                }
            }
        },
        {
            id: 2,
            name: 'Maria Santos',
            level: 33,
            xp: 42000,
            achievements: 38,
            completedChallenges: 115,
            score: 7900,
            trend: 'down',
            details: {
                guild: 'JavaScript Ninjas',
                joinDate: '2023-02-01',
                role: 'Frontend Lead',
                specialization: 'Frontend Development',
                languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
                frameworks: ['React', 'Vue', 'Angular'],
                badges: [
                    'Frontend Ninja',
                    'UI Master',
                    'Performance Guru'
                ],
                currentProjects: [
                    'Dashboard Analytics',
                    'E-commerce Frontend'
                ],
                recentAchievements: [
                    { name: 'Melhor UI/UX', date: '2024-02-01' },
                    { name: 'Sprint Champion', date: '2024-01-10' },
                    { name: 'Code Review Master', date: '2023-12-15' }
                ],
                activityGraph: [88, 92, 87, 90, 93, 91, 89],
                skillLevels: {
                    coding: 90,
                    design: 95,
                    teamwork: 92,
                    communication: 88
                },
                mentoring: {
                    studentsHelped: 12,
                    averageRating: 4.9,
                    totalHours: 35
                }
            }
        }
    ];

    let currentRankingType = 'global';

    // Funções utilitárias
    function formatNumber(number) {
        return new Intl.NumberFormat('pt-BR').format(number);
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function getTrendIcon(trend) {
        if (trend === 'up') {
            return `<svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                    </svg>`;
        }
        return `<svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>`;
    }

    function getRankBadgeClass(position) {
        if (position === 1) return 'bg-yellow-400 text-black';
        if (position === 2) return 'bg-gray-300 text-black';
        if (position === 3) return 'bg-orange-600 text-white';
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    }

    // Funções de renderização
    function renderGlobalRanking() {
        const tbody = document.getElementById('rankingTable');
        if (!tbody) return;

        tbody.innerHTML = '';

        globalRankingData.sort((a, b) => b.score - a.score).forEach((school, index) => {
            const position = index + 1;
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer';
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8 ${getRankBadgeClass(position)} rounded-full flex items-center justify-center font-bold">
                            ${position}
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">${school.name}</div>
                        <div class="ml-2">${getTrendIcon(school.trend)}</div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${formatNumber(school.xp)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">${school.level}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">${school.achievements}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">${school.completedChallenges}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-indigo-600 dark:text-indigo-400">${formatNumber(school.score)}</div>
                </td>
            `;

            row.onclick = () => showGlobalRankingModal(school);
            tbody.appendChild(row);
        });
    }

    function renderSchoolRanking() {
        const tbody = document.getElementById('rankingTable');
        if (!tbody) return;

        tbody.innerHTML = '';

        schoolRankingData.sort((a, b) => b.score - a.score).forEach((guild, index) => {
            const position = index + 1;
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer';
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8 ${getRankBadgeClass(position)} rounded-full flex items-center justify-center font-bold">
                            ${position}
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">${guild.name}</div>
                        <div class="ml-2">${getTrendIcon(guild.trend)}</div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${formatNumber(guild.totalXp)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">${guild.totalLevels}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">${guild.totalAchievements}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">${guild.totalChallenges}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-indigo-600 dark:text-indigo-400">${formatNumber(guild.score)}</div>
                </td>
            `;

            row.onclick = () => showSchoolRankingModal(guild);
            tbody.appendChild(row);
        });
    }

    function renderGuildRanking() {
        const tbody = document.getElementById('rankingTable');
        if (!tbody) return;

        tbody.innerHTML = '';

        guildRankingData.sort((a, b) => b.score - a.score).forEach((member, index) => {
            const position = index + 1;
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer';
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8 ${getRankBadgeClass(position)} rounded-full flex items-center justify-center font-bold">
                            ${position}
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">${member.name}</div>
                        <div class="ml-2">${getTrendIcon(member.trend)}</div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${formatNumber(member.xp)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">${member.level}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">${member.achievements}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">${member.completedChallenges}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-indigo-600 dark:text-indigo-400">${formatNumber(member.score)}</div>
                </td>
            `;

            row.onclick = () => showGuildMemberModal(member);
            tbody.appendChild(row);
        });
    }

    // Funções dos modais
    function showModal(content) {
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
        
        const modalWrapper = document.createElement('div');
        modalWrapper.className = 'modal-wrapper relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200';
        closeButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;
        closeButton.onclick = () => modalOverlay.remove();

        modalWrapper.innerHTML = content;
        modalWrapper.appendChild(closeButton);
        modalOverlay.appendChild(modalWrapper);
        document.body.appendChild(modalOverlay);

        modalOverlay.onclick = (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        };

        // Previne o scroll do body quando o modal está aberto
        document.body.style.overflow = 'hidden';

        // Restaura o scroll quando o modal é fechado
        modalOverlay.addEventListener('closed', () => {
            document.body.style.overflow = '';
        });
    }

    // Event handlers para troca de ranking
    window.switchRanking = function(type) {
        const buttons = document.querySelectorAll('[onclick^="switchRanking"]');
        buttons.forEach(btn => {
            btn.classList.remove('bg-indigo-600', 'dark:bg-indigo-500', 'text-white');
            btn.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
        });

        const activeButton = document.querySelector(`[onclick="switchRanking('${type}')"]`);
        if (activeButton) {
            activeButton.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
            activeButton.classList.add('bg-indigo-600', 'dark:bg-indigo-500', 'text-white');
        }

        currentRankingType = type;

        switch(type) {
            case 'global':
                renderGlobalRanking();
                break;
            case 'school':
                renderSchoolRanking();
                break;
            case 'guild':
                renderGuildRanking();
                break;
        }
    };

    // Inicialização
    function init() {
        renderGlobalRanking();
        
        // Adiciona classes ativas ao botão global inicialmente
        const globalButton = document.querySelector('[onclick="switchRanking(\'global\')"]');
        if (globalButton) {
            globalButton.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
            globalButton.classList.add('bg-indigo-600', 'dark:bg-indigo-500', 'text-white');
        }
    }

    init();
});