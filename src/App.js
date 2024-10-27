import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import { TiPencil } from "react-icons/ti";
import "./App.css";
//import { response } from "../../../backend/server";

function App() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState();
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    fetchDate();
  });

  const fetchDate = async () => {
    const response = await fetch("https://culturelinkr-assignment-todo-backend.onrender.com/task/todos");
    const data = await response.json();
    console.log(data);
    setTodos(data);
  };

  const onClickAdd = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://culturelinkr-assignment-todo-backend.onrender.com/task/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Todo added successfully:", data);
    } catch (error) {
      console.error("Error posting todo:", error);
    }
    setName("");
  };

  const onChangeInput = (event) => {
    setName(event.target.value);
  };

  const onClickRemove = async (id) => {
    try {
      await fetch(`https://culturelinkr-assignment-todo-backend.onrender.com/task/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((eachTodo) => eachTodo._id !== id));
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };

  const onClickComplete = async (id) => {
    try {
      await fetch(`https://culturelinkr-assignment-todo-backend.onrender.com/task/todos/${id}`, {
        method: "PATCH",
      });
    } catch (error) {
      console.log(`Error ${error.message}`);
    }
  };

  const onClickTodo = async (id, name) => {
    console.log(name);
    setId(id);
    setEditedName(name);
    setIsModelOpen(true);
  };

  const saveName = async (id) => {
    await fetch(`https://culturelinkr-assignment-todo-backend.onrender.com/task/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editedName }),
    });
    setIsModelOpen(false);
  };
  const closeModal = () => {
    setIsModelOpen(false);
  };

  return (
    <div className="App">
      <h1>Create Task</h1>
      <div className="search-container">
        <input
          className="search"
          type="search"
          onChange={onChangeInput}
          value={name}
        />
        <button className="add-button" type="button" onClick={onClickAdd}>
          ADD
        </button>
      </div>
      <h1>My Tasks</h1>
      {todos.length > 0 && (
        <table className="todos-container">
          <tr>
            <th>Todo</th>
            <th>status</th>
            <th>Action</th>
          </tr>
          {todos.map((eachTodo, index) => (
            <tr
              key={eachTodo._id}
              className={index % 2 === 0 ? "black" : "white"}
            >
              <td
                className="todo-name"
                
              >
                <h4 className="todo-name" onClick={() => onClickTodo(eachTodo._id, eachTodo.name)}>
                  {eachTodo.name}
                  <TiPencil />
                </h4>
              </td>
              {eachTodo.status ? (
                <td>
                  <h5 className="done">Done</h5>
                </td>
              ) : (
                <td>
                  <h5 className="pending">Pending</h5>
                </td>
              )}
              <td className="table-data">
                {!eachTodo.status && (
                  <button className="todo-button">
                    <FaCheck
                      fontSize={25}
                      color="green"
                      onClick={() => onClickComplete(eachTodo._id)}
                    />
                  </button>
                )}
                <button className="todo-button">
                  <RxCross2
                    fontSize={30}
                    color="red"
                    onClick={() => onClickRemove(eachTodo._id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Todo</h2>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => saveName(id)}>Save</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
