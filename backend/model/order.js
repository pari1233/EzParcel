const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    name: {
      type: String,
      required: [true, "Please enter the product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter the product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter the product category!"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter the quantity!"],
    default: 1,
  },
  packageSize: {
    type: Number,
    required: [true, "Please enter the package size!"],
  },
  deliveryFee: {
    type: Number,
    required: [true, "Please enter the delivery fee!"],
  },
  deliveryDate: {
    type: Date,
    required: [true, "Please provide a delivery date!"],
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["placed", "accepted", "in-transit", "delivered", "canceled"],
    default: "placed",
  },
  orderCountry: {
    type: String,
    required: [true, "Please enter the order country!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
