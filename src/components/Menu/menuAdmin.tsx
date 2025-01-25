import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode, faCartShopping, faHome, faPeopleGroup, faSignOut, faUsers } from "@fortawesome/free-solid-svg-icons";

const MenuAdmin = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    function handlerLogout() {
        auth.SignOut();
        navigate("/");
    }

    return (
        <Navbar bg="light" data-bs-theme="light" className="h-100 align-items-start flex-column mt-0">
            <Navbar.Brand className="border bg-secondary bg-gradient w-100 p-2 m-0" href="#">
                {(auth.signed) &&
                    <>
                        <p className="fw-bold text-light mb-0">{auth.user?.nome}</p>
                        <small className="fw-normal text-light">{auth.user?.rules?.map((r) => { return r.nome + ' ' })}</small>
                    </>
                }
            </Navbar.Brand>
            <Nav className="flex-column w-100 p-2">
                <Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome} className="mx-2"/>Início</Link>
                <Link to="/products" className="nav-link"><FontAwesomeIcon icon={faBarcode} className="mx-2"/>Produtos</Link>
                <Link to="/cutomers" className="nav-link"><FontAwesomeIcon icon={faPeopleGroup} className="mx-2"/>Clientes</Link>
                <Link to="/orders" className="nav-link"><FontAwesomeIcon icon={faCartShopping} className="mx-2"/>Pedidos</Link>
                <Link to="/user" className="nav-link"><FontAwesomeIcon icon={faUsers} className="mx-2"/>Usuários</Link>
                <Nav className="border-top">
                    <Nav.Link href="#" onClick={handlerLogout} className=""> <FontAwesomeIcon icon={faSignOut} className="mx-2"/> Sair</Nav.Link>
                </Nav>

            </Nav>
        </Navbar>

    );
}

export default MenuAdmin;