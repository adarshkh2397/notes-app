import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Notes from "./pages/Notes";
import Layout from "./components/Layout";
import LoadingSpinner from "./UI/LoadingSpinner";

const Create = lazy(() => import("./pages/Create"));

const DOMAIN = process.env.REACT_APP_FIREBASE_DOMAIN;

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchNotesHandler = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`${DOMAIN}/notes.json`);

      if (!res.ok) {
        throw new Error("Something Went Wrong!");
      }

      const data = await res.json();

      const loadedNotes = [];

      for (const key in data) {
        loadedNotes.push({
          id: key,
          title: data[key].title,
          details: data[key].details,
          category: data[key].category,
        });
      }
      setNotes(loadedNotes);
    } catch (error) {
      console.log(error.message);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchNotesHandler();
  }, [fetchNotesHandler]);

  const addNoteHandler = async (note) => {
    setIsFetching(true);
    try {
      const res = await fetch(`${DOMAIN}/notes.json`, {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Something Went Wrong!");
      }
    } catch (error) {
      console.log(error.message);
    }

    fetchNotesHandler();
  };

  const deleteNoteHandler = async (id) => {
    try {
      const res = await fetch(`${DOMAIN}/notes/${id}.json`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Something Went Wrong!");
      }
    } catch (error) {
      console.log(error.message);
    }

    fetchNotesHandler();
  };

  const searchHandler = (searched) => {
    const fNotes = notes.filter(
      (note) =>
        (note.category.toLowerCase().includes(searched.toLowerCase()) ||
          note.title.toLowerCase().includes(searched.toLowerCase())) &&
        searched.length > 0
    );

    setFilteredNotes(fNotes);
  };

  if (isFetching) {
    return (
      <div className="spinner-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="spinner-container">
            <LoadingSpinner />
          </div>
        }
      >
        <Layout onSearch={searchHandler}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Notes
                  notes={notes}
                  onDeleteNote={deleteNoteHandler}
                  filteredNotes={filteredNotes}
                />
              }
            />
            <Route
              path="/create"
              element={<Create onCreateNote={addNoteHandler} />}
            />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
