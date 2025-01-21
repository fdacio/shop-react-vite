import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ProductsGridSearch } from "../ProductsGrid/types";

const SearchProductHome = () => {

    const refProductGrid = useRef<ProductsGridSearch>(null);

    const [param, setParam] = useState<string>("");

    const searchProducts = () => {
        console.log("ref product grid in SearchProductHome");
        console.log(refProductGrid);

        if (refProductGrid && refProductGrid.current) {
            refProductGrid.current.handleSearchProducts(param);
        }
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