import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BarraNavegacion.css";

const BarraNavegacion = () => {
    const navigate = useNavigate();

    // Estado para controlar si la barra de navegación debe ser traslúcida
    const [isScrolled, setIsScrolled] = useState(false);

    // Función que detecta el scroll y actualiza el estado
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="div-margen"></div>
            <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
                <div className="div-menu">
                    <div className="logo">
                        <img onClick={() => navigate("/")} src="/LogoTLp.png" className={`Logo ${!isScrolled ? "scrolled-logo" : ""}`} alt="TrendyLoop Logo" id="navbar-logo"/>
                    </div>

                    <div className="menu-ropa">
                        <ul className="menu">
                            <li><Link to="/mujer" className="menu-link">MUJER</Link></li>
                            <li><Link to="/hombre" className="menu-link">HOMBRE</Link></li>
                            <li><Link to="/niño" className="menu-link">KIDS</Link></li>
                        </ul>
                    </div>

                    <div className="search-container">
                        <input id="buscador" type="text" className={`search-input ${isScrolled ? "scrolled" : ""}`}  placeholder="🔍︎ Buscar"/>
                    </div>

                    <div className="menu-usuario">
                        <ul className="menu">
                            <li><Link to="/iniciar-sesion" className="menu-link">INICIAR SESIÓN</Link></li>
                            <li><Link to="/carrito" className="menu-link">🛒</Link></li>
                            <li><Link to="/usuario" className="menu-link">👤</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default BarraNavegacion;