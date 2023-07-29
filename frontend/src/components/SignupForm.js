import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import zxcvbn from "zxcvbn";
import { GoogleLogin } from '@react-oauth/google';

function SignupForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const [passwordStrength, setPasswordStrength] = React.useState(0);
    const [serverError, setServerError] = React.useState("");
    const [googleUser, setGoogleUser] = React.useState(null);

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 1:
                return "Weak";
            case 2:
                return "Good";
            case 3:
                return "Strong";
            default:
                return "";            
        }
    };

    const onSubmit = async (data) => {
    setServerError("");
        try {
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status !== 200) {
            throw new Error(await response.text());
        }

        alert("You have signed up successfully!");
        reset();
        } catch (error) {
        setServerError(error.message);
        }
    };

    const onPasswordChange = (event) => {
        const password = event.target.value;
        const { score } = zxcvbn(password);
        setPasswordStrength(score);
    };

    const onGoogleSuccess = (response) => {
        const profile = response.profileObj;
        setGoogleUser(profile);
        alert(`Welcome ${profile.name}!`);
    };

    const onGoogleFailure = (response) => {
        alert(`Google sign-in failed: ${response.error}`);
    };

    return (

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Sign Up</h1>
                            {/* Display the server-side error */}
                            {serverError && (
                            <Alert variant="danger" className="text-center">
                                {serverError}
                            </Alert>
                            )}

                            {/* Display the user profile if signed in with Google */}
                            {googleUser && (
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                <img
                                    src={googleUser.imageUrl}
                                    alt={googleUser.name}
                                    className="rounded-circle"
                                    width="100"
                                />
                                <h5 className="card-title mt-3">{googleUser.name}</h5>
                                <p className="card-text">{googleUser.email}</p>
                                </div>
                            </div>
                            )}

                            {/* The signup form with react-hook-form */}
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        {...register("username", {
                                            required: "Username is required",
                                            minLength: {
                                                value: 2,
                                                message: "Username must be at least 2 characters",
                                            },  
                                            maxLength: {
                                                value: 20,
                                                message: "Username must not exceed 20 characters",
                                            },
                                        })}
                                    />
                                    {errors.username && (
                                        <Form.Text className="text-danger">
                                            {errors.username.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <Form.Text className="text-danger">
                                            {errors.email.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                        onChange={onPasswordChange}
                                    />
                                    {errors.password && (
                                        <Form.Text className="text-danger">
                                            {errors.password.message}
                                        </Form.Text>
                                    )}
                                    <div className="progress mt-3 mb-3">
                                        <div
                                            className={`progress-bar ${
                                                passwordStrength === 0
                                                    ? ""
                                                    : passwordStrength === 1
                                                    ? "bg-danger"
                                                    : passwordStrength === 2
                                                    ? "bg-warning"
                                                    : passwordStrength === 3
                                                    ? "bg-info"
                                                    : "bg-success"
                                            }`}
                                            style={{ width: `${passwordStrength * 25}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-center mt-2">
                                        <strong>{getPasswordStrengthText()}</strong>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="confirmPassword" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        {...register("confirmPassword", {
                                            required: "Confirm password is required",
                                            validate: (value) =>
                                                value === watch("password") || "Passwords do not match",
                                        })}
                                    />
                                    {errors.confirmPassword && (
                                        <Form.Text className="text-danger">
                                            {errors.confirmPassword.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Button variant="primary" type="submit" block className="mb-3">
                                    Sign Up
                                </Button>

                                {/* The sign in with Google button */}
                                <div className="text-center">
                                    <GoogleLogin
                                        clientId="195441218187-i7r5ouroutjtbf6js7ks8sirjans9qfr.apps.googleusercontent.com"
                                        buttonText="Sign in with Google"
                                        onSuccess={onGoogleSuccess}
                                        onFailure={onGoogleFailure}
                                        cookiePolicy={"single_host_origin"}
                                        className="mt-3"
                                    />
                                </div>
                            </Form>
                        </div>  
                    </div>      
                </div>
            </div>
        </div>
    );
  }
  
export default SignupForm;