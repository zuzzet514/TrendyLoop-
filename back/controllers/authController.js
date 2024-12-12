const Cuenta = require('../models/Cuenta.js')
const authService = require('../service/authService.js');

// Register new user / account
exports.register = async (req, res) => {
    try {
        const { usuario, cuenta } = await authService.registerUser(req.body);
        res.status(201).json({ message: 'Usuario registrado exitosamente', usuario, cuenta });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { token, usuario }  = await authService.loginUser(req.body);
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            usuario: { username: usuario.username }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.checkAccount = async (req, res) => {
    const { username, email } = req.body;

    try {
        // Verificar si existe un usuario con el nombre de usuario o correo electrónico
        const user = await Cuenta.findOne({
            $or: [{ username }, { email }]
        });

        if (user) {
            // Determinar qué atributo está en conflicto
            const conflict = {};
            if (user.username === username) conflict.username = true;
            if (user.email === email) conflict.email = true;

            return res.json({ exists: true, conflict });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error al verificar la cuenta:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};


//
