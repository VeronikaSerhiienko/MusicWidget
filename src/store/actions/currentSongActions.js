export const CURRENT_SONG_DATA_SET = 'CURRENT_SONG_DATA_SET';
export const CURRENT_SONG_DATA_CLEAR = 'CURRENT_SONG_DATA_CLEAR';

export const currentSongDataSet = (id) => ({
  type: CURRENT_SONG_DATA_SET,
  id,
});

export const currentSongDataClear = () => ({
  type: CURRENT_SONG_DATA_CLEAR,
});
