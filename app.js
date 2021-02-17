const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const {
  inquirerMenu,
  pausar,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')
require('colors')

const main = async () => {
  let opt,
    desc,
    id,
    ok,
    ids
  const tareas = new Tareas()
  const tareasDB = leerDB()
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        desc = await leerInput('Descripción:')
        tareas.crearTarea(desc)
        break
      case '2':
        tareas.listadoCompleto()
        break
      case '3':
        tareas.listarPendientesCompletadas()
        break
      case '4':
        tareas.listarPendientesCompletadas(false)
        break
      case '5':
        ids = await mostrarListadoCheckList(tareas.getListadoArr)
        tareas.toggleCompletadas(ids)
        break
      case '6':
        id = await listadoTareasBorrar(tareas.getListadoArr)
        if (id !== '0') {
          ok = await confirmar('¿Seguro que deseas borrar la tarea?')
          if (ok) {
            tareas.borrarTarea(id)
            console.log('Tarea borrada correctamente')
          }
        }
        break

      default:
        break
    }

    guardarDB(tareas.getListadoArr)
    await pausar()
  } while (opt !== '0')
}

main()
