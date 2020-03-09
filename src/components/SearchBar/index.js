import React from "react";
import { connect } from 'react-redux';
import { artistDataFetch, artistDataClear } from '../../store/actions/artistDataActions';
import './styles.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { value } = this.state;
    const { fetchData, clearData } = this.props;
    event.preventDefault();
    if (value) {
      fetchData(value);
    } else {
      clearData();
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const { value } = this.state;
      return (
        <div className="search-bar">
          <form className="search-bar__form" onSubmit={this.handleClick}>
            <input className="search-bar__input" type="text" placeholder="Search by artists..." value={value} onChange={this.handleChange} />
            <input className="search-bar__button" type="submit" value=""/>
        </form>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
      artistData: state.artistData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(artistDataFetch(url)),
      clearData: () => dispatch(artistDataClear())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
