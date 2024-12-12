import React, { useState, useEffect } from "react";
import "./producto.css";

const Producto = ({ imagenes, precio, descripcion, descuento }) => {
    // Estado para controlar la imagen en el carrusel
    const [imagenVisible, setImagenVisible] = useState(imagenes[0]);

    // Renderizar imagenes
    useEffect(() => {
        setImagenVisible(imagenes[0]);
    }, [imagenes]);

    // Calcular el precio con descuento
    const precioConDescuento = descuento
        ? (precio - (precio * descuento) / 100).toFixed(2)
        : precio.toFixed(2);

    return (
        <div
            className="producto-card"
            onMouseEnter={() => setImagenVisible(imagenes[1])}
            onMouseLeave={() => setImagenVisible(imagenes[0])}
        >
            <div className="producto-imagen-container">
                <img
                    src={imagenVisible || "/placeholder.jpg"}
                    alt={descripcion}
                    className="producto-imagen"
                />
            </div>
            <div className="producto-detalles">
                <h2 className="producto-titulo">{descripcion}</h2>
                <p className="producto-precio">
                    ${precioConDescuento}{" "}
                    {descuento && <span className="precio-original">${precio}</span>}
                </p>
                {descuento && <p className="producto-descuento">-{descuento}%</p>}
            </div>
            <p className="producto-ventas">2.2k+ vendidos</p> {/* Aquí podrías recibir el dato desde el backend si es necesario */}
        </div>
    );
};

export default Producto;