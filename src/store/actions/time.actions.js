import {
    GET_TIME_SUCCESS,
    GET_TIME_FAILURE
} from './types';

import { userService } from './user.service';
import { API } from '../../config/const';

export const timeActions = {
    time
};

function time() {
    return dispatch => {
        let apiEndPoint = API.TIME;
        userService.get(apiEndPoint)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.toString()))
            );
    };
    function success(time) { return { type: GET_TIME_SUCCESS, payload: time } }
    function failure(error) { return { type: GET_TIME_FAILURE, payload: error } }
}