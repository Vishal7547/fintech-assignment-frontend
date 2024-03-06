import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { todoContext } from "../context/myContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AddTodo = ({ handleClose, open, setTodoUpdate, todoUpdate }) => {
  const { postTodo, loading, updateTodo } = useContext(todoContext);
  useEffect(() => {
    if (todoUpdate) {
      setTitle(todoUpdate?.title);
      setDescription(todoUpdate?.description);
    }
  }, [todoUpdate]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");

  const [isError, setisError] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title) {
      setisError(true);
      setErrorMessage("enter title");
      return;
    }
    if (!description) {
      setisError(true);
      setErrorMessage1("enter description");
      return;
    }

    await postTodo({ title, description });
    setTitle("");
    setDescription("");
    setErrorMessage("");
    setErrorMessage1("");
    setisError(false);
    handleClose();
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title) {
      setisError(true);
      setErrorMessage("enter title");
      return;
    }
    if (!description) {
      setisError(true);
      setErrorMessage1("enter description");
      return;
    }

    await updateTodo(todoUpdate?._id, { title, description });
    setTitle("");
    setDescription("");
    setErrorMessage("");
    setErrorMessage1("");
    setTodoUpdate(null);
    setisError(false);
    handleClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="form row"
            onSubmit={todoUpdate ? handleUpdate : handleAdd}
          >
            <TextField
              id="filled-basic"
              error={isError}
              value={title}
              helperText={errorMessage}
              label="Title"
              variant="filled"
              onChange={(e) => setTitle(e.target.value)}
              className="w-100 my-1"
            />
            <TextField
              id="filled-basic"
              value={description}
              error={isError}
              label="Description"
              helperText={errorMessage1}
              variant="filled"
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              className="w-100 my-1"
            />
            <div>
              <button className="btn btn-dark my-1">
                {loading ? "Loading..." : todoUpdate ? "Update" : "Add Todo"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddTodo;
