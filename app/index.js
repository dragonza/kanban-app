import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import App from './components/App';
import kanbanApp from './reducers/reducers';

if (process.env.NODE_ENV !== 'production') {
    React.Perf = require('react-addons-perf');
}

const store = createStore(
    kanbanApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(store);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);
