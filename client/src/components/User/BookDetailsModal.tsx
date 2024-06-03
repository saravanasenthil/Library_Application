import React, { useState } from "react";
import Modal from "react-modal";
import "../Style/BookDetailModal.css";
import axios from "axios";

interface BookDetailsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  book: {
    ID: number;
    bookname: string;
    
  };
  onBorrow: () => void;
  
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  isOpen,
  onRequestClose,
  book,
  onBorrow,
  
}) => {
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [username, setusername] = useState("");
  const [bookname, setbookname] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        "http://localhost:9002/user/borrow",{
        username, bookname, startdate, enddate
      },
       {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response)
      console.log("Data posted successfully");
    } catch (error) {
      console.error("Error borrow book:", error);
    }
    onBorrow();
    setIsBorrowed(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Book Details"
      className="book-details-modal"
      overlayClassName="book-details-overlay"
    >
      <h2>{book.bookname}</h2>

      
      <form onSubmit={handleSubmit} >
      <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter the username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
      <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter the bookname"
            value={bookname}
            onChange={(e) => setbookname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Start date"
            value={startdate}
            onChange={(e) => setstartdate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter End date"
            className="form-control"
            value={enddate}
            onChange={(e) => setenddate(e.target.value)}
          />
        </div>
      </form>
      <div className="form-group"></div>
      <div className="button-container">
        {isBorrowed ? (
          <p className="success-message">Borrow successful!</p>
        ) : (
          <>
            <button
              type="submit"
              className="borrow-button"
              
            >
              Borrow
            </button>
            <button className="close-button" onClick={onRequestClose}>
              Close
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default BookDetailsModal;
