import React from 'react';
import { compose, lifecycle, withState, withHandlers, withProps } from 'recompose';
import { loadFile } from '../../utils';
import AudioVisualizer from '../AudioVisualizer';

export const AudioDataContainer = compose(
  withState('volumeLevel', 'setVolumeLevel', 30),
  withState('progress', 'setProgress', 0),
  withState('playState', 'setPlayState', 'play'),
  withState('loading', 'setLoading', false),
  withState('player', 'setPlayer', null),
  withState('url', 'setUrl', null),
  withState('audionState', 'setAudionState', {
    startedAt: null,
    pausedAt: null,
    isPause: true,
    playback: 0,
    duration: 0,
  }),
  withProps(({ audionState, setAudionState }) => ({
    changeAudionState: newState => setAudionState({ ...audionState, ...newState }),
  })),
  withHandlers({
    onPlayBtnClick: (props) => async ({ currentSongPreviewUrl, frequencyC}) => {
      const { player, url, audionState } = props;

      try {

        if( url !== currentSongPreviewUrl) {
          props.setUrl(currentSongPreviewUrl);
          props.setPlayer(null);
        }

        if(!player || url !== currentSongPreviewUrl) {
          props.setLoading(true);
          const newPlayer = await loadFile(currentSongPreviewUrl, {
            frequencyC
          }, {
            fillStyle: '#fff', // background
            strokeStyle: '#10b1dc', // line color
            lineWidth: 1,
            fftSize: 16384 // delization of bars from 1024 to 32768
          });

          props.setLoading(false);
          props.setPlayer(newPlayer);
          props.changeAudionState({
            startedAt: Date.now(),
            isPause: false,
            duration: parseInt(newPlayer.duration, 10),
          });

          newPlayer.play(0);
          return props.setPlayState('stop');
        }

        props.changeAudionState({
          startedAt: Date.now() - audionState.pausedAt,
          isPause: false,
        });

        player.play(audionState.pausedAt / 1000);

        return props.setPlayState('stop');
      } catch (e) {
        props.setLoading(false);
        console.log(e);
      }
    },
    onStopBtnClick: props => () => {
      const { player, audionState  } = props;
      props.changeAudionState({
        pausedAt:  Date.now() - audionState.startedAt,
        isPause: true,
      });
      player && player.stop();
      props.setPlayState('play');
    },
    onClearBtnClick: props => () => {
      props.setPlayer(null);
      props.setUrl(null);
      props.changeAudionState({
        startedAt: null,
        pausedAt: null,
        isPause: true,
        playback: 0,
        duration: 0
      });
      props.setProgress(0);
      props.setPlayState('play');
      props.setVolumeLevel(30);
    },
    onVolumeChange: props => ({ max }) => {
      const value = max / 100;
      const level = value > 0.5 ? value * 4 : value * -4;
      props.player.setVolume(level || -1);

      props.setVolumeLevel(max || 0)
    },
    onProgressClick: props => (e) => {
      const { player, audionState } = props;

      const rate = (e.clientX * 100) / e.target.offsetWidth;
      const playbackTime = (audionState.duration * rate) / 100;

      player && player.stop();
      player && player.play(playbackTime);

      props.setProgress(parseInt(rate, 10));
      props.changeAudionState({
        startedAt: Date.now() - playbackTime * 1000,
        playback: parseInt(playbackTime, 10)
      });
      return props.setPlayState('stop');
    }
  }),
  lifecycle({
    componentDidMount() {
      setInterval(() => {
        const { startedAt, isPause, duration } = this.props.audionState;
        if(startedAt && !isPause) {
          const playbackTime = parseInt((Date.now() - startedAt) / 1000, 10);
          const rate = parseInt((playbackTime * 100) / duration, 10);
          if (playbackTime <= duration || rate <= 100) {
            this.props.changeAudionState({playback: playbackTime});
            this.props.setProgress(rate);
          } else {
            this.props.changeAudionState({
              startedAt: null,
              pausedAt: null,
              isPause: true,
              playback: 0
            });
            this.props.setProgress(0);
            this.props.setPlayState('play')
          }
        }
      },1000);
    }
  })
)(AudioVisualizer);
