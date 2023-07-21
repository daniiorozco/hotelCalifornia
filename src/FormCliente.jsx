import {  useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const url = 'http://localhost:8080/clientes'

const FormCliente = ()=>{

    const navigate = useNavigate();
    const [cliente,setCliente] = useState({});
    let { usuario, clave,nombre, apellido } = cliente;

    // guardo los datos del form
    const handleChange = ({ target: { name, value } }) => {
        setCliente({ ...cliente, [name]: value });
    }

    let handleCrearCliente = () => {
        axios.post(url,
            cliente
        ).then((response) => {
            setCliente(response.data)
            navigate('/')
        }).catch(error =>{
            console.log(error);
        });
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        handleCrearCliente();
    }

    return(
        <>
        <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group md="4"  controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            required
                            type="text"
                            placeholder="nombre"
                            value={nombre}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group md="4"  controlId="apellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            name="apellido"
                            required
                            type="text"
                            placeholder="apellido"
                            value={apellido}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    
                </Row>
                <Row className="mb-3">
                    <Form.Group md="4"  controlId="usuario">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            required
                            name="usuario"
                            type="text"
                            placeholder="usuario"
                            onChange={handleChange}
                            value={usuario}
                        />
                    </Form.Group>
                    <Form.Group md="4"  controlId="clave">
                        <Form.Label>Clave</Form.Label>
                        <Form.Control
                            required
                            name="clave"
                            type="password"
                            placeholder="clave"
                            onChange={handleChange}
                            value={clave}
                        />
                    </Form.Group>
                </Row>
                <Button type="submit">Registrarse</Button>
                <div><Link to="/">Volver</Link></div>
            </Form>
        </>
    )
}

export default FormCliente;