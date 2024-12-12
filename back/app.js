const express = require('express');
const http = require('http');
const cors = require('cors');
const connectToDB = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes.js');
require('dotenv').config();

const app = express();

// DB connection
connectToDB();

// Middleware to handle JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5000', // front
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Normalizing port
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val; // Si no es un número, devuelve el valor original (ej., un pipe)
    }
    if (port >= 0) {
        return port; // Si es un puerto válido, devuélvelo
    }
    return false;
};


const port = normalizePort(process.env.PORT);
app.set('port', port);

// Handle server errors
const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requiere privilegios elevados.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' ya está en uso.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// create HTTP server
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Server listeing on ' + bind);
});

// initialize server
server.listen(port);