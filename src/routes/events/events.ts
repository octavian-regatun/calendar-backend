import express, { NextFunction, Request, Response } from 'express';
import { handleException } from '../../exceptions';
import { ensureRightUser } from '../../middlewares/auth';
import Event from '../../models/event';
import { IEvent } from '../../models/event';
import APIResponse from '../../responses';

const router = express.Router();

function setRightUser(req: Request, res: Response, next: NextFunction) {
  const { eventId } = req.params;

  Event.findById(eventId)
    .then((foundEvent) => {
      if (!foundEvent) {
        return APIResponse.error(
          res,
          404,
          `event with id: ${eventId} not found`
        );
      }

      res.locals.foundEvent = foundEvent;

      const user = req.user as Express.User;

      if (user._id == foundEvent?.authorId) {
        res.locals.isRightUser = true;
      } else {
        res.locals.isRightUser = false;
      }
      next();
    })
    .catch((err) => handleException(err));
}

router.get('/:eventId', setRightUser, ensureRightUser, (req, res) => {
  APIResponse.success(res, res.locals.foundEvent);
});

router.get('/', (req, res) => {
  Event.find({ authorId: req.user?._id })
    .then((events) => {
      res.send(events);
    })
    .catch((err) => {
      handleException(err);
    });
});

router.post('/', (req, res) => {
  const event: IEvent = req.body as IEvent;

  const newEvent = new Event();

  const user = req.user as Express.User;

  newEvent.title = event.title;
  newEvent.description = event.description;
  newEvent.authorId = user._id;
  newEvent.createdAt = new Date();
  newEvent.date = event.date;
  newEvent.dateStartAt = event.dateStartAt;
  newEvent.dateEndAt = event.dateEndAt;
  newEvent.participantsId = event.participantsId;
  newEvent.photo = event.photo;

  newEvent.save().catch((err) => {
    handleException(err);
  });

  APIResponse.success(res, 'card saved successfully');
});

router.patch('/:eventId', setRightUser, ensureRightUser, (req, res) => {
  const event: IEvent = req.body as IEvent;
  console.log(event);
  const foundEvent = res.locals.foundEvent as IEvent;

  foundEvent.title = event.title != undefined ? event.title : foundEvent.title;
  foundEvent.description =
    event.description != undefined ? event.title : foundEvent.description;
  foundEvent.date = event.date != undefined ? event.date : foundEvent.date;
  foundEvent.dateStartAt =
    event.dateStartAt != undefined ? event.dateStartAt : foundEvent.dateStartAt;
  foundEvent.dateEndAt =
    event.dateEndAt != undefined ? event.dateEndAt : foundEvent.dateEndAt;
  foundEvent.participantsId =
    event.participantsId != undefined
      ? event.participantsId
      : foundEvent.participantsId;
  foundEvent.photo = event.photo != undefined ? event.photo : foundEvent.photo;

  foundEvent.save().catch((err: unknown) => handleException(err));

  APIResponse.success(res, {
    message: 'event saved successfully'
  });
});

export default router;
