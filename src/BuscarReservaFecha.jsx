import {  Link } from 'react-router-dom';
import {  useState , useEffect} from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const url = 'http://localhost:8080/reservas/fecha/';

const BuscarReservaFecha = () =>{

    const [reservas, setReservas] = useState([]);
    const [fecha, setFecha] = useState(null);

    useEffect(() => {

        let token = sessionStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al inicio de sesión
            navigate("/");
        } else {
            axios.defaults.headers.common['Authorization'] = `${token}`;
           
        }
    }, []);

    const getReservas = () => {
        let data = fecha;
        axios.get(url + data).then((response) => {
            setReservas(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data.message);
        });
    }

    const handleChange = ({ target: { value } }) => {
        setFecha(value);
        console.log(fecha);
    }
    const handleBuscar = ()=>{
        getReservas();
    }
    // configuracion de la data-table
    const columnas = [
        {
            name: 'id habitacion',
            selector: row => row.id_habitacion,
            sortable: true
        },
        {
            name: 'id cliente',
            selector: row => row.id_cliente,
            sortable: true
        },
        {
            name: 'fecha inicio hospedaje',
            selector: row => row.fecha_inicio_hospedaje,
            sortable: true
        },
        {
            name: 'fecha fin hospedaje',
            selector: row => row.fecha_fin_hospedaje,
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

    return(<>
    <h2> buscar por fecha</h2>

    <input type="date" name="fecha" id="fecha" value={fecha} onChange={handleChange} />
    <button onClick={handleBuscar}>Buscar</button>
    <DataTable
                    columns={columnas}
                    data={reservas}
                    title="Lista de Habitaciones"
                    pagination
                    paginationComponentOptions={PaginacionOpciones} />
    <div><Link to="/Administraccion">Volver</Link></div>
    </>)
}

export default BuscarReservaFecha;