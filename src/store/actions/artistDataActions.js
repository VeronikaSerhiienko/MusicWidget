export const ARTIST_DATA_LOAD = 'ARTIST_DATA_LOAD';
export const ARTIST_DATA_LOAD_FAIL = 'ARTIST_DATA_LOAD_FAIL';
export const ARTIST_DATA_LOAD_SUCESS = 'ARTIST_DATA_LOAD_SUCESS';
export const ARTIST_DATA_CLEAR = 'ARTIST_DATA_CLEAR';

export const artistDataLoad = () => ({
  type: ARTIST_DATA_LOAD,
});


export const artistDataLoadSuccess = (data) => ({
  type: ARTIST_DATA_LOAD_SUCESS,
  data,
});

export const artistDataLoadFail = (error) => ({
  type: ARTIST_DATA_LOAD_FAIL,
  error,
});

export const artistDataClear = () => ({
  type: ARTIST_DATA_CLEAR,
});

export const artistDataFetch = (query) => {
  return (dispatch) => {
    dispatch(artistDataLoad());
    fetch('https://deezerdevs-deezer.p.rapidapi.com/artist/' + query, {
      'method': 'GET',
      'headers': {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': '76963169d2msh5565e8e2e5e6e7cp10f36djsn7e7fa0ffe312',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      const {
        id
      } = data;
      return fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}/top?limit=50`, {
        'method': 'GET',
        'headers': {
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
          'x-rapidapi-key': '76963169d2msh5565e8e2e5e6e7cp10f36djsn7e7fa0ffe312'
        }
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json())
    .then((items) => {
      if (items.error) {
        throw Error(items.error.message);
      }
      dispatch(artistDataLoadSuccess(items))
    })
    .catch((error) =>
      dispatch(artistDataLoadFail(error.message))
    );
  };
}
