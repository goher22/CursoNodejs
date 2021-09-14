const http = require('http')

http.createServer((req, res) => {
    //console.log(req)
    //res.writeHead(404)
    //res.writeHead(200, {'Content-Type': 'text/plain'})
    res.writeHead(200, {'Content-Type': 'application/json'})
    //crea un archivo de csv
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv' )
    // res.writeHead(200, {'Content-Type': 'application/csv'})

    const persona = {
        id: 1,
        nombre: 'Fernando'
    }
    res.write(JSON.stringify(persona))
    // Informacion del archivo
    // res.write('id', 'nombre')
    // res.write('1', 'Marina')
    // res.write('2', 'Isaac')
    // res.write('3', 'Juan')
    // res.write('4', 'Carlos')
    res.end()
})
.listen(8080)

console.log('Escuchando el puerto', 8080)