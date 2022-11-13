import reducers from 'context/reducers';
import { coursesInitialState } from 'context/reducers/CourseReducer';
import { userInitialState } from 'context/reducers/userReducer';
import React, { FC, useContext, useReducer } from 'react';
import { bookingsInitialState } from './reducers/BookingReducer';
import { roomsInitialState } from './reducers/RoomReducer';
import { teachersInitialState } from './reducers/TeacherReducer';

export const initialState = {
  ...userInitialState,
  ...coursesInitialState,
  ...roomsInitialState,
  ...bookingsInitialState,
  ...teachersInitialState,
};

interface Props {
  children: React.ReactNode;
}
const AppContext = React.createContext({});
const AppProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <AppContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
