import {  useState , useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const url = 'http://localhost:8080/habitaciones';

const FormHabitacion = ()=>{

    const navigate = useNavigate();
    const [habitacion,setHabitacion] = useState({});
    let { numero_habitacion, precio,estado} = habitacion;


    useEffect(() => {

        let token = sessionStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al inicio de sesión
            navigate("/");
        } else {
            axios.defaults.headers.common['Authorization'] = `${token}`;

        }
    }, []);

    // guardo los datos del form
    const handleChange = ({ target: { name, value } }) => {
        setHabitacion({ ...habitacion, [name]: value });
    }

    let handleCrearHabitacion = () => {

        const habitacionConValoresNumericos = {
            ...habitacion,
            numero_habitacion: parseInt(habitacion.numero_habitacion),
            precio: parseFloat(habitacion.precio),
            estado : parseInt(habitacion.estado)
        };
        axios.post(url,
            habitacionConValoresNumericos
        ).then((response) => {
            setHabitacion(response.data);
            console.log(response.data);
            navigate('/Administraccion');
        }).catch(error =>{
            console.log(error.response.data);
        });
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        handleCrearHabitacion();
    }

    return(
        <>
        <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group md="4"  controlId="numero_habitacion">
                        <Form.Label>N° Habitación</Form.Label>
                        <Form.Control
                            name="numero_habitacion"
                            required
                            type="number"
                            autoComplete="off"
                            placeholder="número de Habitacion"
                            value={numero_habitacion}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group md="4"  controlId="precio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            name="precio"
                            required
                            type="number"
                            autoComplete="off"
                            placeholder="precio"
                            value={precio}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    
                </Row>
                <Row className="mb-3">
                    <Form.Group md="4"  controlId="estado">
                        <Form.Label>Estado de la Habitación</Form.Label>
                        <Form.Control
                            required
                            name="estado"
                            type="number"
                            placeholder="estado"
                            onChange={handleChange}
                            value={estado}
                        />
                    </Form.Group>
                </Row>
                <Button type="submit">Guardar</Button>
                <div><Link to="/Administraccion">Volver</Link></div>
            </Form>
        </>
    )
}

export default FormHabitacion;