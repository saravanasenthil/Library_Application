import React from "react";
import "../Style/HomePage.css";
import { Navbar } from "../Navbar/Navbar";
const HomePage: React.FC = () => {
  return (
    <>
      <Navbar isUsersignIn={false} isAdmin={false} />
      <div className="homepage-container">
        <div className="homepage-content">
          <h1>Welcome to Temble Of Studies</h1>
          <p>
            “The contents of a library can take you further than your own
            imagination could begin to imagine. To open a book is to open your
            mind.”{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
