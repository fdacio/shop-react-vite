import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";

const MenuAdmin = () => {
    const auth = useAuth();

    function handlerLogout() {
        auth.SignOut();
    }

    return (
        <Navbar bg="light" data-bs-theme="light" className="h-100 align-items-start">
            <Nav className="flex-column">
                <Link to="/" className="nav-link">Início</Link>
                <Link to="/products" className="nav-link">Produtos</Link>
                <Link to="/cutomers" className="nav-link">Clientes</Link>
                <Link to="/orders" className="nav-link">Pedidos</Link>
                <Link to="/user" className="nav-link">Usuários</Link>
                {(auth.signed) &&
                <Nav className="flex-column border-top">
                    <Nav.Link href="#" className="fw-bold text-small">{auth.user?.nome}</Nav.Link>
                    <Nav.Link href="#" className="fw-bold text-small">{auth.user?.rules?.map((r) => { return r.nome + ' '})}</Nav.Link>
                    <Nav.Link href="#" onClick={handlerLogout} className="">Sair</Nav.Link>
                </Nav>
                }

            </Nav>
        </Navbar>

    );
}

export default MenuAdmin;