import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import AudioAnalyser from '../AudioAnalyser';
// import { artistDataFetch } from '../../store/actions/artistDataActions';
import './styles.scss';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }
  componentDidMount() {
    const node = this.audioRef.current;
    console.log(12, node);
  }

  render() {
    const {
      currentSong
    } = this.props;
    const audioSrc = currentSong.loaded && currentSong.data ? currentSong.data.preview : "https://cdns-preview-d.dzcdn.net/stream/c-d5a91f3cf9c2b399c9734223623a3c67-4.mp3";
      return (
        <div className="audio-player">
          <audio ref={this.audioRef} src={audioSrc} controls autoPlay preload="auto" loop type="audio/mpeg"/>
          <AudioAnalyser audio={this.audioRef.current}/>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  currentSong: state.currentSong,
  artistData: state.artistData
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     currentSongUpdate: (id) => dispatch(currentSongUpdate(id))
//   };
// }

AudioPlayer.propTypes = {
  artistData: PropTypes.object.isRequired,
  currentSong:  PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(AudioPlayer);

// import React from "react";
// import ReactDOM from "react-dom";
// // import "./styles.css";
//
// const campfireStory = "https://cdns-preview-3.dzcdn.net/stream/c-317ef6e317bcf3f420f6e8d996c781fc-5.mp3";
// const bootingUp = "https://cdns-preview-6.dzcdn.net/stream/c-6f076a8140f9a53846558c557e08b3f7-15.mp3";
//
// function getTime(time) {
//   if (!isNaN(time)) {
//     return (
//       Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
//     );
//   }
// }
//
// const TRACKS = [
//   { id: 1, title: "Campfire Story" },
//   { id: 2, title: "Booting Up" }
// ];
//
//
// export default class AudioPlayer extends React.Component {
//   constructor(props){
//      super(props);
//      this.state = {
//        selectedTrack: null,
//        player: "stopped",
//        currentTime: null,
//        duration: null
//      }
//   };
//
//   componentDidMount() {
//     this.player.addEventListener("timeupdate", e => {
//       this.setState({
//         currentTime: e.target.currentTime,
//         duration: e.target.duration
//       });
//     });
//   }
//
//   componentWillUnmount() {
//     this.player.removeEventListener("timeupdate", () => {});
//   }
//
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.selectedTrack !== prevState.selectedTrack) {
//       let track;
//       switch (this.state.selectedTrack) {
//         case "Campfire Story":
//           track = campfireStory;
//           break;
//         case "Booting Up":
//           track = bootingUp;
//           break;
//         default:
//           break;
//       }
//       if (track) {
//         this.player.src = track;
//         this.player.play();
//         this.setState({ player: "playing", duration: this.player.duration });
//       }
//     }
//     if (this.state.player !== prevState.player) {
//       if (this.state.player === "paused") {
//         this.player.pause();
//       } else if (this.state.player === "stopped") {
//         this.player.pause();
//          this.player.currentTime = 0;
//         this.setState({ selectedTrack: null });
//       } else if (
//         this.state.player === "playing" &&
//         prevState.player === "paused"
//       ) {
//         this.player.play();
//       }
//     }
//     if (
//       this.state.duration &&
//       !isNaN(this.state.duration) &&
//       this.state.duration === this.state.currentTime
//     ) {
//       const currentTrackIndex = TRACKS.findIndex(
//         track => track.title === this.state.selectedTrack
//       );
//       const tracksAmount = TRACKS.length - 1;
//       if (currentTrackIndex === tracksAmount) {
//         this.setState({
//           selectedTrack: null,
//           player: "stopped",
//           currentTime: null,
//           duration: null
//         });
//       } else {
//         this.handleSkip("next");
//       }
//     }
//   }
//
//   handleSkip = direction => {
//     const currentTrackIndex = TRACKS.findIndex(
//       track => track.title === this.state.selectedTrack
//     );
//     const tracksAmount = TRACKS.length - 1;
//     if (direction === "previous") {
//       const previousTrack =
//         currentTrackIndex === 0 ? tracksAmount : currentTrackIndex - 1;
//       const trackToPlay = TRACKS[previousTrack];
//       this.setState({ selectedTrack: trackToPlay.title });
//     } else if (direction === "next") {
//       const nextTrack =
//         currentTrackIndex === tracksAmount ? 0 : currentTrackIndex + 1;
//       const trackToPlay = TRACKS[nextTrack];
//       this.setState({ selectedTrack: trackToPlay.title, duration: null });
//     }
//   };
//
//   setTime = time => {
//     this.player.currentTime = time;
//   };
//
//   render() {
//     const list = TRACKS.map(item => {
//       return (
//         <li
//           key={item.id}
//           onClick={() => this.setState({ selectedTrack: item.title })}
//           style={{
//             fontWeight: item.title === this.state.selectedTrack && "bold"
//           }}
//         >
//           {item.title}
//         </li>
//       );
//     });
//
//     const currentTime = getTime(this.state.currentTime);
//     const duration = getTime(this.state.duration);
//
//     return (
//       <>
//         <h1>My Little Player</h1>
//         <div className="player">
//           <ul className="tracklist">{list}</ul>
//           <TimeBar
//             setTime={this.setTime}
//             currentTime={this.state.currentTime}
//             duration={this.state.duration}
//           />
//           {this.state.player !== "stopped" && (
//             <div className="buttons">
//               <button onClick={() => this.handleSkip("previous")}>
//                 Previous
//               </button>
//               {this.state.player === "paused" && (
//                 <button onClick={() => this.setState({ player: "playing" })}>
//                   Play
//                 </button>
//               )}
//               {this.state.player === "playing" && (
//                 <button onClick={() => this.setState({ player: "paused" })}>
//                   Pause
//                 </button>
//               )}
//               <button onClick={() => this.setState({ player: "stopped" })}>
//                 Stop
//               </button>
//               <button onClick={() => this.handleSkip("next")}>Skip</button>
//             </div>
//           )}
//         </div>
//         <audio ref={ref => (this.player = ref)} />
//       </>
//     );
//   }
// }
//
// function TimeBar({ currentTime, duration, setTime }) {
//   const formattedCurrentTime = getTime(currentTime);
//   const formattedDuration = getTime(duration);
//   const sBits = [];
//   let count = 0;
//   while (count < duration) {
//     sBits.push(count);
//     count++;
//   }
//   const seconds = sBits.map(second => {
//     return (
//       <div
//         key={second}
//         onClick={() => setTime(second)}
//         style={{
//           float: "left",
//           cursor: "pointer",
//           height: "30px",
//           width: `${300 / Math.round(duration)}px`,
//           background:
//             currentTime && Math.round(currentTime) === second
//               ? "white"
//               : "black",
//           transition: "all 0.5s ease-in-out"
//         }}
//       />
//     );
//   });
//   return (
//     <div className="timebar">
//       <div className="bar">{seconds}</div>
//       {currentTime ? (
//         <div className="time">
//           {formattedCurrentTime} / {formattedDuration}
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }
