import {
  GET_TIME_SUCCESS,
  GET_TIME_FAILURE
} from '../actions/types';

const init_time = {
  current_day: '',
  current_time: '',
}

export function date_time(state = init_time, action) {
  switch (action.type) {
    case GET_TIME_SUCCESS:
      return {
        ...state,
        current_day: action.payload.formatDate,
        current_time: action.payload.time
      };
    case GET_TIME_FAILURE:
      return {
        ...state,
        current_day: 'error',
        current_time: 'error'
      };
    default:
      return { ...state }
  }
}