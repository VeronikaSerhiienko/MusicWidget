import React from "react";
import { connect } from 'react-redux';
import SongsList from '../../components/SongsList';
import { AudioDataContainer } from '../../components/AudioDataContainer';
import './styles.scss';

class MusicWidget extends React.Component {
  render() {
    const { currentSong } = this.props;
    const currentSongPreview = currentSong.data ? currentSong.data.preview : '';
      return (
        <div className="music-widget">
        <AudioDataContainer currentSongPreview={currentSongPreview}/>
        <SongsList />
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
      artistData: state.artistData,
      currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(MusicWidget);
