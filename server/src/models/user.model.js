const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
    default: null
  },
  lastname: {
    type: String,
    required: true
  },
  extension: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Date.now()
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null
  }
})

UserSchema.virtual('fullname')
  .get(function () {
    const middlename = this.middlename ? `${this.middlename.charAt(0)}.` : ''
    const firstname = this.extension ? `${this.firstname} ${this.extension}` : this.firstname
    return (`${this.lastname}, ${firstname} ${middlename} `).trim()
  })

UserSchema.pre('find', function () {
  this.where({ deletedAt: null })
})

UserSchema.set('toJSON', { getters: true, virtuals: true })
module.exports = mongoose.model('User', UserSchema)
