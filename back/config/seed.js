// this adds the data to MongoDB
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');
const connectToDB = require('./dbConnection');
const mongoose = require("mongoose");

const cloudinary = require('./cloudinaryConfig'); // importing cloudinary configuration
const fs = require('fs'); // read local images
const path = require('path');


// fucntion that uploads images to cloudinary
const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
           folder:'productos',
        });
        return result.secure_url; // return the image's securl url
    } catch (error) {
        console.error("couldn upload to cloudinary", error);
    }
};

// function that processes the images
const processImages = async (productos) => {
    for (const producto of productos) {
        const uploadedImages = [];
        for (const imagePath of producto.imagenes) {
            const absolutePath = path.resolve(__dirname, '..', imagePath);
            const uploadUrl = await uploadImage(absolutePath);
            if (uploadUrl) {
                uploadedImages.push(uploadUrl);
            }
        }
        producto.imagenes = uploadedImages; // Actualiza las URLs en el producto
    }
    return productos; // Devuelve los productos actualizados
};


const productos = [
    // Productos de Hombre
    {
        nombre: 'Camisa de Cuadros',
        categoria: 'Hombre',
        precio: 350,
        descripcion: 'Camisa casual de cuadros perfecta para cualquier ocasión.',
        imagenes: ['./images/camisa_cuadro1.jpg', './images/camisa_cuadro2.jpg', './images/camisa_cuadro3.jpg'],
        stock: 50,
        activo: true,
        descuento: 10,
        fechaVencimientoDescuento: new Date('2024-12-31')
    },
    {
        nombre: 'Jeans Skinny',
        categoria: 'Hombre',
        precio: 600,
        descripcion: 'Jeans de corte skinny, cómodos y modernos.',
        imagenes: ['./images/skinny1.jpg', './images/skinny2.jpg', './images/skinny3.jpg'],
        stock: 30,
        activo: true,
        descuento: 15,
        fechaVencimientoDescuento: new Date('2024-11-30')
    },
    {
        nombre: 'Chamarra de Cuero',
        categoria: 'Hombre',
        precio: 1200,
        descripcion: 'Chamarra de cuero premium, ideal para el invierno.',
        imagenes: ['./images/cuero1.jpg', './images/cuero2.jpg', './images/cuero3.jpg'],
        stock: 20,
        activo: true,
        descuento: 5,
        fechaVencimientoDescuento: new Date('2024-12-15')
    },
    {
        nombre: 'Playera de Algodón',
        categoria: 'Hombre',
        precio: 250,
        descripcion: 'Playera básica de algodón, cómoda y fácil de usar.',
        imagenes: ['./images/algodon1.jpg', './images/algodon2.jpg', './images/algodon3.jpg'],
        stock: 100,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },
    {
        nombre: 'Traje Formal',
        categoria: 'Hombre',
        precio: 2500,
        descripcion: 'Traje formal para ocasiones especiales.',
        imagenes: ['./images/formal1.jpg', './images/formal2.jpg', './images/formal3.jpg'],
        stock: 10,
        activo: true,
        descuento: 20,
        fechaVencimientoDescuento: new Date('2024-12-31')
    },
    {
        nombre: 'Chaqueta Deportiva',
        categoria: 'Hombre',
        precio: 800,
        descripcion: 'Chaqueta ligera y cómoda, perfecta para actividades deportivas.',
        imagenes: ['./images/deportiva1.jpg', './images/deportiva2.jpg', './images/deportiva3.jpg'],
        stock: 60,
        activo: true,
        descuento: 10,
        fechaVencimientoDescuento: new Date('2024-12-20')
    },
    {
        nombre: 'Sudadera con Capucha',
        categoria: 'Hombre',
        precio: 500,
        descripcion: 'Sudadera cómoda y abrigadora con capucha ajustable.',
        imagenes: ['./images/capucha1.jpg', './images/capucha2.jpg', './images/capucha3.jpg'],
        stock: 80,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },
    {
        nombre: 'Zapatillas Deportivas',
        categoria: 'Hombre',
        precio: 900,
        descripcion: 'Zapatillas deportivas de alto rendimiento para todo tipo de actividades.',
        imagenes: ['./images/zapatillas-deportivas1.jpg', './images/zapatillas-deportivas2.jpg', './images/zapatillas-deportivas3.jpg'],
        stock: 40,
        activo: true,
        descuento: 5,
        fechaVencimientoDescuento: new Date('2024-11-25')
    },
    {
        nombre: 'Pantalón Cargo',
        categoria: 'Hombre',
        precio: 550,
        descripcion: 'Pantalón cargo cómodo y práctico para uso diario.',
        imagenes: ['./images/pantalon-cargo1.jpg', './images/pantalon-cargo2.jpg', './images/pantalon-cargo3.jpg'],
        stock: 70,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },
    {
        nombre: 'Gorra de Béisbol',
        categoria: 'Hombre',
        precio: 150,
        descripcion: 'Gorra de béisbol ajustable con diseño moderno.',
        imagenes: ['./images/gorra-beisbol1.jpg', './images/gorra-beisbol2.jpg', './images/gorra-beisbol3.jpg'],
        stock: 120,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },

    // Productos de Mujer
    {
        nombre: 'Vestido de Verano',
        categoria: 'Mujer',
        precio: 700,
        descripcion: 'Vestido de verano fresco y elegante.',
        imagenes: ['./images/vestido_verano1.jpg', './images/vestido_verano2.jpg', './images/vestido_verano3.jpg'],
        stock: 30,
        activo: true,
        descuento: 10,
        fechaVencimientoDescuento: new Date('2024-12-31')
    },
    {
        nombre: 'Blusa de Seda',
        categoria: 'Mujer',
        precio: 450,
        descripcion: 'Blusa de seda de alta calidad, cómoda y sofisticada.',
        imagenes: ['./images/blusa_seda1.jpg', './images/blusa_seda2.jpg', './images/blusa_seda3.jpg'],
        stock: 40,
        activo: true,
        descuento: 5,
        fechaVencimientoDescuento: new Date('2024-12-15')
    },
    {
        nombre: 'Pantalón Palazzo',
        categoria: 'Mujer',
        precio: 600,
        descripcion: 'Pantalón estilo palazzo, cómodo y a la moda.',
        imagenes: ['./images/pantalon_palazzo1.jpg', './images/pantalon_palazzo2.jpg', './images/pantalon_palazzo3.jpg'],
        stock: 50,
        activo: true,
        descuento: 15,
        fechaVencimientoDescuento: new Date('2024-11-30')
    },
    {
        nombre: 'Falda Midi',
        categoria: 'Mujer',
        precio: 400,
        descripcion: 'Falda midi con corte moderno y elegante.',
        imagenes: ['./images/falda_midi1.jpg', './images/falda_midi2.jpg', './images/falda_midi3.jpg'],
        stock: 60,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },
    {
        nombre: 'Chaqueta de Lana',
        categoria: 'Mujer',
        precio: 1200,
        descripcion: 'Chaqueta de lana para invierno, cálida y estilizada.',
        imagenes: ['./images/chaqueta_lana1.jpg', './images/chaqueta_lana2.jpg', './images/chaqueta_lana3.jpg'],
        stock: 25,
        activo: true,
        descuento: 20,
        fechaVencimientoDescuento: new Date('2024-12-25')
    },
    {
        nombre: 'Pantalón Skinny',
        categoria: 'Mujer',
        precio: 550,
        descripcion: 'Pantalón skinny de alta calidad, cómodo y ajustado.',
        imagenes: ['./images/skinny_mujer1.jpg', './images/skinny_mujer2.jpg', './images/skinny_mujer3.jpg'],
        stock: 80,
        activo: true,
        descuento: 5,
        fechaVencimientoDescuento: new Date('2024-12-20')
    },
    {
        nombre: 'Blazer Casual',
        categoria: 'Mujer',
        precio: 850,
        descripcion: 'Blazer casual, ideal para ocasiones formales e informales.',
        imagenes: ['./images/blazer_casual1.jpg', './images/blazer_casual2.jpg', './images/blazer_casual3.jpg'],
        stock: 45,
        activo: true,
        descuento: 10,
        fechaVencimientoDescuento: new Date('2024-11-15')
    },
    {
        nombre: 'Botines de Cuero',
        categoria: 'Mujer',
        precio: 950,
        descripcion: 'Botines de cuero, elegantes y cómodos para el día a día.',
        imagenes: ['./images/botines1.jpg', './images/botines2.jpg', './images/botines3.jpg'],
        stock: 40,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },
    {
        nombre: 'Camiseta Básica',
        categoria: 'Mujer',
        precio: 250,
        descripcion: 'Camiseta básica de algodón, versátil para cualquier ocasión.',
        imagenes: ['./images/camiseta_basica1.jpg', './images/camiseta_basica2.jpg', './images/camiseta_basica3.jpg'],
        stock: 100,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },
    {
        nombre: 'Bufanda de Lana',
        categoria: 'Mujer',
        precio: 350,
        descripcion: 'Bufanda de lana suave, perfecta para el frío.',
        imagenes: ['./images/bufanda_lana1.jpg', './images/bufanda_lana2.jpg', './images/bufanda_lana3.jpg'],
        stock: 90,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },

    // Productos de Niño
    {
        nombre: 'Camiseta de Dinosaurio',
        categoria: 'Niño',
        precio: 200,
        descripcion: 'Camiseta divertida con un diseño de dinosaurios.',
        imagenes: ['./images/camiseta_dinosaurio1.jpg', './images/camiseta_dinosaurio2.jpg', './images/camiseta_dinosaurio3.jpg'],
        stock: 100,
        activo: true,
        descuento: 10,
        fechaVencimientoDescuento: new Date('2024-12-31')
    },
    {
        nombre: 'Pantalón de Algodón',
        categoria: 'Niño',
        precio: 250,
        descripcion: 'Pantalón cómodo y suave para el día a día.',
        imagenes: ['./images/pantalon_algodon1.jpg', './images/pantalon_algodon2.jpg', './images/pantalon_algodon3.jpg'],
        stock: 80,
        activo: true,
        descuento: 5,
        fechaVencimientoDescuento: new Date('2024-12-15')
    },
    {
        nombre: 'Zapatos',
        categoria: 'Niño',
        precio: 500,
        descripcion: 'Zapatos  para niños, ideales su uso diario.',
        imagenes: ['./images/zapatos1.jpg', './images/zapatos2.jpg', './images/zapatos3.jpg'],
        stock: 60,
        activo: true,
        descuento: 15,
        fechaVencimientoDescuento: new Date('2024-12-20')
    },
    {
        nombre: 'Pijama',
        categoria: 'Niño',
        precio: 250,
        descripcion: 'Pijama divertida para una noche de descanso.',
        imagenes: ['./images/pijama1.jpg', './images/pijama2.jpg', './images/pijama3.jpg'],
        stock: 90,
        activo: true,
        descuento: 5,
        fechaVencimientoDescuento: new Date('2024-12-15')
    },
    {
        nombre: 'Mochila de Animales',
        categoria: 'Niño',
        precio: 400,
        descripcion: 'Mochila con diseño de animales, perfecta para la escuela o excursiones.',
        imagenes: ['./images/mochila_animales1.jpg', './images/mochila_animales2.jpg', './images/mochila_animales3.jpg'],
        stock: 50,
        activo: true,
        descuento: 20,
        fechaVencimientoDescuento: new Date('2024-12-15')
    },
    {
        nombre: 'Short',
        categoria: 'Niño',
        precio: 180,
        descripcion: 'Short ligero y cómodo para actividades diarias o juegos al aire libre.',
        imagenes: ['./images/short1.jpg', './images/short2.jpg', './images/short3.jpg'],
        stock: 100,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },
    {
        nombre: 'Sombrero de Sol',
        categoria: 'Niño',
        precio: 100,
        descripcion: 'Sombrero de sol para proteger a los niños del sol.',
        imagenes: ['./images/sombrero_sol1.jpg', './images/sombrero_sol2.jpg', './images/sombrero_sol3.jpg'],
        stock: 150,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },
    {
        nombre: 'Sudadera de SpiderMan',
        categoria: 'Niño',
        precio: 450,
        descripcion: 'Sudadera divertida con un diseño de SpiderMan, cómoda y abrigadora para los días fríos.',
        imagenes: ['./images/sudadera_spiderman1.jpg', './images/sudadera_spiderman2.jpg', './images/sudadera_spiderman3.jpg'],
        stock: 100,
        activo: true,
        descuento: 0,
        fechaVencimientoDescuento: null
    },
    {
        nombre: 'Calcetas con Dibujos Animados',
        categoria: 'Niño',
        precio: 150,
        descripcion: 'Un par de calcetas suaves y cómodas con dibujos animados, perfectas para mantener los pies calentitos y divertidos.',
        imagenes: ['./images/calcetas_dibujo1.jpg', './images/calcetas_dibujo2.jpg', './images/calcetas_dibujo3.jpg'],
        stock: 200,
        activo: true,
        descuento: 5,
        fechaVencimientoDescuento: new Date('2024-12-10')
    },
    {
        nombre: 'Sombrero de Vaquero',
        categoria: 'Niño',
        precio: 350,
        descripcion: 'Sombrero de vaquero de fieltro, ideal para aventuras al aire libre o para complementar disfraces temáticos.',
        imagenes: ['./images/sombrero_vaquero1.jpg', './images/sombrero_vaquero2.jpg', './images/sombrero_vaquero3.jpg'],
        stock: 60,
        activo: true,
        descuento: 10,
        fechaVencimientoDescuento: new Date('2024-12-15')
    }
];

const usuarios = [
    {
        nombre: 'JordaIn',
        apellidoPaterno: 'Cruz',
        apellidoMaterno: 'Mendoza',
        genero: 'masculino',
        telefono: '9221860109',
        direccion: {
            calle: 'Av. Principal 123',
            ciudad: 'Xalapa',
            estado: 'Veracruz',
            codigoPostal: '91000',
        },
        fechaNacimiento: new Date('1998-01-15'),
    },
    {
        nombre: 'María',
        apellidoPaterno: 'Fernández',
        apellidoMaterno: 'Pérez',
        genero: 'femenino',
        telefono: '6648765432',
        fechaNacimiento: new Date('2000-12-10'),
    }
];

// adds the products to the DB and add the images
const addProducts = async () => {
    await connectToDB(); // Ensure DB connection before proceeding

    try {
        await Producto.deleteMany({});
        const processedProducts = await processImages(productos); // images processed before inserting
        await Producto.insertMany(processedProducts);
        console.log('Products added successfully');
    } catch (error) {
        console.error('Products weren\'t added successfully:', error);
    }
};

// adds users to the DB
const addUsers = async () => {
    await connectToDB(); // Ensure DB connection before proceeding

    try {
        await Usuario.deleteMany({});
        await Usuario.insertMany(usuarios);
        console.log("Users added successfully");
    } catch (error) {
        console.error("Couldn't add the users:", error);
    }
};

// executes all the functions and close the DB connection
const runSeed = async () => {
    await connectToDB();
    await addProducts();
    await addUsers();
    mongoose.connection.close();
};

runSeed();