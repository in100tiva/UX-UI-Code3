document.addEventListener('DOMContentLoaded', function() {
    // Estado da Aplicação
    let currentFilter = 'all';
    let selectedReward = null;
    let userPoints = 1500;

    // Mock Data
    const mockRewards = [
        {
            id: 1,
            name: 'Curso Premium',
            description: 'Acesso a um curso premium por 1 mês',
            type: 'digital',
            points: 500,
            image: '/api/placeholder/200/200',
            available: true
        },
        {
            id: 2,
            name: 'Camiseta Exclusiva',
            description: 'Camiseta personalizada da sua guilda',
            type: 'physical',
            points: 800,
            image: '/api/placeholder/200/200',
            available: true
        },
        {
            id: 3,
            name: 'Badge Especial',
            description: 'Badge exclusiva para seu perfil',
            type: 'digital',
            points: 300,
            image: '/api/placeholder/200/200',
            available: true
        },
        {
            id: 4,
            name: 'Mentoria Individual',
            description: '1 hora de mentoria com um especialista',
            type: 'exclusive',
            points: 1000,
            image: '/api/placeholder/200/200',
            available: true
        },
        {
            id: 5,
            name: 'Mochila Gamer',
            description: 'Mochila exclusiva com o logo da plataforma',
            type: 'physical',
            points: 1200,
            image: '/api/placeholder/200/200',
            available: true
        },
        {
            id: 6,
            name: 'Certificado Digital',
            description: 'Certificado de conquistas especiais',
            type: 'digital',
            points: 400,
            image: '/api/placeholder/200/200',
            available: true
        }
    ];

    const mockRedeemedRewards = [
        {
            id: 1,
            name: 'Curso Python Avançado',
            type: 'digital',
            points: 500,
            date: '2024-11-15',
            status: 'Entregue'
        },
        {
            id: 2,
            name: 'Badge Mestre do Código',
            type: 'digital',
            points: 300,
            date: '2024-11-10',
            status: 'Entregue'
        }
    ];

    // Elementos do DOM
    const rewardsGrid = document.getElementById('rewardsGrid');
    const redeemedTable = document.getElementById('redeemedTable');
    const userPointsDisplay = document.getElementById('userPoints');
    const redeemModalContent = document.getElementById('redeemModalContent');
    const filterButtons = document.querySelectorAll('[onclick^="filterRewards"]');

    // Funções de Renderização
    const renderRewards = (rewards) => {
        rewardsGrid.innerHTML = rewards.map(reward => `
            <div class="card bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl">
                <figure class="px-6 pt-6">
                    <img src="${reward.image}" alt="${reward.name}" class="rounded-xl" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title text-gray-900 dark:text-white flex justify-between">
                        ${reward.name}
                        <div class="badge badge-secondary bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                            ${reward.type}
                        </div>
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400">${reward.description}</p>
                    <div class="flex justify-between items-center mt-4">
                        <div class="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                            ${reward.points} pontos
                        </div>
                        <button 
                            onclick="openRedeemModal(${reward.id})" 
                            class="btn ${reward.points > userPoints ? 'btn-disabled bg-gray-400 dark:bg-gray-600' : 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-400'} text-white border-none"
                            ${reward.points > userPoints ? 'disabled' : ''}
                        >
                            Resgatar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    };

    const renderRedeemedRewards = () => {
        const tbody = redeemedTable.querySelector('tbody');
        tbody.innerHTML = mockRedeemedRewards.map(reward => `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td class="text-gray-900 dark:text-white">${reward.name}</td>
                <td class="text-gray-900 dark:text-white">
                    <div class="badge badge-secondary bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                        ${reward.type}
                    </div>
                </td>
                <td class="text-gray-900 dark:text-white">${reward.points}</td>
                <td class="text-gray-900 dark:text-white">${formatDate(reward.date)}</td>
                <td class="text-gray-900 dark:text-white">
                    <div class="badge badge-success bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        ${reward.status}
                    </div>
                </td>
            </tr>
        `).join('');
    };

    const updateUserPoints = () => {
        userPointsDisplay.textContent = userPoints.toLocaleString();
    };

    // Funções de Utilitário
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const getRewardById = (id) => {
        return mockRewards.find(reward => reward.id === id);
    };

    // Event Handlers
    window.filterRewards = (filter) => {
        // Reset visual state of all filter buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('bg-indigo-600', 'dark:bg-indigo-500', 'text-white');
            btn.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
        });

        // Highlight the active filter button
        const activeButton = Array.from(filterButtons).find(btn => 
            btn.getAttribute('onclick').includes(filter)
        );
        if (activeButton) {
            activeButton.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
            activeButton.classList.add('bg-indigo-600', 'dark:bg-indigo-500', 'text-white');
        }

        currentFilter = filter;
        const filteredRewards = filter === 'all' 
            ? mockRewards 
            : mockRewards.filter(reward => reward.type === filter);
        
        renderRewards(filteredRewards);
    };

    window.openRedeemModal = (rewardId) => {
        selectedReward = getRewardById(rewardId);
        if (selectedReward) {
            redeemModalContent.innerHTML = `
                <div class="text-gray-900 dark:text-white">
                    <p class="mb-4">Você está prestes a resgatar:</p>
                    <h4 class="font-bold mb-2">${selectedReward.name}</h4>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">${selectedReward.description}</p>
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <p class="font-bold">Custo: ${selectedReward.points} pontos</p>
                        <p>Seus pontos atuais: ${userPoints}</p>
                        <p>Pontos restantes: ${userPoints - selectedReward.points}</p>
                    </div>
                </div>
            `;
            document.getElementById('redeemModal').checked = true;
        }
    };

    window.confirmRedeem = () => {
        if (selectedReward && userPoints >= selectedReward.points) {
            // Deduzir pontos
            userPoints -= selectedReward.points;
            updateUserPoints();

            // Adicionar ao histórico
            mockRedeemedRewards.unshift({
                id: selectedReward.id,
                name: selectedReward.name,
                type: selectedReward.type,
                points: selectedReward.points,
                date: new Date().toISOString().split('T')[0],
                status: 'Processando'
            });

            // Atualizar visualizações
            renderRedeemedRewards();
            filterRewards(currentFilter);

            // Fechar modal
            document.getElementById('redeemModal').checked = false;

            // Mostrar notificação
            const notification = document.getElementById('notification');
            const notificationMessage = document.getElementById('notificationMessage');
            notificationMessage.textContent = 'Recompensa resgatada com sucesso!';
            notification.classList.remove('hidden');
            notification.classList.add('bg-green-500', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'shadow-lg');

            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
        }
    };

    // Inicialização
    const init = () => {
        updateUserPoints();
        renderRewards(mockRewards);
        renderRedeemedRewards();
        filterRewards('all'); // Ativa o filtro inicial
    };

    init();
});