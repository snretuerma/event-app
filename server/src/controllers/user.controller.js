const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports.index = async (request, response) => {
  let filter = null
  if (request.query.name != null && request.query.name !== '') {
    filter = {
      $expr: {
        $regexMatch: {
          input: { $concat: ['$lastname', ' ', '$firstname'] },
          regex: request.query.name,
          options: 'i'
        }
      }
    }
  }
  try {
    const users = await User.find(filter)
    return response.status(200).json(users)
  } catch (error) {
    return response.status(400).json({ status: 'error', message: 'Failed to load user list', data: error })
  }
}

module.exports.create = async (request, response) => {
  try {
    const user = await User.create({
      firstname: request.body.firstname,
      middlename: request.body.middlename,
      lastname: request.body.lastname,
      extension: request.body.extension
    })
    try {
      await user.save()
      return response.status(201).json({ status: 'success', message: 'Successfully created user', data: user })
    } catch (error) {
      return response.status(400).json({ status: 'error', message: 'Error creating user', data: error })
    }
  } catch (error) {
    return response.status(400).json({ status: 'error', message: 'Error creating user', data: error })
  }
}

module.exports.update = async (request, response) => {
  let user
  try {
    user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true }).where('deletedAt').equals(null)
    return response.status(200).json({ status: 'success', message: `Successfully updated ${user.fullname}`, data: user })
  } catch (error) {
    if (user === null) return response.status(404).json({ status: 'error', message: 'Failed to find the user', data: error })
    else return response.status(400).json({ status: 'error', message: 'Failed to update the user', data: error })
  }
}

module.exports.destroy = async (request, response) => {
  let user
  try {
    user = await User.findById(request.params.id).where('deletedAt').equals(null)
    user.deletedAt = Date.now()
    await user.save()
    if (user) return response.status(200).json({ status: 'success', message: `Successfully deleted ${user.fullname}`, data: user })
    else return response.status(400).json({ status: 'error', message: 'Failed to delete the user' })
  } catch (error) {
    if (user === null) return response.status(404).json({ status: 'error', message: 'Failed to find the user', data: error })
    else return response.status(400).json({ status: 'error', message: 'Failed to delete the user', data: error })
  }
}

module.exports.view = async (request, response) => {
  let user
  try {
    user = await User.findById(request.params.id).where('deletedAt').equals(null)
  } catch (error) {
    return response.status(404).json({ status: 'error', message: 'Failed to find the user', data: error })
  }
  if (user) return response.status(200).json({ status: 'success', data: user })
  else return response.status(404).json({ status: 'error', message: 'User not found' })
}
