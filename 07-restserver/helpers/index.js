const dbValidators = require('./db-validators')
const generateJWT = require('./generar-JWT')
const googleVerify = require('./google-verify')
const subirArchivo  = require('./subir-archivo')

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...subirArchivo
}