var router = require('express').Router();
const eventcontroller = require('../controllers/event.controller');

router.get('/',function(req, res, next) {
    res.send('Hello World')
})

// uploading an Document
router.route('/upload')
      .post(eventcontroller.uploadImage);

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



