import React, { useState } from "react";
import { todoContext } from "./myContext";
import axios from "axios";
const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);
  const getAllTodo = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_KEY}/todo`);
      if (data.success) {
        setLoading(false);
        setTodo(data?.task);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);

      setError(e.message);
    }
  };
  const postTodo = async (dataPost) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_KEY}/todoadd`,
        dataPost,
        {
          headers: {
            "Content-Type": "application/json", // Specify the Content-Type here
          },
        }
      );
      if (data.success) {
        setLoading(false);
        setUpdate(!update);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);

      setError(e.message);
    }
  };
  const handleDeleteTodo = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_KEY}/tododelete/${id}`
      );
      if (data.success) {
        setLoading(false);
        setUpdate(!update);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);

      setError(e.message);
    }
  };
  const updateTodo = async (id, updateData) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_KEY}/todoupdate/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        setLoading(false);
        setUpdate(!update);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);

      setError(e.message);
    }
  };
  return (
    <todoContext.Provider
      value={{
        getAllTodo,
        postTodo,
        handleDeleteTodo,
        updateTodo,
        todo,
        setTodo,
        loading,
        update,
        error,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

export default TodoProvider;
