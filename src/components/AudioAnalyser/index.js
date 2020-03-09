import React from 'react';
import axios from 'axios';
import AudioVisualiser from '../AudioVisualiser';
import { loadFile } from '../../utils';

class AudioAnalyser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioData: new Uint8Array(0),
      // play: false
    };
    // this.tick = this.tick.bind(this);
    this.audioRef = React.createRef();
    this.canvas = React.createRef();
  }

  // async componentDidMount() {
  //   // load audio file from server
  //   const response = await axios.get('https://cdns-preview-d.dzcdn.net/stream/c-d5a91f3cf9c2b399c9734223623a3c67-4.mp3', {
  //      responseType: 'arraybuffer', // <- important param
  //   });
  //   // create audio context
  //   this.audioContext = new (window.AudioContext ||
  //     window.webkitAudioContext)();
  //   this.analyser = this.audioContext.createAnalyser();
  //   const gainNode = this.audioContext.createGain();
  //   // create audioBuffer (decode audio file)
  //   const audioBuffer = await this.audioContext.decodeAudioData(response.data);
  //   this.analyser.fffSize = 16384;
  //   this.frequencyDataArray = new Uint8Array(this.analyser.frequencyBinCount);
  //   let source = null;
  //   // this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  //   // this.source = this.audioContext.createBufferSource();
  //   // this.source.buffer = audioBuffer;
  //   // this.source.connect(this.audioContext.destination);
  //   // // this.source = this.audioContext.createMediaElementSource(this.audioRef.current);
  //   // this.source.connect(this.analyser);
  //   // this.rafId = requestAnimationFrame(this.tick);
  // }

  async play() {
    const frequencyC = this.canvas.current;
    // load audio file from server
    const newPlayer = await loadFile('https://cdns-preview-d.dzcdn.net/stream/c-d5a91f3cf9c2b399c9734223623a3c67-4.mp3', {
      frequencyC
    }, {
      fillStyle: 'rgb(250, 250, 250)', // background
      strokeStyle: 'rgb(251, 89, 17)', // line color
      lineWidth: 1,
      fftSize: 16384 // delization of bars from 1024 to 32768
    });
    // this.audioRef.current.play();
  }

  // tick() {
  //   // console.log('here', this.dataArray);
  //   this.analyser.getByteTimeDomainData(this.frequencyDataArray);
  //   // this.setState({ audioData: this.dataArray });
  //   this.rafId = requestAnimationFrame(this.tick);
  // }

  // componentWillUnmount() {
  //   cancelAnimationFrame(this.rafId);
  //   this.analyser.disconnect();
  //   this.source.disconnect();
  // }

  render() {
    return (<div>
      <AudioVisualiser audioData={this.state.audioData} />;
      <audio ref={this.audioRef} src="https://cdns-preview-d.dzcdn.net/stream/c-d5a91f3cf9c2b399c9734223623a3c67-4.mp3" controls autoPlay preload="auto" loop type="audio/mpeg"/>
      <button onClick={this.play} />
      <canvas width="300" height="300" ref={this.canvas} />
    </div>)
  }
}

export default AudioAnalyser;
