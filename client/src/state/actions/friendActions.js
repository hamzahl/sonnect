import axios from 'axios';

import {
  ADD_FRIEND,
} from './types'

export const addPost = (id) => dispatch => {
  alert(id + 'works');
  // axios
  //   .post('/api/posts', postData)
  //   .then(res =>
  //     dispatch({
  //       type: ADD_POST,
  //       payload: res.data
  //     })
  //   )
  //   .catch(err =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     })
  //   );
};