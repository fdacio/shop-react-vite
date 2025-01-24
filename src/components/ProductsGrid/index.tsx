import { Card, Col, Container, Row } from "react-bootstrap";
import { ApiProduct } from "../../context/ApiProvider/types";
import { useApi } from "../../context/ApiProvider/useApi";
import { formatMoney } from "../../utils";
import ProductPhoto from "../ProductPhoto";
import './style.css';

const ProductsGrid = () => {

    const api = useApi();

    return (

        <Container className="d-flex gap-2 flex-wrap justify-content-md-center mt-3" fluid >
            {api.products?.map((product: ApiProduct) => {
                return (
                    <Card className='product-card' key={product.id}>
                        <Card.Body>
                            <Row>
                                <Col md={4} sm={6} >
                                    <ProductPhoto product={product} />
                                </Col>
                                <Col md={8} sm={6}>
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

    );


}

export default ProductsGrid;

