import { Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useLocation } from 'react-router-dom';

const Menu =  () => {

    const location = useLocation();  
    const isHome = location.pathname === "/";
    const auth = useAuth();

    function handleLogout() {
        auth.SignOut();
    }

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" sticky="top">

                <Navbar.Brand href="#"></Navbar.Brand>
                <Nav>
                    <Nav.Link href="/">Início</Nav.Link>
                    {(isHome) &&
                        <Nav.Link href="#">Filtro</Nav.Link>
                    }
                </Nav>
                {(auth.signed) &&
                    <>
                        <Nav>
                            <Nav.Link href="/">Meu Pedidos</Nav.Link>
                            <Nav.Link href="/">Perfil</Nav.Link>

                            <Nav.Link href="/products">Producto</Nav.Link>
                            <Nav.Link href="/products">Pedidos</Nav.Link>
                            <Nav.Link href="/users">Usuários</Nav.Link>
                        </Nav>
                    </>
                }
                {(isHome) &&
                    <Navbar.Collapse className='justify-content-end'>
                        <Nav>
                            {(!auth.signed)
                                ?
                                <Nav.Link href="/login">Login</Nav.Link>
                                :
                                <>
                                    <Nav.Link href="#" className='fw-bold'>{auth.user?.nome}</Nav.Link>
                                    <Nav.Link href="#" onClick={handleLogout}>Sair</Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                }

            </Navbar>
        </>
    )
}

export default Menu;