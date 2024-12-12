const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidoPaterno: { type: String, required: true },
  apellidoMaterno: { type: String, required: true },
  genero: {
      type: String,
      enum: ['masculino', 'femenino', 'otro'],
      required: true
  },
  telefono: { type: String, required: true },
  direccion: [{
      calle: { type: String },
      ciudad: { type: String },
      estado: { type: String },
      codigoPostal: { type: String },
    }],
  fechaNacimiento: { type: Date }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
