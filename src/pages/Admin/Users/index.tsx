import { faAdd, faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Nav, Pagination, Row, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiPageable } from "../../../context/ApiProvider/types";
import { useApi } from "../../../context/ApiProvider/useApi";
import { ApiUserCrud } from "../../../context/ApiProvider/User/types";
import { AuthError } from "../../../context/AuthProvider/types";
import RootAdminLayout from "../layout";

const Users = () => {

    const api = useApi();
    const [name, setName] = useState<string>("");
    const [usersPageable, setUsersPageable] = useState<ApiPageable<ApiUserCrud>>();
    const [isLoading, setIsLoading] = useState(false);
    const [isAlloed, setIsAllowed] = useState(true);
    const [error, setError] = useState<AuthError | null>(null);


    const handlerSearchUsers = async () => {
        setIsLoading(true);
        setIsAllowed(true);
        try {
            const response = await api.ApiUserCrud.RequestUserAll();
            setUsersPageable(response);
        } catch (error: any) {
            setIsAllowed(false);
            setError(error.response?.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {

        const handlerList = async () => {
            setIsAllowed(true);
            try {
                const response = await api.ApiUserCrud.RequestUserAll();
                setUsersPageable(response);
            } catch (error: any) {
                setIsAllowed(false);
                setError(error.response?.data);
            }
        }

        handlerList();

    }, []);

    return (
        <RootAdminLayout>
            {!(isAlloed) &&
                <Alert variant="danger" className='p-1'>
                    <small>{error?.message}</small>
                </Alert>}
            {(isAlloed) &&
                <Container fluid className="crud">
                    <Card className='mb-2'>
                        <Card.Header>
                            <h3 className='text-center'>Users</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col md={10} sm={2}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nome"
                                            aria-label="Search"
                                            value={name}
                                            size='sm'
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={2} sm={2} className='d-flex justify-content-end'>
                                        <Button variant="primary" size="sm" className="text-nowrap" onClick={handlerSearchUsers}>
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
                                                    <FontAwesomeIcon icon={faSearch} /> Pesquisar
                                                </>
                                            }

                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" size="sm" onClick={handlerSearchUsers}>
                                <FontAwesomeIcon icon={faAdd} /> Adicionar
                            </Button>
                        </Card.Footer>
                    </Card>
                    <Table striped bordered hover responsive size="sm" className='w-100'>
                        <thead className='thead-dark'>
                            <tr>
                                <th className='col-md-1'>Código</th>
                                <th className='col-md-6'>Nome</th>
                                <th className='col-md-1'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersPageable?.content.map((user: ApiUserCrud) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.nome}</td>
                                        <td className='justify-content-end align-items-center align-content-center '>
                                            <Nav className='text-nowrap d-flex h-100'>
                                                <Link to={`/users/${user.id}`}>
                                                    <Button variant="primary" size="sm" className='mx-1' onClick={handlerSearchUsers}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </Link>
                                                <Link to={`/users/${user.id}`}>
                                                    <Button variant="danger" size="sm" className='mx-1' onClick={handlerSearchUsers}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </Link>
                                            </Nav>
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </Table>
                    <Pagination size="sm">
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />
                    </Pagination>

                </Container>
            }
        </RootAdminLayout>
    )
}

export default Users;