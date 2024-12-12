const Producto = require('../models/Producto.js');

exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoria } = req.params;

        // search product by the given active category
        const productos = await Producto.find({ categoria, activo: true });

        if (!productos.length) {
            return res.status(404).json({ message: 'there are no products for this category' });
        }

        res.status(200).json({ productos });

    } catch (error) {
        res.status(500).json({ error: 'couldnt get products' });
    }
}