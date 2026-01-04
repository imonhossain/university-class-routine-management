import actionTypes from 'context/actionTypes';
/* eslint-disable import/no-mutable-exports */
export const roomsInitialState: any = {
  rooms: [],
};

export const roomReducer = (
  state = roomsInitialState,
  action: any = undefined,
) => {
  switch (action.type) {
    case actionTypes.CACHE_ROOMS: {
      return {
        ...state,
        rooms: action.payload,
      };
    }
    case actionTypes.ADD_ROOM: {
      return {
        ...state,
        rooms: [...[action.payload], ...state.rooms],
      };
    }
    case actionTypes.DELETE_ROOM: {
      return {
        ...state,
        rooms: [...state.rooms].filter((room) => room.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
