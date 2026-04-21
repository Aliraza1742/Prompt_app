const OpenAI = require('openai');
const config = require('./config');

let openaiClient = null;

function initializeOpenAI() {
  if (!config.openai.apiKey) {
    console.error('❌ OPENAI_API_KEY is missing from environment variables!');
    console.error('   Refine endpoint will not work. Please add OPENAI_API_KEY to your .env file.');
    return null;
  }

  try {
    openaiClient = new OpenAI({ apiKey: config.openai.apiKey });
    console.log('✅ OpenAI client initialized successfully');
    return openaiClient;
  } catch (error) {
    console.error('❌ Failed to initialize OpenAI client:', error.message);
    return null;
  }
}

function getOpenAIClient() {
  if (!openaiClient) {
    throw new Error('OpenAI client not initialized. Call initializeOpenAI() first.');
  }
  return openaiClient;
}

module.exports = {
  initializeOpenAI,
  getOpenAIClient,
};
