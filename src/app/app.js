import bodyParser from 'body-parser'
import connectMongo from 'connect-mongo'
import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import path from 'path'
import { PORT } from '../utils/config'
import router from '../routes/router.js'

const MongoStore = connectMongo(session)

const app = express()

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || ''],
    credentials: true
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  session({
    secret: 'very secret this is',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(
    express.static(path.join(__dirname, process.env.FRONTEND_BUILD_PATH || ''))
  )

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, process.env.FRONTEND_BUILD_PATH || '', 'index.html')
    )
  })
}

app.listen(PORT, () => {
  console.log(`calendar server is running on port: ${PORT}`)
})

export default app
