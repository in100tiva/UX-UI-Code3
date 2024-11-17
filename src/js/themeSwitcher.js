// Theme Switcher Component
class ThemeSwitcher {
  constructor() {
      this.themeToggleBtn = document.getElementById('themeToggle');
      this.darkIcon = document.querySelector('.dark\\:block');
      this.lightIcon = document.querySelector('.block');
      this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      this.currentTheme = localStorage.getItem('theme') || 'dark';
      
      this.init();
  }

  init() {
      // Inicializa o tema
      this.applyTheme(this.currentTheme);
      
      // Configura os event listeners
      this.setupEventListeners();
      
      // Atualiza a aparência inicial do botão
      this.updateToggleButton();
  }

  applyTheme(theme) {
      if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark:bg-gray-900');
          document.body.classList.remove('bg-white');
      } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark:bg-gray-900');
          document.body.classList.add('bg-white');
      }
      localStorage.setItem('theme', theme);
      this.currentTheme = theme;
  }

  toggleTheme() {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(newTheme);
      this.updateToggleButton();
  }

  updateToggleButton() {
      if (this.darkIcon && this.lightIcon) {
          if (this.currentTheme === 'dark') {
              this.darkIcon.classList.remove('hidden');
              this.lightIcon.classList.add('hidden');
          } else {
              this.darkIcon.classList.add('hidden');
              this.lightIcon.classList.remove('hidden');
          }
      }
  }

  setupEventListeners() {
      // Event listener para o botão de toggle
      if (this.themeToggleBtn) {
          this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
      }

      // Event listener para mudanças nas preferências do sistema
      this.prefersDarkScheme.addListener((e) => {
          const newTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(newTheme);
          this.updateToggleButton();
      });
  }

  // Método para obter o tema atual
  getCurrentTheme() {
      return this.currentTheme;
  }

  // Método para forçar um tema específico
  setTheme(theme) {
      if (theme === 'dark' || theme === 'light') {
          this.applyTheme(theme);
          this.updateToggleButton();
      }
  }
}

// Inicializa o Theme Switcher quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.themeSwitcher = new ThemeSwitcher();
});