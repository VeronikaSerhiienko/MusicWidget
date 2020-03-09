import * as actionTypes from '../actions/currentSongActions';
const initialState = {
  id: null
}

const currentSongReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CURRENT_SONG_DATA_SET:
      return {
        ...state,
        id: action.id
      }

    case actionTypes.CURRENT_SONG_DATA_CLEAR:
      return {
        ...state,
        id: null
      }

    default:
      return state;
  }
};
export default currentSongReducer;
