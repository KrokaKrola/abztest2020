export const initialState = {
  token: null,
  users: [],
  modalShow: false,
  nextPage: {
    link: null,
    regId: null
  }
};

export const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEXT_PAGE':
      return {
        ...state,
        nextPage: {
          ...state.nextPage,
          ...action.nextPage
        }
      };
    case 'CLEAN_USERS':
      return {
        ...state,
        users: []
      };
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
    case 'CHANGE_MODAL_STATE':
      return {
        ...state,
        modalShow: action.modalShow
      };
    default:
      return state;
  }
};
