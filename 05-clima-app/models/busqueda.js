const axios = require('axios')

class Busquedas {

    historial = ['Madrid', 'Bogota', 'San Jose', 'Medellin']

    constructor() {

    }

    async ciudad(lugar=''){
        //console.log('Ciudad:', lugar)
        try {
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Sinc.json?access_token=pk.eyJ1IjoiZ29oZXIiLCJhIjoiY2t0N3R0NXo2MHZtbDJ2bnI5ZGlmZDhvayJ9.bFSSk3S3KgTZ-q3-wq36-g&limit=5&language=es')
            console.log(resp.data)
            return []
        }catch (error) {
            return []
        }
    }

}


module.exports = Busquedas