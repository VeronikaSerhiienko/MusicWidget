import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import songlogo from './images/song-logo.png';
import {timeLengthConverter} from '../../utils';
import './styles.scss';

const SongsListItem = ({
  id,
  index,
  title,
  duration,
  isCurrent,
  clickHandle,
}) => {
  const durationConverted = timeLengthConverter(duration);
  return (
    <li
      className={classnames({
        'songs-list__row': true,
        'songs-list__row--current': isCurrent,
      })}
      onClick={() => clickHandle(id)}
      key={id}
    >
      <div className="songs-list__col songs-list__col--index">
        {!isCurrent ? (
          <span>
            {index}
          </span>
        ) : (
          <img src={songlogo} alt="song logo" />
        )}
      </div>
      <div className="songs-list__col songs-list__col--title">
        <span>
          {title}
        </span>
      </div>
      <div className="songs-list__col songs-list__col--length">
        <span>
          {durationConverted}
        </span>
      </div>
    </li>
  );
};

SongsListItem.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  clickHandle: PropTypes.func.isRequired,
};

export default SongsListItem;
