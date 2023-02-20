const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)

const uri = process.env.NODE_ENV === 'production' ? process.env.PROD_DB_URI : process.env.DEV_DB_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🔗 Mongoose connection established')
}).catch(error => {
  console.log('🐛 Error connecting to database', error)
})
