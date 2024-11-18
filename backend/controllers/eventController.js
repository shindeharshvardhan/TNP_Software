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
        const { companyId, eventName, tasks } = req.body;

        // Check if the event already exists
        let event = await Event.findOne({ companyId, eventName });
        if (event) {
            // Update the existing event
            event.tasks = tasks;
        } else {
            // Create a new event
            event = new Event({ companyId, eventName, tasks });
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
        const events = await Event.find({ companyId });
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
        await Event.findByIdAndDelete(eventId);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error("Error deleting event:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createTaskForEvent = async (req, res) => {
  try {
      const { companyId, eventName, taskName, taskDescription, date } = req.body;

      // Find the event by company and event name
      let event = await Event.findOne({ companyId, eventName });
      if (!event) {
          return res.status(404).json({ error: "Event not found" });
      }

      // Create a new task object
      const newTask = {
          taskName,
          taskDescription,
          date,
      };

      // Add the new task to the tasks array
      event.tasks.push(newTask);

      // Save the event with the new task
      await event.save();

      res.status(201).json({ message: "Task added successfully", event });
  } catch (err) {
      console.error("Error creating task:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    createOrUpdateEvent,
    getEventsByCompany,
    getTasksByDate,
    deleteEvent,
    createTaskForEvent,
};
