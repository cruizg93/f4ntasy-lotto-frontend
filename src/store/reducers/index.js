import { combineReducers } from 'redux';

import { user } from './user.reducer';
import Ui from './Ui';
import { date_time } from './time.reducer';

const rootReducer = combineReducers({
  user,
  ui: Ui,
  date_time
});

export default rootReducer;