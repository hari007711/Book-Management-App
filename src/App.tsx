import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { useState } from "react";
import About from "./pages/About/About";

function App() {
  const [searchBook, setSearchBook] = useState<string>("");
  const [openAddBook, setOpenAddBook] = useState<boolean>(false);

  return (
    <div className="main">
      <Router>
        <Header
          searchBook={searchBook}
          setSearchBook={setSearchBook}
          openAddBook={openAddBook}
          setOpenAddBook={setOpenAddBook}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchBook={searchBook}
                  openAddBook={openAddBook}
                  setOpenAddBook={setOpenAddBook}
                />
              }
            />
            <Route path="/about/:id" element={<About />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
