// ---------------------------
// 🌍  Load Environment Variables First
// ---------------------------
import dotenv from "dotenv";
dotenv.config(); // ⚡ MUST come before anything that uses process.env

// ---------------------------
// 📦  Core Imports
// ---------------------------
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";

// ---------------------------
// 🚀  Local Files
// ---------------------------
import "./config/passport.js"; // Google + GitHub strategies
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";

// ---------------------------
// ⚙️  Express App Setup
// ---------------------------
const app = express();

// Debug check
console.log("🔍 GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID ? "Loaded ✅" : "Missing ❌");
console.log("🔍 GITHUB_CLIENT_ID =", process.env.GITHUB_CLIENT_ID ? "Loaded ✅" : "Missing ❌");

// ---------------------------
// 💾  Connect MongoDB
// ---------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ---------------------------
// 🧩  Middleware Setup
// ---------------------------
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

// Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ---------------------------
// 🛣️  Routes
// ---------------------------
app.use("/auth", authRoutes); // Google + GitHub auth
app.use("/api", apiRoutes);   // Image search + history APIs

// ---------------------------
// 🚀  Start Server
// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
