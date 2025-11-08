import express from "express";
import Search from "../models/Search.js";
import fetch from "node-fetch";

const router = express.Router();

// Auth Guard - only logged-in users can access API
const auth = (req, res, next) => {
  if (req.user) return next();
  return res.sendStatus(401);
};

// ✅ Get Top 5 Most Frequent Searches (Global)
router.get("/top-searches", async (req, res) => {
  const data = await Search.aggregate([
    { $group: { _id: "$term", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.json(data);
});

// ✅ Search Unsplash + Save to User History
router.post("/search", auth, async (req, res) => {
  const { term } = req.body;

  // Store search history
  await Search.create({
    userId: req.user.id,
    term,
    timestamp: new Date()
  });

  // Call Unsplash API
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${term}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const data = await response.json();

  // Map to clean format expected by frontend
  const images = data.results.map(img => ({
    id: img.id,
    url: img.urls.small,
    alt: img.alt_description || img.description || term
  }));

  res.json({
    term,
    count: images.length,
    images
  });
});

// ✅ Get Logged-in User Search History
router.get("/history", auth, async (req, res) => {
  const history = await Search.find({ userId: req.user.id }).sort({ timestamp: -1 });
  res.json(history);
});

export default router;
