import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import formReducer from './src/reducer/formReducer';
import Forms from './src/form/Forms';

const store = createStore(formReducer);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Forms/>
        </div>
    </Provider>,
    document.getElementById('root')
);