import React from 'react';
import SearchBar from '../../components/SearchBar';
import playerLogo from './images/logo.png';
import './styles.scss';

const Header = () => (
  <header className="header">
    <div className="header__logo-wrapper">
      <img className="header__logo" src={playerLogo} alt="widget logo" />
    </div>
    <SearchBar />
  </header>
);

export default Header;
