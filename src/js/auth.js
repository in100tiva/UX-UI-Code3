document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');
  const notification = document.getElementById('notification');

  // Verifica se há dados salvos no localStorage
  const checkSavedCredentials = () => {
      const savedUser = localStorage.getItem('rememberedUser');
      const savedPassword = localStorage.getItem('rememberedPassword');
      const rememberCheckbox = document.getElementById('remember');
      
      if (savedUser && savedPassword) {
          document.getElementById('username').value = savedUser;
          document.getElementById('password').value = savedPassword;
          rememberCheckbox.checked = true;
      }
  };

  // Formata o input de usuário para minúsculo
  const formatUsername = (input) => {
      input.value = input.value.toLowerCase();
  };

  // Mostra notificação
  const showNotification = (message, isSuccess = true) => {
      notification.textContent = message;
      notification.classList.remove('hidden', 'bg-green-500', 'bg-red-500');
      notification.classList.add(isSuccess ? 'bg-green-500' : 'bg-red-500');
      
      notification.style.transform = 'translate(-50%, 0)';
      notification.style.opacity = '1';
      
      setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => {
              notification.classList.add('hidden');
          }, 300);
      }, 3000);
  };

  // Gerencia o login
  const handleLogin = async (event) => {
      event.preventDefault();
      
      const username = document.getElementById('username').value.toLowerCase();
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;

      try {
          // Validação básica
          if (!username || !password) {
              throw new Error('Por favor, preencha todos os campos');
          }

          // Aqui você pode adicionar a chamada para sua API de autenticação
          // Por enquanto, vamos usar uma validação simples
          if (username === 'admin' && password === '1234') {
              // Salva as credenciais se "Lembrar-me" estiver marcado
              if (remember) {
                  localStorage.setItem('rememberedUser', username);
                  localStorage.setItem('rememberedPassword', password);
              } else {
                  localStorage.removeItem('rememberedUser');
                  localStorage.removeItem('rememberedPassword');
              }

              // Salva o token de autenticação (simulado)
              localStorage.setItem('authToken', 'dummy-token');
              
              showNotification('Login realizado com sucesso!');
              
              // Redireciona para o dashboard após um breve delay
              setTimeout(() => {
                  window.location.href = '/src/pages/dashboard.html';
              }, 1000);
          } else {
              throw new Error('Usuário ou senha incorretos');
          }
      } catch (error) {
          errorMessage.textContent = error.message;
          errorMessage.classList.remove('hidden');
          showNotification(error.message, false);
      }
  };

  // Event Listeners
  loginForm.addEventListener('submit', handleLogin);
  
  document.getElementById('username').addEventListener('input', function() {
      formatUsername(this);
  });

  // Verifica credenciais salvas ao carregar a página
  checkSavedCredentials();
});

// Função para verificar se o usuário está autenticado
const checkAuth = () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken && window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
      window.location.href = '/index.html';
  }
};

// Função para realizar logout
const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('rememberedUser');
  localStorage.removeItem('rememberedPassword');
  window.location.href = '/index.html';
};

// Verifica autenticação quando a página carrega
document.addEventListener('DOMContentLoaded', checkAuth);