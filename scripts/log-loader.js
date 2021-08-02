module.exports = async function (source) {
  const callback = this.async()

  console.log(source)

  return callback(null, source)
}