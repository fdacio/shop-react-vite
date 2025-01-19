import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../../context/AuthProvider/useAuth';

const Menu: React.FC = () => {

    const auth = useAuth();

    function handleLogout() {
        auth.SignOut();
    }


    function renderMenu() {

        const rules = auth.user?.rules;

        const menu = <></>;

        rules?.map((rule) => {
            console.log(rule);
            
        });

        return menu;
    }

    renderMenu();

    return (
        <>
            <Navbar bg="light" data-bs-theme="light">

                <Navbar.Brand href="#"></Navbar.Brand>
                <Nav className="me-auto broder">
                    <Nav.Link href="/">Home</Nav.Link>

                    <Nav.Link href="/">My Orders</Nav.Link>
                    <Nav.Link href="/">Profile</Nav.Link>

                    <Nav.Link href="/products">Products</Nav.Link>
                    <Nav.Link href="/products">Orders</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>

                </Nav>

                <Nav>
                    { (!auth.signed) ?
                    <Nav.Link href="/login">Login</Nav.Link>
                    :<>
                    <Nav.Link href="#">{auth.user?.nome}</Nav.Link>
                    <Nav.Link href="" onClick={handleLogout}>Sair</Nav.Link>
                    </>
                    }
                </Nav>

            </Navbar>
        </>
    )
}

export default Menu;