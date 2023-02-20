const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./src/configs/db.config')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

require('./src/models/user.model')
require('./src/models/event.model')

app.use('/api/users', require('./src/routes/user.route'))
app.use('/api/events', require('./src/routes/event.route'))

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`🔥 App running on port ${PORT}!`)
})
