import mongoose, { Schema } from 'mongoose'

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String, required: true },
  createdAt: { type: Date, required: true },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  participants: { type: [Schema.Types.ObjectId] },
  photo: { type: String },
  location: { type: String }
})

const Event = mongoose.model('Event', EventSchema, 'events')

export default Event
