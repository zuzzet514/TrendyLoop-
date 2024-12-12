const Usuario = require('../models/Usuario');
const Cuenta = require('../models/Cuenta');
const jwtHelper = require('../utils/jwtHelper');
const bcrypt = require('bcrypt');

// user registartion
exports.registerUser = async (data) => {
    const { nombre, apellidoPaterno, apellidoMaterno, genero, email, telefono, direccion, fechaNacimiento, username, password } = data;

    // create data user
    const usuario = await Usuario.create({ nombre, apellidoPaterno, apellidoMaterno, genero, telefono, direccion, fechaNacimiento });

    // create data account linked to the user
    const cuenta = await Cuenta.create({ username, email, password, usuarioId: usuario._id });

    return { usuario, cuenta };
};

// login
exports.loginUser = async ({ username, email, password }) => {
    // search account by username or email
    const cuenta = await Cuenta.findOne({
        $or: [{ username }, { email } ]
    }).populate('usuarioId');
    if (!cuenta) throw new Error('Usuario, correo o contraseña incorrectos');

    const isPasswordValid = await bcrypt.compare(password, cuenta.password);
    if (!isPasswordValid) throw new Error('Contraseña incorrecta');

    // generate token JWT
    const token = jwtHelper.generateToken({ id: cuenta._id, usuarioId: cuenta.usuarioId._id });

    return { token, usuario: { username: cuenta.username } };
};
