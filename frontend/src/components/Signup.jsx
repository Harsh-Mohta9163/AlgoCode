import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signup(username, email, password1, password2);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        // Collect all error messages from the response
        const errors = [];
        for (const key in err.response.data) {
          errors.push(`${key}: ${err.response.data[key].join(" ")}`);
        }
        setError(errors.join(" | "));
      } else {
        setError("Signup failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
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
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        value={password1}
        onChange={e => setPassword1(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full mb-4 p-2 border rounded"
        value={password2}
        onChange={e => setPassword2(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">Sign Up</button>
      <div className="mt-4 text-center">
        <a href="/login" className="text-blue-600">Already have an account? Login</a>
      </div>
    </form>
  );
};

export default Signup;