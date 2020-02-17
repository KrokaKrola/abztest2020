import {CHANGE_MODAL_STATE} from '../../constants/modal';

export default (state = { token: null }, action) => {
  if (action.type === CHANGE_MODAL_STATE) {
    return {
      ...state,
      modalShow: action.modalShow,
    };
  } else { return state; }
}