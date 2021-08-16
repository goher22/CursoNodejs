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

const getInfoUsuario = async(id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
        return `El empleado: ${empleado} tiene un salario de: ${salario}`;
    }catch(error){
        throw error
    }
}

const id = 3

getInfoUsuario(id)
    .then(msg => {
        console.log("TODO BIEN")
        console.log(msg)
    })
    .catch(err => {
        console.log("TODO MAL")
        console.log(err)
    })




