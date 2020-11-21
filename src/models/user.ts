import mongoose, { Schema, Document } from 'mongoose';

export enum Gender {
  male = 'M',
  female = 'F',
  unknown = 'U'
}

export interface Address extends Document {
  country: string;
  city: string;
  street: string;
  streetNumber: string;
}

export interface IUser extends Document {
  id: string;
  provider: string;
  providerId: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthday: Date;
  address: Address;
}

const UserSchema: Schema = new Schema({
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: {
    type: String,
    enum: Object.values(Gender),
    default: Gender.unknown
  },
  birthday: Date,
  address: {
    country: { type: String },
    city: { type: String },
    street: { type: String },
    streetNumber: { type: String }
  }
});

export default mongoose.model<IUser>('User', UserSchema, 'users');