const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challenge.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// User starts a challenge
router.post('/take', authenticate, challengeController.takeChallenge);

// User completes a challenge
router.post('/complete', authenticate, challengeController.completeChallenge);

module.exports = router;