const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, enum: ['Mujer', 'Hombre', 'Niño'], required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String },
  imagenes: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  activo: { type: Boolean, default: true },
  descuento: { type: Number, default: 0 },
  fechaVencimientoDescuento: { type: Date }
});

module.exports = mongoose.model('Producto', ProductoSchema);