import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ApiCustomer, ApiPassword, ApiSignUp, SignUpError } from "../../context/ApiProvider/types";
import { useApi } from "../../context/ApiProvider/useApi";
import RootLayout from "../layout";
import ReactInputMask from "react-input-mask";

const SignUp = () => {

    const api = useApi();
    const navigate = useNavigate();

    const [nome, setNome] = useState<string | "">("");
    const [cpf, setCpf] = useState<string | "">("");
    const [endereco, setEndereco] = useState<string | "">("");
    const [email, setEmail] = useState<string | "">("");
    const [telefone, setTelefone] = useState<string | "">("");
    //const [interesses, setInteresses] = useState<ApiCategory[] | null>(null);
    const [password, setPassword] = useState<string | "">("");
    const [rePassword, setRePassword] = useState<string | "">("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<SignUpError | null>(null);

    useEffect(() => {
        setEmail("");
        setPassword("");
        setRePassword("");
    }, [])

    async function handleSignUp() {

        setIsLoading(true);

        const payload: ApiSignUp = parsePayload();

        try {
            await api.RequestSignUp(payload);
            navigate("/login");
        } catch (error: any) {
            setError(parseError(error.response.data));
        }

        setIsLoading(false);

    }

    function parseError(data: any) {
        console.log(data.fields);
        const errorSignup: SignUpError = {
            message: data.message,
            fields: {
                customer: {
                    nome: data.fields["customer.nome"],
                    cpf: data.fields['customer.cpf'],
                    endereco: data.fields['customer.endereco'],
                    email: data.fields['customer.email'],
                    telefone: data.fields['customer.telefone'],
                },
                password: {
                    password: data.fields['password.password'],
                    rePassword: data.fields['password.rePassword']
                }
            }
        }
        return errorSignup;
    }

    function parsePayload(): ApiSignUp {

        const _customer: ApiCustomer = {
            nome: nome,
            cpf: cpf,
            endereco: endereco,
            email: email,
            telefone: telefone,
            interesses: []
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

        <RootLayout>

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
                            <Form >
                                <Row>
                                    <Col sm={8} md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="nome">Nome</Form.Label>
                                            <Form.Control
                                                type="text"
                                                size="sm"
                                                id="nome"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)} />
                                            {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.nome}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col sm={4} md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="cpf">CPF</Form.Label>
                                            <Form.Control
                                                type="text"
                                                size="sm"
                                                id="cpf"
                                                as={ReactInputMask}
                                                mask="999.999.999-99"
                                                value={cpf}
                                                onChange={(e) => setCpf(e.target.value)} />
                                            {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.cpf}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="endereco">Endereço</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        id="endereco"
                                        value={endereco}
                                        onChange={(e) => setEndereco(e.target.value)} />
                                    {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.endereco}</small>}
                                </Form.Group>
                                <Row>
                                    <Col sm={8} md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="email">Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                size="sm"
                                                id="email"
                                                autoComplete='new-password'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                            {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.email}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col sm={4} md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="telefone">Telefone</Form.Label>
                                            <Form.Control
                                                type="text"
                                                size="sm"
                                                id="telefone"
                                                value={telefone}
                                                onChange={(e) => setTelefone(e.target.value)} />
                                            {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.customer.telefone}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6} md={6}>
                                        <Form.Group >
                                            <Form.Label htmlFor="password">Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                size="sm"
                                                id="password"
                                                autoComplete='new-password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                            {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.password.password}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} md={6}>
                                        <Form.Group >
                                            <Form.Label htmlFor="re-password">Re-Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                size="sm"
                                                id="re-password"
                                                autoComplete='new-password'
                                                value={rePassword}
                                                onChange={(e) => setRePassword(e.target.value)} />
                                            {(error?.fields != null) && <small className='text-sm text-danger'>{error.fields.password.rePassword}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer className='d-grid'>
                            <Button variant="dark" onClick={handleSignUp} disabled={isLoading} size="sm">
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
                                        Registrar
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

export default SignUp;