import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ApiProduct } from "../../context/ApiProvider/types";
import { useApi } from "../../context/ApiProvider/useApi";
import { formatMoney } from "../../utils";
import ProductPhoto from "../ProductPhoto";
import './style.css';
import { useAppShop } from "../../context/AppProvider/useAppShop";
import AppContext from "../../context/AppProvider";

const ProductsGrid = () => {

    const appContext = useContext(AppContext);
    const appShop = useAppShop();
    const api = useApi();
    const [products, setProducts] = useState<ApiProduct[] | []>([]);


    useEffect(() => {

        const getProducts = async () => {
            const products = await api.RequestProductAllHome("");
            setProducts(products);
        }

        getProducts();

        console.log("useEffect Grid Product");
        console.log(JSON.stringify(appContext), null, '\t');
        console.log(JSON.stringify(appShop), null, '\t');

        // const handleSearchProducts = async (param?: string) => {
        //     const products = await api.RequestProductAllHome(param);
        //     setProducts(products);
        // }

        // console.log(1);
        // console.log(JSON.stringify(app), null, '\t');
        // app.setFunctionSearch(handleSearchProducts);
        // console.log(2);
        // console.log(JSON.stringify(app), null, '\t');
        // console.log("useEffect setFunctionSearch Grid Product");


    }, []);

    const handleSearchProducts = async (param?: string) => {
        const products = await api.RequestProductAllHome(param);
        setProducts(products);
    }

    return (

        <Container className="d-flex gap-2 flex-wrap justify-content-md-center mt-3" fluid >
            {products?.map((product: ApiProduct) => {
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

