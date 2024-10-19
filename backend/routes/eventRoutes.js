const express = require('express');
const Event = require('../models/eventModel');
const EventController = require('../controllers/eventController'); 
const router = express.Router();

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

router.post('/', EventController.createEvent);
router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.getEventById);
router.put('/:id', EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);



module.exports = router;
