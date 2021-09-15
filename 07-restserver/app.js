require('dotenv').config()
const { request } = require('express')
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT)
})