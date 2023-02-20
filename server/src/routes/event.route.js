const express = require('express')
const router = express.Router()
const EventController = require('../controllers/event.controller')
const { buildEventsFilter, eventsInputRequestFormatter } = require('../middlewares/requestFormatter.middleware')

router.get('/calendar', EventController.calendar)

router.route('/')
  .get(buildEventsFilter, EventController.index)
  .post(eventsInputRequestFormatter, EventController.create)

router.route('/:id')
  .get(EventController.view)
  .put(eventsInputRequestFormatter, EventController.update)
  .delete(EventController.destroy)
module.exports = router
