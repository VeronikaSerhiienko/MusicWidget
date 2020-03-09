import React from 'react';
import SongsList from '../../components/SongsList';
import {AudioDataContainer} from '../../components/AudioDataContainer';
import './styles.scss';

const MusicWidget = () => (
  <div className="music-widget">
    <AudioDataContainer />
    <SongsList />
  </div>
);

export default MusicWidget;
