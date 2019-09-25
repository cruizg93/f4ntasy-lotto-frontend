import {
    ON_INIT_BEGIN,
    ON_INIT_END,
    HIDE_MESSAGE,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    TOGGLE_COLLAPSED_NAV,
    FIXED_DRAWER,
    WINDOW_WIDTH,
    BACKGROUND_COLOR
} from '../actions/types';

const INIT_STATE = {
    initialization: true,
    loader: false,
    navCollapsed: false,
    drawerType: FIXED_DRAWER,
    width: window.innerWidth,
    alertMessage: {
        message: '',
        type: 'success'
    },
    showMessage: false,
    background: 'white'
};


export default (state = INIT_STATE, action) => {

    switch (action.type) {

        case BACKGROUND_COLOR: {
            return {
                ...state,
                background: action.payload
            };
        }

        case TOGGLE_COLLAPSED_NAV: {
            return {
                ...state,
                navCollapsed: action.payload
            };
        }

        case WINDOW_WIDTH: {
            return {
                ...state,
                width: action.payload
            };
        }

        case SHOW_MESSAGE: {
            return {
                ...state,
                alertMessage: action.payload,
                showMessage: true,
            }
        }

        case HIDE_MESSAGE: {
            return {
                ...state,
                alertMessage: {
                    message: '',
                    type: 'success',
                },
                showMessage: false,
            }
        }

        case ON_SHOW_LOADER: {
            return {
                ...state,
                loader: true
            }
        }

        case ON_HIDE_LOADER: {
            return {
                ...state,
                loader: false
            }
        }

        case ON_INIT_BEGIN: {
            return {
                ...state,
                initialization: true
            }
        }

        case ON_INIT_END: {
            return {
                ...state,
                initialization: false
            }
        }

        default:
            return state;
    }
}
