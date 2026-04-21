const express = require('express');
const router = express.Router();

const promptRoutes = require('./promptRoutes');
const refineRoutes = require('./refineRoutes');

// Health check
router.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Debug endpoint to check environment variables (masked)
if (process.env.NODE_ENV === 'development') {
  router.get('/debug', (req, res) => {
    const config = require('../config/config');
    res.json({
      openaiConfigured: !!config.openai.apiKey,
      supabaseConfigured: !!config.supabase.url,
      supabaseServiceRoleConfigured: !!config.supabase.serviceRoleKey,
    });
  });
}

// Mount routes
router.use('/prompts', promptRoutes);
router.use('/refine', refineRoutes);

module.exports = router;
