import {
    HIDE_MESSAGE,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    TOGGLE_COLLAPSED_NAV,
    ON_INIT_BEGIN,
    ON_INIT_END,
    WINDOW_WIDTH,
} from './types';

export const onInitBegin = () => {
    return {
        type: ON_INIT_BEGIN,
    };
};

export const onInitEnd = () => {
    return {
        type: ON_INIT_END,
    };
};

export const toggleCollapsedNav = (isNavCollapsed) => {
    return {
        type: TOGGLE_COLLAPSED_NAV,
        payload: isNavCollapsed
    };
};

export const updateWindowWidth = (width) => {
    return {
        type: WINDOW_WIDTH,
        payload: width
    };
}

export const showMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    };
};

export const showLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE,
    };
};
export const hideLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};
