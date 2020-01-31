export const initialState = {
  token: null,
  page: {
    number: 1,
    reset: false
  },
  users: [],
  modalShow: false
};

export const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'SET_USERS':
      return {
        ...state,
        users: [...state.users, ...action.users]
      };
    case 'CLEAN_USERS':
      return {
        ...state,
        users: []
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: {
          ...state.page,
          ...action.page
        }
      };
    case 'CHANGE_MODAL_STATE':
      return {
        ...state,
        modalShow: action.modalShow
      };
    default:
      return state;
  }
};
