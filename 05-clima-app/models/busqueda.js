const axios = require('axios')

class Busquedas {

    historial = ['Madrid', 'Bogota', 'San Jose', 'Medellin']

    constructor() {

    }

    async ciudad(lugar=''){
        //console.log('Ciudad:', lugar)
        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2')
            console.log(resp.data)
            return []
        }catch (error) {
            return []
        }
    }

}


module.exports = Busquedas