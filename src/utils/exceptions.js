// TODO: better to replace with a mongoose error checker middleware
const handleException = (error, res) => {
  if (res) {
    console.log(error)
    return res.sendStatus(401)
  } else console.log(error)
}

export { handleException }
