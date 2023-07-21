import { Link } from 'react-router-dom';


const MenuCliente =()=>{

    return(
        <>
        <h2>menu cliente</h2>
        <div><button className='mb-4'><Link to="/Reserva">Reservar</Link></button> </div>
        <div><div><button><Link to="/Busqueda">Busqueda</Link ></button></div></div>
        </>
    )
}

export default MenuCliente;