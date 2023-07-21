import {  Link } from 'react-router-dom';
import {  useState , useEffect} from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const url = 'http://localhost:8080/habitaciones?'
const BuscarRangoFechas = () =>{

    const [habitaciones, setHabitaciones] = useState([]);
    const [p_fecha_inicio_hospedaje, setFechaDesde] = useState(null);
    const [p_fecha_fin_hospedaje, setFechaHasta] = useState(null);

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
        axios.get(url + 'fecha_inicio=' +p_fecha_inicio_hospedaje +'&fecha_fin='+ p_fecha_fin_hospedaje ).then((response) => {
            setHabitaciones(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data.message);
        });
    }

    const handleFechaDesdeChange = (e) => {
        setFechaDesde(e.target.value);
        console.log(e.target.value);
    };

    const handleFechaHastaChange = (e) => {
       setFechaHasta(e.target.value)
       console.log(e.target.value);
    };
    const handleBuscar = ()=>{
        getHabitaciones();
    }
    // configuracion de la data-table
    const columnas = [
        
        {
            name: 'nùmero habitacion',
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
        <h2>Buscar Habitaciones disponibles por Rango de Fechas</h2>
        <label htmlFor="">Desde : </label>
        <input type="date" name="p_fecha_inicio_hospedaje" id="p_fecha_inicio_hospedaje" value={p_fecha_inicio_hospedaje} onChange={handleFechaDesdeChange} />
        <label htmlFor="">Hasta : </label>
        <input type="date" name="p_fecha_fin_hospedaje" id="p_fecha_fin_hospedaje" value={p_fecha_fin_hospedaje} onChange={handleFechaHastaChange} />
        <button onClick={handleBuscar}>Buscar</button>
        <DataTable
                    columns={columnas}
                    data={habitaciones}
                    title="Lista de Habitaciones"
                    pagination
                    paginationComponentOptions={PaginacionOpciones} />
        <div><Link to="/clientes">Volver</Link></div>
        </>
    )
}

export default BuscarRangoFechas;