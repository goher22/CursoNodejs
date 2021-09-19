const {Schema, model} = require('mongoose')

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        require:[true, 'El nombre es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    }
})

CategoriaSchema.methods.toJSON = function(){
    const {__v, stado, ...categoria} = this.toObject()
    return categoria
}

module.exports = model('Categoria', CategoriaSchema)

