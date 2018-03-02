import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import App from './components/App';
import kanbanApp from './reducers/reducers';
import storage from '../app/libs/storage';
if (process.env.NODE_ENV !== 'production') {
    React.Perf = require('react-addons-perf');
}
const APP_STORAGE = 'Kanban App';

const store = createStore(
    kanbanApp,
    storage.get(APP_STORAGE) || {},
    process.env.NODE_ENV === 'production' ?
        null : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
    if(!storage.get('debug')) {
        storage.set(APP_STORAGE, store.getState());
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);
