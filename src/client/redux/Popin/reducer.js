import { SHOW_POPIN, HIDE_POPIN } from './action';

const initialState = {
  open: false,
  popinType: null
};

const popinReducer = (state = initialState, action) => {
  switch (action.type) {
    case  SHOW_POPIN:
      return {
        ...state,
        open: true,
        popinType: action.popinType
      };
    case HIDE_POPIN:
      return initialState;
    default:
      return state;
  }
};

export default popinReducer;
