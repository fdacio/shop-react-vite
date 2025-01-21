import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const SearchProductHome = ({ callBack } : { callBack? : (param: string) => {}}) => {

    const [param, setParam] = useState<string>("");

    const searchProducts = () => {
        if (callBack) callBack(param);
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
                <Button variant="light" onClick={searchProducts}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SearchProductHome;