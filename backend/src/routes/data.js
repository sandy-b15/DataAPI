import express from "express";
import { query } from "../config/database.js";
import { authenticateApiKey } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateApiKey, async (req, res) => {
  try {
    const result = await query(
      "INSERT INTO stored_data (user_id, data, api_key_id) VALUES ($1, $2, $3) RETURNING id, created_at, api_key_id",
      [req.userId, req.body.data, req.api_key_id]
    );

    res.status(201).json({
      id: result.rows[0].id,
      created_at: result.rows[0].created_at,
    });
  } catch (error) {
    res.status(500).json({ error: "Error storing data" });
  }
});

router.get("/", authenticateApiKey, async (req, res) => {
  try {
    const result = await query(
      "SELECT id, data, created_at FROM stored_data WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId]
    );

    res.json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving data" });
  }
});

export default router;
