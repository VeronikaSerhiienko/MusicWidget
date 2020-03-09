import React, { Component } from "react";
import Header from './containers/Header';
import MusicWidget from './containers/MusicWidget';

import './App.scss';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <MusicWidget />
            </div>
        );
    }
}

export default App;
