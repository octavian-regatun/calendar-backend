function stringifyProperties(object) {
export function stringifyProperties(object) {
  Object.keys(object).forEach((property) => {
    object[property] = object[property].toString()
  })
}

/**
 *
 * @param {Date} date
 */
export function isDateValid(date) {
  return !isNaN(date.getTime())
}

