var router = require('express').Router();
const eventcontroller = require('../controllers/event.controller')
// const {isArticleAuthor, isCommentAuthor, uploadArticleImage, resizeArticleImage} = require('../middlewares/article');
router.get('/',function(req, res, next) {
    res.send('Hello World')
})

// Adding An Event
router.route('/event')
      .post(eventcontroller.createEvent);

// Adding An Event
router.route('/uploadimage')
      .post(eventcontroller.uploadImage);

//Get all Events
router.route('/events')
      .get(eventcontroller.getAllEvents)       

//Get a particlular Event to view
router.route('/event')
      .get(eventcontroller.getEventbyID)       

//Delete a particlular Event
router.route('/event')
      .delete(eventcontroller.deleteEventbyID)       

// // update a particlular event 
// router.route('/event/:id')
//       .put(eventcontroller.updateEvent)       

// // delete a particlular event 
// router.route('/event/:id')
//       .delete(eventcontroller.deleteEvent)       

module.exports = router;



