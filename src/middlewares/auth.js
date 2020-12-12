/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.sendStatus(401)
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function ensureGuest(req, res, next) {
  if (req.isAuthenticated()) {
    res.sendStatus(401)
  } else {
    return next()
  }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function ensureRightUser(req, res, next) {
  if (res.locals.isRightUser) {
    next()
  } else {
    res.send('cant access other user data')
  }
}
