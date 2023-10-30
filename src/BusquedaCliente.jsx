import { useNavigate,Link } from 'react-router-dom';
import axios from "axios";
import {  useEffect } from "react";
const BusquedaCliente = ()=>{

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
    
    return(
        <>
        <h2>Busqueda</h2>
        <div><button className='mb-4'><Link to="/BusquedaPrecio">Buscar por Precio</Link></button> </div>
        <div><button className='mb-4'><Link to="/Busquedafechas">Buscar por Fechas</Link></button> </div>
        <div><button className='mb-4'><Link to="/BusquedaHabitacion">Buscar Habitaciones</Link></button> </div>
        <div><Link to="/Clientes">Volver</Link> </div>
        </>
    )
}

export default BusquedaCliente;