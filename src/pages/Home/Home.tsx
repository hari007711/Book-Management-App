import React, { useEffect, useState } from "react";
import "../../components/Header/Header.scss";
import InfoCard from "../../components/InfoCard/InfoCard";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import BookCard from "../../components/BookCard/BookCard";
import AddBook from "../../components/AddBook/AddBook";
import About from "../About/About";
import "./Home.scss";
// import {  useNavigate, useParams } from "react-router-dom";

export interface BookStatus {
  text: string;
  value: number;
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

interface HomeProps {
  searchBook: string;
  openAddBook: boolean;
  setOpenAddBook: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({
  searchBook,
  setOpenAddBook,
  openAddBook,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [bookData, setBookData] = useState<BookList[]>([]);
  const [saved, setSaved] = useState<boolean>(false);
  // const [viewAboutBook, setViewAboutBook] = useState<boolean>(false);
  const uniqueBooksListData: BookList[] = Array.from(
    new Map(bookData.map((book) => [book.id, book])).values()
  );
  const [activeButton, setActiveButton] = useState<string>("All");
  // const { id } = useParams();

  const bookStatusData: BookStatus[] = [
    { text: "Total Books", value: uniqueBooksListData.length },
    {
      text: "To Read",
      value: uniqueBooksListData.filter((book) => book.status == "toread")
        .length,
    },
    {
      text: "Reading",
      value: uniqueBooksListData.filter((book) => book.status == "reading")
        .length,
    },
    {
      text: "Completed",
      value: uniqueBooksListData.filter((book) => book.status == "finished")
        .length,
    },
    {
      text: "Favourites",
      value: uniqueBooksListData.filter((book) => book.isFavorite).length,
    },
  ];
  const [selectGenre, setSelectGenre] = useState<string>("");
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  const buttonStyle = (buttonName: string) => {
    return {
      backgroundColor: activeButton === buttonName ? "#2b83d1" : "",
      color: activeButton === buttonName ? "white" : "",
    };
  };
  console.log(isChecked, "isChecked");

  // const handleToggle = () => {
  //   setIsChecked((prev) => !prev);
  // };

  const getFilteredBooks = () => {
    let filteredBooks = uniqueBooksListData.filter((book) =>
      [book.title, book.author, book.genre]
        .join(" ")
        .toLowerCase()
        .includes(searchBook.toLowerCase())
    );
    if (activeButton === "To-read") {
      filteredBooks = filteredBooks.filter((book) => book.status === "toread");
    } else if (activeButton === "Reading") {
      filteredBooks = filteredBooks.filter((book) => book.status === "reading");
    } else if (activeButton === "Finished") {
      filteredBooks = filteredBooks.filter(
        (book) => book.status === "finished"
      );
    }

    if (selectGenre === "fiction") {
      filteredBooks = filteredBooks.filter((book) => book.genre === "Fiction");
    } else if (selectGenre === "action") {
      filteredBooks = filteredBooks.filter((book) => book.genre === "Action");
    } else if (selectGenre === "scifi") {
      filteredBooks = filteredBooks.filter((book) => book.genre === "Sci-Fi");
    }
    if (isChecked) {
      filteredBooks = filteredBooks.filter((book) => book.isFavorite);
    }

    return filteredBooks;
  };

  const filteredBooks = getFilteredBooks();

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      const parsedBooks: BookList[] = JSON.parse(storedBooks);
      setBookData(parsedBooks);
    }
  }, [saved, selectGenre, activeButton, isChecked]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectGenre(e.target.value);
    getFilteredBooks();
  };

  return (
    <div className="main-container home-container">
      <InfoCard statusData={bookStatusData} />
      <div className="filters-div">
        <div className="filter-options">
          <select
            name="genre"
            value={selectGenre}
            onChange={(e) => handleGenreChange(e)}
          >
            <option value="" disabled>
              Genre
            </option>
            <option value="fiction">Fiction</option>
            <option value="action">Action</option>
            <option value="scifi">Sci-Fi</option>
          </select>
          <button
            style={buttonStyle("All")}
            onClick={() => handleButtonClick("All")}
            title="All"
          >
            All
          </button>
          <button
            style={buttonStyle("To-read")}
            onClick={() => handleButtonClick("To-read")}
            title="To-read"
          >
            To-read
          </button>
          <button
            style={buttonStyle("Reading")}
            onClick={() => handleButtonClick("Reading")}
            title="Reading"
          >
            Reading
          </button>
          <button
            style={buttonStyle("Finished")}
            onClick={() => handleButtonClick("Finished")}
            title="Finished"
          >
            Finished
          </button>
        </div>
        <div className="toggle-btn">
          <p>Show Favourites</p>
          <ToggleSwitch isChecked={isChecked} setIsChecked={setIsChecked} />
        </div>
      </div>

      <BookCard bookData={filteredBooks} />
      <div>
        {openAddBook && (
          <AddBook
            onClose={() => {
              setOpenAddBook(false);
              setSaved(true);
            }}
          />
        )}
      </div>
      <div>{false && <About />}</div>
    </div>
  );
};

export default Home;
