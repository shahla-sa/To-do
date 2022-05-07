import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../../store/actions/taskAction";
import Toast from "../../toast/Toast";
import styles from "./AddTask.module.scss";

const AddTask = () => {
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const onAddTask = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      setShow(true);
    } else {
      const task = { title: inputValue, completed: false };
      dispatch(addTask(task));
      setInputValue("");
    }
  };
  return (
    <div className={styles.inputBox}>
      <Toast show={show} removeToast={() => setShow(false)} duration={5000}>
        Please enter the task
      </Toast>
      <form onSubmit={(e) => onAddTask(e)}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  );
};

export default AddTask;
