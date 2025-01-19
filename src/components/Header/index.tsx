import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import shopLogo from '../../assets/logo-header.svg';
import './style.css';

const Header: React.FC = () => {

    return (
        <header>
            <Container fluid>
                <Row>
                    <Col md={4} className='d-flex align-items-center justify-content-begin'>
                        <Link to="/">
                            <Image src={shopLogo} className="logo" alt="Shop logo" />
                        </Link>
                    </Col>
                    <Col md={4} className='d-flex justify-content-center align-items-center'>
                        <h1 className='title'>Shop App</h1>
                    </Col>
                    <Col md={4} className='d-flex align-items-end justify-content-end'>
                        <Form>
                            <InputGroup>
                                <Form.Control
                                    type="search"
                                    placeholder="Pesquisa de produtos"
                                    aria-label="Search"
                                />
                                <Button variant="light">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;