document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.dark\\:block');
    const moonIcon = document.querySelector('.block');
    const html = document.documentElement;

    // Função para obter preferência do sistema
    const getSystemPreference = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Função para obter tema atual
    const getCurrentTheme = () => {
        // Verifica primeiro no localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Se não houver tema salvo, usa a preferência do sistema
        return getSystemPreference();
    };

    // Função para atualizar ícones do botão de tema
    const updateThemeIcons = (isDark) => {
        if (sunIcon && moonIcon) {
            if (isDark) {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        }
    };

    // Função para atualizar estilos dos botões de filtro
    const updateFilterButtons = () => {
        const activeFilter = document.querySelector('.btn[onclick^="filterRewards"].active');
        const allFilterButtons = document.querySelectorAll('.btn[onclick^="filterRewards"]');

        allFilterButtons.forEach(button => {
            if (button === activeFilter) {
                button.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
                button.classList.add('bg-indigo-600', 'dark:bg-indigo-500', 'text-white');
            } else {
                button.classList.remove('bg-indigo-600', 'dark:bg-indigo-500', 'text-white');
                button.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
            }
        });
    };

    // Função para aplicar tema
    const applyTheme = (theme) => {
        // Remove qualquer classe de tema existente
        html.classList.remove('light', 'dark');
        
        // Adiciona a classe do novo tema
        html.classList.add(theme);
        
        // Atualiza localStorage
        localStorage.setItem('theme', theme);
        
        // Atualiza ícones
        updateThemeIcons(theme === 'dark');
        
        // Atualiza estilos dos botões de filtro
        updateFilterButtons();

        // Dispara evento customizado de mudança de tema
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme } 
        }));
    };

    // Função para alternar tema
    const toggleTheme = () => {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Adiciona classe de transição antes da mudança
        html.classList.add('theme-transition');
        
        // Aplica o novo tema
        applyTheme(newTheme);
        
        // Remove classe de transição após a animação
        setTimeout(() => {
            html.classList.remove('theme-transition');
        }, 300);
    };

    // Observador de mudanças na preferência do sistema
    const watchSystemThemeChanges = () => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Só atualiza automaticamente se não houver preferência salva
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    };

    // Função de inicialização
    const initializeTheme = () => {
        // Aplica o tema inicial
        const initialTheme = getCurrentTheme();
        applyTheme(initialTheme);
        
        // Configura o observador de mudanças do sistema
        watchSystemThemeChanges();
        
        // Adiciona listener para o botão de tema
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Adiciona classe de transição inicial
        html.classList.add('theme-transition');
    };

    // Listeners para eventos relacionados a mudanças de tema
    document.addEventListener('themeChanged', () => {
        updateFilterButtons();
    });

    // Listener para quando o DOM for modificado (para botões adicionados dinamicamente)
    const observer = new MutationObserver(() => {
        updateFilterButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Exporta funções para uso global
    window.themeManager = {
        toggle: toggleTheme,
        apply: applyTheme,
        getCurrentTheme: getCurrentTheme
    };

    // Inicializa o sistema de temas
    initializeTheme();
});