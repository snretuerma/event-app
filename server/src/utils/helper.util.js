module.exports.titleFormat = (string) => {
  return string
    ? string
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
    : ''
}

module.exports.capitalizeFirstChar = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : ''
}

module.exports.validateDates = (start, end) => {
  if (new Date(start).getHours() < 8 || new Date(end).getHours() > 20) {
    return { valid: false, message: 'Time should be between 8 AM and 8 PM only' }
  }
  if (start > end) {
    return { valid: false, message: 'Start date should not be later than the end date' }
  }

  if (start < new Date()) {
    return { valid: false, message: 'Start date should be ahead of current date or time' }
  }
  return { valid: true, message: 'Valid date input' }
}
