import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Alert, Button, Card, Col, InputGroup, Row, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ApiLogin, AuthError } from '../../context/AuthProvider/types';
import { useAuth } from '../../context/AuthProvider/useAuth';
import RootLayout from '../layout';

const Login = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);

    async function handleLogin() {

        setIsLoading(true);

        try {
            await auth.SignIn(parseLoginPayload());
            navigate("/");
        } catch (error: any) {
            if (error.response?.data?.fields) {
                setError({
                    message: error.response?.data?.message,
                    fields: {
                        username: error.response?.data?.fields?.username,
                        password: error.response?.data?.fields?.password
                    }
                });
            } else if (error.response?.data?.message) {
                setError(error.response?.data);
            }
        }

        setIsLoading(false);

    }

    function parseLoginPayload(): ApiLogin {
        const payload: ApiLogin = {
            username: email,
            password: password
        }
        return payload;
    }

    return (

        <RootLayout>
            <Row className='d-flex align-items-center'>
                <Col md={{ span: 4, offset: 4 }} sm={{ span: 6, offset: 3 }}>

                    <Card className='m-2'>
                        <Card.Header className="text-center fw-bold">Login</Card.Header>
                        <Card.Body>
                            {
                                (error != null && error.fields == undefined) &&
                                <>
                                    <Alert variant="danger" className='p-1'>
                                        <small>{error.message}</small>
                                    </Alert>
                                </>
                            }
                            <Form>
                                <Form.Group className="mb-2">
                                    <Form.Label htmlFor="email">Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faAt} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            size="sm"
                                            value={email}
                                            autoFocus={true}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </InputGroup>
                                    {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.username}</small>}
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faKey} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            size="sm"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </InputGroup>
                                    {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.password}</small>}
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Body>
                            <p>Esqueci <Link to="/">Username/Password?</Link></p>
                            <p>Não tem uma conta? <Link to="/signup">Registre-se</Link></p>
                        </Card.Body>
                        <Card.Footer className='d-grid'>
                            <Button variant="dark" onClick={handleLogin} disabled={isLoading} size="sm">
                                {(isLoading)
                                    ? <>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="false"
                                            className="mr-2"
                                        />
                                        Aguarde...
                                    </>
                                    : <>
                                        Entrar
                                    </>
                                }
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </RootLayout>

    )
}

export default Login;

