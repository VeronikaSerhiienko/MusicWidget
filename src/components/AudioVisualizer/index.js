import React, { useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classnames from 'classnames';
import InputRange from 'react-input-range';
import './styles.scss';

import { currentSongDataSet } from '../../store/actions/currentSongActions';

const useCompare = (val) => {
    const prevVal = usePrevious(val)
    return JSON.stringify(prevVal) !== JSON.stringify(val)
}

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const AudioVisualizer = ({
  playState,
  progress,
  volumeLevel,
  loading,
  onPlayBtnClick,
  onVolumeChange,
  onStopBtnClick,
  onProgressClick,
  currentSong,
  currentSongDataSet,
  artistData,
  artistData: {data: artistDataArray},
  currentSong: {data, id: currentSongId}
}) => {
  const currentSongData = getCurrentSongData();
  console.log(123, currentSongData);
  const { preview, album, artist, title, index} = currentSongData;
  const currentSongCoverSmallUrl = album && album.cover_small ? album.cover_small : '';
  const currentSongCoverMediumUrl = album && album.cover_small ? album.cover_medium : '';
  const currentSongArtistName =  artist && artist.name ? artist.name : 'Artist name';
  const currentSongPreviewUrl = preview ? preview : '';
  const currentSongTitle = title ? title : 'Song title';
  const canvasRef = React.createRef();
  const hasCurrentSongPreviewUrlChanged = useCompare(preview);
  const artistDataArrayLength = artistDataArray.length;
  const isBackwardButton = index > 0;
  const isForwardButton = index < artistDataArrayLength -1;

  useEffect(() => {
    if (hasCurrentSongPreviewUrlChanged ) {
      onStopBtnClick();
      onPlayBtnClick({currentSongPreviewUrl: currentSongPreviewUrl, frequencyC: canvasRef.current });
    }
  });

  function getCurrentSongData() {
    const currentSongIndex = artistDataArray.findIndex((item) => item.id === currentSongId);
    const currentSong = artistDataArray[currentSongIndex];
    return {...currentSong, index: currentSongIndex};
  }

  function onBackwardForwardBtnClick(type) {
    let newSong;
    switch(type) {
      case 'backward':
        newSong = getPreviuosSong();
        break;

      case 'forward':
        newSong = getNextSong();
        break;

      default:
        break;
    }
    currentSongDataSet(newSong.id);
  }

  function getPreviuosSong() {
    return artistDataArray[index - 1];
  }

  function getNextSong() {
    return artistDataArray[index + 1];
  }


  return(
    <>
      <div className="visualizing-container">
        <div className="visualizing-container__pair">
          <div className="visualizing-container__cover-wrapper">
            {currentSongCoverSmallUrl && (
              <picture>
                <source media="(min-width: 600px)" srcSet={currentSongCoverMediumUrl} />
                <source media="(min-width: 320px)" srcSet={currentSongCoverSmallUrl} />
                <img src={currentSongCoverSmallUrl} alt="Cover image" />
              </picture>
            )}
          </div>
          <div className="visualizing-container__bars-wrapper">
            <canvas className="frequency-bars" width="1024" height="100" ref={canvasRef}></canvas>
          </div>
        </div>

        <div
          className={classnames({
            'visualizing-container__progress-bar-wrapper': true,
            'visualizing-container__progress-bar-wrapper--not-allowed': !currentSongPreviewUrl
          })}
          onClick={onProgressClick}>
          <div
            className="visualizing-container__progress"
            role="progressbar"
            style={{width: `${progress}%`}}
            aria-valuemax="100"
          >
          </div>
        </div>

        <div className="visualizing-container__controls-wrapper">
          <div className="visualizing-container__controls">

            <button
              type="button"
              className="visualizing-container__button visualizing-container__button--backward"
              onClick={() => onBackwardForwardBtnClick('backward')}
              disabled={!currentSongPreviewUrl || !isBackwardButton}
            />

            <button
              type="button"
              className={classnames({
                'visualizing-container__button': true,
                'visualizing-container__button--play': playState === 'play',
                'visualizing-container__button--pause': playState !== 'play'
              })}
              onClick={
                playState === 'play' ?
                () => onPlayBtnClick({currentSongPreviewUrl: currentSongPreviewUrl, frequencyC: canvasRef.current }) :
                onStopBtnClick
              }
              disabled={!currentSongPreviewUrl}
            />

            <button
              type="button"
              className="visualizing-container__button visualizing-container__button--forward"
              onClick={() => onBackwardForwardBtnClick('forward')}
              disabled={!currentSongPreviewUrl || !isForwardButton}
            />
          </div>

          <div className="visualizing-container__additional-wrapper">
            <div className="visualizing-container__description">
              <div className="visualizing-container__description-poster">
                {currentSongCoverSmallUrl && (
                  <img src={currentSongCoverSmallUrl} alt="Poster image" />
                )}
              </div>
              <div className="visualizing-container__description-title">
                <p>{currentSongTitle}</p>
                <p>{currentSongArtistName}</p>
              </div>
            </div>

            <div className="visualizing-container__volume-wrapper">
              <button
                type="button"
                className={classnames({
                  'visualizing-container__button': true,
                  'visualizing-container__button--volume': volumeLevel,
                  'visualizing-container__button--mute': !volumeLevel,
                })}
                onClick={
                  volumeLevel ?
                  () => onVolumeChange({ max: 0 }) :
                  () => onVolumeChange({ max: 100 })
                }
                disabled={!currentSongPreviewUrl}
              />
              <div className="range-select">
                <InputRange
                  maxValue={100}
                  minValue={0}
                  value={{ min: 0, max: volumeLevel }}
                  onChange={onVolumeChange}
                  disabled={!currentSongPreviewUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

  const mapStateToProps = state => ({
    currentSong: state.currentSong,
    artistData: state.artistData
  });

  const mapDispatchToProps = (dispatch) => {
    return {
      currentSongDataSet: (id) => dispatch(currentSongDataSet(id))
    };
  }

  AudioVisualizer.propTypes = {
    currentSong: PropTypes.object.isRequired,
    artistData: PropTypes.object.isRequired,
    currentSongDataSet: PropTypes.func.isRequired,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(AudioVisualizer);
