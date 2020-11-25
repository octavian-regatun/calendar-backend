import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  authorId: string;
  createdAt: Date;
  date: Date;
  dateStartAt: Date;
  dateEndAt: Date;
  participantsId: Array<string>;
  photo: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  date: { type: Date, required: true },
  dateStartAt: { type: Date, required: true },
  dateEndAt: { type: Date, required: true },
  participantsId: { type: Array },
  photo: { type: String }
});

export default mongoose.model<IEvent>('Event', EventSchema, 'events');
