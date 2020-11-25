import { Response } from 'express';

export default class APIResponse {
  /**
   * 200 - Success
   * @param res
   * @param body
   */
  public static success(res: Response, body: unknown) {
    return res.status(200).send(body);
  }

  /**
   * @param res
   * @param status
   * 400 Bad Request
   * 401 Unauthorized
   * 403 Forbidden
   * 404 Not Found
   * @param message
   */
  public static error(res: Response, status: number, message: string) {
    return res
      .status(status)
      .send({ error: { status: status, message: message } });
  }

  /**
   * 401 - Unauthorized
   * @param res
   */
  public static unauthorized(res: Response) {
    res.sendStatus(401);
  }

  /**
   * 500 - Internal Server Error
   * @param res
   */
  public static internalServerError(res: Response) {
    res.sendStatus(500);
  }
}
