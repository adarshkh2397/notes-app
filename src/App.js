import { useState, useCallback, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { deepPurple } from "@mui/material/colors";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: deepPurple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const [notes, setNotes] = useState([]);
  const fetchNotesHandler = useCallback(async () => {
    try {
      const res = await fetch(
        "https://notes-app-7690e-default-rtdb.firebaseio.com/notes.json"
      );

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
  }, []);

  useEffect(() => {
    fetchNotesHandler();
  }, [fetchNotesHandler]);

  const addNoteHandler = async (note) => {
    try {
      const res = await fetch(
        "https://notes-app-7690e-default-rtdb.firebaseio.com/notes.json",
        {
          method: "POST",
          body: JSON.stringify(note),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      const res = await fetch(
        `https://notes-app-7690e-default-rtdb.firebaseio.com/notes/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Something Went Wrong!");
      }
    } catch (error) {
      console.log(error.message);
    }

    fetchNotesHandler();
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              exact
              path="/"
              element={<Notes notes={notes} onDeleteNote={deleteNoteHandler} />}
            />
            <Route
              path="/create"
              element={<Create onCreateNote={addNoteHandler} />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
