class ResponseController {
  /**
   * 200 - Success
   * @param {import('express').Response} res
   * @param {Object|string} body
   */
  static success(res, body) {
    return res.status(200).send(body)
  }

  /**
   * @param {import('express').Response} res
   * @param {number} status
   * 400 Bad Request,
   * 401 Unauthorized,
   * 403 Forbidden,
   * 404 Not Found,
   * @param {string} message
   */
  static error(res, status, message) {
    return res
      .status(status)
      .send({ error: { status: status, message: message } })
  }

  /**
   * 401 - Unauthorized
   * @param {import('express').Response} res
   */
  static unauthorized(res) {
    return res.sendStatus(401)
  }

  /**
   * 500 - Internal Server Error
   * @param {import('express').Response} res
   */
  static internalServerError(res) {
    return res.sendStatus(500)
  }
}

export default ResponseController
