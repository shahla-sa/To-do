import React from "react";
import AddTask from "../../components/task/addTask/AddTask";
import TaskList from "../../components/task/taskList/TaskList";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default HomePage;
