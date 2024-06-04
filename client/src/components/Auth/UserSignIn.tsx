import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/UserSignIn.css";
import { Navbar } from "../Navbar/Navbar";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
}

const UserSignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9006/user/signin", {
        username,
        password,
      });

      const data = response.data;
      const token = data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode<DecodedToken>(token);
      const role = decodedToken.role;
       
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
      
    } catch (error) {
      console.error("Error during signin:", error);
    }
    alert('signin succeussfull')
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <Navbar isUsersignIn={false} isAdmin={false} />
      <div className="signin-container">
        <h2>Sign-In</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter the name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignIn}
          >
            Submit
          </button>
        </form>

        <p>
          Don't have an account?
          <button onClick={handleSignUpClick} className="link-button">
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
};

export default UserSignIn;
