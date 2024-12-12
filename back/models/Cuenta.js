const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const CuentaSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ultimaSesion: { type: Date },
//   rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

CuentaSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

module.exports = mongoose.model('Cuenta', CuentaSchema);
