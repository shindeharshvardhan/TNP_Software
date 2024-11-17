// const express = require('express');
// const Event = require('../models/eventModel');
// const EventController = require('../controllers/eventController'); 
// const router = express.Router();

// Create a new event
// router.post('/', EventController.createEvent);

// // Get all events
// router.get('/events', async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.status(200).send(events);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Get a single event by ID
// router.get('/events/:id', async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).send();
//     }
//     res.status(200).send(event);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Update an event
// router.put('/events/:id', async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!event) {
//       return res.status(404).send();
//     }
//     res.status(200).send(event);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Delete an event
// router.delete('/events/:id', async (req, res) => {
//   try {
//     const event = await Event.findByIdAndDelete(req.params.id);
//     if (!event) {
//       return res.status(404).send();
//     }
//     res.status(200).send(event);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post('/', EventController.createEvent);
// router.get('/', EventController.getAllEvents);
// router.get('/:id', EventController.getEventById);
// router.put('/:id', EventController.updateEvent);
// router.delete('/:id', EventController.deleteEvent);



// module.exports = router;

const express = require("express");
const router = express.Router();
const {
    createOrUpdateEvent,
    getEventsByCompany,
    getTasksByDate,
    deleteEvent,
    createTaskForEvent,  // Import the new createTaskForEvent function
} = require("../controllers/eventController");

// Route to create or update an event
router.post("/", createOrUpdateEvent);

// Route to get events for a company
router.get("/:companyId", getEventsByCompany);

// Route to get tasks by date
router.get("/tasks", getTasksByDate);

// Route to delete an event by ID
router.delete("/:eventId", deleteEvent);

// Route to create a task for an event
router.post("/create-task", createTaskForEvent);

module.exports = router;
