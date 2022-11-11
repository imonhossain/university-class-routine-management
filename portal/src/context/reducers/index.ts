import { courseReducer, coursesInitialState } from 'context/reducers/CourseReducer';
import { userInitialState, userReducer } from './userReducer';
export const initialState = {
  ...userInitialState,
  ...coursesInitialState,
};

// TODO fix type
const combineReducers =
  (...reducers: any) =>
    (state = initialState, action: any = null) => {
      for (let i = 0; i < reducers.length; i++) {
        state = reducers[i](state, action);
      }
      return state;
    };
export default combineReducers(userReducer, courseReducer);
