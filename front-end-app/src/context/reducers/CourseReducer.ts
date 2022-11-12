import actionTypes from 'context/actionTypes';
/* eslint-disable import/no-mutable-exports */
export const coursesInitialState: any = {
  courses: [],
};

export const courseReducer = (
  state = coursesInitialState,
  action: any = undefined,
) => {
  switch (action.type) {
    case actionTypes.CACHE_COURSES: {
      return {
        ...state,
        courses: action.payload,
      };
    }
    case actionTypes.ADD_COURSE: {
      return {
        ...state,
        courses: [...state.courses, ...[action.payload]],
      };
    }
    default:
      return state;
  }
};
