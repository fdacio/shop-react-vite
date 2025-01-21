import { Col, Container, Image, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import shopLogo from '../../assets/logo-header.svg';
import SearchProductHome from '../SearchProductHome';
import './style.css';

const Header = ({ callBack } : { callBack? : () => {}}) => {

    const location = useLocation();  
    const isHome = location.pathname === "/";

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
                    <Col md={4} className='d-flex justify-content-end align-items-center'>
                        {(isHome && callBack) &&
                            <SearchProductHome callBack={callBack}/>
                        }
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;