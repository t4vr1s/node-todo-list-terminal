const Tarea = require('./tarea')

class Tareas {

  _listado = {}

  constructor() {
    this._listado = {}
  }

  get getListadoArr () {
    const listado = []
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })
    return listado
  }

  crearTarea (desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  cargarTareasFromArray (tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea
    })
  }

  listadoCompleto () {
    const listado = this.getListadoArr
    listado.forEach(({ desc, completadoEn }, index) => {
      const indice = `${index + 1}:`.green
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red
      console.log(`${indice} ${desc} :: ${estado}`)
    })
  }

  listarPendientesCompletadas (completadas = true) {
    const listado = this.getListadoArr
    let contador = 0
    listado.forEach(({ desc, completadoEn }) => {
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red
      if (completadas) {
        if (completadoEn) {
          contador += 1
          console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`)
        }
      } else {
        if (!completadoEn) {
          contador += 1
          console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
        }
      }
    })
  }

  borrarTarea (id) {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }

  toggleCompletadas (ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id]
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toLocaleString()
      }
    })

    this.getListadoArr.forEach(({ id }) => {
      if (!ids.includes(id)) {
        this._listado[id].completadoEn = null
      }
    })
  }
}

module.exports = Tareas