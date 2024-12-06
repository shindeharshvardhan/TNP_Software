const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    taskDescription: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);


const activitySchema = new mongoose.Schema(
  {
    ActivityName: {
      type: String,
      required: true,
    },
    ActivityDescription: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      
      required: true,
    },
  },
  { timestamps: true }
);

const eventSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    eventName: {
      type: String,
      required: true, // Ensure eventName is required
    },
    tasks: {
      type: [taskSchema],
      default: [],
    },
    activities: {
      type: [activitySchema],
      default: [],
    },
  },
  { timestamps: true }
);

eventSchema.index({ companyId: 1 });

module.exports = mongoose.model("Event", eventSchema);
