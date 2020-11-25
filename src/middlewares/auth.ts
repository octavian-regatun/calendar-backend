import { Request, Response, NextFunction } from 'express';

export function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.sendStatus(401);
  }
}

export function ensureGuest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.isAuthenticated()) {
    res.sendStatus(401);
  } else {
    return next();
  }
}

export function ensureRightUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.locals.isRightUser) {
    next();
  } else {
    res.send('cant access other user data');
  }
}
