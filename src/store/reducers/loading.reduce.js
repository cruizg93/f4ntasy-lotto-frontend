import {
  LODING_STATE,
} from '../actions/types';

const INIT_STATE = {
  loading: false,
};

export function loading_state(state = INIT_STATE, action) {

  switch (action.type) {
    case LODING_STATE: {
      return {
        ...state,
        loading: action.payload
      };
    }
    default:
      return state;
  }
}
