var fs = require('fs');
var router = require('express').Router();
const eventcontroller = require('../controllers/event.controller');

// uploading an Document
router.route('/uploadFile')
      .post(eventcontroller.uploadFile);

// Single event Routes
router.route('/event')
      .post(eventcontroller.createEvent)
      .get(eventcontroller.getEvent)       
      .put(eventcontroller.updateEvent)     
      .delete(eventcontroller.deleteEvent)       

//Multiple Events Routes
router.route('/events')
      .get(eventcontroller.getAllEvents)       
      .delete(eventcontroller.deleteAllEvents)       

module.exports = router;



