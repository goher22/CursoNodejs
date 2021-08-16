const empleados = [
    {
        id: 1,
        nombre: 'Carlos'
    },
    {
        id: 2,
        nombre: 'Jaun'
    },
    {
        id: 3,
        nombre: 'Marina'
    },
]

const Salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    }
]

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find((e) => e.id === id)?.nombre
        if(empleado) resolve(empleado)
        else reject(`No existe empleado con id ${id}`)
    })
}

const getSalario = (id) => {
    return new Promise((resolve, reject)=>{
        const sal = Salarios.find((e) => e.id === id)?.salario
        if( sal ) resolve(sal)
        else reject(`No existe el salario para el ${id}`)
    })
}

const id = 30

//getEmpleado(id)
//    .then(empleado => console.log(empleado))
//    .catch(err => console.log(err));

//getSalario(id)
//    .then(salario => console.log(salario))
//    .catch(err => console.log(err));

/*getEmpleado(id)
    .then(empleado =>{
        getSalario(id)
            .then(salario => {
                console.log('El empleado:', empleado, 'tiene un salario de:', salario)
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))*/

let nombre

getEmpleado(id)
    .then(empleado => {
        nombre = empleado
        return getSalario(id)
    })
    .then(salario => console.log('El empleado:', nombre, 'tiene un salario de:', salario))
    .catch(err=>console.log(err))
