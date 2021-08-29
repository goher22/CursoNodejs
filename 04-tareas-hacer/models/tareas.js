const Tarea = require('./tarea')

/**
 * _listado:
 *  {'uuid-1234567-1234-2: {id:12, desc; asd, competadopEN:92231}},
 */

class Tareas {
    _listado = {}

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key])
        })
        return listado
    }

    constructor(){
        this._listado = {}
    }

    cargarTareasFromArray( tareas = []) {
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {
        console.log()
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i+i}`.green
            const {desc, completadoEn} = tarea
            const estado = (completadoEn) 
                            ? 'Completado'.green
                            : 'Pendiente'.red
            console.log(`${idx} ${desc} :: ${estado}`) 
        })
    }

    listarPendienteCompletadas(completadas = true) {
        console.log()
        let contador = 0
        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea
            const estado = (completadoEn) 
                            ? 'Completado'.green
                            : 'Pendiente'.red
            if(completadas && completadoEn) {
                contador++
                console.log(`${contador.toString().green} ${desc} :: ${completadoEn}`)
            }else if(!completadas && !completadoEn){
                contador++
                console.log(`${contador.toString().green} ${desc} :: ${estado}`)
            }
        })
    }

}

module.exports = Tareas