import DataTable from "react-data-table-component";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate,Link } from 'react-router-dom';

const url = 'http://localhost:8080/habitacionesAdministraccion'
const urlHabitacion = 'http://localhost:8080/habitaciones/';


const ListHabitaciones = () => {

    const navigate = useNavigate();
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacion, setHabitacion] = useState({});
    const [listUpdateHabitacion, setListUpdateHabitacion] = useState(false);


    useEffect(() => {

        let token = sessionStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al inicio de sesión
            navigate("/");
        } else {
            axios.defaults.headers.common['Authorization'] = `${token}`;
            const getHabitaciones = () => {
                axios.get(url).then((response) => {
                    setHabitaciones(response.data);
                }).catch(error => {
                    console.log(error.response.data.message);
                });
            }
            getHabitaciones();
            setListUpdateHabitacion(false);
        }

    }, [listUpdateHabitacion]);

    let handleEditarHabitacion = (id)=>{
        handleEditarPrecio(id);
        handleEditarEstado(id);

    }
    let handleEditarPrecio = (id) => {
        const data = { precio: parseFloat(habitacion.precio) };
        axios.put(urlHabitacion + id + '/precio', data).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data.message);
        });
        setHabitacion({});
        setListUpdateHabitacion(true);
        handleClose();
    }

    let handleEditarEstado = (id) => {
        const data = { estado: parseInt(habitacion.estado) };
        axios.put(urlHabitacion + id + '/estado', data).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.log(error.response.data.message);
        });
        setHabitacion({});
        setListUpdateHabitacion(true);
        handleClose();
    }

    // metodo para borrar 
    const handleBorrar = (id) => {
        axios.delete(urlHabitacion + id).then((response)=>{
            console.log(response.data);
        }).catch(error =>{
            setError(error);
            console.log(error);
        });
        
        setListUpdateHabitacion(true);
        handleCloseDelete();
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
            name: 'estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <>
                    <span onClick={() => { seleccionarHabitacion(row); handleShow() }} className='btn btn-primary'><AiTwotoneEdit /></span>{'     '}
                    <span onClick={() => { seleccionarHabitacion(row); handleShowDelete() }} className='btn btn-danger'><AiTwotoneDelete /></span>
                </>
            ),

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

    const seleccionarHabitacion = (habitacion) => {
        setHabitacion(
            {
                id: habitacion.id,
                numero_habitacion: habitacion.numero_habitacion,
                precio: habitacion.precio,
                estado: habitacion.estado,
            }
        )
    }

    //modal editar
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // modal eliminar
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    // guardo cada dato en el objeto
    const handleChange = ({ target: { name, value } }) => {
        setHabitacion({ ...habitacion, [name]: value })
    }

    return (
        <>
            <h2>habitaciones</h2>
            <div>
                <DataTable
                    columns={columnas}
                    data={habitaciones}
                    title="Lista de Habitaciones"
                    pagination
                    paginationComponentOptions={PaginacionOpciones} />
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Habitacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >

                        <Form.Group className="mb-3" >
                            <Form.Label>N° Habitación</Form.Label>
                            <Form.Control
                                type="text"
                                disabled
                                value={habitacion.id}
                                onChange={handleChange}
                                id='numero_habitacion'
                                name='numero_habitacion'
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                value={habitacion.precio}
                                onChange={handleChange}
                                id='precio'
                                name='precio'
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="number"
                                value={habitacion.estado}
                                onChange={handleChange}
                                id='estado'
                                name='estado'
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='btn btn-danger' type='submit' >Cerrar</button>
                    <button onClick={() => handleEditarHabitacion(habitacion.id)} className='btn btn-primary' type='submit' >Guardar</button>
                </Modal.Footer>
            </Modal>

            {/* modal eliminar */}
            <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>

                    <div><p>
                        Esta seguro que desea <b>Eliminar</b> la Habitación <b>{habitacion.numero_habitacion}</b>
                    </p></div>

                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleCloseDelete} className=' btn btn-danger' type='submit' >Cerrar</button>
                    <button onClick={() => handleBorrar(habitacion.numero_habitacion)} className=' btn btn-primary' type='submit' >Eliminar</button>
                </Modal.Footer>
            </Modal>
            <div><Link to="/Administraccion">Volver</Link></div>
        </>
    )
}

export default ListHabitaciones;