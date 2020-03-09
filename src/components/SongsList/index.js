import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SongsListItem from '../SongsListItem';
import {currentSongDataSet} from '../../store/actions/currentSongActions';
import Loader from '../Loader';
import './styles.scss';

const SongsList = ({
  artistData,
  currentSong,
  currentSongDataSet,
}) => {
  const {
    loading,
    data,
  } = artistData;

  if ( loading ) {
    return (
      <Loader />
    );
  }

  return (
    <div className="songs-list">
      {data.length ? (
        <ul className="songs-list__list">
          {data.map((item, index) => {
            const {
              id,
              title,
              duration,
            } = item;
            return (
              <SongsListItem
                key={id}
                title={title}
                duration={duration}
                index={index + 1}
                id={id}
                isCurrent={currentSong.id === id}
                clickHandle={(id) => currentSongDataSet(id)}
              />
            );
          })}
        </ul>
        ) : (
          <p className="songs-list__empty">
            No data. Start to seach songs by artist...
          </p>
        )
      }
    </div>
  );
};

SongsList.propTypes = {
  artistData: PropTypes.object.isRequired,
  currentSong: PropTypes.object.isRequired,
  currentSongDataSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  artistData: state.artistData,
  currentSong: state.currentSong,
});

const mapDispatchToProps = (dispatch) => ({
  currentSongDataSet: (id) => dispatch(currentSongDataSet(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
