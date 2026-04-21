const express = require('express');
const router = express.Router();
const { refinePrompt } = require('../controllers/refineController');

router.post('/', refinePrompt);

module.exports = router;
