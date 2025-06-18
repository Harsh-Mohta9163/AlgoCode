import React, { useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const { socialLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      await socialLogin("google", credentialResponse.credential);
      navigate("/"); // Use React Router instead of window.location
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={(error) => {
          console.error("Google login failed:", error);
        }}
        useOneTap
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;