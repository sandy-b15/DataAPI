import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const apiKey = `ak_${uuidv4().replace(/-/g, '')}`;
    await query(
      'INSERT INTO api_keys (user_id, api_key) VALUES ($1, $2) RETURNING api_key',
      [req.user.userId, apiKey]
    );
    
    res.json({ apiKey });
  } catch (error) {
    res.status(500).json({ error: 'Error generating API key' });
  }
});

router.get('/list', authenticateToken, async (req, res) => {
  try {
    const result = await query(
      'SELECT api_key, created_at, last_used_at FROM api_keys WHERE user_id = $1 AND is_active = true',
      [req.user.userId]
    );
    
    res.json({ apiKeys: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving API keys' });
  }
});

export default router;