const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const ActivitySchema = new mongoose.Schema({
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
});

const eventSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    tasks: [taskSchema], // Array of tasks
    actvities : [ActivitySchema]
});

module.exports = mongoose.model("Event", eventSchema);
