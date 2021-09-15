const express = require('express')
const app = express()
const port = 8080;

//TODO: require(hbs)
app.set('view engine', 'hbs');

// // Servir contenido estático
app.use(express.static('public'));

app.get('/elements', (req, res) =>{
  res.sendFile(__dirname+'/public/elements.html')
  //res.send('Elements Page');
})
app.get('/generic', (req, res) =>{
  res.sendFile(__dirname+'/public/generic.html')
  //res.send('Generic Page');
})
app.get('/', (req, res) =>{
  res.render('home', {
    nombre: 'Carlos Gomez Hernande',
    titulo: 'Curso de nodejs'
  })
  //res.sendFile(__dirname+'/public/index.html')
  //res.send('Home Page');
})
 
// app.get('/', (req, res) => {
//   res.send('Home Page')
// })

// app.get('/hola-mundo', (req, res) => {
//     res.send('Hello World')
// })

// app.get('*', (req, res) => {
//     //res.sendFile(__dirname+'/public/404.html')
//     res.send('404  Page not found')
// })
 
app.listen(port, (() => {
  console.log(`Exapmle app listening at http://localhost:${port}`)
}))