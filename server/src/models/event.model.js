const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date_time_start: {
    type: Date,
    required: true,
    min: new Date()
  },
  date_time_end: {
    type: Date,
    required: true,
    min: function () { return this.date_time_start }
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
})

EventSchema.set('toJSON', { getters: true, virtuals: true })
module.exports = mongoose.model('Event', EventSchema)
