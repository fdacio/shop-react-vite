import { Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../../context/AuthProvider/useAuth';

const Menu = ({ home }: { home?: boolean }) => {

    const auth = useAuth();

    function handleLogout() {
        auth.SignOut();
    }

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" sticky="top">

                <Navbar.Brand href="#"></Navbar.Brand>
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    {(home) &&
                        <Nav.Link href="#">Filter</Nav.Link>
                    }
                </Nav>
                {(auth.signed) &&
                    <>
                        <Nav>
                            <Nav.Link href="/">My Orders</Nav.Link>
                            <Nav.Link href="/">Profile</Nav.Link>

                            <Nav.Link href="/products">Products</Nav.Link>
                            <Nav.Link href="/products">Orders</Nav.Link>
                            <Nav.Link href="/users">Users</Nav.Link>
                        </Nav>
                    </>
                }
                {(home) &&
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