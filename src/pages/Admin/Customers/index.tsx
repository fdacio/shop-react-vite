import { faAdd, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Nav, Pagination, Row, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ApiPageable } from '../../../context/ApiProvider/types';
import { useApi } from '../../../context/ApiProvider/useApi';

import RootAdminLayout from '../layout';
import { ApiCustomer } from '../../../context/ApiProvider/Customer/types';

const Customers = () => {

    const api = useApi();
    const [customersPageable, setCustomersPageable] = useState<ApiPageable<ApiCustomer>>();
    const [name, setName] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handlerSearchCustomers = async () => {
        setIsLoading(true);
        try {
            const response = await api.ApiCustomer.RequestCustomerAll();
            setCustomersPageable(response);
        } catch (error) {

        }
        setIsLoading(false);
    }

    useEffect(() => {

        const handlerList = async () => {

            try {
                const response = await api.ApiCustomer.RequestCustomerAll();
                setCustomersPageable(response);
            } catch (error) {

            }
        }

        handlerList();

    }, []);


    return (

        <RootAdminLayout>
            <Container fluid className="crud">
                <Card className='mb-2'>
                    <Card.Header>
                        <h3 className='text-center'>Customers</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col md={6} sm={2}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome"
                                        aria-label="Search"
                                        value={name}
                                        size='sm'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Col>
                                <Col md={4} sm={2}>
                                <Form.Control
                                        type="text"
                                        placeholder="CPF"
                                        aria-label="Search"
                                        value={cpf}
                                        size='sm'
                                        onChange={(e) => setCpf(e.target.value)}
                                    />
                                </Col>
                                <Col md={2} sm={2} className='d-flex justify-content-end'>
                                    <Button variant="primary" size="sm" className="text-nowrap" onClick={handlerSearchCustomers}>
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
                        <Button variant="success" size="sm" onClick={handlerSearchCustomers}>
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
                        {customersPageable?.content.map((customer: ApiCustomer) => {
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.nome}</td>
                                    <td className='justify-content-end align-items-center align-content-center '>
                                        <Nav className='text-nowrap d-flex h-100'>
                                            <Link to={`/products/${customer.id}`}>
                                                <Button variant="primary" size="sm" className='mx-1' onClick={handlerSearchCustomers}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </Link>
                                            <Link to={`/products/${customer.id}`}>
                                                <Button variant="danger" size="sm" className='mx-1' onClick={handlerSearchCustomers}>
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
        </RootAdminLayout >
    )
}

export default Customers;