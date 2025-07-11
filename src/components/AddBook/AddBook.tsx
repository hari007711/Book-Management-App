import React, { useState, useEffect, useRef } from "react";
import "./AddBook.scss";
import reqImg from "../../assets/required.png";
import { useNavigate } from "react-router-dom";

interface AddBookProps {
  onClose: () => void;
  book?: Book;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: string;
  isFavorite: boolean;
  isRead: boolean;
  previewImage: string;
  description: string;
}

const AddBook: React.FC<AddBookProps> = ({ onClose, book }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(book?.title || "");
  const [author, setAuthor] = useState<string>(book?.author || "");
  const [genre, setGenre] = useState<string>(book?.genre || "");
  const [year, setYear] = useState<string>(
    book?.publishedYear.toString() || ""
  );
  const [status, setStatus] = useState<Book["status"]>(
    book?.status || "toread"
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(
    book?.isFavorite || false
  );
  const [isRead, setIsRead] = useState<boolean>(book?.isRead || false);
  const [previewImage, setPreviewImage] = useState<string>(
    book?.previewImage || ""
  );
  const [titleErrorMsg, setTitleErrorMsg] = useState<string>("");
  const [authorErrorMsg, setAuthorErrorMsg] = useState<string>("");
  const [genreErrorMsg, setGenreErrorMsg] = useState<string>("");
  // const [yearErrorMsg, setYearErrorMsg] = useState<string>("");
  const [previewImgErrorMsg, setPreviewImgErrorMsg] = useState<string>("");
  const [description, setDescription] = useState<string>(
    book?.description || ""
  );
  // const [descErrorMsg, setDescErrorMsg] = useState<string>("");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setYear(book.publishedYear.toString());
      setStatus(book.status);
      setIsFavorite(book.isFavorite);
      setIsRead(book.isRead);
      setPreviewImage(book.previewImage);
      setDescription(book.description);
    }
  }, [book]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewImgErrorMsg("");
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    let check = false;
    if (title === "" || title === undefined) {
      setTitleErrorMsg("Please Enter Book Title");
      check = true;
    }
    if (author === "" || author === undefined) {
      setAuthorErrorMsg("Please Enter Author Name");
      check = true;
    }
    if (genre === "" || genre === undefined) {
      setGenreErrorMsg("Please Select Genre");
      check = true;
    }
    if (year === "" || year === undefined) {
      // setYearErrorMsg("Please Enter Published Year");
      check = true;
    }
    if (previewImage === "" || previewImage === undefined) {
      setPreviewImgErrorMsg("Please Upload Image");
      check = true;
    }
    if (description === "" || description === undefined) {
      // setDescErrorMsg("Please Enter Description");
      check = true;
    }
    if (!check) {
      const newBook: Book = {
        id: book ? book.id : `book-${Date.now()}`,
        title,
        author,
        genre,
        publishedYear: parseInt(year),
        status,
        isFavorite,
        isRead,
        previewImage,
        description,
      };

      const existingBooks: Book[] = JSON.parse(
        localStorage.getItem("books") || "[]"
      );
      if (book) {
        const updatedBooks = existingBooks.map((existingBook) =>
          existingBook.id === book.id ? newBook : existingBook
        );
        localStorage.setItem("books", JSON.stringify(updatedBooks));
        alert("Book updated successfully!");
        navigate("/");
      } else {
        localStorage.setItem(
          "books",
          JSON.stringify([...existingBooks, newBook])
        );
        alert("Book saved successfully!");
      }

      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    const modalNode = modalRef.current;
    if (!modalNode) return;

    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ];

    const focusableElements = modalNode.querySelectorAll<HTMLElement>(
      focusableSelectors.join(",")
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    modalNode.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();
    return () => {
      modalNode.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="addBook-popup" ref={modalRef}>
      <div className="main-addBook">
        <div className="addBook-popup">
          <div className="cancel-title">
            <button className="close-btn" title="Close" onClick={onClose}>
              ×
            </button>
            <div className="bookHeading">
              <h2>{book?.id ? "Edit Book" : "Add New Book"}</h2>
            </div>
          </div>
          <div className="newwwwww">
            <div className="wrapping">
              <div className="booktitle">
                <p>Book Title</p>
                <img src={reqImg} alt="required" />
              </div>
              <input
                placeholder="Enter Book Name"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleErrorMsg("");
                }}
              />
              <p className="error-msg">{titleErrorMsg}</p>
            </div>
            <div className="wrapping">
              <div className="booktitle">
                <p>Author</p>
                <img src={reqImg} alt="required" />
              </div>
              <input
                placeholder="Enter Author Name"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setAuthorErrorMsg("");
                }}
              />
              <p className="error-msg">{authorErrorMsg}</p>
            </div>
            <div className="booktitle">
              <p>Genre</p>
              <img src={reqImg} alt="required" />
            </div>
            <select
              className="genre-select"
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
                setGenreErrorMsg("");
              }}
            >
              <option value="" disabled>
                Select Genre
              </option>
              <option value="Fiction">Fiction</option>
              <option value="Action">Action</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
            <p className="error-msg">{genreErrorMsg}</p>
            <div className="description">
              <div className="booktitle">
                <p>Description</p>
                <img src={reqImg} alt="required" />
              </div>
              <textarea
                placeholder="Description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="wrapping">
              <div className="booktitle">
                <p>Published Year</p>
                <img src={reqImg} alt="required" />
              </div>
              <div className="year-file">
                <input
                  className="year-input"
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    // setYearErrorMsg("");
                  }}
                />

                <div className="upload-file">
                  <input
                    className="img-input"
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  <p className="error-msg">{previewImgErrorMsg}</p>
                </div>
              </div>
            </div>
            <div className="addBook-status">
              <div>
                <h3>Status</h3>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="bookStatus"
                    value="toread"
                    checked={status === "toread"}
                    onChange={(e) =>
                      setStatus(e.target.value as Book["status"])
                    }
                  />
                  <label>To Read</label>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="bookStatus"
                    value="reading"
                    checked={status === "reading"}
                    onChange={(e) =>
                      setStatus(e.target.value as Book["status"])
                    }
                  />
                  <label>Reading</label>
                </div>
                <div className="radio-btn">
                  <input
                    type="radio"
                    name="bookStatus"
                    value="finished"
                    checked={status === "finished"}
                    onChange={(e) =>
                      setStatus(e.target.value as Book["status"])
                    }
                  />
                  <label>Finished</label>
                </div>
                <br></br>
                <div className="addBook-checkbox">
                  <input
                    type="checkbox"
                    checked={isFavorite}
                    onChange={() => setIsFavorite(!isFavorite)}
                  />
                  <label> Mark as Favourite</label>
                  <br />
                  <input
                    type="checkbox"
                    checked={isRead}
                    onChange={() => setIsRead(!isRead)}
                  />
                  <label className="mark-read"> Mark as Read</label>
                </div>
              </div>
              <div className="image-preview">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" />
                ) : (
                  <p className="prev-image-para">Previe Image</p>
                )}
              </div>
            </div>{" "}
          </div>
          <div className="book-btns">
            <button className="cancel-btn" title="Close" onClick={onClose}>
              Cancel
            </button>
            <button className="save-btn" title="Save" onClick={handleSave}>
              {book ? "Save Changes" : "Save Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
