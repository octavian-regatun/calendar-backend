const PORT = process.env.PORT === undefined ? 8080 : parseInt(process.env.PORT)

const database = process.env.TEST === 'true' ? 'test' : 'main'
const mongooseURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@main.bcluj.mongodb.net/${database}?retryWrites=true&w=majority`

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

export { PORT, mongooseURL, mongooseOptions }
