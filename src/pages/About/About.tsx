import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./About.scss";
import AddBook from "../../components/AddBook/AddBook";

interface Book {
  id: string;
  title: string;
  author: string;
  previewImage: string;
  genre: string;
  publishedYear: number;
  status: string;
  description: string;
  isFavorite: boolean;
  isRead: boolean;
}

const About = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [book, setBook] = useState<Book | undefined>(undefined);

  useEffect(() => {
    const bookData = localStorage.getItem("books");
    if (bookData) {
      const bookArray: Book[] = JSON.parse(bookData);
      const foundBook = bookArray.find((item) => item.id === id);
      setBook(foundBook);
    }
  }, [id]);

  const handleDelete = () => {
    const bookData = localStorage.getItem("books");
    if (bookData) {
      const bookArray: Book[] = JSON.parse(bookData);
      const updatedBooks = bookArray.filter((item) => item.id !== id);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      navigate("/");
    }
  };

  const handleFavoriteToggle = () => {
    if (book) {
      const updatedBook = { ...book, isFavorite: !book.isFavorite };
      const bookData = localStorage.getItem("books");
      if (bookData) {
        const bookArray: Book[] = JSON.parse(bookData);
        const updatedBooks = bookArray.map((item) =>
          item.id === book.id ? updatedBook : item
        );
        localStorage.setItem("books", JSON.stringify(updatedBooks));
        setBook(updatedBook); 
      }
    }
  };

  const handleEdit = () => {
    setShowEditForm(true); 
  };

  return (
    <div className="about-container">
      <div className="breadcrumb">
        <div onClick={() => navigate("/")}>Home</div> / {book?.title}
      </div>
      <br />
      {book ? (
        <>
          <div className="combine-class">
            <img src={book.previewImage} alt={`${book.title} preview`} />
            <div className="book_details">
              <h2>{book?.title}</h2>
              <br />
              <h6>Author: {book?.author}</h6>
              <h6>Genre: {book?.genre}</h6>
              <br />
              <p>Published: {book?.publishedYear}</p>
              <br />
              <p>{book?.isFavorite ? "Favorite Book" : "Not a Favorite"}</p>
            </div>
          </div>
          <br />
          <div className="book-desc">
            <p>
              Description: <span>{book?.description}</span>
            </p>
          </div>
        </>
      ) : (
        "Book not found"
      )}
      <br />
      <button className="edit-button" title="Edit Book" onClick={handleEdit}>
        Edit Book
      </button>
      <button
        className="delete-button"
        title="Delete Book"
        onClick={handleDelete}
      >
        Delete Book
      </button>
      <button
        className={`fav-button ${book?.isFavorite ? "active" : ""}`}
        onClick={handleFavoriteToggle}
      >
        {book?.isFavorite ? "Unmark as Favourite" : "Mark as Favourite"}
      </button>

      {showEditForm && (
        <AddBook book={book} onClose={() => setShowEditForm(false)} />
      )}
    </div>
  );
};

export default About;
