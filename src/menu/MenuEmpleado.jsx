import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

const MenuEmpleado = () => {


    const navigate = useNavigate();

    useEffect(() => {

        let token = sessionStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al inicio de sesión
            navigate("/");
        } else {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    }, []);

    return (
        <>
            <h2>menu empleado</h2>
            <div><button className='mb-4'><Link to="/AltaHabitacion">Agregar Habitación</Link></button> </div>
            <div><button className='mb-4'><Link to="/Habitaciones">Lista de Hbitaciones</Link></button> </div>
            <div><div><button><Link to="/BusquedaAdmin">Busqueda</Link ></button></div></div>
        </>
    )
}

export default MenuEmpleado;