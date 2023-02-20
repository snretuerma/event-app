const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')
const { nameformatter } = require('../middlewares/requestFormatter.middleware')

router.route('/')
  .get(UserController.index)
  .post(nameformatter, UserController.create)

router.route('/:id')
  .get(UserController.view)
  .put(nameformatter, UserController.update)
  .delete(UserController.destroy)

module.exports = router
