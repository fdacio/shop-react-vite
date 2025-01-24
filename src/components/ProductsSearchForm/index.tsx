import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const SearchProductHome = () => {

    const [param, setParam] = useState<string>("");
    
    const handleSearchProducts = () => {       
        
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
