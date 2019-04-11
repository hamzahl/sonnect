import { ADD_FRIEND } from '../actions/types';
import isEmpty from '../../util/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_FRIEND:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default :
      return state;
  }
}