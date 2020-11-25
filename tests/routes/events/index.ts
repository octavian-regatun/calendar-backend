import dotenv from 'dotenv';
dotenv.config();
import assert from 'assert';
import axios from 'axios';
import mongoose from 'mongoose';
import { dbOptions, mongooseURL } from '../../../src/config';
import { handleException } from '../../../src/exceptions';
import Event, { IEvent } from '../../../src/models/event';

const cookieSession =
  's%3AlUq33ym8rTeoL1FCXWZA44qXLY_XcrCI.%2BCQu3nb4c8W2YK3sA7gwO%2Bdh%2BEe635ek7liybe0hL9g';
const URL = 'http://localhost:8080';

describe('test /events/', () => {
  before(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers = { Cookie: `connect.sid=${cookieSession};` };

    mongoose
      .connect(mongooseURL, dbOptions)
      .then(() => console.log('Connected to DB'))
      .catch((err) => {
        console.log(err);
      });
  });

  it('GET /events/:eventId', async () => {
    const event = await axios
      .get(URL + '/events/5fb9473078222d4740d9fbc1')
      .then((res) => {
        return res.data as IEvent;
      })
      .catch(handleException);

    if (!event) {
      throw new Error('event');
    }

    const foundEvent = await Event.findById('5fb9473078222d4740d9fbc1')
      .lean()
      .then((event) => event)
      .catch((err) => handleException(err));

    if (!foundEvent) {
      throw new Error('event searched in db was not found in db');
    }

    foundEvent._id = foundEvent?._id.toString();

    event.createdAt = new Date(event.createdAt);
    event.date = new Date(event.date);
    event.dateStartAt = new Date(event.dateStartAt);
    event.dateEndAt = new Date(event.dateEndAt);

    assert.deepStrictEqual(event, foundEvent);
  });
});
