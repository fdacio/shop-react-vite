import { ReactNode, useEffect } from "react";
import { Col, Nav, Navbar, Row } from "react-bootstrap";
import Header from "../../components/Header";
import MenuAdmin from "../../components/Menu/menuAdmin";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { ApiRule } from "../../context/ApiProvider/Auth/types";


export default function RootAdminLayout({ children }: { children: ReactNode }) {

    const auth = useAuth();
    const navigate = useNavigate();
    
    function handlerLogout() {
        auth.SignOut();
        navigate("/");
    }

    useEffect(() => {
        if (!auth.signed) {
            navigate("/");
        }
    }, [auth.signed, navigate]);

    useEffect(() => {
        if (!auth.user?.rules?.some((rule: ApiRule) => rule.nome === "Admin" || rule.nome === "Operator")) {
            navigate("/");
        }
    }, [auth.user, navigate]);
    

    return (
        <>
            <Header />
            <Navbar bg="light" data-bs-theme="light" sticky="top" className="fixed-top">
                <Navbar.Brand href="#" className="p-2">
                    Sistema Administrativo
                </Navbar.Brand>
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        {(auth.signed) &&
                            <>
                            <Nav.Link href="#" className='fw-bold border-end'>{auth.user?.nome}</Nav.Link>
                            <Link to="/my-profile" className='nav-link border-end'>Perfil</Link>
                            <Nav.Link href="#" onClick={handlerLogout}>Sair</Nav.Link>
                        </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Row>
                <Col md="2" sm={0}>
                    <MenuAdmin />
                </Col>
                <Col md="10" sm={12}>
                    <div className="container-layout">
                        {children}
                    </div>
                </Col>
            </Row>
        </>
    );
}

