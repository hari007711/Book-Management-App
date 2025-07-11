import React, { useState } from "react";
import "./Header.scss";
import bookIcon from "../../assets/book.png";
import UserIcon from "../../assets/userImg.png";
import AddBook from "../AddBook/AddBook";
import { useLocation } from "react-router-dom";

export interface BookStatus {
  text: string;
  value: number;
}

interface HeaderProps {
  searchBook: string;
  setSearchBook: React.Dispatch<React.SetStateAction<string>>;
  openAddBook: boolean;
  setOpenAddBook: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BookList {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  coverImage: string;
  isRead: boolean;
  isFavorite: boolean;
  createdAt: string;
  status: string;
  description: string;
  tags: string[];
  previewImage: string;
  readingProgress?: {
    currentPage: number;
    totalPages: number;
    updatedAt: string;
  };
}

const Header: React.FC<HeaderProps> = ({
  searchBook,
  setSearchBook,
  setOpenAddBook,
  openAddBook,
}) => {
  const location = useLocation();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBook(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="common-flex">
        <div className="head-div">
          <img src={bookIcon} alt="Book Icon" />
          <h2>Bookshelf Manager</h2>
        </div>
        {location.pathname === "/" && (
          <div className="res-header-bar">
            <div className="header-input">
              <input
                placeholder="Search"
                type="text"
                value={searchBook}
                onChange={handleSearchChange}
              />
            </div>
            <div className="book-btn">
              <button title="Add New Book" onClick={() => setOpenAddBook(true)}>
                Add New Book
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
