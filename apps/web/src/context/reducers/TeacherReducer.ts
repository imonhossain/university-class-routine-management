import actionTypes from 'context/actionTypes';
/* eslint-disable import/no-mutable-exports */
export const teachersInitialState: any = {
  teachers: [],
};

export const teacherReducer = (
  state = teachersInitialState,
  action: any = undefined,
) => {
  switch (action.type) {
    case actionTypes.CACHE_TEACHERS: {
      return {
        ...state,
        teachers: action.payload,
      };
    }
    case actionTypes.ADD_TEACHER: {
      return {
        ...state,
        teachers: [...[action.payload], ...state.teachers],
      };
    }
    case actionTypes.DELETE_TEACHER: {
      return {
        ...state,
        teachers: [...state.teachers].filter(
          (teacher) => teacher.id !== action.payload,
        ),
      };
    }
    default:
      return state;
  }
};
