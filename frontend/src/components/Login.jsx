import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.non_field_errors) {
        setError(err.response.data.non_field_errors.join(" "));
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <input
        type="text"
        placeholder="Username"
        className="w-full mb-4 p-2 border rounded"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">Login</button>
      <div className="mt-4 text-center">
        <a href="/signup" className="text-blue-600">Don't have an account? Sign up</a>
      </div>
      <div className="mt-4 text-center">
        <GoogleLoginButton />
      </div>
    </form>
  );
};

export default Login;