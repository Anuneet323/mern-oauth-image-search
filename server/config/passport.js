import dotenv from "dotenv";
dotenv.config(); // ✅ Load env variables here FIRST

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
import User from "../models/User.js";

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => done(null, await User.findById(id)));

const verify = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id });
    if (!user) {
      user = await User.create({
        providerId: profile.id,
        name: profile.displayName,
        provider: profile.provider,
      });
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
};

// ✅ Google OAuth Strategy
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("❌ Missing Google OAuth credentials in .env file");
} else {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.BASE_URL + "/auth/google/callback",
      },
      verify
    )
  );
  console.log("✅ Google Strategy Initialized");
}

// ✅ GitHub OAuth Strategy
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.error("❌ Missing GitHub OAuth credentials in .env file");
} else {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.BASE_URL + "/auth/github/callback",
      },
      verify
    )
  );
  console.log("✅ GitHub Strategy Initialized");
}
