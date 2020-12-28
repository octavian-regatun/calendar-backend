import { firebaseStorage } from './firebase'
import { v4 as uuidv4 } from 'uuid'
import { handleException } from './exceptions'
import Axios from 'axios'
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'

export function stringifyProperties(object) {
  Object.keys(object).forEach((property) => {
    object[property] = object[property].toString()
  })
}

/**
 *
 * @param {Date} date
 */
export function isDateValid(date) {
  return !isNaN(date.getTime())
}

export async function getUserLocation(ip) {
  return await Axios.get(`http://ip-api.com/json/${ip}`)
    .then((res) => `${res.data.lat},${res.data.lon}`)
    .catch(handleException)
}

function getMetaFromDataURL(dataURL) {
  return dataURL.split(',')[0]
}

function getDataFromDataURL(dataURL) {
  return dataURL.split(',')[1]
}

export async function compressData(data) {
  const buffer = Buffer.from(data, 'base64')

  return await imagemin.buffer(buffer, {
    plugins: [
      imageminMozjpeg({ quality: 20 }),
      imageminPngquant({ quality: [0.5, 0.5] })
    ]
  })
}

export async function uploadFile(path, dataURL) {
  const meta = getMetaFromDataURL(dataURL)
  const compressedData = (
    await compressData(getDataFromDataURL(dataURL))
  ).toString('base64')

  const compressedFile = `${meta},${compressedData}`

  const fileName = uuidv4()

  const uploadTask = firebaseStorage
    .ref(`${path}/${fileName}`)
    .putString(compressedFile, 'data_url')

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', null, handleException, () => {
      firebaseStorage
        .ref('events')
        .child(fileName)
        .getDownloadURL()
        .then((url) => resolve(url))
    })
  })
}
