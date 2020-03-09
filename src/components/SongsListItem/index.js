import React from 'react';
import PropTypes from "prop-types";
import classnames from 'classnames';
import songlogo from './images/song-logo.png';
import './styles.scss';

const SongsListItem = ({ id, index, title, duration, isCurrent, clickHandle }) => {
  const durationSec = duration % 60;
  const durationSecConverted = durationSec > 9 ? durationSec : `0${durationSec}`;
  return (
    <li
      className={classnames({
        'songs-list__row': true,
        'songs-list__row--current': isCurrent
      })}
      onClick={() => clickHandle(id)}
      key={id}
    >
      <div className="songs-list__col songs-list__col--index">
        {!isCurrent ?
          (
            <span>
              {index}
            </span>
          )
          :
          (
            <img src={songlogo} alt="song logo" />
          )
        }
      </div>
      <div className="songs-list__col songs-list__col--title">
        <span>
          {title}
        </span>
      </div>
      <div className="songs-list__col songs-list__col--length">
        <span>
          {Math.floor(duration / 60)}:{durationSecConverted}
        </span>
      </div>
    </li>
  );
};

SongsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  clickHandle: PropTypes.func.isRequired,
};

export default SongsListItem;
