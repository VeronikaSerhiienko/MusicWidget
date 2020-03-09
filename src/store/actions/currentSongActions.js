export const CURRENT_SONG_DATA_SET = 'CURRENT_SONG_DATA_SET';
export const CURRENT_SONG_DATA_CLEAR = 'CURRENT_SONG_DATA_CLEAR';

export function currentSongDataSet(id) {
    return {
        type: CURRENT_SONG_DATA_SET,
        id
    };
}

export function currentSongDataClear() {
    return {
        type: CURRENT_SONG_DATA_CLEAR
    };
}
