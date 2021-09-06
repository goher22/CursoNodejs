const axios = require('axios')

class Busquedas {

    historial = ['Madrid', 'Bogota', 'San Jose', 'Medellin']

    constructor() {

    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang:'es'
        }
    }

    async ciudad(lugar=''){
        //console.log('Ciudad:', lugar)
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get()
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
            //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Sinc.json?access_token=pk.eyJ1IjoiZ29oZXIiLCJhIjoiY2t0N3R0NXo2MHZtbDJ2bnI5ZGlmZDhvayJ9.bFSSk3S3KgTZ-q3-wq36-g&limit=5&language=es')
            //console.log(resp.data)
        }catch (error) {
            return []
        }
    }

    async climaLugar(lat, lon){
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    ...this.paramsWeather
                }
            })

            const resp = await instance.get()

            const {weather, main} = resp.data

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        }catch (error){
            console.log(error)
        }
    }


}


module.exports = Busquedas