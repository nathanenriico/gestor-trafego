// Configuração da API OpenAI
// IMPORTANTE: Nunca exponha sua chave API em produção!
// Use variáveis de ambiente ou backend para maior segurança

const CONFIG = {
  OPENAI_API_KEY: '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', // Substitua pela sua chave real
  
  // Configurações do ChatGPT
  MODEL: 'gpt-3.5-turbo',
  MAX_TOKENS: 150,
  TEMPERATURE: 0.7
};

// Para usar em produção, considere:
// 1. Backend proxy para esconder a chave
// 2. Variáveis de ambiente
// 3. Autenticação de usuário