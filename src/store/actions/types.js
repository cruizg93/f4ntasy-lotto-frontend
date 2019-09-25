/**
 * App Redux Action Types
 */
// Auth Actions
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

//Time
export const GET_TIME_SUCCESS = 'GET_TIME_SUCCESS';
export const GET_TIME_FAILURE = 'GET_TIME_FAILURE';

// Ui 
export const BACKGROUND_COLOR = 'background_color';

export const ON_INIT_BEGIN = 'on_init_begin';
export const ON_INIT_END = 'on_init_end';
export const SHOW_MESSAGE = 'show_message';
export const HIDE_MESSAGE = 'hide_message';
export const ON_SHOW_LOADER = 'on_show_loader';
export const ON_HIDE_LOADER = 'on_hide_loader';
export const FIXED_DRAWER = 'fixed_drawer';
export const COLLAPSED_DRAWER = 'collapsible';
export const TOGGLE_COLLAPSED_NAV = 'toggle_collapse_menu';
export const WINDOW_WIDTH = 'window-width';
