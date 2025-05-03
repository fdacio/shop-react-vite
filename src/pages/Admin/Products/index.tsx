import { faAdd, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Nav, Pagination, Row, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ApiPageable } from '../../../context/ApiProvider/types';
import { useApi } from '../../../context/ApiProvider/useApi';
import { formatMoney } from '../../../utils';
import RootAdminLayout from '../layout';
import { ApiProduct } from '../../../context/ApiProvider/Product/types';

const Products = () => {

    const api = useApi();
    const [productsPageable, setProductsPageable] = useState<ApiPageable<ApiProduct>>();
    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handlerSearchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await api.ApiProduct.RequestProductAll();
            setProductsPageable(response);
        } catch (error) {

        }
        setIsLoading(false);
    }

    useEffect(() => {

        const handlerList = async () => {

            try {
                const response = await api.ApiProduct.RequestProductAll();
                setProductsPageable(response);
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
                        <h3 className='text-center'>Produtos</h3>
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
                                    <Form.Select aria-label="Categoria" size='sm'>
                                        <option>Categoria</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Col>
                                <Col md={2} sm={2} className='d-flex justify-content-end'>
                                    <Button variant="primary" size="sm" className="text-nowrap" onClick={handlerSearchProducts}>
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
                        <Button variant="success" size="sm" onClick={handlerSearchProducts}>
                            <FontAwesomeIcon icon={faAdd} /> Adicionar
                        </Button>
                    </Card.Footer>
                </Card>
                <Table striped bordered hover responsive size="sm" className='w-100'>
                    <thead className='thead-dark'>
                        <tr>
                            <th className='col-md-1'>Código</th>
                            <th className='col-md-6'>Nome</th>
                            <th className='col-md-2'>Categoria</th>
                            <th className='col-md-2 text-end'>Valor</th>
                            <th className='col-md-1'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsPageable?.content.map((product: ApiProduct) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.nome}</td>
                                    <td>{product.category.nome}</td>
                                    <td className='text-end'>{formatMoney(product.preco)}</td>
                                    <td className='justify-content-end align-items-center align-content-center '>
                                        <Nav className='text-nowrap d-flex h-100'>
                                            <Link to={`/products/${product.id}`}>
                                                <Button variant="primary" size="sm" className='mx-1' onClick={handlerSearchProducts}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </Link>
                                            <Link to={`/products/${product.id}`}>
                                                <Button variant="danger" size="sm" className='mx-1' onClick={handlerSearchProducts}>
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

export default Products;