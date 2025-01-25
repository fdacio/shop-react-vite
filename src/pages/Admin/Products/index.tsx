import { faAdd, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Nav, Pagination, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ApiPageable, ApiProduct } from '../../../context/ApiProvider/types';
import { useApi } from '../../../context/ApiProvider/useApi';
import { formatMoney } from '../../../utils';
import RootAdminLayout from '../layout';

const Products = () => {

    const api = useApi();
    const [productsPageable, setProductsPageable] = useState<ApiPageable<ApiProduct>>();
    const [name, setName] = useState<string>("");

    const handlerSearchProducts = () => {

    }

    useEffect(() => {

        const handlerList = async () => {

            try {
                const response = await api.RequestProductAll();                
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
                                        <FontAwesomeIcon icon={faSearch} /> Pesquisar
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
                            <th className='col-md-5'>Nome</th>
                            <th className='col-md-3'>Categoria</th>
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
                                    <td className='d-flex justify-content-end'>
                                        <Nav className='text-nowrap d-flex'>
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