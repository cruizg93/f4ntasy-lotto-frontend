import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../actions/types';
import { userService } from '../actions/user.service'

const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const initialize = {
  currentUser: currentUser || null,
  role: currentUser ? userService.type_user(currentUser.roles) : '',
  loginState: (currentUser) ? true : false,
  loginFail: false,
  firstConnection: true
}

export function user(state = initialize, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        role: userService.type_user(action.payload.currentUser.roles),
        loginState: true,
        loginFail: false,
        firstConnection: action.payload.firstConnection
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginState: false,
        loginFail: true
      };
    default:
      return { ...state }
  }
}