// Cursor personalizado
document.addEventListener('DOMContentLoaded', function() {
  // Criar elementos do cursor
  const cursor = document.createElement('div');
  const cursorFollower = document.createElement('div');
  
  cursor.className = 'cursor';
  cursorFollower.className = 'cursor-follower';
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorFollower);
  
  // Movimento do cursor
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 100);
  });
  
  // Efeitos hover
  const hoverElements = document.querySelectorAll('a, button, .project-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursorFollower.style.transform = 'scale(1.2)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursorFollower.style.transform = 'scale(1)';
    });
  });
  
  // Esconder cursor quando sair da janela
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '0.5';
  });

  // Smooth scroll para links da navegação
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Botões da hero section
  const portfolioBtn = document.querySelector('.btn-primary');
  const contactBtn = document.querySelector('.btn-secondary');
  
  if (portfolioBtn) {
    portfolioBtn.addEventListener('click', function() {
      document.getElementById('portfolio').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
  
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      document.getElementById('contato').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  // Efeito de scroll na navbar
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.header');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Animação dos cards ao fazer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observa cards para animação
  const cards = document.querySelectorAll('.service-card, .case-card, .stat, .project-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Inicializar chatbot
  initChatbot();
  initReachComparison();
});

// Chatbot simples
function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const chatbot = document.getElementById('chatbot');
  const close = document.getElementById('chatbot-close');
  const input = document.getElementById('chatbot-input');
  const send = document.getElementById('chatbot-send');
  const messages = document.getElementById('chatbot-messages');

  if (!toggle || !chatbot) return;

  toggle.addEventListener('click', () => {
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
  });

  close.addEventListener('click', () => {
    chatbot.style.display = 'none';
  });

  function addMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function getBotResponse(userInput) {
    const input = userInput.toLowerCase();
    
    if (input.includes('roas') || input.includes('retorno')) {
      return 'Nosso ROAS médio é de 3.8x! Já geramos +R$ 50M para nossos clientes. Quer saber mais? Chama no WhatsApp!';
    }
    if (input.includes('preço') || input.includes('valor') || input.includes('custo')) {
      return 'Trabalhamos com investimentos a partir de R$ 5K/mês. Vamos conversar sobre seu projeto? WhatsApp: wa.me/5511999999999';
    }
    if (input.includes('case') || input.includes('resultado')) {
      return 'Temos cases incríveis: E-commerce +340% ROAS, Consultoria +250% leads, Curso R$ 2.8M. Qual setor te interessa?';
    }
    if (input.includes('google') || input.includes('meta') || input.includes('facebook')) {
      return 'Sou especialista em Google Ads e Meta Ads! +200 contas gerenciadas com resultados comprovados. Vamos conversar?';
    }
    if (input.includes('contato') || input.includes('whatsapp')) {
      return 'Vamos conversar! WhatsApp: wa.me/5511999999999 ou email: contato@lucasarthur.com';
    }
    
    return 'Olá! Sou especialista em tráfego pago com +5 anos de experiência. Como posso ajudar com suas campanhas? 🚀';
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, true);
    input.value = '';
    
    setTimeout(() => {
      const response = getBotResponse(text);
      addMessage(response);
    }, 500);
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

// Função para abrir modal de projeto
function openProjectModal(projectType) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  
  let content = '';
  
  switch(projectType) {
    case 'cassinos':
      content = `
        <h3>🎰 Cassinos Online</h3>
        <p>Trabalho com as principais plataformas de cassinos online, desenvolvendo estratégias de aquisição de jogadores e campanhas de performance para jogos online.</p>
        <p><strong>Especialidades:</strong></p>
        <ul>
          <li>Campanhas para plataformas de jogos</li>
          <li>Aquisição de novos jogadores</li>
          <li>Estratégias de retenção e engajamento</li>
        </ul>
        <a href="#" class="modal-link" target="_blank">Acesse Aqui</a>
      `;
      break;
  }
  
  modalBody.innerHTML = content;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Função para fechar modal
function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Fechar modal clicando fora dele
window.onclick = function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target === modal) {
    closeProjectModal();
  }
}

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

// Demonstrações Interativas
function openDemo(demoType) {
  const modal = document.getElementById('demoModal');
  const demoBody = document.getElementById('demoBody');
  
  let content = '';
  
  switch(demoType) {
    case 'simulator':
      content = `
        <h3>📈 Comparativo de Alcance</h3>
        <div class="reach-comparison-modal">
          <div class="case-tabs">
            <button class="case-tab active" data-case="adega">🍷 Adega</button>
            <button class="case-tab" data-case="pizzaria">🍕 Pizzaria</button>
          </div>
          
          <div class="case-content">
            <div class="case-item active" id="adega-case">
              <div class="modal-comparison-toggle">
                <button class="modal-toggle-btn active" data-modal-view="antes">ANTES</button>
                <button class="modal-toggle-btn" data-modal-view="depois">DEPOIS</button>
              </div>
              
              <div class="modal-comparison-images">
                <div class="modal-comparison-image active" id="modal-antes-view">
                  <img src="imagens/antes.png" alt="Adega Antes">
                </div>
                
                <div class="modal-comparison-image" id="modal-depois-view">
                  <img src="imagens/depois.png" alt="Adega Depois">
                </div>
              </div>
            </div>
            
            <div class="case-item" id="pizzaria-case">
              <div class="modal-comparison-toggle">
                <button class="modal-toggle-btn active" data-modal-view="antes">ANTES</button>
                <button class="modal-toggle-btn" data-modal-view="depois">DEPOIS</button>
              </div>
              
              <div class="modal-comparison-images">
                <div class="modal-comparison-image active" id="modal-antes-view">
                  <img src="imagens/antes pizzaria.png" alt="Pizzaria Antes">
                </div>
                
                <div class="modal-comparison-image" id="modal-depois-view">
                  <img src="imagens/depois pizzaria.png" alt="Pizzaria Depois">
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;
  }
  
  demoBody.innerHTML = content;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  if (demoType === 'simulator') {
    setTimeout(() => {
      initModalComparison();
      initCaseTabs();
    }, 100);
  }
}

function closeDemoModal() {
  const modal = document.getElementById('demoModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function initModalComparison() {
  const modalToggleButtons = document.querySelectorAll('.modal-toggle-btn');
  
  modalToggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const view = this.getAttribute('data-modal-view');
      const parentCase = this.closest('.case-item');
      
      parentCase.querySelectorAll('.modal-toggle-btn').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      parentCase.querySelectorAll('.modal-comparison-image').forEach(img => {
        img.classList.remove('active');
      });
      
      const targetImage = parentCase.querySelector('#modal-' + view + '-view');
      if (targetImage) {
        setTimeout(() => {
          targetImage.classList.add('active');
        }, 100);
      }
    });
  });
}

function initCaseTabs() {
  const caseTabs = document.querySelectorAll('.case-tab');
  const caseItems = document.querySelectorAll('.case-item');
  
  caseTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const caseType = this.getAttribute('data-case');
      
      caseTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      caseItems.forEach(item => item.classList.remove('active'));
      const targetCase = document.getElementById(caseType + '-case');
      if (targetCase) {
        targetCase.classList.add('active');
        
        // Resetar para o estado "antes" quando trocar de case
        const modalToggleButtons = targetCase.querySelectorAll('.modal-toggle-btn');
        const modalImages = targetCase.querySelectorAll('.modal-comparison-image');
        
        modalToggleButtons.forEach(btn => btn.classList.remove('active'));
        modalToggleButtons[0].classList.add('active'); // Ativar "ANTES"
        
        modalImages.forEach(img => img.classList.remove('active'));
        const firstModalImage = targetCase.querySelector('.modal-comparison-image');
        if (firstModalImage) {
          firstModalImage.classList.add('active');
        }
      }
    });
  });
}

// Comparativo de Alcance
function initReachComparison() {
  // Seletor de cases
  const caseSelectorButtons = document.querySelectorAll('.case-selector-btn');
  const caseComparisons = document.querySelectorAll('.case-comparison');
  
  caseSelectorButtons.forEach(button => {
    button.addEventListener('click', function() {
      const caseType = this.getAttribute('data-case');
      
      caseSelectorButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      caseComparisons.forEach(comparison => {
        comparison.classList.remove('active');
      });
      
      const targetComparison = document.getElementById(caseType + '-comparison');
      if (targetComparison) {
        targetComparison.classList.add('active');
        
        // Resetar para o estado "antes" quando trocar de case
        const toggleButtons = targetComparison.querySelectorAll('.toggle-btn');
        const comparisonImages = targetComparison.querySelectorAll('.comparison-image');
        
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        toggleButtons[0].classList.add('active'); // Ativar "ANTES"
        
        comparisonImages.forEach(img => img.classList.remove('active', 'show-metrics'));
        const firstImage = targetComparison.querySelector('.comparison-image');
        if (firstImage) {
          firstImage.classList.add('active');
          setTimeout(() => {
            firstImage.classList.add('show-metrics');
          }, 300);
        }
      }
    });
  });
  
  // Toggle entre antes/depois
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      const activeCase = document.querySelector('.case-comparison.active');
      
      if (!activeCase) return;
      
      const caseId = activeCase.id.replace('-comparison', '');
      
      // Atualizar botões toggle
      const caseScopeButtons = activeCase.querySelectorAll('.toggle-btn');
      caseScopeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Atualizar imagens
      const caseImages = activeCase.querySelectorAll('.comparison-image');
      caseImages.forEach(img => {
        img.classList.remove('active', 'show-metrics');
      });
      
      const targetImage = activeCase.querySelector('#' + caseId + '-' + view + '-view');
      if (targetImage) {
        setTimeout(() => {
          targetImage.classList.add('active');
          setTimeout(() => {
            targetImage.classList.add('show-metrics');
          }, 300);
        }, 100);
      }
    });
  });
  
  // Inicializar o primeiro case
  const firstCase = document.querySelector('.case-comparison.active');
  if (firstCase) {
    const firstImage = firstCase.querySelector('.comparison-image');
    if (firstImage) {
      setTimeout(() => {
        firstImage.classList.add('show-metrics');
      }, 500);
    }
  }
}