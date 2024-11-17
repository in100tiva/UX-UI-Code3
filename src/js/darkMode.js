document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.getElementById('themeToggle');
  
  // Função para obter o tema salvo no localStorage
  const getSavedTheme = () => {
      return localStorage.getItem('theme') || 'dark'; // Tema padrão é dark
  };

  // Função para salvar o tema no localStorage
  const saveTheme = (theme) => {
      localStorage.setItem('theme', theme);
  };

  // Função para aplicar o tema
  const applyTheme = (theme) => {
      if (theme === 'dark') {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  };

  // Função para alternar o tema
  const toggleTheme = () => {
      const currentTheme = getSavedTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      applyTheme(newTheme);
      saveTheme(newTheme);
      
      // Atualiza a aparência do botão
      updateThemeButtonAppearance(newTheme);
  };

  // Função para atualizar a aparência do botão de tema
  const updateThemeButtonAppearance = (theme) => {
      const sunIcon = themeToggleBtn.querySelector('.dark\\:block');
      const moonIcon = themeToggleBtn.querySelector('.block');

      if (theme === 'dark') {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
          themeToggleBtn.classList.add('dark:bg-gray-700', 'dark:hover:bg-gray-600');
          themeToggleBtn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
      } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
          themeToggleBtn.classList.remove('dark:bg-gray-700', 'dark:hover:bg-gray-600');
          themeToggleBtn.classList.add('bg-gray-200', 'hover:bg-gray-300');
      }
  };

  // Inicializa o tema
  const initializeTheme = () => {
      const savedTheme = getSavedTheme();
      applyTheme(savedTheme);
      updateThemeButtonAppearance(savedTheme);
  };

  // Configura o evento de clique no botão de tema
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Configura o observer para mudanças no modo escuro do sistema
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addListener((e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
      saveTheme(newTheme);
      updateThemeButtonAppearance(newTheme);
  });

  // Inicializa o tema quando a página carrega
  initializeTheme();

  // Expõe funções globalmente se necessário
  window.toggleTheme = toggleTheme;
  window.applyTheme = applyTheme;
  window.getSavedTheme = getSavedTheme;
});