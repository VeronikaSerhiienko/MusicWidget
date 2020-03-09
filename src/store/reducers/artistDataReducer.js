import * as actionTypes from '../actions/artistDataActions';

const initialState = {
  loaded: false,
  loading: false,
  error: false,
  data: [],
};

const artistDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ARTIST_DATA_LOAD:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case actionTypes.ARTIST_DATA_LOAD_SUCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: false,
        data: action.data.data,
      };
    case actionTypes.ARTIST_DATA_LOAD_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        data: [],
        error: action.error,
      };
    case actionTypes.ARTIST_DATA_CLEAR:
      return {
        ...state,
        loaded: false,
        loading: false,
        data: [],
        error: false,
      };
    default:
      return state;
  }
};

export default artistDataReducer;
