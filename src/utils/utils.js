function stringifyProperties(object) {
  Object.keys(object).forEach((property) => {
    object[property] = object[property].toString()
  })
}

/**
 *
 * @param {Date} date
 */
function isDateValid(date) {
  return !isNaN(date.getTime())
}

export { stringifyProperties, isDateValid }
