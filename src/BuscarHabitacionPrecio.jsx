import {  useState , useEffect} from "react";
import axios from "axios";
import {  Link } from 'react-router-dom';
import DataTable from "react-data-table-component";

const url = 'http://127.0.0.1:8080/habitaciones/precio/';

const BuscarHabitacionPrecio = () =>{

    const [habitaciones, setHabitaciones] = useState([]);
    const [precio, setPrecio] = useState(null);

    useEffect(() => {

        let token = sessionStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al inicio de sesión
            navigate("/");
        } else {
            axios.defaults.headers.common['Authorization'] = `${token}`;
           
        }
    }, []);

    const getHabitaciones = () => {
        let data = parseFloat(precio);
        axios.get(url + data).then((response) => {
            setHabitaciones(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data.message);
        });
    }
    const handleChange = ({ target: { value } }) => {
        setPrecio(value);
        console.log(id);
    }

    const handleBuscar = ()=>{
        getHabitaciones();
    }

    // configuracion de la data-table
    const columnas = [
        {
            name: 'N° Habitación',
            selector: row => row.numero_habitacion,
            sortable: true
        },
        {
            name: 'precio',
            selector: row => row.precio,
            sortable: true
        },
        {
            
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const PaginacionOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }
    return(
        <>
        <h2>Buscar Habitaciòn por precio</h2>
        <div>
            <label htmlFor="precio" className="mx-4">Ingrese el precio : </label>
            <input type="number" name="precio" id="precio" onChange={handleChange} value={precio} className="bg-white text-black mx-2"/>
            <button onClick={handleBuscar}>Buscar</button>
            <DataTable
                    columns={columnas}
                    data={habitaciones}
                    title="Lista de Habitaciones"
                    pagination
                    paginationComponentOptions={PaginacionOpciones} />
        </div>
        <div><Link to="/Clientes">Volver</Link> </div>
        </>
    )
}

export default BuscarHabitacionPrecio;