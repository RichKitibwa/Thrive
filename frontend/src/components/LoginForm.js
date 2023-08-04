import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function LoginForm() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/auth/login", {
                username,
                password,
            });

            if (response.status !== 200) {
                throw new Error("Failed to log in.");
            }

            const token = response.data.token;

            localStorage.setItem("token", token);
            console.log(response.data);

            navigate("/dashboard");

        } catch (error) {
            console.log(error.response);

            setServerError(error.message);
        }    
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">   
                    <div className="card mt-4">   
                        <div className="card-body">
                            <h1 className="text-center mb-4">Login</h1>
                            {serverError && (
                            <Alert variant="danger" className="text-center">
                                {serverError}
                            </Alert>
                            )}
                            <Form onSubmit={onSubmit}>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required  
                                    />
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
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
