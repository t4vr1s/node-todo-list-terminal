const fs = require('fs')

const rutaArchivo = './db/data.json'

const guardarDB = (data) => {
  try {
    fs.writeFileSync(rutaArchivo, JSON.stringify(data, null, 2))
  } catch (error) {
    console.log(error)
  }
}

const leerDB = () => {
  if (!fs.existsSync(rutaArchivo)) {
    return null
  }
  const info = fs.readFileSync(rutaArchivo, { encoding: 'utf-8' })
  const data = JSON.parse(info)
  return data
}

module.exports = {
  guardarDB,
  leerDB
}
