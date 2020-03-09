export const CURRENT_SONG_DATA_SET = 'CURRENT_SONG_DATA_SET';

export function currentSongDataSet(id) {
    return {
        type: CURRENT_SONG_DATA_SET,
        id
    };
}

export const CURRENT_SONG_LOAD = 'CURRENT_SONG_LOAD';
export const CURRENT_SONG_LOAD_FAIL = 'CURRENT_SONG_LOAD_FAIL';
export const CURRENT_SONG_LOAD_SUCESS = 'CURRENT_SONG_LOAD_SUCESS';

export function currentSongLoad() {
    return {
        type: CURRENT_SONG_LOAD,
    };
}

export function currentSongLoadSuccess(data) {
    return {
        type: CURRENT_SONG_LOAD_SUCESS,
        data
    };
}

export function currentSongLoadFail() {
    return {
        type: CURRENT_SONG_LOAD_FAIL
    };
}

export function currentSongFetch(id) {
    return (dispatch) => {
        dispatch(currentSongLoad());
        fetch("https://deezerdevs-deezer.p.rapidapi.com/track/" + id, {
          	"method": "GET",
          	"headers": {
          		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          		"x-rapidapi-key": "76963169d2msh5565e8e2e5e6e7cp10f36djsn7e7fa0ffe312"
          	}
          })
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response;
          })
          .then((response) => response.json())
          .then((data) =>   dispatch(currentSongLoadSuccess(data)))
          .catch(() => dispatch(currentSongLoadFail()));
    };
}
