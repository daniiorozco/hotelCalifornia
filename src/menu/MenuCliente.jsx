import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

const MenuCliente = () => {

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
            <h2>menu cliente</h2>
            <div><button className='mb-4'><Link to="/Reserva">Reservar</Link></button> </div>
            <div><button><Link to="/Busqueda">Busqueda</Link ></button></div>
        </>
    )
}

export default MenuCliente;