import assert from 'assert'
import axios from 'axios'
import '../../../src/index.js'
import Event from '../../../src/models/event.js'
import { stringifyProperties } from '../../../src/utils/utils.js'
import { LOGGED_IN_COOKIE_SESSION, URL, USER_ID } from '../../utils/config.js'

describe('all tests for /api/events', () => {
  before(() => {
    axios.defaults.withCredentials = true
    axios.defaults.headers = {
      Cookie: `connect.sid=${LOGGED_IN_COOKIE_SESSION};`
    }
  })

  it('GET /', async () => {
    const response = await axios.get(`${URL}/api/events`)

    const responseEvents = response.data

    const foundEvents = await Event.find(
      {
        $or: [{ participantsId: USER_ID }, { authorId: USER_ID }]
      },
      null,
      { lean: true }
    )

    for (const event of responseEvents) {
      stringifyProperties(event)
    }

    for (const event of foundEvents) {
      stringifyProperties(event)
    }

    assert.deepStrictEqual(responseEvents, foundEvents)
  })
})
