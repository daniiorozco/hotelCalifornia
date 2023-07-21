import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuEmpleado from './MenuEmpleado';
import MenuCliente from './MenuCliente';

const Menu = () => {

    const navigate = useNavigate();
    let token = sessionStorage.getItem('token')
    let rol = sessionStorage.getItem('rol');

    useEffect(() => {
        if (!token) {
            // Si no hay token, redirigir al inicio de sesión
            navigate("/");
        } else {
            // Si hay token, verificar el rol y redirigir según el rol
            if (rol === "empleado") {
                navigate("/Administraccion");
            } else if (rol === "cliente") {
                navigate("/Clientes");
            } else {
                // Si el rol no está definido o es desconocido, redirigir al inicio de sesión
                navigate("/");
            }
        }
    }, [navigate, token, rol]);


    return (
        <>
            <h2>menu</h2>
        </>
    )
}

export default Menu;