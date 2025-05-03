import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import { useApi } from "../../context/ApiProvider/useApi";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const SearchProductHome = () => {

    const api = useApi();

    const [name, setName] = useState<string>("");
    const [isClickSearch, setIsClickSearch] = useState<boolean>(false);
    const [sortName, setSortName] = useState<string>("");
    const [sortMinPrice, setSortMinPrice] = useState<string>("");
    const [sortMaxPrice, setSortMaxPrice] = useState<string>("");


    const handleSearchProducts = async () => {
        setIsClickSearch(true);
    }

    const handlerFilterMenorPreco = () => {
        setSortMinPrice("&sort=preco,asc");
        setSortMaxPrice("");
    }

    const handlerFilterMaiorPreco = () => {
        setSortMaxPrice("&sort=preco,desc");
        setSortMinPrice("");
    }


    const handlerFilterNome = () => {
        setSortName("&sort=nome,asc");
        setSortMinPrice("");
        setSortMaxPrice("");
    }

    useEffect(() => {

        let _expre = "";
        if (name.length > 0) {
            _expre += "nome=" + name;
        }
        if (sortMinPrice.length > 0) {
            if (_expre.length > 0) {
                _expre += "&";
            }
            _expre += sortMinPrice;
        }

        if (sortMaxPrice.length > 0) {
            if (_expre.length > 0) {
                _expre += "&";
            }
            _expre += sortMaxPrice;
        }

        if (sortName.length > 0) {
            if (_expre.length > 0) {
                _expre += "&";
            }
            _expre += sortName;
        }

        const refresh = async () => {
            const _products = await api.ApiProduct.RequestProductAllHome("?" + _expre);
            api.setProductsHome(_products);
        }

        refresh();

    }, [isClickSearch, sortMinPrice, sortMaxPrice]);

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
                            <FontAwesomeIcon icon={faSort} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={handlerFilterMenorPreco}>Menor Preço</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={handlerFilterMaiorPreco}>Maior Preço</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={handlerFilterNome}>Nome</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchProductHome;
