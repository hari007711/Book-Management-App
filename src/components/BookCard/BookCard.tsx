import React, { useEffect, useState } from "react";
import type { BookList } from "../Header/Header";
import "./BookCard.scss";
import bookImg from "../../assets/Book1.jfif";
import redImg from "../../assets/circle.png";
import greenImg from "../../assets/greenCircle.png";
import orangeImg from "../../assets/orangeCircle.png";
import favBefore from "../../assets/favBefore.png";
import favAfter from "../../assets/favAfter.png";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  bookData: BookList[];
}

const BookCard: React.FC<BookCardProps> = ({ bookData }) => {
  const navigate = useNavigate();
  const getStatusImage = (status: string) => {
    switch (status) {
      case "toread":
        return redImg;
      case "reading":
        return orangeImg;
      case "finished":
        return greenImg;
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "toread":
        return "To Read";
      case "reading":
        return "Reading";
      case "finished":
        return "Finished";
      default:
        return "";
    }
  };

  const getFavImage = (status: boolean) => {
    switch (status) {
      case true:
        return favAfter;
      case false:
        return favBefore;
      default:
        return "";
    }
  };

  const toggleFavorite = (bookId: string) => {
    const updatedBooks = bookData.map((book) =>
      book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
    );
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    window.location.reload();
  };

  return (
    <div className="main-bookCard">
      {bookData.map((book, index) => (
        <div key={index} className="bookCard">
          <div
            className="img-div"
            onClick={() => navigate(`/about/${book.id}`)}
          >
            {book.previewImage ? (
              <img src={book.previewImage} alt="Preview" />
            ) : (
              <img src={bookImg} alt="" />
            )}
          </div>
          <h6 className="book-title" title={book.title}>
            {book.title}
          </h6>
          <p>{book.author}</p>
          <div className="book-genre">{book.genre}</div>
          <div className="status-indicator">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={getStatusImage(book.status)}
                alt={book.status}
                style={{ width: "15px", height: "15px", marginRight: "5px", marginTop:"3px" }}
              />
              <p>
                {getStatusText(book.status) }
              </p>
            </div>
            <img
              src={getFavImage(book.isFavorite)}
              alt=""
              className="favIcon-img"
              onClick={() => toggleFavorite(book.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCard;
