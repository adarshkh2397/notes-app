import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import CustomButton from "../UI/CustomButton";
import OutlinedTextField from "../UI/OutlinedTextField";

const Create = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("todos");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const detailChangeHandler = (event) => {
    setDetails(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!title || title.trim().length === 0) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
    if (!details || details.trim().length === 0) {
      setDetailsError(true);
      return;
    }
    setDetailsError(false);
    const note = {
      title,
      details,
      category,
    };

    props.onCreateNote(note);
    setTitle("");
    setDetails("");
    navigate("/");
  };

  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a new note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
        <OutlinedTextField
          label="Note Title"
          onChange={titleChangeHandler}
          value={title}
          error={titleError}
        />
        <OutlinedTextField
          label="Details"
          multiline
          rows={4}
          onChange={detailChangeHandler}
          value={details}
          error={detailsError}
        />

        <FormControl sx={{ marginTop: 2, marginBottom: 2, display: "block" }}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            aria-label="category"
            name="radio-buttons-group"
            color="secondary"
            value={category}
            onChange={categoryChangeHandler}
          >
            <FormControlLabel
              value="money"
              control={<Radio color="secondary" />}
              label="Money"
            />
            <FormControlLabel
              value="todos"
              control={<Radio color="secondary" />}
              label="Todos"
            />
            <FormControlLabel
              value="reminder"
              control={<Radio color="secondary" />}
              label="Reminder"
            />
            <FormControlLabel
              value="work"
              control={<Radio color="secondary" />}
              label="Work"
            />
            <FormControlLabel
              value="others"
              control={<Radio color="secondary" />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
        <CustomButton />
      </form>
    </Container>
  );
};

export default Create;
