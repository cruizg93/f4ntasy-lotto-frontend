import { combineReducers } from 'redux';

import { user } from './user.reducer';
import Ui from './Ui';
import { date_time } from './time.reducer';
import { loading_state } from './loading.reduce';

const rootReducer = combineReducers({
  user,
  ui: Ui,
  date_time,
  loading_state
});

export default rootReducer;