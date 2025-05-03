import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faCartShopping, faHome, faPeopleGroup, faUsers } from "@fortawesome/free-solid-svg-icons";

const MenuAdmin = () => {

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" className="h-100 align-items-start flex-column mt-0">
                <Nav className="flex-column w-100 p-2">
                    <Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome} className="mx-2" />Início</Link>
                    <Link to="/products" className="nav-link"><FontAwesomeIcon icon={faBarcode} className="mx-2" />Produtos</Link>
                    <Link to="/customers" className="nav-link"><FontAwesomeIcon icon={faPeopleGroup} className="mx-2" />Clientes</Link>
                    <Link to="/orders" className="nav-link"><FontAwesomeIcon icon={faCartShopping} className="mx-2" />Pedidos</Link>
                    <Link to="/users" className="nav-link"><FontAwesomeIcon icon={faUsers} className="mx-2" />Usuários</Link>

                </Nav>
            </Navbar>
        </>

    );
}

export default MenuAdmin;