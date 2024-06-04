import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../Style/UsersTable.css";
import axiosInstance from "../Api/ApiService";

interface AllUsersCardProps {
  onRequestClose: () => void;
}

interface User {
  ID: number;
  username: string;
}

const AllUsersCard: React.FC<AllUsersCardProps> = ({ onRequestClose }) => {
  const [username, setusername] = useState<User[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/admin/viewUser")
      .then((response) => {
        setusername(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      contentLabel="All Users"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>All Signined Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {username.map((user) => (
            <tr key={user.ID}>
              <td>{user.ID}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRequestClose} className="close-button">
        Close
      </button>
    </Modal>
  );
};

export default AllUsersCard;
