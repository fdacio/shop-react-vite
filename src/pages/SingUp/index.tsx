import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import { ApiCategory, ApiCustomer, ApiPassword, ApiSignUp, SignUpError } from "../../context/ApiProvider/types";

const SignUp = () => {

    //nome, cpf, endereco, email, telefone, interesses
    const [nome, setNome] = useState<string | "">("");
    const [cpf, setCpf] = useState<string | "">("");
    const [endereco, setEndereco] = useState<string | "">("");
    const [email, setEmail] = useState<string | "">("");
    const [telefone, setTelefone] = useState<string | "">("");
    const [interesses, setInteresses] = useState<ApiCategory[] | null>(null);
    const [password, setPassword] = useState<string | "">("");
    const [rePassword, setRePassword] = useState<string | "">("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<SignUpError | null>(null);

    const navigate = useNavigate();

    async function handleSignUp() {

        setIsLoading(true);

        try {

            navigate("/login");
        } catch (error: any) {
            setError(error.response.data);
        }

        setIsLoading(false);

    }



    function parsePayload(): ApiSignUp {

        const _customer: ApiCustomer = {
            nome: nome,
            cpf: cpf,
            endereco: endereco,
            email: email,
            telefone: telefone
        }

        const _password: ApiPassword = {
            password: password,
            rePassword: rePassword
        }

        const signup: ApiSignUp = {
            customer: _customer,
            password: _password
        };


        return signup;

    }

    return (

        <>
            <Header />
            <Menu />

            <Container className='mt-5'>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        {
                            (error != null && error.fields == undefined) &&
                            <Alert variant="danger">
                                {error.message}
                            </Alert>
                        }
                        <Card className="w-100">
                            <Card.Header className="text-center fw-bold">Registre-se</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="nome">Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="nome"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)} />
                                        {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.nome}</small>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="cpf">CPF</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="cpf"
                                            value={cpf}
                                            onChange={(e) => setCpf(e.target.value)} />
                                        {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.cpf}</small>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="endereco">Endereço</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="endereco"
                                            value={endereco}
                                            onChange={(e) => setEndereco(e.target.value)} />
                                        {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.endereco}</small>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                        {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.email}</small>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="telefone">Telefone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="telefone"
                                            value={telefone}
                                            onChange={(e) => setTelefone(e.target.value)} />
                                        {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.telefone}</small>}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label htmlFor="password">Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                        {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.password.password}</small>}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label htmlFor="re-password">Re-Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="re-password"
                                            value={rePassword}
                                            onChange={(e) => setRePassword(e.target.value)} />
                                        {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.password.rePassword}</small>}
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer className='d-grid'>
                                <Button variant="dark" onClick={handleSignUp} disabled={isLoading}>
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
                                            Registrar
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

export default SignUp;