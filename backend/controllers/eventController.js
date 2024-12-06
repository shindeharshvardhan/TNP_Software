// const Event = require('../models/eventModel');

// // Create a new event
// exports.createEvent = async (req, res) => {
//   console.log('Request received to create event:', req.body); // Add this log to verify
//   try {
//     const event = new Event(req.body);
//     await event.save();
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// // Get all events
// exports.getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get event by ID
// exports.getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an event
// exports.updateEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json(event);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete an event
// exports.deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndDelete(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.status(200).json({ message: 'Event deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Event = require("../models/event");

// Create or Update an Event
const createOrUpdateEvent = async (req, res) => {
    try {
        const { companyId, eventName, tasks, activities } = req.body;

        // Check if the event already exists
        let event = await Event.findOne({ companyId, eventName });
        if (event) {
            // Update the existing event
            event.tasks = tasks || event.tasks;
            event.activities = activities || event.activities;
            event.updatedAt = Date.now(); // Manually update timestamp if needed
        } else {
            // Create a new event
            event = new Event({ companyId, eventName, tasks, activities });
        }

        // Save the event to the database
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        console.error("Error creating/updating event:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch Events by Company
const getEventsByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        // Retrieve all events associated with the company
        const events = await Event.find({ companyId }).sort({ createdAt: -1 });
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching events:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch Tasks by Date
const getTasksByDate = async (req, res) => {
    try {
        const { companyId, date } = req.query;

        // Parse the date to match with tasks
        const targetDate = new Date(date).toISOString().split("T")[0];

        // Find tasks by date for a specific company
        const events = await Event.find({ companyId, "tasks.date": targetDate });
        const tasks = events.flatMap((event) =>
            event.tasks.filter(
                (task) => new Date(task.date).toISOString().split("T")[0] === targetDate
            )
        );

        res.status(200).json(tasks);
    } catch (err) {
        console.error("Error fetching tasks by date:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete Event by ID
const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Remove the event by ID
        const event = await Event.findByIdAndDelete(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error("Error deleting event:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Add a Task to an Event
const createTaskForEvent = async (req, res) => {
    try {
        const { companyId, eventName, tasks } = req.body;

        // Validate request payload
        if (!companyId || !eventName || !Array.isArray(tasks)) {
            return res.status(400).json({ error: "Invalid payload: companyId, eventName, and tasks are required." });
        }

        // Validate each task in the tasks array
        for (const task of tasks) {
            const { taskName, taskDescription, date } = task;
            if (!taskName || !taskDescription || !date) {
                return res.status(400).json({ error: "Each task must have a name, description, and date." });
            }
        }

        // Find or create the event
        let event = await Event.findOne({ companyId, eventName });

        if (event) {
            // Update the tasks array (replace entirely)
            event.tasks = tasks;
        } else {
            // Create a new event with the given tasks
            event = new Event({ companyId, eventName, tasks });
        }

        await event.save();

        res.status(200).json({ message: event ? "Tasks updated successfully" : "Tasks created successfully", event });
    } catch (err) {
        console.error("Error creating/updating tasks:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

  
  const updateTask = async (req, res) => {
    // try {
    //     const { companyId, eventName, taskId, taskName, taskDescription, date } = req.body;

    //     // Validate payload
    //     if (!companyId || !eventName || !taskId || !taskName || !taskDescription || !date) {
    //         return res.status(400).json({ error: "Invalid payload: All fields are required." });
    //     }

    //     // Find the event
    //     let event = await Event.findOne({ companyId, eventName });
    //     if (!event) {
    //         return res.status(404).json({ error: "Event not found." });
    //     }

    //     // Find the task and update it
    //     const taskIndex = event.tasks.findIndex((task) => task._id.toString() === taskId);
    //     if (taskIndex === -1) {
    //         return res.status(404).json({ error: "Task not found." });
    //     }

    //     event.tasks[taskIndex] = { ...event.tasks[taskIndex], taskName, taskDescription, date };

    //     await event.save();

    //     res.status(200).json({ message: "Task updated successfully", event });
    // } catch (err) {
    //     console.error("Error updating task:", err.message);
    //     res.status(500).json({ error: "Internal Server Error" });
    // }
};

// Delete a Task from an Event
const deleteTask = async (req, res) => {
    try {
        const { companyId, eventName, taskId } = req.params;

        // Find the event
        const event = await Event.findOne({ companyId, eventName });
        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }

        // Remove the task by taskId
        const taskIndex = event.tasks.findIndex((task) => task._id.toString() === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found." });
        }

        event.tasks.splice(taskIndex, 1);
        await event.save();

        res.status(200).json({ message: "Task deleted successfully", event });
    } catch (err) {
        console.error("Error deleting task:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTasksForEvent = async (req, res) => {
    try {
        const { companyId, eventName } = req.params;

        // Find the event
        const event = await Event.findOne({ companyId, eventName });
        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }

        res.status(200).json(event.tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Fetch All Tasks for a Company
const getAllTasksForCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        // Find all events for the company and extract tasks
        const events = await Event.find({ companyId });
        const tasks = events.flatMap((event) => event.tasks);

        res.status(200).json(tasks);
    } catch (err) {
        console.error("Error fetching all tasks:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createOrUpdateEvent,
    getEventsByCompany,
    getTasksByDate,
    deleteEvent,
    createTaskForEvent,
    updateTask,
    deleteTask,
    getTasksForEvent,
    getAllTasksForCompany,
};
