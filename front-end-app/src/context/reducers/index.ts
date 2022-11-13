import {
  courseReducer,
  coursesInitialState,
} from 'context/reducers/CourseReducer';
import { bookingReducer, bookingsInitialState } from './BookingReducer';
import { roomReducer, roomsInitialState } from './RoomReducer';
import { teacherReducer, teachersInitialState } from './TeacherReducer';
import { userInitialState, userReducer } from './userReducer';

export const initialState = {
  ...userInitialState,
  ...coursesInitialState,
  ...teachersInitialState,
  ...roomsInitialState,
  ...bookingsInitialState,
};

// TODO fix type
const combineReducers =
  (...reducers: any) =>
  (state = initialState, action: any = null) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < reducers.length; i++) {
      state = reducers[i](state, action);
    }
    return state;
  };
export default combineReducers(
  userReducer,
  courseReducer,
  teacherReducer,
  roomReducer,
  bookingReducer,
);
