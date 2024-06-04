import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/mybooks.css";
import { jwtDecode } from "jwt-decode";

interface User {
  ID: number;
  username: string;
  role: string;
}
interface Books {
  ID: number;
  bookname: string;
}

interface MyBooks {
  UBID: number;
  username: User;
  bookname: Books;
  enddate: string;
  startdate: string;
}

interface DecodedToken {
  id: number;
  role: string;
}

const MyBooks  = () => {
  const [UBID, setUBID] = useState<MyBooks[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let decodedToken: DecodedToken | null = null;
  if (token) {
    decodedToken = jwtDecode<DecodedToken>(token);
  }

  const borrowedBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:9006/user/borrowed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (decodedToken) {
        const filteredBooks = response.data.filter(
          (book: MyBooks) => book.username.ID === decodedToken.id
        );
      console.log(filteredBooks);

      setUBID(filteredBooks);
      
    } }catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  useEffect(() => {
    borrowedBooks();
  }, []);

  const handleUserDashboard = () => {
    navigate("/user-dashboard");
  };

  return (
    <div>
      <Navbar isUsersignIn={true} isAdmin={false} />
      <div className="container">
        <h2>User-Borrowed-books</h2>
        <table className="borrow-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Bookname</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {UBID.map((UBID) => (
              <tr key={UBID.UBID}>
                <td>{UBID.username.username}</td>
                <td>{UBID.bookname.bookname}</td>
                <td>{UBID.startdate}</td>
                <td>{UBID.enddate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleUserDashboard} className="close-button">
          Back to User dashboard
        </button>
      </div>
    </div>
  );
};

export default MyBooks;
