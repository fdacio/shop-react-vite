import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { useApi } from '../../context/ApiProvider/useApi';
import { ApiProduct } from '../../context/ApiProvider/types';
import { formatMoney } from '../../utils';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import './style.css';

const Home: React.FC = () => {

    const api = useApi();
    const [products, setProducts] = useState<ApiProduct[] | []>([]);
    const [params, setParams] = useState<string | "">("");

    useEffect(() => {

        const getProducts = async () => {

            const products = await api.RequestProductAllHome(params);
            setProducts(products);

        }
        getProducts();
        setParams("");
 

    }, []);

    return (
        <>
            <Header home={true} />
            <Menu home={true} />
            <Container className="d-flex gap-2 flex-wrap justify-content-md-center mt-3" fluid>
                {products?.map((product: ApiProduct) => {
                    return (
                        <Card className='product-card' key={product.id}>
                            <Card.Body>
                                <Row>
                                    <Col md={4} className='p-2'>
                                        <Image src={product.foto} className='border'></Image>
                                    </Col>
                                    <Col md={8}>
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

        </>
    )
}

export default Home;


