import Axios from 'axios'
import express from 'express'
import ResponseController from '../controller/ResponseController'
import { handleException } from '../utils/exceptions'
import { getUserLocation } from '../utils/utils'

const router = express.Router()

router.get('/autosuggest/', async (req, res) => {
  const { q, ip } = req.query

  if (!q) {
    ResponseController.error(res, 400, 'q parameter is undefined')
  }

  const response = await Axios.get(
    `https://autosuggest.search.hereapi.com/v1/autosuggest`,
    {
      params: {
        apiKey: process.env.HERE_API_KEY,
        q,
        at: await getUserLocation(ip)
      }
    }
  )
    .then((res) => res.data)
    .catch(handleException)

  ResponseController.success(res, response)
})

export default router
