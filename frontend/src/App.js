import React from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraNavegacion from "./components/barraNavegacion/BarraNavegacion";
import BarraDeslizable from "./components/BarraD/BarraDeslizable";
import MenuPrincipal from "./components/menuPrincipal/MenuPrincipal";
import Login from "./components/Login/Login";
import Catalago from "./components/listarProductos/Catalago";
import Registrarse from "./components/Login/Registrarse";

function App() {

    return (
        <Router>
            <header>
                <BarraNavegacion/>
                <Routes>
                    <Route path="/" element={<MenuPrincipal/>} />
                    <Route path="/mujer" element={<Catalago categoria="Mujer" />} />
                    <Route path="/hombre" element={<Catalago categoria="Hombre" />} />
                    <Route path="/niño" element={<Catalago categoria="Niño" />} />
                    <Route path="/iniciar-sesion" element={<Login/>} />
                    <Route path="/registrarse" element={<Registrarse/>}/>
                </Routes>
                <BarraDeslizable/>
            </header>
        </Router>
    );
}

export default App;