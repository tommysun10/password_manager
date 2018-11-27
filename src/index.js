import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import { BrowserRouter } from 'react-router-dom'
import PasswordManager from './Components/PasswordManager';

ReactDOM.render((
    <BrowserRouter>
        <PasswordManager />
    </BrowserRouter>
    ), document.getElementById('root')
);

