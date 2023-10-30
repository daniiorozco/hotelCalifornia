import {  useState , useEffect} from "react";
import axios from "axios";
import {useNavigate,  Link } from 'react-router-dom';
import DataTable from "react-data-table-component";


const urlHabitacion = 'http://localhost:8080/habitaciones/';

const BusquedaAdmin = () =>{

    const navigate = useNavigate();
    const [habitaciones, setHabitaciones] = useState([]);
    const [id, setId] = useState(null);

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
        let data = parseInt(id);
        axios.get(urlHabitacion + data).then((response) => {
            setHabitaciones(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data.message);
        });
    }
    const handleChange = ({ target: { value } }) => {
        setId(value);
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
    return(
        <>
        <h2>Busqueda de reservas por Id de habitación</h2>

        <div>
            <label htmlFor="idHabitacion" className="mx-4">IdHabitacion : </label>
            <input type="number" name="id" id="id" onChange={handleChange} value={id} className="bg-white text-black mx-2"/>
            <button onClick={handleBuscar}>Buscar</button>
        </div>
        <div>
                <DataTable
                    columns={columnas}
                    data={habitaciones}
                    title="Lista de Habitaciones"
                    pagination
                    paginationComponentOptions={PaginacionOpciones} />
            </div>
            <div><button className='mb-4'><Link to="/BusquedaReserva">Reservas por Fecha</Link></button> </div>
        <div><Link to="/Administraccion">Volver</Link></div>
        </>
    )
}

export default BusquedaAdmin;