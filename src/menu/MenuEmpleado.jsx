import { Link } from 'react-router-dom';


const MenuEmpleado =()=>{

    return(
        <>
        <h2>menu empleado</h2>
        <div><button className='mb-4'><Link to="/AltaHabitacion">Agregar Habitación</Link></button> </div>
        <div><button className='mb-4'><Link to="/Habitaciones">Lista de Hbitaciones</Link></button> </div>
        <div><div><button><Link to="/BusquedaAdmin">Busqueda</Link ></button></div></div>
        </>
    )
}

export default MenuEmpleado;