import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const SearchProductHome: React.FC = () => {
    const isHome = true;
    if (isHome) {
        return (
            <Form>
            <InputGroup>
                <Form.Control
                    type="search"
                    placeholder="Pesquisa de produtos"
                    aria-label="Search"
                />
                <Button variant="light">
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </InputGroup>
        </Form>
        )
    } else {   
        return (<></>);
    }
}

export default SearchProductHome;