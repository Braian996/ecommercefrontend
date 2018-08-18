// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Containers
import Header from '../containers/Header/Header';
import Content from '../containers/Content/Content';

// Data
import menu from '../data/menu';

// Assets
import '../css/App.css';

class App extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    };

    render() {
        const {children} = this.props;

        return (
            <div className="App">
                <Header items={menu}/>
                <Content body={children}/>
            </div>
        );
    }
}

export default App;
