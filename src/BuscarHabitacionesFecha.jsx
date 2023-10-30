import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const url = 'http://localhost:8080/habitaciones/fecha/';

const BuscarHabitacionesFecha = () => {

    const navigate = useNavigate();
    const [habitaciones, setHabitaciones] = useState([]);
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

    const getHabitaciones = () => {
        let data = fecha;
        axios.get(url + data).then((response) => {
            setHabitaciones(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data.message);
        });
    }

    const handleChange = ({ target: { value } }) => {
        setFecha(value);
    }
    const handleBuscar = () => {
        getHabitaciones();
    }
    // configuracion de la data-table
    const columnas = [
        {
            name: 'Número habitación',
            selector: row => row.numero_habitacion,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Precio',
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

    return (
        <>
            <h2> buscar todas las Habitaciones por fecha</h2>

            <input type="date" name="fecha" id="fecha" value={fecha} onChange={handleChange} />
            <button onClick={handleBuscar}>Buscar</button>
            <DataTable
                columns={columnas}
                data={habitaciones}
                title="Lista de Habitaciones"
                pagination
                paginationComponentOptions={PaginacionOpciones} />
            <div><Link to="/Clientes">Volver</Link> </div>
        </>
    )
}

export default BuscarHabitacionesFecha;