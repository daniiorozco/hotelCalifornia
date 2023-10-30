import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const urlHabitacion = 'http://localhost:8080/habitaciones';
const urlReserva = 'http://localhost:8080/reservas';

const ReservaHabitacion = () => {


    const [p_id_cliente, setIdCliente] = useState(0);
    const [p_id_habitacion, setIdHabitacion] = useState(0);
    const [p_fecha_inicio_hospedaje, setFechaDesde] = useState(null);
    const [p_fecha_fin_hospedaje, setFechaHasta] = useState(null);
    const [habitaciones, setHabitaciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let idCliente = sessionStorage.getItem('id_cliente');
        setIdCliente(idCliente);

        let token = sessionStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al inicio de sesión
            navigate("/");
        } else {
            axios.defaults.headers.common['Authorization'] = `${token}`;


            axios.get(urlHabitacion).then((response) => {
                setHabitaciones(response.data)
            }).catch(error => {
                console.log(error.response.data.message);
            });
        }
    }, [navigate]);

    const handleHabitacionChange = (e) => {
        setIdHabitacion(e.target.value)
    };

    const handleFechaDesdeChange = (e) => {
        setFechaDesde(e.target.value);
    };

    const handleFechaHastaChange = (e) => {
        setFechaHasta(e.target.value)
    };

    let crearReserva = async () => {
        await axios.post(urlReserva, {
            p_id_cliente,
            p_id_habitacion,
            p_fecha_inicio_hospedaje,
            p_fecha_fin_hospedaje
        }).then((response) => {
            let data = response.data;
            console.log(data);
        }).catch(error => {
            console.log(error.response);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        crearReserva();
    }

    return (
        <>
            <h2>Reservar Habitación</h2>
            <Form className='mt-4' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="p_id_habitacion">
                    <input type="number" name='p_id_cliente' value={p_id_cliente} hidden />
                    <Form.Select onChange={handleHabitacionChange} name="p_id_habitacion" value={p_id_habitacion}>
                        <option value="0">seleccione la Habitacion</option>
                        {habitaciones.map((habitacion) => (
                            <option key={habitacion.id} value={habitacion.id}>#{habitacion.numero_habitacion} - $ {habitacion.precio}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="p_fecha_inicio_hospedaje">
                    <input type="date" name="p_fecha_inicio_hospedaje" id="p_fecha_inicio_hospedaje" value={p_fecha_inicio_hospedaje} onChange={handleFechaDesdeChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="p_fecha_inicio_hospedaje">
                    <input type="date" name="p_fecha_fin_hospedaje" id="p_fecha_fin_hospedaje" value={p_fecha_fin_hospedaje} onChange={handleFechaHastaChange} />
                </Form.Group>
                <Button className="my-4" type="submit">Reservar</Button>
            </Form>
            <div><Link to="/Clientes">Volver</Link> </div>

        </>
    )
}

export default ReservaHabitacion;