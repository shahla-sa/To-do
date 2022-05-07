import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  removeTask,
  removeCompleted,
} from "../../../store/actions/taskAction";
import TaskItem from "../taskItem/TaskItem";
import Spinner from "../../spinner/Spinner";
import styles from "./TaskList.module.scss";

const TaskList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();
  const { tasks, loading } = useSelector((state) => state.task);
  const [currentTasks, setCurrentTasks] = useState([]);

  useEffect(() => {
    dispatch(getTasks());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (search.get("sort") === "active") {
      setCurrentTasks(tasks.filter((task) => task.completed === true));
    } else {
      setCurrentTasks([...tasks]);
    }
  }, [tasks, search]);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Spinner />
      ) : tasks.length === 0 ? (
        <p className={styles.text}>There is no task.</p>
      ) : (
        currentTasks.map((task) => (
          <TaskItem key={task.id} task={task} removeTask={removeTask} />
        ))
      )}
      <div className={styles.taskbar}>
        <span className={styles.count}>
          <span>{currentTasks.length}</span> items left
        </span>
        <div>
          <span>
            <button
              className={`${styles.btn} ${
                search.get("sort") !== "active" ? styles.active : null
              }`}
              onClick={() => setSearch({ sort: "all" })}
            >
              All
            </button>
          </span>
          <span>
            <button
              className={`${styles.btn} ${
                search.get("sort") === "active" ? styles.active : null
              }`}
              onClick={() => setSearch({ sort: "active" })}
            >
              Active
            </button>
          </span>
        </div>
        <button
          className={styles.clearBtn}
          onClick={() =>
            dispatch(
              removeCompleted(
                tasks
                  .filter((task) => task.completed === true)
                  .map((tk) => tk.id)
              )
            )
          }
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};

export default TaskList;
