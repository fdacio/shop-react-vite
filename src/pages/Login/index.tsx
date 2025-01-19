import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, InputGroup, Row, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { AuthError, LoginPayload } from '../../context/AuthProvider/types';
import { useAuth } from '../../context/AuthProvider/useAuth';

const Login: React.FC = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);

    async function handleLogin() {

        setIsLoading(true);

        try {
            await auth.SignIn(parseLoginPayload({email, password}));
            navigate("/");
        } catch (error: any) {
            setError(error.response.data);
        }

        setIsLoading(false);

    }

    function parseLoginPayload({email, password} : {email: string, password: string}):LoginPayload {
        const payload: LoginPayload = {
            username: email,
            password: password
        }
        return payload;

    }

    return (

        <>
      
            <Container className='mt-5'>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        {
                            (error != null) &&
                            <Alert variant="danger">
                                {error.message}
                            </Alert>
                        }
                        <Card className="w-100">
                            <Card.Header>Login</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faAt} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                            {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.username}</small>}
                                        </InputGroup>
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                                {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.password}</small>}
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer className='d-grid gap-2'>
                                <Button variant="dark" onClick={handleLogin} disabled={isLoading}>
                                    {(isLoading)
                                        ? <>
                                            <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="false"
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
            </Container>
        </>
    )
}

export default Login;

