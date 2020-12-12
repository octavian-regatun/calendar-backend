import { Schema } from 'mongoose'

const AddressSchema = new Schema({
  country: { type: String },
  city: { type: String },
  street: { type: String },
  streetNumber: { type: String }
})

export default AddressSchema
