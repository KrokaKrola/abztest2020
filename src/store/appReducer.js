export const initialState = {
  token: null
};

export const appStateReducer = (state, action) => {

  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};
