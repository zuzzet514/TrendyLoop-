import React from 'react';
import './barraDeslizable.css';

const BarraDeslizable = () => {
    const mensaje = "🚚 Envio gratis apartir de $999.00 ";
    return (
        <div className="barra-container">
            <div className="barra-deslizable">
                <span>{mensaje.repeat(10)}</span>
                <span>{mensaje.repeat(10)}</span>
            </div>
        </div>
    );
};

export default BarraDeslizable;