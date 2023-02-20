const { titleFormat } = require('../utils/helper.util')

module.exports.nameformatter = (request, response, next) => {
  request.body.firstname = titleFormat(request.body.firstname)
  request.body.middlename = titleFormat(request.body.middlename)
  request.body.lastname = titleFormat(request.body.lastname)
  request.body.extension = request.body.extension ? request.body.extension.toUpperCase() : ''
  next()
}

module.exports.buildEventsFilter = (request, response, next) => {
  const queries = {
    name: request.query.name ?? null,
    date_from: request.query.date_from ?? null,
    date_to: request.query.date_to ?? null
  }
  request.query.filter = Object.fromEntries(Object.entries(queries).filter(([_, v]) => v != null))
  next()
}

module.exports.eventsInputRequestFormatter = (request, response, next) => {
  request.body.name = titleFormat(request.body.name)
  request.body.date_time_start = new Date(request.body.date_time_start)
  request.body.date_time_end = new Date(request.body.date_time_end)
  next()
}
