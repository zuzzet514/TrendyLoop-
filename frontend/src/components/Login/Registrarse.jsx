import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registrarse.css";
import axios from "axios";

const Registrarse = () => {
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);
    const [recibirPromociones, setRecibirPromociones] = useState(false);

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    };
    const toggleMostrarConfirmarContrasena = () => {
        setMostrarConfirmarContrasena(!mostrarConfirmarContrasena);
    };
    const toggleRecibirPromociones = () => {
        setRecibirPromociones(!recibirPromociones);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const apellidoPaterno = document.getElementById('apellido-paterno').value.trim();
        const apellidoMaterno = document.getElementById('apellido-materno').value.trim();
        const genero = document.getElementById('genero').value;
        const email = document.getElementById('gmail').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const direccion = null;
        const fechaNacimiento ="1900-01-01";
        const username = document.getElementById('user-name').value.trim();
        const password = document.getElementById('contrasena').value;
        const password2 = document.getElementById('confirmar-contrasena').value;

        // verificando si ambas contraseñas coinciden
        if (password !== password2) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Crear un objeto con los datos a enviar
        const userData = {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            genero,
            email,
            telefono,
            direccion,
            fechaNacimiento,
            username,
            password
        };

        try {
            // verificando si el correo y la contraseña existen
            const checkResponse = await axios.post('http://localhost:3000/api/auth/checkAccount', {
                username,
                email
            });

            if (checkResponse.data.exists) {
                const conflict = checkResponse.data.conflict;
                if (conflict.username) {
                    alert("El nombre de usuario ya está en uso.")
                }
                if (conflict.email) {
                    alert("El correo electrónico ya está en uso.");
                }
                return;

            }


            // registrando el usuario
            const response = await axios.post('http://localhost:3000/api/auth/register', userData);

            if (response.status === 201) {
                alert('Usuario registrado exitosamente');
                navigate("/iniciar-sesion");
                console.log('Usuario registrado exitosamente');
            } else {
                console.error('Error al registrar al usuario');
            }
        } catch (error) {
            console.error(error);
        }

    };
    return (
        <header className="registrarse">
            <div className="div-text">
                <h1 className="titulo">crear cuenta</h1>
                <p className="texto">Ingresa tus datos para que seas parte de Trendy Loop</p>
            </div>
            <form onSubmit={handleSubmit} action="" className="datos-usuario">
                <div className="campo-entrada">
                    <input className="input-campo" type="text" id="nombre" required/>
                    <label htmlFor="nombre">Nombre</label>
                </div>
                <div className="campo-entrada">
                    <input className="input-campo" type="text" id="apellido-paterno" required/>
                    <label htmlFor="nombre">Apellido paterno</label>
                </div>
                <div className="campo-entrada">
                    <input className="input-campo" type="text" id="apellido-materno" required/>
                    <label htmlFor="nombre">Apellido materno</label>
                </div>
                <div className="campo-entrada">
                    <select className="input-campo" id="genero" defaultValue="" required>
                        <option value="" disabled hidden> </option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Mayate</option>
                    </select>

                    <label htmlFor="genero">Género</label>
                </div>

                <div className="campo-entrada">
                    <input className="input-campo" type="text" id="telefono" required/>
                    <label htmlFor="telefono">Télefono</label>
                </div>

                <div className="campo-entrada">
                <input className="input-campo" type="text" id="user-name" required/>
                    <label htmlFor="nombre">User name</label>
                </div>


                <div className="campo-entrada">
                    <input className="input-campo" type="email" id="gmail" required/>
                    <label htmlFor="nombre">Correo electrónico</label>
                </div>

                <div className="campo-entrada">
                    <div className="input-contrasena-container">
                        <input
                            className="input-campo"
                            type={mostrarContrasena ? "text" : "password"}
                            id="contrasena"
                            required
                        />
                        <label htmlFor="contrasena">Contraseña</label>
                        <i
                            className={`fa ${mostrarContrasena ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={toggleMostrarContrasena}
                        ></i>
                    </div>
                </div>
                <div className="campo-entrada">
                    <div className="input-contrasena-container">
                        <input
                            className="input-campo"
                            type={mostrarConfirmarContrasena ? "text" : "password"}
                            id="confirmar-contrasena"
                            required
                        />
                        <label htmlFor="contrasena">Confirmar contraseña</label>
                        <i
                            className={`fa ${mostrarConfirmarContrasena ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={toggleMostrarConfirmarContrasena}
                        ></i>
                    </div>
                </div>



                <button className="boton-registrarse">Crear cuenta</button>
                <h4 className="h4">¿Ya tienes cuenta?</h4>
                <button
                    onClick={() => navigate("/iniciar-sesion")} className="boton-iniciar-sesion">Iniciar sesión
                </button>
            </form>
        </header>
    );
};

export default Registrarse;