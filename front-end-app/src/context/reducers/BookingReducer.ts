import actionTypes from 'context/actionTypes';
/* eslint-disable import/no-mutable-exports */
export const bookingsInitialState: any = {
  bookings: [],
};

export const bookingReducer = (
  state = bookingsInitialState,
  action: any = undefined,
) => {
  switch (action.type) {
    case actionTypes.CACHE_BOOKINGS: {
      return {
        ...state,
        bookings: action.payload,
      };
    }
    case actionTypes.ADD_BOOKING: {
      return {
        ...state,
        bookings: [...[action.payload], ...state.bookings],
      };
    }
    case actionTypes.DELETE_BOOKING: {
      return {
        ...state,
        bookings: [...state.bookings].filter(
          (booking) => booking.id !== action.payload,
        ),
      };
    }
    default:
      return state;
  }
};
