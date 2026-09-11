import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    showIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
      },
    ],

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true },
);

const DiscountRule = mongoose.model("DiscountRule", discountSchema);

export default DiscountRule;
