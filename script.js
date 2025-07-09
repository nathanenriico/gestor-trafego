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
  
  // Opcional: ativar cursor personalizado (descomente a linha abaixo)
  // document.body.classList.add('custom-cursor');

  // Smooth scroll para links da navegação
  // Links da navegação
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
});

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
    case 'gaming':
      content = `
        <h3>🎮 Gaming & Entretenimento</h3>
        <p>Parcerias estratégicas com plataformas de entretenimento digital, focando em aquisição de usuários e campanhas de engajamento.</p>
        <p><strong>Serviços oferecidos:</strong></p>
        <ul>
          <li>Campanhas de aquisição de jogadores</li>
          <li>Estratégias de retenção</li>
          <li>Otimização de funis de conversão</li>
        </ul>
        <a href="#" class="modal-link" target="_blank">Acesse Aqui</a>
      `;
      break;
    case 'ecommerce':
      content = `
        <h3>🛍️ E-commerce Premium</h3>
        <p>Colaborações exclusivas com marcas de luxo e lifestyle, desenvolvendo campanhas sofisticadas para públicos de alto valor.</p>
        <p><strong>Foco em:</strong></p>
        <ul>
          <li>Marcas de luxo e premium</li>
          <li>Campanhas de lifestyle</li>
          <li>Segmentação de alto valor</li>
        </ul>
        <a href="#" class="modal-link" target="_blank">Acesse Aqui</a>
      `;
      break;
    case 'crypto':
      content = `
        <h3>₿ Crypto & Blockchain</h3>
        <p>Em desenvolvimento: Parcerias com exchanges e plataformas de criptomoedas para campanhas de educação e aquisição de usuários.</p>
        <p><strong>Em breve:</strong></p>
        <ul>
          <li>Campanhas educativas sobre crypto</li>
          <li>Aquisição para exchanges</li>
          <li>Estratégias DeFi</li>
        </ul>
        <p style="color: #fbbf24; font-weight: 600;">🚀 Lançamento previsto para Q2 2025</p>
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

// Chatbot com ChatGPT

const systemPrompt = `Você é o assistente virtual do Lucas Arthur, gestor de tráfego pago especializado em performance.

Informações sobre Lucas Arthur:
- +5 anos de experiência
- +200 contas gerenciadas
- +R$ 50M investimento gerenciado
- ROAS médio de 3.8x
- Especialista em Google Ads, Meta Ads, Consultoria e Lançamentos
- Cases de sucesso: +340% ROAS, R$ 2.8M faturamento

Seja prestativo, profissional e direcione para contato via WhatsApp quando apropriado. Mantenha respostas concisas.`;

function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const chatbot = document.getElementById('chatbot');
  const close = document.getElementById('chatbot-close');
  const input = document.getElementById('chatbot-input');
  const send = document.getElementById('chatbot-send');
  const messages = document.getElementById('chatbot-messages');

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

  async function getBotResponse(userInput) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: CONFIG.MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userInput }
          ],
          max_tokens: CONFIG.MAX_TOKENS,
          temperature: CONFIG.TEMPERATURE
        })
      });
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      return 'Desculpe, estou com dificuldades técnicas. Que tal falar direto no WhatsApp?';
    }
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, true);
    input.value = '';
    
    // Mostrar indicador de digitação
    addMessage('Digitando...', false);
    const typingMessage = messages.lastElementChild;

    try {
      const response = await getBotResponse(text);
      messages.removeChild(typingMessage);
      addMessage(response);
    } catch (error) {
      messages.removeChild(typingMessage);
      addMessage('Erro na conexão. Tente novamente!');
    }
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

// Inicializar chatbot quando a página carregar
document.addEventListener('DOMContentLoaded', initChatbot);

// Demonstrações Interativas
function openDemo(demoType) {
  const modal = document.getElementById('demoModal');
  const demoBody = document.getElementById('demoBody');
  
  let content = '';
  
  switch(demoType) {
    case 'dashboard':
      content = `
        <h3>📊 Dashboard em Tempo Real</h3>
        <div class="dashboard-demo">
          <div class="metrics-grid">
            <div class="metric-card">
              <span class="metric-value">R$ 45.2K</span>
              <span>Investimento Hoje</span>
            </div>
            <div class="metric-card">
              <span class="metric-value">R$ 172.8K</span>
              <span>Retorno Gerado</span>
            </div>
            <div class="metric-card">
              <span class="metric-value">3.82x</span>
              <span>ROAS Atual</span>
            </div>
            <div class="metric-card">
              <span class="metric-value">1.247</span>
              <span>Conversões</span>
            </div>
          </div>
        </div>
      `;
      break;
    case 'calculator':
      content = `
        <h3>🧮 Calculadora de ROI</h3>
        <div class="calculator-form">
          <div class="form-group">
            <label>Setor do Negócio:</label>
            <select id="sector">
              <option value="ecommerce">E-commerce</option>
              <option value="servicos">Serviços</option>
              <option value="saude">Saúde</option>
              <option value="educacao">Educação</option>
            </select>
          </div>
          <div class="form-group">
            <label>Investimento Mensal (R$):</label>
            <input type="number" id="investment" placeholder="10000">
          </div>
          <button onclick="calculateROI()" class="btn btn-primary">Calcular ROI</button>
          <div id="roiResult" class="calc-result" style="display:none;"></div>
        </div>
      `;
      break;
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
                  <div class="modal-metrics-overlay">
                    <div class="modal-metric">
                      <span class="modal-metric-label">Alcance</span>
                      <span class="modal-metric-value">2.847</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">Impressões</span>
                      <span class="modal-metric-value">8.542</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">CTR</span>
                      <span class="modal-metric-value">1.2%</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">CPC</span>
                      <span class="modal-metric-value">R$ 2.45</span>
                    </div>
                  </div>
                </div>
                
                <div class="modal-comparison-image" id="modal-depois-view">
                  <img src="imagens/depois.png" alt="Adega Depois">
                  <div class="modal-metrics-overlay">
                    <div class="modal-metric">
                      <span class="modal-metric-label">Alcance</span>
                      <span class="modal-metric-value improvement">12.394</span>
                      <span class="modal-improvement-badge">+335%</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">Impressões</span>
                      <span class="modal-metric-value improvement">45.678</span>
                      <span class="modal-improvement-badge">+435%</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">CTR</span>
                      <span class="modal-metric-value improvement">3.8%</span>
                      <span class="modal-improvement-badge">+217%</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">CPC</span>
                      <span class="modal-metric-value improvement">R$ 0.89</span>
                      <span class="modal-improvement-badge">-64%</span>
                    </div>
                  </div>
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
                  <div class="modal-metrics-overlay">
                    <div class="modal-metric">
                      <span class="modal-metric-label">Alcance</span>
                      <span class="modal-metric-value">1.234</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">Impressões</span>
                      <span class="modal-metric-value">4.567</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">CTR</span>
                      <span class="modal-metric-value">0.8%</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">CPC</span>
                      <span class="modal-metric-value">R$ 3.20</span>
                    </div>
                  </div>
                </div>
                
                <div class="modal-comparison-image" id="modal-depois-view">
                  <img src="imagens/depois pizzaria.png" alt="Pizzaria Depois">
                  <div class="modal-metrics-overlay">
                    <div class="modal-metric">
                      <span class="modal-metric-label">Alcance</span>
                      <span class="modal-metric-value improvement">18.945</span>
                      <span class="modal-improvement-badge">+1435%</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">Impressões</span>
                      <span class="modal-metric-value improvement">67.832</span>
                      <span class="modal-improvement-badge">+1385%</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">CTR</span>
                      <span class="modal-metric-value improvement">4.2%</span>
                      <span class="modal-improvement-badge">+425%</span>
                    </div>
                    <div class="modal-metric">
                      <span class="modal-metric-label">CPC</span>
                      <span class="modal-metric-value improvement">R$ 0.95</span>
                      <span class="modal-improvement-badge">-70%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;
    case 'timeline':
      content = `
        <h3>⏱️ Timeline de Resultados</h3>
        <div class="timeline-container">
          <div class="timeline-item">
            <div class="timeline-date">Mês 1</div>
            <div class="timeline-content">
              <strong>Setup & Otimização</strong><br>
              ROAS: 2.1x | Investimento: R$ 15K
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">Mês 2</div>
            <div class="timeline-content">
              <strong>Escala Controlada</strong><br>
              ROAS: 3.4x | Investimento: R$ 25K
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">Mês 3</div>
            <div class="timeline-content">
              <strong>Performance Máxima</strong><br>
              ROAS: 4.2x | Investimento: R$ 40K
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">Mês 6</div>
            <div class="timeline-content">
              <strong>Estabilização</strong><br>
              ROAS: 3.8x | Investimento: R$ 60K
            </div>
          </div>
        </div>
      `;
      break;
    case 'ai-chat':
      content = `
        <h3>🤖 IA Especializada</h3>
        <div style="padding: 2rem; background: var(--dark-light); border-radius: 12px; margin: 1rem 0;">
          <p>Converse com nossa IA treinada com todos os nossos cases reais</p>
          <div style="margin: 2rem 0; padding: 1rem; background: rgba(0, 255, 153, 0.1); border-radius: 8px; border: 1px solid rgba(0, 255, 153, 0.2);">
            <strong>IA:</strong> Olá! Tenho acesso a todos os 200+ cases do Lucas. Sobre qual setor você gostaria de saber?
          </div>
          <button class="btn btn-primary">Ativar Chat Especializado</button>
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
  
  if (demoType === 'ai-chat') {
    setTimeout(() => {
      const aiInput = document.getElementById('ai-input');
      if (aiInput) {
        aiInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') sendAIMessage();
        });
      }
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
  const modalComparisonImages = document.querySelectorAll('.modal-comparison-image');
  
  modalToggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const view = this.getAttribute('data-modal-view');
      const parentCase = this.closest('.case-item');
      
      // Remove active apenas dos botões do mesmo case
      parentCase.querySelectorAll('.modal-toggle-btn').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Remove active apenas das imagens do mesmo case
      parentCase.querySelectorAll('.modal-comparison-image').forEach(img => {
        img.classList.remove('active', 'show-metrics');
      });
      
      const targetImage = parentCase.querySelector('#modal-' + view + '-view');
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
      document.getElementById(caseType + '-case').classList.add('active');
    });
  });
}

function calculateROI() {
  const sector = document.getElementById('sector').value;
  const investment = parseFloat(document.getElementById('investment').value);
  
  if (!investment) return;
  
  const multipliers = {
    ecommerce: 3.5,
    servicos: 4.2,
    saude: 3.8,
    educacao: 3.1
  };
  
  const expectedReturn = investment * multipliers[sector];
  const profit = expectedReturn - investment;
  
  document.getElementById('roiResult').innerHTML = `
    <strong>Projeção para ${sector}:</strong><br>
    Retorno Esperado: R$ ${expectedReturn.toLocaleString('pt-BR')}<br>
    Lucro Líquido: R$ ${profit.toLocaleString('pt-BR')}<br>
    ROAS: ${multipliers[sector]}x
  `;
  document.getElementById('roiResult').style.display = 'block';
}

// Prova Social Dinâmica
function openProof(proofType) {
  const modal = document.getElementById('experienceModal');
  const body = document.getElementById('experienceBody');
  
  let content = '';
  
  switch(proofType) {
    case 'map':
      content = `
        <h3>🗺️ Mapa de Resultados por Região</h3>
        <div class="map-container">
          <p><strong>São Paulo:</strong> 45 clientes | ROAS médio: 4.2x</p>
          <p><strong>Rio de Janeiro:</strong> 28 clientes | ROAS médio: 3.8x</p>
          <p><strong>Minas Gerais:</strong> 22 clientes | ROAS médio: 4.1x</p>
          <p><strong>Sul:</strong> 31 clientes | ROAS médio: 3.9x</p>
          <p><strong>Nordeste:</strong> 18 clientes | ROAS médio: 4.3x</p>
        </div>
      `;
      break;
    case 'counter':
      content = `
        <h3>💰 Economia/Lucro Gerado</h3>
        <div style="text-align: center; padding: 2rem;">
          <div style="font-size: 3rem; color: var(--primary); font-weight: 900; margin: 1rem 0;">
            R$ <span id="live-counter">2.847.392</span>
          </div>
          <p>Economia gerada para nossos clientes este ano</p>
          <p style="color: var(--gray-light); margin-top: 1rem;">Atualizado em tempo real</p>
        </div>
      `;
      break;
    case 'benchmark':
      content = `
        <h3>📈 Comparativo com Mercado</h3>
        <div class="benchmark-chart">
          <div class="benchmark-item">
            <span class="benchmark-value">3.8x</span>
            <span>Nosso ROAS</span>
          </div>
          <div class="benchmark-item">
            <span class="benchmark-value">2.1x</span>
            <span>Média Mercado</span>
          </div>
          <div class="benchmark-item">
            <span class="benchmark-value">+81%</span>
            <span>Acima da Média</span>
          </div>
        </div>
      `;
      break;
    case 'testimonials':
      content = `
        <h3>🎥 Depoimentos com Dados</h3>
        <div class="video-grid">
          <div class="video-card" onclick="playTestimonial(1)">
            <h4>E-commerce Fashion</h4>
            <p>"De R$ 15K para R$ 65K/mês"</p>
            <p>🎥 Assistir depoimento</p>
          </div>
          <div class="video-card" onclick="playTestimonial(2)">
            <h4>Consultoria Jurídica</h4>
            <p>"ROAS de 1.2x para 4.8x"</p>
            <p>🎥 Assistir depoimento</p>
          </div>
          <div class="video-card" onclick="playTestimonial(3)">
            <h4>Curso Online</h4>
            <p>"R$ 2.8M em 6 meses"</p>
            <p>🎥 Assistir depoimento</p>
          </div>
        </div>
      `;
      break;
    case 'ai-chat':
      content = `
        <h3>🤖 IA Especializada</h3>
        <div style="padding: 2rem; background: var(--dark-light); border-radius: 12px; margin: 1rem 0;">
          <p>Converse com nossa IA treinada com todos os nossos cases reais</p>
          <div style="margin: 2rem 0; padding: 1rem; background: rgba(0, 255, 153, 0.1); border-radius: 8px; border: 1px solid rgba(0, 255, 153, 0.2);">
            <strong>IA:</strong> Olá! Tenho acesso a todos os 200+ cases do Lucas. Sobre qual setor você gostaria de saber?
          </div>
          <button class="btn btn-primary">Ativar Chat Especializado</button>
        </div>
      `;
      break;
  }
  
  body.innerHTML = content;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  if (proofType === 'counter') {
    startLiveCounter();
  }
}

function closeExperienceModal() {
  const modal = document.getElementById('experienceModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function startLiveCounter() {
  const counter = document.getElementById('live-counter');
  if (!counter) return;
  
  let current = 2847392;
  setInterval(() => {
    current += Math.floor(Math.random() * 100) + 50;
    counter.textContent = current.toLocaleString('pt-BR');
  }, 3000);
}

function playTestimonial(id) {
  alert(`Reproduzindo depoimento ${id} - Em desenvolvimento`);
}

function sendAIMessage() {
  const input = document.getElementById('ai-input');
  const messages = document.getElementById('ai-messages');
  const userMessage = input.value.trim();
  
  if (!userMessage) return;
  
  const userDiv = document.createElement('div');
  userDiv.className = 'ai-message user';
  userDiv.innerHTML = `<strong>Você:</strong> ${userMessage}`;
  messages.appendChild(userDiv);
  
  input.value = '';
  
  setTimeout(() => {
    const response = getAIResponse(userMessage.toLowerCase());
    const botDiv = document.createElement('div');
    botDiv.className = 'ai-message bot';
    botDiv.innerHTML = `<strong>IA:</strong> ${response}`;
    messages.appendChild(botDiv);
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

function getAIResponse(message) {
  const cases = {
    'ecommerce': 'Case E-commerce de Moda: Aumentamos o ROAS de 1.8x para 4.2x (+133%), reduzimos o CPL em 65% e aumentamos as vendas em 180%. Investimento: R$ 45K/mês, Retorno: R$ 189K/mês.',
    'moda': 'Case E-commerce de Moda: Aumentamos o ROAS de 1.8x para 4.2x (+133%), reduzimos o CPL em 65% e aumentamos as vendas em 180%. Investimento: R$ 45K/mês, Retorno: R$ 189K/mês.',
    'juridico': 'Case Consultoria Jurídica: Geramos 250% mais leads qualificados, reduzimos o CAC em 45% e aumentamos as conversões em 120%. De R$ 180 para R$ 98 por lead.',
    'consultoria': 'Case Consultoria Jurídica: Geramos 250% mais leads qualificados, reduzimos o CAC em 45% e aumentamos as conversões em 120%. De R$ 180 para R$ 98 por lead.',
    'curso': 'Case Curso Online: Faturamento de R$ 2.8M em 6 meses, ROAS de 4.2x, mais de 5.000 alunos adquiridos. Estratégia de funil completo com remarketing avançado.',
    'educacao': 'Case Curso Online: Faturamento de R$ 2.8M em 6 meses, ROAS de 4.2x, mais de 5.000 alunos adquiridos. Estratégia de funil completo com remarketing avançado.',
    'saude': 'Case Clínica Médica: 340% de aumento em agendamentos, redução de 58% no custo por agendamento, ROI de 380%. Segmentação por especialidade médica.',
    'restaurante': 'Case Restaurante: 280% de aumento em pedidos online, ROAS de 3.8x, expansão para 3 novas regiões. Foco em delivery e eventos corporativos.',
    'imobiliaria': 'Case Imobiliária: 450% mais leads qualificados, 67% de redução no CPL, 15 vendas/mês. Segmentação por faixa de preço e localização.',
    'todos': 'Principais cases: E-commerce (+340% ROAS), Consultoria Jurídica (+250% leads), Curso Online (R$ 2.8M), Clínica (+340% agendamentos), Restaurante (+280% pedidos). Qual te interessa mais?'
  };
  
  for (let keyword in cases) {
    if (message.includes(keyword)) {
      return cases[keyword];
    }
  }
  
  if (message.includes('roas')) {
    return 'Nossos melhores ROAS: E-commerce 4.2x, Curso Online 4.2x, Restaurante 3.8x, Clínica 3.8x. Média geral: 3.8x vs 2.1x do mercado.';
  }
  
  if (message.includes('investimento') || message.includes('orçamento')) {
    return 'Trabalhamos com investimentos a partir de R$ 5K/mês. Cases de sucesso: R$ 5K (ROAS 3.2x), R$ 15K (ROAS 3.8x), R$ 45K (ROAS 4.2x). Qual seu orçamento?';
  }
  
  return 'Posso ajudar com cases específicos! Tente perguntar sobre: e-commerce, consultoria, curso online, saúde, restaurante, imobiliária, ROAS ou investimento.';
}

// Comparativo de Alcance
function initReachComparison() {
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const comparisonImages = document.querySelectorAll('.comparison-image');
  const container = document.querySelector('.comparison-image-container');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      
      // Remove active class from all buttons
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all images and metrics
      comparisonImages.forEach(img => {
        img.classList.remove('active', 'slide-in-left', 'slide-in-right', 'show-metrics');
      });
      

      
      // Show selected image with animation
      const targetImage = document.getElementById(view + '-view');
      if (targetImage) {
        setTimeout(() => {
          targetImage.classList.add('active');
          if (view === 'antes') {
            targetImage.classList.add('slide-in-left');
          } else {
            targetImage.classList.add('slide-in-right');
          }
          
          // Show metrics after image animation
          setTimeout(() => {
            targetImage.classList.add('show-metrics');
          }, 300);
        }, 100);
      }
    });
  });
}

// Counter animado na seção principal
document.addEventListener('DOMContentLoaded', function() {
  const savingsCounter = document.getElementById('savings-counter');
  if (savingsCounter) {
    let current = 2847392;
    setInterval(() => {
      current += Math.floor(Math.random() * 50) + 25;
      savingsCounter.textContent = 'R$ ' + current.toLocaleString('pt-BR');
    }, 5000);
  }
  
  // Inicializar comparativo de alcance
  initReachComparison();
});