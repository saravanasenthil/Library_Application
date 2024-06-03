import React, { useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import AllUsersCard from "../Admin/UsersTable";
import AllBooksCard from "../Admin/BookTable";
import UserBookRelationCard from "../Admin/UserBookRelationTable";
import "../Style/AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (card: string) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div>
      <Navbar isUsersignIn={true} isAdmin={false} />
      <div className="admin-dashboard-container">
        <div className="card-1" onClick={() => handleCardClick("allUsers")}>
          <h3>Manage Users</h3>
        </div>
        <div className="card-2" onClick={() => handleCardClick("allBooks")}>
          <h3>Manage Books</h3>
        </div>
        <div
          className="card-3"
          onClick={() => handleCardClick("userBookRelation")}
        >
          <h3>Manage User & Book</h3>
        </div>
      </div>

      {selectedCard === "allUsers" && (
        <AllUsersCard onRequestClose={handleCloseModal} />
      )}
      {selectedCard === "allBooks" && (
        <AllBooksCard onRequestClose={handleCloseModal} isOpen={false} />
      )}
      {selectedCard === "userBookRelation" && (
        <UserBookRelationCard
          onRequestClose={handleCloseModal}
          isOpen={false}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
