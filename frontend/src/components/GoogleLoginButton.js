import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function GoogleLoginButton () {
    const navigate = useNavigate();

    const onGoogleSuccess = async (response) => {
        console.log(response);
        const idToken = response.credential;
        console.log('ID Token:', idToken);
        try {
            const backendResponse = await axios.post("/api/auth/google-signup", {
                googleToken: idToken,
            });

            if(backendResponse.status !== 200) {
                throw new Error(backendResponse.data.message || "Failed to sign in with Google.");
            }

            const token = backendResponse.data.token;
            localStorage.setItem("token", token);

            console.log(backendResponse.data);
            navigate("/dashboard");
        } catch (error){
            console.error("Google sign-in error:", error);
        }
    };

    const onGoogleFailure = (response) => {
        console.error("Google sign-in failed:", response.error);
    };

    return (
        <div className="google-login">
            <GoogleLogin
                clientId={process.env.GOOGLE_CLIENT_ID}
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFailure}
                shape="pill"
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
}

export default GoogleLoginButton;
