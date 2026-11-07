const express = require('express');
const router = express.Router();
const {
  getPlaygroundConfig,
  executeSourceCode,
  getExecutionHistory,
  getExecutionRecord,
  deleteExecutionRecord,
  clearExecutionHistory,
} = require('../controllers/playgroundController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Module 3: Code Playground Routes
 * Contributor: Member 3 (B.S.D.P. Wickramasingha - SEU/IS/22/ICT/013)
 * All playground endpoints are protected for authenticated users.
 */

// Configuration and language metadata
router.get('/config', protect, getPlaygroundConfig);

// Code execution
router.post('/execute', protect, executeSourceCode);

// Execution history management
router.get('/history', protect, getExecutionHistory);
router.delete('/history', protect, clearExecutionHistory);
router.get('/history/:id', protect, getExecutionRecord);
router.delete('/history/:id', protect, deleteExecutionRecord);

module.exports = router;

