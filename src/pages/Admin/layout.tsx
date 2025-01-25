import { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../../components/Header";
import MenuAdmin from "../../components/Menu/menuAdmin";


export default function RootAdminLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <Row>
                <Col md="2">
                    <MenuAdmin />
                </Col>
                <Col md="10">
                    <div className="container-layout">
                        {children}
                    </div>
                </Col>
            </Row>
        </>
    );
}
