const mongoose = require("mongoose");

const TourPlanSchema = new mongoose.Schema({
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fromCountry: {
    type: String,
    required: true,
  },
  toCountry: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const TourPlan = mongoose.model("TourPlan", TourPlanSchema);

module.exports = TourPlan;
