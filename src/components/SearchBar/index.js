import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  artistDataFetch,
  artistDataClear,
} from '../../store/actions/artistDataActions';
import {currentSongDataClear} from '../../store/actions/currentSongActions';
import './styles.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick = (event) => {
    const {value} = this.state;
    const {
      fetchArtistData,
      clearArtistData,
      clearCurrentSongData,
    } = this.props;
    event.preventDefault();
    clearCurrentSongData();
    if (value) {
      fetchArtistData(value);
    } else {
      clearArtistData();
    }
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  render() {
    const {value} = this.state;
    return (
      <div className="search-bar">
        <form className="search-bar__form" onSubmit={this.handleClick}>
          <input
            className="search-bar__input"
            type="text"
            placeholder="Search by artists..."
            value={value}
            onChange={this.handleChange}
          />
          <input className="search-bar__button" type="submit" value=""/>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  fetchArtistData: PropTypes.func.isRequired,
  clearArtistData: PropTypes.func.isRequired,
  clearCurrentSongData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    artistData: state.artistData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArtistData: (url) => dispatch(artistDataFetch(url)),
    clearArtistData: () => dispatch(artistDataClear()),
    clearCurrentSongData: () => dispatch(currentSongDataClear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
