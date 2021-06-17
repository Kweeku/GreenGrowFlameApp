import React, { Component } from 'react';
import App from "./components/main/main";

import createStore from './Redux'
import { Provider } from 'react-redux'
const store = createStore()

class AppProvider extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default AppProvider