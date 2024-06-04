import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "../Style/UserDashboard.css";
import { Navbar } from "../Navbar/Navbar";
import axios from "axios";

type Book = {
  ID: number;
  bookname: string;
};

const UserDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:9006/user/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Navbar isUsersignIn={true} isAdmin={false} />
      <div className="dashboard-container">
        <h2>Books Dashboard</h2>
        <h2>
          “Education is the most powerful weapon you can use to change the
          world.”
        </h2>
        <div className="book-cards">
          {books.map((book) => (
            <BookCard key={book.ID} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
