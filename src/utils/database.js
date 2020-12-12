import mongoose from 'mongoose'
import { mongooseOptions, mongooseURL } from './config.js'
import { handleException } from './exceptions.js'

mongoose
  .connect(mongooseURL, mongooseOptions)
  .then(() => console.log('connected to MongoDB Atlas'))
  .catch(handleException)
