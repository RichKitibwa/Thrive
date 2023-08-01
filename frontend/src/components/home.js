import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
    return (
      <>
        <div className="home-container">
            <Navbar fixed="top">
                <Navbar.Brand href="#home" className="navbar-brand">Thrive</Navbar.Brand>
                <Nav className="ms-auto nav-link-container">
                    <Nav.Link href="/signup">SignUp</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar>
  
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 text-center container-center">
                        <h1 className="lead-text">Manage all your tasks <br/> effectively and <br/> Thrive at life.</h1>
                        <div className="text-center mt-4">
                            <Link to={"/signup"}>
                                <Button variant="primary" size="lg">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="image-container">
                            <img src={"/images/thrive-homepage.jpg"} alt="thrive-home" />
                        </div>
                    </div>
                </div>
            </div>
        </div>    
      </>
    );
}
  
export default Home;
