import { Link } from 'react-router-dom';


const BusquedaCliente = ()=>{

    return(
        <>
        <h2>Busqueda</h2>
        <div><button className='mb-4'><Link to="/BusquedaPrecio">Buscar por Precio</Link></button> </div>
        <div><button className='mb-4'><Link to="/Busquedafechas">Buscar por Fechas</Link></button> </div>
        <div><Link to="/Clientes">Volver</Link> </div>
        </>
    )
}

export default BusquedaCliente;