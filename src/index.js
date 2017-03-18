import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

window.jQuery = $;
require('bootstrap');

import App from './App';
import appStore from './store';

window.Raven.config('https://f5427ee402e8415bbe7475afc3551eb8@sentry.io/146783').install();

useStrict(true);

ReactDOM.render(
    <App store={appStore}/>,
    document.getElementById('root')
);
