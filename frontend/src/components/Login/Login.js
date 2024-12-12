import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";


const Login = () => {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState(""); // Puede ser correo o nombre de usuario
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        if (!identifier || !password) {
            setErrorMessage("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: identifier.includes("@") ? identifier : undefined, // Si tiene '@', es correo
                    username: identifier.includes("@") ? undefined : identifier, // Si no, es nombre de usuario
                    password,
                }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                setErrorMessage(error || "Error al iniciar sesión.");
                return;
            }

            const { token, usuario } = await response.json();
            localStorage.setItem("authToken", token); // Guardar el token
            alert(`Bienvenido, ${usuario.username}`);
            navigate("/"); // Redirigir a la página principal

        } catch (error) {
            setErrorMessage("Error de conexión con el servidor.");
        }
    };

    return (
        <header className="menu-login">
            <div className="login">
                <h1>ENTRA EN TU CUENTA</h1>
                <div className="input-div">
                    <input
                        type="text"
                        placeholder="Usuario o correo electrónico"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="botones-login">
                    <button
                        className="iniciar-sesion"
                        id="iniciar-sesion"
                        onClick={handleLogin}
                    >
                        Iniciar sesión
                    </button>
                    <button className="contraseña">¿Olvidaste tu contraseña?</button>
                </div>
            </div>

            <div className="barra-vertical">
                <div className="linea-vertical"></div>
            </div>

            <div className="login">
                <h1 className="login-text">
                    ¿No tienes cuenta?. <span>Regístrate y haz tus compras más rápido.</span>
                </h1>
                <div>
                    <button
                        onClick={() => navigate ("/registrarse")}
                        className="iniciar-sesion"
                        id="crear-cuenta"
                    >
                        Crear cuenta
                    </button>
                </div>
            </div>
        </header>
    );

};

export default Login;