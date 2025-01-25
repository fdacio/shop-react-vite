import { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../../components/Header";
import MenuAdmin from "../../components/Menu/menuAdmin";


export default function RootAdminLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
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
