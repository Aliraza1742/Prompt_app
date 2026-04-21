const { createClient } = require('@supabase/supabase-js');
const config = require('./config');

let supabase = null;

function initializeDatabase() {
  if (!config.supabase.url || !config.supabase.serviceRoleKey) {
    console.warn('Supabase environment variables are missing; API routes will return 500.');
    return null;
  }

  supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);
  return supabase;
}

function getDatabase() {
  if (!supabase) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return supabase;
}

module.exports = {
  initializeDatabase,
  getDatabase,
};
