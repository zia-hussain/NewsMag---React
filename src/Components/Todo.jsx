import React, { useState, useEffect } from "react";
import AddItem from "./Todo/add.png";
import "./style.css";
import Trash from "./Todo/trash.png";
import { MdAdd, MdRemove } from "react-icons/md";
import Circle from "./Circle";

const Todo = () => {
  const [InputData, setInputData] = useState("");
  const [items, setItems] = useState([]);

  // Load todos from local storage when component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("Todos"));
    if (storedTodos) {
      setItems(storedTodos);
    }
  }, []);

  // Add the items function
  const addItem = () => {
    if (!InputData.trim()) {
      alert("Plz fill the data");
    } else {
      const myNewInput = {
        id: new Date().getTime().toString(),
        name: InputData,
        count: 1, // Add count property to the todo item
      };
      setItems([...items, myNewInput]);
      setInputData("");

      localStorage.setItem("Todos", JSON.stringify([...items, myNewInput]));
    }
  };

  // Increase count
  const increaseCount = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setItems(updatedItems);
    localStorage.setItem("Todos", JSON.stringify(updatedItems)); // Update local storage
  };

  // Decrease count
  const decreaseCount = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id && item.count > 0
        ? { ...item, count: item.count - 1 }
        : item
    );
    setItems(updatedItems);
    localStorage.setItem("Todos", JSON.stringify(updatedItems)); // Update local storage
  };

  // Delete items
  const deleteItem = (id) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== id;
    });
    setItems(updatedItems);
    localStorage.setItem("Todos", JSON.stringify(updatedItems)); // Update local storage
  };

  // Remove all items
  const removeAll = () => {
    setItems([]);
    localStorage.removeItem("Todos"); // Remove all todos from local storage
  };

  return (
    <>
      <Circle />
      <div className="main_div">
        <div className="child_div">
          <figure>
            <figcaption>Add your list here 📝</figcaption>
          </figure>

          {/* Add items  */}
          <div className="additems">
            <input
              value={InputData}
              onChange={(event) => setInputData(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addItem();
                }
              }}
              type="text"
              placeholder="Add Your Item"
              className="form_control"
            />
            <img
              onClick={addItem}
              className="addicon"
              src={AddItem}
              alt="item"
            />
          </div>

          {/* Show items  */}
          <div className="show_items">
            {items.map((curElem, index) => {
              return (
                <div className="each_items" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <span className="incr-decr">
                    <MdRemove
                      size={35}
                      className="button"
                      onClick={() => decreaseCount(curElem.id)}
                    />
                    <h4 className="qty">{curElem.count}</h4>
                    <MdAdd
                      size={35}
                      className="button"
                      onClick={() => increaseCount(curElem.id)}
                    />
                  </span>
                  <div className="todo_btn">
                    <img
                      className="trash"
                      src={Trash}
                      alt="delete"
                      onClick={() => deleteItem(curElem.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total  */}
          <div className="total">
            <h1>
              Total : <span id="total">{items.length}</span>
            </h1>
          </div>

          {/* Delete All */}
          <div className="btn">
            <button
              className="btn_effect"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Checklist</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
