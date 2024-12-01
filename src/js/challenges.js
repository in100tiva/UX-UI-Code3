document.addEventListener('DOMContentLoaded', function() {
    // Mock Data para Desafios Diários
    let mockDailyChallenges = [
        {
            id: 1,
            title: 'Corrigir 5 Bugs',
            description: 'Encontre e corrija 5 bugs no sistema de login',
            xp: 200,
            difficulty: 'Médio',
            deadline: '23:59:59',
            requirements: [
                'Documentar cada bug encontrado',
                'Criar testes para prevenir regressões',
                'Atualizar a documentação'
            ]
        },
        {
            id: 2,
            title: 'Implementar Testes Unitários',
            description: 'Adicionar cobertura de testes para o módulo de autenticação',
            xp: 150,
            difficulty: 'Fácil',
            deadline: '23:59:59',
            requirements: [
                'Mínimo de 80% de cobertura',
                'Incluir casos de erro',
                'Documentar os testes'
            ]
        }
    ];

    // Mock Data para Desafios Semanais
    let mockWeeklyChallenges = [
        {
            id: 101,
            title: 'Desenvolver Sistema de Chat',
            description: 'Criar um sistema de chat em tempo real usando WebSocket',
            xp: 500,
            difficulty: 'Difícil',
            deadline: '7 dias',
            requirements: [
                'Implementar WebSocket',
                'Sistema de salas de chat',
                'Histórico de mensagens',
                'Suporte a emojis'
            ]
        },
        {
            id: 102,
            title: 'Criar Dashboard Analytics',
            description: 'Desenvolver um dashboard com gráficos e métricas',
            xp: 400,
            difficulty: 'Médio',
            deadline: '7 dias',
            requirements: [
                'Gráficos interativos',
                'Filtros de data',
                'Exportação de dados',
                'Responsividade'
            ]
        },
        {
            id: 103,
            title: 'Implementar CI/CD',
            description: 'Configurar pipeline de integração e deploy contínuo',
            xp: 600,
            difficulty: 'Difícil',
            deadline: '7 dias',
            requirements: [
                'Configurar GitHub Actions',
                'Testes automatizados',
                'Deploy automático',
                'Monitoramento'
            ]
        }
    ];

    // Mock Data para Desafios Ativos
    let mockActiveChallenges = [
        {
            id: 1,
            title: 'Criar uma API RESTful',
            type: 'Semanal',
            progress: 75,
            xp: 500,
            deadline: '2 dias',
            description: 'Desenvolver uma API com endpoints CRUD'
        },
        {
            id: 2,
            title: 'Implementar Autenticação JWT',
            type: 'Diário',
            progress: 45,
            xp: 300,
            deadline: '5 horas',
            description: 'Adicionar autenticação JWT ao projeto'
        }
    ];

    // Mock Data para Desafios Concluídos
    let mockCompletedChallenges = [
        {
            id: 4,
            title: 'Desenvolvimento de Interface',
            type: 'Semanal',
            xp: 450,
            completionDate: '2024-11-15',
            description: 'Criar interface responsiva com React'
        },
        {
            id: 5,
            title: 'Implementar Testes Unitários',
            type: 'Diário',
            xp: 250,
            completionDate: '2024-11-14',
            description: 'Adicionar cobertura de testes ao projeto'
        }
    ];

    // Elementos do DOM
    const dailyChallengesContainer = document.getElementById('dailyChallenges');
    const weeklyChallengesContainer = document.getElementById('weeklyChallenges');
    const activeChallengesTable = document.getElementById('activeChallengesTable');
    const completedChallengesTable = document.getElementById('completedChallengesTable');

    // Funções de Renderização
    // Atualização da função renderDailyChallenges
const renderDailyChallenges = () => {
    if (mockDailyChallenges.length === 0) {
        dailyChallengesContainer.innerHTML = `
            <div class="text-center py-4 text-gray-500 dark:text-gray-400 col-span-2">
                <p>Não há desafios diários disponíveis no momento.</p>
                <p class="text-sm mt-2">Novos desafios serão disponibilizados em breve!</p>
            </div>
        `;
        return;
    }

    dailyChallengesContainer.innerHTML = mockDailyChallenges.map(challenge => `
        <div class="card bg-base-100 dark:bg-gray-700 shadow hover:shadow-lg transition-all duration-300">
            <div class="card-body p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="card-title text-gray-900 dark:text-white text-sm">
                        ${challenge.title}
                    </h3>
                    <span class="badge badge-sm ${getDifficultyBadgeClass(challenge.difficulty)}">
                        ${challenge.difficulty}
                    </span>
                </div>
                
                <p class="text-gray-600 dark:text-gray-400 text-xs mb-2">${challenge.description}</p>
                
                <div class="space-y-1">
                    <p class="text-xs font-semibold text-gray-700 dark:text-gray-300">Requisitos:</p>
                    <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        ${challenge.requirements.map(req => `
                            <li class="flex items-start">
                                <span class="mr-1">•</span>
                                <span>${req}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="flex justify-between items-center mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div class="flex items-center">
                        <span class="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            ${challenge.xp} XP
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            ${challenge.deadline}
                        </span>
                    </div>
                    <button 
                        onclick="acceptDailyChallenge(${challenge.id})"
                        class="btn btn-primary btn-xs">
                        Aceitar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
};

// Atualização da função renderWeeklyChallenges
const renderWeeklyChallenges = () => {
    if (mockWeeklyChallenges.length === 0) {
        weeklyChallengesContainer.innerHTML = `
            <div class="text-center py-4 text-gray-500 dark:text-gray-400 col-span-2">
                <p>Não há desafios semanais disponíveis no momento.</p>
                <p class="text-sm mt-2">Novos desafios serão disponibilizados na próxima semana!</p>
            </div>
        `;
        return;
    }

    weeklyChallengesContainer.innerHTML = mockWeeklyChallenges.map(challenge => `
        <div class="card bg-base-100 dark:bg-gray-700 shadow hover:shadow-lg transition-all duration-300">
            <div class="card-body p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="card-title text-gray-900 dark:text-white text-sm">
                        ${challenge.title}
                    </h3>
                    <span class="badge badge-sm ${getDifficultyBadgeClass(challenge.difficulty)}">
                        ${challenge.difficulty}
                    </span>
                </div>
                
                <p class="text-gray-600 dark:text-gray-400 text-xs mb-2">${challenge.description}</p>
                
                <div class="space-y-1">
                    <p class="text-xs font-semibold text-gray-700 dark:text-gray-300">Requisitos:</p>
                    <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        ${challenge.requirements.map(req => `
                            <li class="flex items-start">
                                <span class="mr-1">•</span>
                                <span>${req}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="flex justify-between items-center mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div class="flex items-center">
                        <span class="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            ${challenge.xp} XP
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            ${challenge.deadline}
                        </span>
                    </div>
                    <button 
                        onclick="acceptWeeklyChallenge(${challenge.id})"
                        class="btn btn-secondary btn-xs">
                        Aceitar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
};

    const renderActiveChallenges = () => {
        activeChallengesTable.innerHTML = mockActiveChallenges.map(challenge => `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="text-gray-900 dark:text-white">
                    <div>
                        <div class="font-medium">${challenge.title}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${challenge.description}</div>
                    </div>
                </td>
                <td class="text-gray-900 dark:text-white">
                    <span class="badge ${challenge.type === 'Diário' ? 'badge-primary' : 'badge-secondary'}">
                        ${challenge.type}
                    </span>
                </td>
                <td class="text-gray-900 dark:text-white">
                    <div class="flex items-center space-x-2">
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                                class="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-300" 
                                style="width: ${challenge.progress}%">
                            </div>
                        </div>
                        <span class="text-sm">${challenge.progress}%</span>
                    </div>
                </td>
                <td class="text-gray-900 dark:text-white">
                    <div class="font-medium">${challenge.xp} XP</div>
                </td>
                <td class="text-gray-900 dark:text-white">
                    <div class="text-sm ${challenge.deadline.includes('horas') ? 'text-red-500' : 'text-gray-900 dark:text-white'}">
                        ${challenge.deadline}
                    </div>
                </td>
                <td>
                    <div class="flex space-x-2">
                        <button 
                            onclick="viewChallengeDetails(${challenge.id})" 
                            class="btn btn-sm btn-ghost text-indigo-600 dark:text-indigo-400">
                            Ver Detalhes
                        </button>
                        <button 
                            onclick="submitChallenge(${challenge.id})" 
                            class="btn btn-sm btn-primary">
                            Entregar
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    };

    const renderCompletedChallenges = () => {
        completedChallengesTable.innerHTML = mockCompletedChallenges.map(challenge => `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="text-gray-900 dark:text-white">
                    <div>
                        <div class="font-medium">${challenge.title}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${challenge.description}</div>
                    </div>
                </td>
                <td class="text-gray-900 dark:text-white">
                    <span class="badge ${challenge.type === 'Diário' ? 'badge-primary' : 'badge-secondary'}">
                        ${challenge.type}
                    </span>
                </td>
                <td class="text-gray-900 dark:text-white">
                    <div class="font-medium text-green-600 dark:text-green-400">+${challenge.xp} XP</div>
                </td>
                <td class="text-gray-900 dark:text-white">
                    ${formatDate(challenge.completionDate)}
                </td>
            </tr>
        `).join('');
    };

    // Funções de Utilidade
    const getDifficultyBadgeClass = (difficulty) => {
        switch (difficulty) {
            case 'Fácil':
                return 'badge-success';
            case 'Médio':
                return 'badge-warning';
            case 'Difícil':
                return 'badge-error';
            default:
                return 'badge-info';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    // Funções de Ação
    window.acceptDailyChallenge = (challengeId) => {
        const challengeIndex = mockDailyChallenges.findIndex(c => c.id === challengeId);
        if (challengeIndex !== -1) {
            const challenge = mockDailyChallenges[challengeIndex];
            
            const newActiveChallenge = {
                id: Date.now(),
                title: challenge.title,
                type: 'Diário',
                progress: 0,
                xp: challenge.xp,
                deadline: challenge.deadline,
                description: challenge.description
            };

            mockActiveChallenges.unshift(newActiveChallenge);
            mockDailyChallenges.splice(challengeIndex, 1);

            renderDailyChallenges();
            renderActiveChallenges();
            
            window.notifications.success(`Desafio Diário "${challenge.title}" aceito com sucesso!`);
        }
    };

    window.acceptWeeklyChallenge = (challengeId) => {
        const challengeIndex = mockWeeklyChallenges.findIndex(c => c.id === challengeId);
        if (challengeIndex !== -1) {
            const challenge = mockWeeklyChallenges[challengeIndex];
            
            const newActiveChallenge = {
                id: Date.now(),
                title: challenge.title,
                type: 'Semanal',
                progress: 0,
                xp: challenge.xp,
                deadline: challenge.deadline,
                description: challenge.description
            };

            // Adicionar aos desafios ativos
            mockActiveChallenges.unshift(newActiveChallenge);
            
            // Remover dos desafios semanais
            mockWeeklyChallenges.splice(challengeIndex, 1);

            // Atualizar ambas as visualizações
            renderWeeklyChallenges();
            renderActiveChallenges();
            
            window.notifications.success(`Desafio Semanal "${challenge.title}" aceito com sucesso!`);
        }
    };

    window.viewChallengeDetails = (challengeId) => {
        const challenge = mockActiveChallenges.find(c => c.id === challengeId);
        if (challenge) {
            window.notifications.info(`Detalhes do desafio: ${challenge.description}`);
        }
    };

    window.submitChallenge = (challengeId) => {
        const challenge = mockActiveChallenges.find(c => c.id === challengeId);
        if (challenge) {
            if (challenge.progress === 100) {
                const completedChallenge = {
                    id: challenge.id,
                    title: challenge.title,
                    type: challenge.type,
                    xp: challenge.xp,
                    completionDate: new Date().toISOString().split('T')[0],
                    description: challenge.description
                };

                mockCompletedChallenges.unshift(completedChallenge);
                const index = mockActiveChallenges.findIndex(c => c.id === challengeId);
                if (index !== -1) {
                    mockActiveChallenges.splice(index, 1);
                }

                renderActiveChallenges();
                renderCompletedChallenges();
                window.notifications.success(`Desafio "${challenge.title}" concluído com sucesso! +${challenge.xp} XP`);
            } else {
                window.notifications.warning('O desafio precisa estar 100% completo para ser entregue.');
            }
        }
    };

    // Inicialização
    const init = () => {
        renderDailyChallenges();
        renderWeeklyChallenges();
        renderActiveChallenges();
        renderCompletedChallenges();
    };

    init();
});