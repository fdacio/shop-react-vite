import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useApi } from "../../context/ApiProvider/useApi";

const SearchProductHome = () => {

    const api = useApi();
    const [param, setParam] = useState<string>("");

    const handleSearchProducts = async () => {
        const _products = await api.RequestProductAllHome("?nome=" + param);
        api.setProducts(_products);
    }

    useEffect(() => {
        const refresh = async () => {
            if (param.length == 0) {
                const _products = await api.RequestProductAllHome();
                api.setProducts(_products);
            }
        }
        refresh();
    }, [param]);

    return (
        <Form>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Pesquisa de produtos"
                    aria-label="Search"
                    value={param}
                    onChange={(e) => setParam(e.target.value)}
                />
                <Button variant="light" onClick={handleSearchProducts}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SearchProductHome;
