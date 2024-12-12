import React, { useState, useEffect } from 'react';
import Producto from './Producto';
import './Catalago.css';

const Catalago = ({ categoria }) => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/categoria/${categoria}`);

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los productos');
                }

                const data = await response.json();
                console.log(data);  // Verifica los datos en la consola
                setProductos(data.productos);  // Aquí no necesitas acceder a una propiedad específica
            } catch (error) {
                setError(error.message);
            }
        };

        obtenerProductos();
    }, [categoria]);

    return (
        <div className="catalago">
            <h1>Catálogo de Productos - {categoria}</h1>
            {error && <p>Error: {error}</p>} {/* Muestra el mensaje de error */}
            <div className="productos-grid">
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <Producto
                            key={producto.id}
                            imagenes={producto.imagenes}
                            precio={producto.precio}
                            descripcion={producto.nombre}
                            descuento={producto.descuento}
                        />
                    ))
                ) : (
                    <p>No se encontraron productos para esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default Catalago;