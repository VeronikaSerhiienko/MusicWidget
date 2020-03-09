import * as actionTypes from '../actions/currentSongActions';
const initialState = {
  id: 1,
  loaded: false,
  loading: false,
  error: false,
  data: []
}

const currentSongReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CURRENT_SONG_DATA_SET:
    console.log(1234, action);
      return {
        ...state,
        id: action.id
      }

    case actionTypes.CURRENT_SONG_LOAD:
      return {
        ...state,
        loaded: false,
        loading: true,
      }
    case actionTypes.CURRENT_SONG_LOAD_SUCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        data: action.data,
        error: false
      }
    case actionTypes.CURRENT_SONG_LOAD_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        data: [],
        error: action.data
      }
    default:
      return state;
  }
};
export default currentSongReducer;
