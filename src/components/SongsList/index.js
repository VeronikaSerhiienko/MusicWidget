import React, { useState }  from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from 'classnames';
import SongsListItem from "../SongsListItem";
import Loader from "../Loader";
import './styles.scss';

import { currentSongDataSet } from '../../store/actions/currentSongActions';

function SongsList({ artistData, currentSongDataSet, currentSong }) {
  if ( artistData.loading ) {
    return (
      <Loader />
    )
  }

  const { data } = artistData;

  return (
    <div className="songs-list">
      {data.length ? (
        <ul className="songs-list__list">
          {data.map((item, index) => {
            const {
              id,
              title,
              duration
            } = item;
            return(
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
          <p className="songs-list__empty"> No data. Start to seach songs by artist... </p>
        )
      }
    </div>
  );
}

SongsList.propTypes = {
  artistData: PropTypes.object.isRequired,
  currentSongDataSet: PropTypes.func.isRequired,
  currentSongFetch: PropTypes.func.isRequired,
  currentSong: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  artistData: state.artistData,
  currentSong: state.currentSong
});

const mapDispatchToProps = (dispatch) => {
  return {
    currentSongDataSet: (id) => dispatch(currentSongDataSet(id)),
    currentSongFetch: (id) => dispatch(currentSongFetch(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
