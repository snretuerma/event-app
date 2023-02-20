const mongoose = require('mongoose')
const Event = mongoose.model('Event')
const { validateDates } = require('../utils/helper.util')

module.exports.index = async (request, response) => {
  const filter = request.query.filter
  try {
    let events
    if (filter.date_from) {
      events = await Event.find({
        date_time_start: {
          $gte: new Date(filter.date_from).toDateString(),
          $lt: new Date(filter.date_to).toDateString()
        }
      })
    } else {
      events = await Event.find(filter).populate({ path: 'participants', model: 'User' }).exec()
    }

    return response.status(200).json(events)
  } catch (error) {
    return response.status(400).json({ status: 'error', message: 'Failed to load events list', data: error })
  }
}

module.exports.create = async (request, response) => {
  const dates = validateDates(request.body.date_time_start, request.body.date_time_end)
  if (!dates.valid) {
    return response.status(400).json({ status: 'error', message: dates.message })
  }
  try {
    const overlaps = await Event.find({
      date_time_start:
      { $lt: new Date(request.body.date_time_end) },
      date_time_end:
      { $gt: new Date(request.body.date_time_start) }
    })
    if (overlaps.length > 0) {
      return response.status(409).json({ status: 'error', message: 'There are overlapping events', data: overlaps })
    }
    if (request.body.participants.length < 1 || request.body.participants.length > 10) {
      return response.status(400).json({ status: 'error', message: 'You can only tag 1-10 participants per event' })
    }
  } catch (error) {
    console.log(error)
  }
  try {
    const event = await Event.create({
      name: request.body.name,
      date_time_start: request.body.date_time_start.toLocaleString(),
      date_time_end: request.body.date_time_end.toLocaleString(),
      participants: request.body.participants
    })
    return response.status(201).json({ status: 'success', message: 'Successfully created event', data: event })
  } catch (error) {
    return response.status(400).json({ status: 'error', message: 'Error creating event', data: error })
  }
}

module.exports.update = async (request, response) => {
  const dates = validateDates(request.body.date_time_start, request.body.date_time_end)
  if (!dates.valid) {
    return response.status(400).json({ status: 'error', message: dates.message })
  }
  try {
    const overlaps = await Event.find({
      date_time_start:
      { $lt: new Date(request.body.date_time_end) },
      date_time_end:
      { $gt: new Date(request.body.date_time_start) }
    })
    if (overlaps.length > 0) {
      return response.status(409).json({ status: 'error', message: 'There are overlapping events', data: overlaps })
    }
    if (request.body.participants.length < 1 || request.body.participants.length > 10) {
      return response.status(400).json({ status: 'error', message: 'You can only tag 1-10 participants per event' })
    }
  } catch (error) {
    console.log(error)
  }
  let event
  try {
    event = await Event.findByIdAndUpdate(request.params.id, request.body, { new: true })
    return response.status(200).json({ status: 'success', message: `Successfully updated ${event.name}`, data: event })
  } catch (error) {
    if (event === null) return response.status(404).json({ status: 'error', message: 'Failed to find the event', data: error })
    else return response.status(400).json({ status: 'error', message: 'Failed to update the event', data: error })
  }
}

module.exports.destroy = async (request, response) => {
  let event
  try {
    event = await Event.findByIdAndDelete(request.params.id)
    if (event) return response.status(200).json({ status: 'success', message: `Successfully deleted ${event.name}`, data: event })
    else return response.status(400).json({ status: 'error', message: 'Failed to delete the event' })
  } catch (error) {
    if (event === null) return response.status(404).json({ status: 'error', message: 'Failed to find the event', data: error })
    else return response.status(400).json({ status: 'error', message: 'Failed to delete the event', data: error })
  }
}

module.exports.view = async (request, response) => {
  let event
  try {
    event = await Event.findById(request.params.id).populate({ path: 'participants', model: 'User' }).exec()
  } catch (error) {
    return response.status(404).json({ status: 'error', message: 'Failed to find the event', data: error })
  }
  if (event) response.status(200).json({ status: 'success', data: event })
  else return response.status(400).json({ status: 'error', message: 'Event not found' })
}

module.exports.calendar = async (request, response) => {
  try {
    const events = await Event.find({
      date_time_start: {
        $gte: new Date(request.query.start).toDateString(),
        $lt: new Date(request.query.end).toDateString()
      }
    })
    return response.status(200).json(events)
  } catch (error) {
    return response.status(400).json({ status: 'error', message: 'Failed to load events list', data: error })
  }
}
