import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import shopLogo from '../../assets/logo-header.svg';
import { useAuth } from '../../context/AuthProvider/useAuth';
import './style.css';

const Header: React.FC = () => {
    const auth = useAuth();

    function handleLogout() {
        auth.SignOut();
    }

    return (
        <header>
            <Container fluid>
                <Row>
                    <Col md={2} className='d-flex align-items-center justify-content-begin'>
                        <Link to="/">
                            <img src={shopLogo} className="logo" alt="Shop logo" />
                        </Link>
                    </Col>
                    <Col md={8} className='d-flex justify-content-center align-items-center'>
                        <h1 className='title'>Shop App</h1>
                    </Col>
                    <Col md={2} className='d-flex align-items-end justify-content-end'>
                        {(auth.signed) ?
                            <div className='d-flex gap-2 align-items-end'>
                                <div className="username">{auth.user?.nome}</div>

                                <Button className='btn-sm' variant="primary" onClick={handleLogout}>Sair</Button>

                            </div>

                            :

                            <nav className='nav-login '>
                                <Link to="/login" >Login</Link>
                            </nav>

                        }
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;