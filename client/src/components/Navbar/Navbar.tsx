import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import navbarIcon from "../../assets/download__1_-removebg-preview.png";

interface NavbarProps {
  isUsersignIn: boolean;
  isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isUsersignIn, isAdmin }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/signin");
  };

  const handleUserDashboard = () => {
    navigate("/my-books");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={navbarIcon} width="70" height="20" alt="sf" />
        </Link>
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
              <Link to="/">
                <button className="navbar-button">Logout</button>
              </Link>
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
