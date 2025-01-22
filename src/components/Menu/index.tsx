import { Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {

    const location = useLocation();
    const isRouteHome = location.pathname === "/";
    const isRouteLogin = location.pathname === "/login";
    const auth = useAuth();

    function handleLogout() {
        auth.SignOut();
    }

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" sticky="top" className="fixed-top">

                <Navbar.Brand href="#"></Navbar.Brand>
                <Nav>
                    <Link to="/" className='nav-link'>Início</Link>
                    {(isRouteHome) &&
                        <Link to="/" className='nav-link'>Filtro</Link>
                    }
                </Nav>
                {(auth.signed) &&
                    <>
                        <Nav>
                            <Link to="/my-orders" className='nav-link'>Meus Pedidos</Link>
                            <Link to="/my-profile" className='nav-link border-end'>Perfil</Link>
                            <Link to="/products" className='nav-link'>Produtos</Link>
                            <Link to="/orders" className='nav-link'>Pedidos</Link>
                            <Link to="/custormes" className='nav-link'>Clientes</Link>
                            <Link to="/users" className='nav-link'>Usuários</Link>
                        </Nav>
                    </>
                }

                <Navbar.Collapse className='justify-content-end'>
                    <Nav>

                        {(!(auth.signed || isRouteLogin)) &&
                            <Link to="/login" className='nav-link'>Login</Link>
                        }
                        {(auth.signed) &&
                            <>
                                <Nav.Link href="#" className='fw-bold border-end'>{auth.user?.nome}</Nav.Link>
                                <Nav.Link href="#" onClick={handleLogout}>Sair</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>


            </Navbar>
        </>
    )
}

export default Menu;