import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        width: "100%",
        bottom: 0,
        position: "relative",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">Aaryan Mehta</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
