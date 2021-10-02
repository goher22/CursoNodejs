const validarCampos = require('../middelwares/validar-campos')
const validarJWT = require('../middelwares/validar-jwt')
const validarRoles = require('../middelwares/validar-roles')
const validarArchivo = require('../middelwares/validar-archivo')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo
}