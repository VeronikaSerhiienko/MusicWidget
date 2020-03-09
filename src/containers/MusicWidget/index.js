import React from "react";
import { connect } from 'react-redux';
import SongsList from '../../components/SongsList';
// import AudioAnalyser from '../../components/AudioAnalyser';
import { AudioDataContainer } from '../../components/AudioDataContainer';
import './styles.scss';

class MusicWidget extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //       value: ''
  //     };
  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleClick = this.handleClick.bind(this);
  // }

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
// const mapDispatchToProps = (dispatch) => {
//   return {
//       fetchData: (url) => dispatch(artistDataFetch(url))
//   };
// }

export default connect(mapStateToProps)(MusicWidget);
