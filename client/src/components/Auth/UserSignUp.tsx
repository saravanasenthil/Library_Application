import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/UserSignUp.css";
import { Navbar } from "../Navbar/Navbar";

import axios from 'axios';


const UserSignUp: React.FC = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();
  ;

  const handleSignUpClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9002/user/signup', { username, password });
      console.log('user register success',response.data)
      navigate("/signin")

      
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <>
      <Navbar isUsersignIn={false} isAdmin={false} />
      <div className="signup-container">
        <h2>Sign-Up</h2>
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
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignUpClick}
          >
            Submit
          </button>
          {/* {error && <p className="error">{error}</p>} */}
        </form>
        <p>
          Are you Already have an account?
          <button onClick={handleSignIn} className="link-button">
            Sign In
          </button>
        </p>
      </div>
    </>
  );
};

export default UserSignUp;
