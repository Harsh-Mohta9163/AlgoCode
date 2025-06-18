import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:8000/auth/social/login/", {
        provider: "google",
        access_token: credentialResponse.credential,
      });

      const token = res.data.key;
      localStorage.setItem("token", token);

      // Optional: get user info
      const userRes = await axios.get("http://localhost:8000/auth/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      console.log("Logged in user:", userRes.data);
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed", err.response?.data || err);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Google login failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;