import React from "react";
import { Form, Button } from "react-bootstrap";

function LoginForm() {
    const onSubmit = async (event) => {
        event.preventDefault();
        
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">   
                    <div className="card mt-4">   
                        <div className="card-body">
                            <h1 className="text-center mb-4">Login</h1>
                            <Form onSubmit={onSubmit}>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                    />
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" block className="mb-3">
                                    Login
                                </Button>
                             </Form>
                        </div>  
                    </div>       
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
