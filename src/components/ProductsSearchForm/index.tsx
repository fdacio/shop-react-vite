import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import { useApi } from "../../context/ApiProvider/useApi";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const SearchProductHome = () => {

    const api = useApi();

    const [name, setName] = useState<string>("");
    const [isClickSearch, setIsClickSearch] = useState<boolean>(false);
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");

    const handleSearchProducts = async () => {
        setIsClickSearch(true);
    }

    const handlerFilterMenorPreco = () => {
        setMinPrice("sort=preco,asc");
        setMaxPrice("");
    }

    const handlerFilterMaiorPreco = () => {
        setMaxPrice("sort=preco,desc");
        setMinPrice("");
    }


    const handlerFilterTudo = () => {
        setName("");
        setMinPrice("");
        setMaxPrice("");
    }

    useEffect(() => {

        let _expre = "";
        if (name.length > 0) {
            _expre += "nome=" + name;
        }
        if (minPrice.length > 0) {
            if (_expre.length > 0) {
                _expre += "&";
            }
            _expre += minPrice;
        }

        if (maxPrice.length > 0) {
            if (_expre.length > 0) {
                _expre += "&";
            }
            _expre += maxPrice;
        }

        const refresh = async () => {
            const _products = await api.ApiProduct.RequestProductAllHome("?" + _expre);
            api.setProductsHome(_products);
        }

        refresh();

    }, [isClickSearch, minPrice, maxPrice]);

    useEffect(() => {
        if (name.length == 0) {
            const refresh = async () => {
                const _products = await api.ApiProduct.RequestProductAllHome();
                api.setProductsHome(_products);
            }

            refresh();
        }

    }, [name]);

    return (
        <Form>
            <Row>
                <Col md={10}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Pesquisa de produtos"
                            aria-label="Search"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button variant="light" onClick={handleSearchProducts}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={2}>
                    <Dropdown style={{ zIndex: 10000 }}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FontAwesomeIcon icon={faFilter} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={handlerFilterMenorPreco}>Menor Preço</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={handlerFilterMaiorPreco}>Maior Preço</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={handlerFilterTudo}>Tudo</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchProductHome;
