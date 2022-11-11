import actionTypes from 'context/actionTypes';
/* eslint-disable import/no-mutable-exports */
export let userInitialState: any = {
  token: '',
  user: null,
};
const user = window.localStorage.getItem('auth');

if (user) {
  userInitialState = JSON.parse(user);
} else {
  userInitialState = null;
}

export const userReducer = (state = userInitialState, action: any = undefined) => {
  switch (action.type) {
    case actionTypes.SIGN_IN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actionTypes.SIGN_OUT: {
      state.token = '';
      state.user = null;
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
