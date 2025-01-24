import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useAppShop } from "../../context/AppProvider/useAppShop";

const SearchProductHome = () => {

    const app = useAppShop();

    const [param, setParam] = useState<string>("");


    const handleSearchProducts = () => {
        console.log(3);
        console.log(JSON.stringify(app), null, '\t');
        
        app.searchProductFunction();
    }

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
