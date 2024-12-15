import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config/config.js";

// Routes
import authRoutes from "./routes/auth.js";
import apiKeyRoutes from "./routes/apiKeys.js";
import dataRoutes from "./routes/data.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3-g1qyrhxr--5173--c8c182a3.local-credentialless.webcontainer-api.io",
    ],
  })
);
// Middleware
app.use(helmet());
// app.use(cors(config.cors));

app.use(express.json());
app.set("trust proxy", 1);
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/keys", apiKeyRoutes);
app.use("/api/data", dataRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
