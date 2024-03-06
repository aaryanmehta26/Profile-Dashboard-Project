import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const {userInfo} = userLogin;

  useEffect(() => {
    if(userInfo) {
      navigate('/myposts') 
    }
  }, [navigate, userInfo])


  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to your personalize dashboard!</h1>
              <p className="subtitle">One safe place for all your things!</p>
            </div>
          </div>
          <div className="buttonContainer">
            <a href="/login">
              <Button size="lg" className="landingbutton">
                Login
              </Button>
            </a>
            <a href="/register">
            <Button size="lg" className="landingbutton">
                Signup
              </Button>
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
