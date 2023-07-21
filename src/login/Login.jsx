import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const url = 'http://localhost:8080/login';

const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Realiza una llamada al backend para autenticar las credenciales
            const response = await axios.post(url, { usuario, clave });
            if (response.status === 200) {
                const data = response.data;
                // Guarda el token devuelto por el backend
                setToken(data.token);
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('id_cliente', data.rol[0])
                sessionStorage.setItem('rol', data.rol[1])
                // Limpia los campos del formulario
                setUsuario('');
                setClave('');


            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleLogout = () => {
        // Elimina el token almacenado
        setToken('');
    };

    if (token) {
        navigate('/menu');
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group md="4" controlId="usuario">
                        <Form.Label>usuario</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Form.Group md="4" controlId="clave">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Contraseña"
                            onChange={(e) => setClave(e.target.value)}
                            value={clave}
                        />
                    </Form.Group>
                </Row>
                <Button type="submit">Ingresar</Button>
                <Row>
                <Link to="/CrearCuenta">Crear Cuenta</Link>
                </Row>
            </Form>
        </>
    )
}

export default Login;