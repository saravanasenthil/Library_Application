import React, { useState } from "react";
import BookDetailsModal from "./BookDetailsModal";

import "../Style/BookCard.css";

type Book = {
  ID: number;
  bookname: string;
};

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBorrow = () => {
    console.log(`Borrowed ${book.bookname}`);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="book-card" onClick={handleOpenModal}>
        <h3>{book.bookname}</h3>
      </div>
      <BookDetailsModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        book={book}
        onBorrow={handleBorrow}
      />
    </>
  );
};

export default BookCard;
