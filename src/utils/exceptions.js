import ResponseController from '../controller/ResponseController'

export const handleException = (error, res) => {
  if (res) {
    console.log(error)
    return ResponseController.error(res, 400, 'generic error')
  } else console.log(error)
}
