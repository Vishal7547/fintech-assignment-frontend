import React, { useState, useContext, useEffect } from "react";
import { todoContext } from "./context/myContext";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddTodo from "./Components/AddTodo";
import Loader from "./Components/Loader";
const App = () => {
  const {
    getAllTodo,
    updateTodo,
    todo,
    loading,
    update,
    error,
    handleDeleteTodo,
    setTodo,
  } = useContext(todoContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState(null);
  const [todoUpdate, setTodoUpdate] = useState(null);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [done, setDone] = useState(0);
  const [filterTodo, setFilterTodo] = useState([]);
  const [filterTask, setFilterTask] = useState([]);
  const [checkSearch, setCheckSearch] = useState("");
  const handleDetails = (t) => {
    setData(t);
  };
  useEffect(() => {
    console.log("checkSearch", checkSearch.length);
    console.log(
      filterTodo?.length > 0
        ? checkSearch?.length > 0
          ? `filterTodo${filterTodo?.length}`
          : "todo"
        : "todo"
    );
    setFilterTask(
      filterTodo?.length > 0
        ? checkSearch?.length > 0
          ? filterTodo
          : todo
        : todo
    );
  }, [todo, filterTodo, update]);

  useEffect(() => {
    const fetchedTodo = async () => {
      await getAllTodo();
    };
    fetchedTodo();
  }, [update]);
  useEffect(() => {
    setData(filterTask[0]);
    setTotal(filterTask.length);
    const pending = filterTask?.filter((p, i) => p?.completed === false);
    setPending(pending.length);
    const donees = filterTask?.filter((p, i) => p?.completed === true);
    setDone(donees.length);
  }, [todo, filterTask]);
  const handleTodo = () => {
    handleOpen();
  };
  const handleDelete = async (id) => {
    setCheckSearch("");
    await handleDeleteTodo(id);
  };
  const handleUpdate = (t) => {
    setCheckSearch("");
    setTodoUpdate(t);
    handleOpen();
  };
  const handleUpdateStatus = async (t) => {
    setCheckSearch("");
    console.log(!t?.completed);
    const status = {
      completed: !t?.completed,
    };
    await updateTodo(t._id, status);
  };
  const handleSearch = (e) => {
    setCheckSearch(e);
    const data = todo.filter((t) =>
      t.title.toLowerCase().includes(e.toLowerCase())
    );
    setFilterTodo(data);
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <>
      {loading && <Loader />}
      <section className="hero">
        <div className="container">
          <div className="row text-center">
            <h4>WELCOME TO EARNEST FINTECH LIMITED</h4>
            <p>Task Management System</p>
          </div>
          <div className="todoSingleContainer my-2">
            <div>
              <h6>{data?.title}</h6>

              <p>{data?.description}</p>

              <i>{new Date(data?.createdAt).toDateString()}</i>
              <br />
              <button className="btn btn-dark">
                {data?.completed ? "Done" : "Pending"}
              </button>
            </div>
          </div>

          <div className="mainTask">
            <div className="row mainTodo my-4">
              <div className="row searchFun m-0  g-0">
                <div className="innerSearch m-0 p-0 g-0">
                  <div className="left">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="search title.."
                        value={checkSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <button className="btn btn-dark" onClick={handleTodo}>
                        Add Todo
                      </button>
                    </div>
                  </div>
                  <div className="right">
                    <button className="btn btn-dark">Total: {total}</button>
                    <button className="btn btn-danger">
                      Pending: {pending}
                    </button>
                    <button className="btn btn-success">Done: {done}</button>
                  </div>
                </div>
              </div>
              <div className="row m-0 g-0 ">
                <table class="table m-0 mainTable">
                  <thead>
                    <tr>
                      <th scope="col">S.no</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterTask?.map((t, i) => (
                      <tr className="tableDataSetCursor" key={t._id}>
                        <th scope="row">{i + 1}</th>
                        <td onClick={() => handleDetails(t)}>{t?.title}</td>
                        <td onClick={() => handleDetails(t)}>
                          {t?.description.substring(0, 30)} read more..
                        </td>
                        <td>{new Date(t?.createdAt).toDateString()}</td>
                        <td>
                          {" "}
                          <Checkbox
                            {...label}
                            checked={t.completed}
                            value={t.completed}
                            color="success"
                            onClick={() => handleUpdateStatus(t)}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(t._id)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-success mx-2"
                            onClick={() => handleUpdate(t)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <AddTodo
          open={open}
          handleClose={handleClose}
          todoUpdate={todoUpdate}
          setTodoUpdate={setTodoUpdate}
        />
      </section>
    </>
  );
};

export default App;
