import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "./index.css";

const TodoItem = (props) => {
  console.log(props);
  const { eachTodo, index, key } = props;
  const { name, status, _id } = eachTodo;
  console.log(status);

  const onClickRemove = async (event) => {
    const apiUrl = `http://localhost:5000/task/todos/${_id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(apiUrl, options);
    console.log(response.json());
  };

  return (
    <tr className={index % 2 === 0 ? "black" : "white"}>
      <td>
        <h4>{name}</h4>
        <h6>Invalid Date</h6>
      </td>
      {eachTodo.status ? (
        <td>
          <h5 className="done">Done</h5>
          <h6>Date of Complete</h6>
        </td>
      ) : (
        <td>
          <h5 className="pending">Pending</h5>
        </td>
      )}
      <td className="table-data">
        <button className="todo-button">
          <FaCheck fontSize={25} color="green" />
        </button>
        <button className="todo-button">
          <RxCross2 fontSize={30} color="red" onClick={onClickRemove} />
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
