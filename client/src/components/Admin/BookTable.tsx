import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../Style/BookTable.css";
import axios from "axios";

interface Book {
  ID: number;
  bookname: string;
}

interface AllBooksCardProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AllBooksCard: React.FC<AllBooksCardProps> = ({ onRequestClose }) => {
  const [newBookName, setNewBookName] = useState("");
  const [book, setBook] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:9002/admin/show", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return setBook(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = () => {
    const newBook = {
      bookname: newBookName,
    };
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:9002/admin/createBook", newBook, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBook([...book, response.data]);
        setNewBookName("");
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  const handleDeleteBook = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9002/admin/deleteBook/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBook(book.filter((book) => book.ID !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      contentLabel="All Books"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>All Books</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {book.map((book) => (
            <tr key={book.ID}>
              <td>{book.ID}</td>
              <td>{book.bookname}</td>

              <td>
                <button
                  className="delete"
                  onClick={() => handleDeleteBook(book.ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-book-form">
        <input
          type="text"
          placeholder="Book Name"
          value={newBookName}
          onChange={(e) => setNewBookName(e.target.value)}
        />

        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <button onClick={onRequestClose} className="close-button">
        Close
      </button>
    </Modal>
  );
};

export default AllBooksCard;
