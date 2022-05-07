import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose } from "@fortawesome/free-solid-svg-icons";

import styles from "./Toast.module.scss";

const Toast = (props) => {
  const { removeToast, show, duration = 0 } = props;

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      removeToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [removeToast, duration]);
  return (
    <div className={`${styles.toast} ${show ? styles.show : null}`}>
      <div>{props.children}</div>
      <button onClick={removeToast}>
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
};

export default Toast;
