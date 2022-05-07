import * as actions from "../actionType";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };

    case actions.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
      };

    case actions.EDIT_TASK:
      const idx = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      const newArr = [...state.tasks];
      newArr[idx] = action.payload;
      return {
        ...state,
        tasks: newArr,
      };

    case actions.SET_LOADING:
      return { ...state, loading: true };

    case actions.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case actions.REMOVE_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter((task) => !action.payload.includes(task.id)),
      };

    case actions.SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default taskReducer;
