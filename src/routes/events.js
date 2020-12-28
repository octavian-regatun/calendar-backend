import express from 'express'
import mongoose from 'mongoose'
import ResponseController from '../controller/ResponseController.js'
import { ensureRightUser } from '../middlewares/auth.js'
import Event from '../models/event.js'
import { handleException } from '../utils/exceptions.js'
import { isDateValid, stringifyProperties } from '../utils/utils.js'

const router = express.Router()

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function setRightUser(req, res, next) {
  const { eventId } = req.params

  const foundEvent = Event.findById(eventId).lean()

  if (!foundEvent) {
    return ResponseController.error(res, 404, `event with id not found`)
  }

  res.locals.foundEvent = foundEvent

  const user = req.user

  if (String(user._id) === foundEvent.author) res.locals.isRightUser = true
  else res.locals.isRightUser = false

  next()
}

router.get('/:eventId', setRightUser, ensureRightUser, (req, res) => {
  const foundEvent = res.locals.foundEvent

  ResponseController.success(res, foundEvent)
})

router.get('/', (req, res) => {
  Event.find(
    { $or: [{ participants: req.user._id }, { author: req.user._id }] },
    null,
    { lean: true }
  )
    .then((foundEvents) => {
      for (const event of foundEvents) {
        stringifyProperties(event)
      }

      ResponseController.success(res, foundEvents)
    })
    .catch(handleException)
})

router.post('/', (req, res) => {
  const event = req.body

  const newEvent = new Event()

  if (!event.title) {
    return ResponseController.error(res, 400, 'title is not valid')
  }

  if (isDateValid(new Date(event.startAt))) {
    return ResponseController.error(
      res,
      400,
      'startAt is not in valid date format'
    )
  }
  if (isDateValid(new Date(event.endAt))) {
    return ResponseController.error(
      res,
      400,
      'startAt is not in valid date format'
    )
  }

  newEvent.title = event.title
  newEvent.description = event.description
  newEvent.author = mongoose.Types.ObjectId(req.user._id)
  newEvent.createdAt = new Date()
  newEvent.startAt = new Date(event.startAt)
  newEvent.endAt = new Date(event.endAt)
  newEvent.participants = event.participants
  newEvent.photo = event.photo
  newEvent.location = event.location

  newEvent
    .save()
    .then(() => ResponseController.success(res, 'card saved successfully'))
    .catch(handleException)
})

router.patch('/:eventId', setRightUser, ensureRightUser, (req, res) => {
  const event = req.body

  const foundEvent = res.locals.foundEvent

  if (!foundEvent) {
    return ResponseController.error(res, 400, 'found event is undefined')
  }

  foundEvent.title = event.title !== undefined ? event.title : foundEvent.title
  foundEvent.description =
    event.description !== undefined ? event.title : foundEvent.description
  foundEvent.startAt =
    event.startAt !== undefined ? event.startAt : foundEvent.startAt
  foundEvent.endAt = event.endAt !== undefined ? event.endAt : foundEvent.endAt
  foundEvent.participants =
    event.participants !== undefined
      ? event.participants
      : foundEvent.participants
  foundEvent.photo = event.photo !== undefined ? event.photo : foundEvent.photo

  foundEvent
    .save()
    .then(() =>
      ResponseController.success(res, {
        message: 'event saved successfully'
      })
    )
    .catch(handleException)
})

export default router
