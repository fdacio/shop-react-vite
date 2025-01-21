import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ProductPhoto from '../../components/ProductPhoto';
import { ApiProduct } from '../../context/ApiProvider/types';
import { useApi } from '../../context/ApiProvider/useApi';
import { formatMoney } from '../../utils';
import RootLayout from '../layout';
import './style.css';

const Home = () => {

    const api = useApi();
    const [products, setProducts] = useState<ApiProduct[] | []>([]);

    useEffect(() => {

        const getProducts = async () => {
            const params = "";
            const products = await api.RequestProductAllHome(params);
            setProducts(products);
         }

        getProducts();

    }, []);



    return (

        <RootLayout>
            <Container className="d-flex gap-2 flex-wrap justify-content-md-center mt-3" fluid>
                {products?.map((product: ApiProduct) => {
                    return (
                        <Card className='product-card' key={product.id}>
                            <Card.Body>
                                <Row>
                                    <Col md={4} sm={4} >
                                        <ProductPhoto product={product} />
                                    </Col>
                                    <Col md={8} sm={8}>
                                        <p className='nome'>{product.nome}</p>
                                        <p className='descricao'>{product.descricao}</p>
                                        <p className='preco'>{formatMoney(product.preco)}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
                }
                )}
            </Container>
        </RootLayout>

    )
}

export default Home;


