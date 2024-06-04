import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../Style/UserBookRelation.css";
import axios from "axios";

interface UserBookRelation {
  UBID: number;
  username: {
    ID: number;
    username: string;
  };
  bookname: {
    ID: number;
    bookname: string;
  };
  enddate: string;
  startdate: string;
}

interface UserBookRelationCardProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const UserBookRelationCard: React.FC<UserBookRelationCardProps> = ({
  onRequestClose,
}) => {
  const [relations, setRelations] = useState<UserBookRelation[]>([]);
  const [UBID, setUBID] = useState<UserBookRelation[]>([]);
  const [username, setusernameID] = useState<UserBookRelation[]>([]);
  const [bookname, setbooknameID] = useState<UserBookRelation[]>([]);
  const [enddate, setenddate] = useState<UserBookRelation[]>([]);
  const [startdate, setstartdate] = useState<UserBookRelation[]>([]);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:9006/admin/userbooks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      setUBID(response.data);
      setusernameID(response.data);
      setbooknameID(response.data);
      setenddate(response.data);
      setstartdate(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteRelation = async (UBID: any) => {
    axios;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9006/admin/deleteUB/${UBID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUBID(UBID.filter((UBID: any) => UBID !== UBID));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  const handleUpdateDates = async (UBID: number, newStartDate: string, newEndDate: string) => {
    try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:9006/admin/updateUB/${UBID}`, { startDate: newStartDate, endDate: newEndDate }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const updatedRelations = [...relations];
        const index = updatedRelations.findIndex(relation => relation.UBID === UBID);
        if (index !== -1) {
            updatedRelations[index] = { ...updatedRelations[index], startdate: newStartDate, enddate: newEndDate };
            setRelations(updatedRelations);
        }
    } catch (error) {
        console.error('Error updating relation:', error);
    }
};

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      contentLabel="User-Book Relation"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>User-Book Relations</h2>
      <table className="relation-table">
        <thead>
          <tr>
            <th>UBID</th>
            <th>Username</th>
            <th>Bookname</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {UBID.map((UBID) => (
            <tr
              key={`${UBID.UBID},
            // ${username},${bookname},${startdate},${enddate}`}
            >
              <td>{UBID.UBID}</td>
              <td>{UBID.username.username}</td>
              <td>{UBID.bookname.bookname}</td>
              <td>{UBID.startdate}</td>
              <td>{UBID.enddate}</td>
              <td>
                
                <button className="delete-btn" onClick={() => handleDeleteRelation(UBID.UBID)}>Delete</button>
                
                                <button className="update-btn" onClick={() => {
                                    const newStartDate = prompt('Enter new start date:', UBID.startdate);
                                    const newEndDate = prompt('Enter new end date:', UBID.enddate);
                                    if (newStartDate && newEndDate) {
                                        handleUpdateDates(UBID.UBID, newStartDate, newEndDate);
                                    }
                                }}>Update</button>
              </td>
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

export default UserBookRelationCard;
