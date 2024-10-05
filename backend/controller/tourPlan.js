const TourPlan = require("../model/TourPlan");
const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create a new tour plan
router.post("/", isAuthenticated, catchAsyncErrors (async (req, res) => {
  try {
    const { traveler, fromCountry, toCountry, date, } = req.body;

    const newTourPlan = new TourPlan({
      traveler,
      fromCountry,
      toCountry,
      date,
    });

    const savedPlan = await newTourPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    console.error("Error creating tour plan:", error);
    res.status(500).json({ error: "Failed to create tour plan" });
  }
}));

// Get all tour plans for a traveler
router.get("/tour-plan/:travelerId", isSeller, catchAsyncErrors(async (req, res) => {
  try {
    const travelerId = req.params.travelerId;
    const tourPlans = await TourPlan.find({ traveler: travelerId }).populate("traveler");

    res.status(200).json(tourPlans);
  } catch (error) {
    console.error("Error fetching tour plans:", error);
    res.status(500).json({ error: "Failed to fetch tour plans" });
  }
}));

// Get all recent travel plans full list
router.get("/all-tour-plan", catchAsyncErrors(async (req, res) => {
  try {
    const tourPlans = await TourPlan.find().populate("traveler");

    res.status(200).json({
      tourPlan: tourPlans
    });
  } catch (error) {
    console.error("Error fetching tour plans:", error);
    res.status(500).json({ error: "Failed to fetch tour plans" });
  }
}));

// Get user's travel plan
router.get('/', isAuthenticated, catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user._id;
    const tourPlan = await TourPlan.find({ traveler: userId }).populate("traveler");

    res.status(200).json({
      success: true,
      tourPlan: tourPlan || null,
    });
  } catch (error) {
    console.error("Error fetching tour plan:", error);
    res.status(500).json({ error: "Failed to fetch tour plan" });
  }
}));

module.exports = router;
