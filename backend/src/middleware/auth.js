import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { query } from "../config/database.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication token required" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key required" });
  }

  try {
    const result = await query(
      "SELECT user_id, id FROM api_keys WHERE api_key = $1 AND is_active = true",
      [apiKey]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Invalid API key" });
    }

    req.userId = result.rows[0].user_id;
    req.api_key_id = result.rows[0].id;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
