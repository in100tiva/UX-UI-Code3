document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const themeToggleBtn = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.dark\\:block');
    const moonIcon = document.querySelector('.block');
    
    // Função para obter o tema atual do sistema
    const getSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // Função para obter o tema salvo ou usar o tema do sistema como padrão
    const getSavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || getSystemTheme();
    };
    
    // Função para salvar o tema no localStorage
    const saveTheme = (theme) => {
        localStorage.setItem('theme', theme);
    };
    
    // Função para aplicar o tema
    const applyTheme = (theme) => {
        // Remove qualquer classe de tema existente
        document.documentElement.classList.remove('light', 'dark');
        
        // Adiciona a classe do tema atual
        document.documentElement.classList.add(theme);
        
        // Atualiza os ícones
        updateThemeIcons(theme);
        
        // Dispara evento de mudança de tema
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    };
    
    // Função para atualizar os ícones do botão de tema
    const updateThemeIcons = (theme) => {
        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        }
    };
    
    // Função para alternar o tema
    const toggleTheme = () => {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Aplica o novo tema
        applyTheme(newTheme);
        // Salva a preferência
        saveTheme(newTheme);
        
        // Adiciona classe de transição suave
        document.documentElement.classList.add('theme-transition');
        
        // Remove a classe de transição após a conclusão
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    };
    
    // Observador para mudanças na preferência de tema do sistema
    const watchSystemThemeChanges = () => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Só atualiza automaticamente se não houver preferência salva
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            }
        });
    };
    
    // Função de inicialização
    const initializeTheme = () => {
        // Aplica o tema inicial
        const initialTheme = getSavedTheme();
        applyTheme(initialTheme);
        
        // Configura o observador de mudanças do sistema
        watchSystemThemeChanges();
        
        // Adiciona listener para o botão de tema
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', toggleTheme);
        }
        
        // Adiciona classe de transição inicial
        document.documentElement.classList.add('theme-transition');
    };
    
    // Exporta funções para uso global
    window.themeManager = {
        toggle: toggleTheme,
        applyTheme: applyTheme,
        getCurrentTheme: getSavedTheme
    };
    
    // Inicializa o sistema de temas
    initializeTheme();
});