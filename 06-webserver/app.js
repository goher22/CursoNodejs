const express = require('express')
const app = express()
const port = 8080;

// Servir contenido estático
app.use(express.static('public'));
 
// app.get('/', (req, res) => {
//   res.send('Home Page')
// })

app.get('/hola-mundo', (req, res) => {
    res.send('Hello World')
})

app.get('*', (req, res) => {
    //res.sendFile(__dirname+'public/404.html')
    res.send('404  Page not found')
})
 
app.listen(port, (() => {
  console.log(`Exapmle app listening at http://localhost:${port}`)
}))