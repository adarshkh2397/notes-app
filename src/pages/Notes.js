import { Container } from "@mui/material";
import Masonry from "react-masonry-css";
import NoteCard from "../components/NoteCard";

const Notes = (props) => {
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container sx={{ marginTop: 2, marginBottom: 2 }}>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {props.notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} onDeleteNote={props.onDeleteNote} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
};

export default Notes;
