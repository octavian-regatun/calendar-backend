const database = process.env.TEST == 'true' ? 'test' : 'main';
export const mongooseURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@main.bcluj.mongodb.net/${database}?retryWrites=true&w=majority`;
export const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};
