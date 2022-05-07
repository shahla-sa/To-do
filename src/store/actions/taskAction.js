import api from "../../services/api";
import * as actions from "../actionType";

//get all tasks
export const getTasks = () => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_LOADING });
    const { data } = await api.get("/tasks");
    dispatch({ type: actions.GET_TASKS, payload: data });
  } catch (error) {
    dispatch({ type: actions.SET_ERROR, payload: error });
  }
};

// add task
export const addTask = (task) => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_LOADING });
    const { data } = await api.post("/tasks", task);
    dispatch({ type: actions.ADD_TASK, payload: data });
  } catch (error) {
    dispatch({ type: actions.SET_ERROR, payload: error });
  }
};

// edit task
export const editTask = (task) => async (dispatch) => {
  try {
    const { data } = await api.put(`/tasks/${task.id}`, task);
    dispatch({ type: actions.EDIT_TASK, payload: data });
  } catch (error) {
    dispatch({ type: actions.SET_ERROR, payload: error });
  }
};

// remove Task
export const removeTask = (id) => async (dispatch) => {
  try {
    await api.delete(`/tasks/${id}`);
    dispatch({
      type: actions.REMOVE_TASK,
      payload: id,
    });
  } catch (error) {
    dispatch({ type: actions.SET_ERROR, payload: error });
  }
};

// remove completed task
export const removeCompleted = (ids) => async (dispatch) => {
  try {
    Promise.all(ids.map((id) => api.delete(`/tasks/${id}`)))
      .then(function (values) {
        dispatch({
          type: actions.REMOVE_COMPLETED,
          payload: ids,
        });
      })
      .catch(function (error) {
        dispatch({ type: actions.SET_ERROR, payload: error });
      });
  } catch (error) {
    dispatch({ type: actions.SET_ERROR, payload: error });
  }
};

export const setError = (error) => async (dispatch) => {
  dispatch({ type: actions.SET_ERROR, payload: error });
};
