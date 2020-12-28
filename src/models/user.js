import mongoose, { Schema } from 'mongoose'

import GenderEnum from '../types/gender.js'
import AddressSchema from './address.js'

const UserSchema = new Schema({
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: {
    type: String,
    enum: Object.values(GenderEnum),
    default: 'U'
  },
  birthday: Date,
  address: { type: AddressSchema },
  friends: { type: Schema.Types.ObjectId }
})

const User = mongoose.model('User', UserSchema, 'users')

export default User
