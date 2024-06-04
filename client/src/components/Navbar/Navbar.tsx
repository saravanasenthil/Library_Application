import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import navbarIcon from "../../assets/download__1_-removebg-preview.png";
import useAuth from "./logout";


interface NavbarProps {
  isUsersignIn: boolean;
  isAdmin: boolean;
}


export const Navbar: React.FC<NavbarProps> = ({ isUsersignIn, isAdmin }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleUserClick = () => {
    navigate("/signin");
  };

  const handleUserDashboard = () => {
    navigate("/my-books");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        
          <img src={navbarIcon} width="70" height="20" alt="sf" />
        
      </div>
      <div className="navbar-buttons">
        <div className="navbar-buttons">
          {isUsersignIn ? (
            <>
              <Link to={isAdmin ? "/admin-dashboard" : "/user-dashboard"}>
                <button className="navbar-button" onClick={handleUserDashboard}>
                  <Link to="/my-books">My Books</Link>
                </button>
              </Link>
              
                <button className="navbar-button" onClick={logout}>Logout</button>
              
            </>
          ) : (
            <button className="navbar-button" onClick={handleUserClick}>
              Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
