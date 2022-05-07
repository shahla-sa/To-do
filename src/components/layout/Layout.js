import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/actions/taskAction";
import Toast from "../toast/Toast";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.task);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (error) {
      setShow(true);
    }
  }, [error]);
  return (
    <>
      <Toast
        show={show}
        removeToast={() => {
          setShow(false);
          dispatch(setError(""));
        }}
      >
        {error?.toString()}
      </Toast>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.brand}>Todo</div>
          <div className={styles.bar}></div>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
