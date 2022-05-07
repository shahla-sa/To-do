import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../../../store/actions/taskAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
import Toast from "../../toast/Toast";
import styles from "./TaskItem.module.scss";

const TaskItem = ({ task, removeTask }) => {
  const dispatch = useDispatch();

  const { title, id, completed } = task;
  const [inputValue, setInputValue] = useState(title);
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);
  const [isChecked, setIsChecked] = useState(completed);

  const onEditTask = (e) => {
    e.preventDefault();

    if (inputValue === "") {
      setShow(true);
    } else {
      const newTask = { ...task, title: inputValue };
      dispatch(editTask(newTask));
      setFocus(false);
      e.target.children[0].setAttribute("readOnly", true);
    }
  };
  return (
    <div className={`${styles.item} ${completed ? styles.completed : null}`}>
      <Toast show={show} removeToast={() => setShow(false)} duration={5000}>
        Please enter the task
      </Toast>
      <label className={styles.checkbox} htmlFor={id}>
        <input
          type="checkbox"
          checked={isChecked}
          id={id}
          onChange={(e) => {
            setIsChecked(!isChecked);
            dispatch(editTask({ ...task, completed: !completed }));
          }}
        />
        <FontAwesomeIcon icon={faCheck} className={styles.check} />
      </label>
      <form onSubmit={(e) => onEditTask(e)}>
        <input
          type="text"
          className={`${styles.input} ${focus ? styles.focused : null}`}
          value={inputValue}
          readOnly
          onDoubleClick={(e) => {
            e.target.removeAttribute("readOnly");
            setFocus(true);
          }}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>

      <button
        className={styles.remove}
        onClick={() => dispatch(removeTask(id))}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
};

export default TaskItem;
