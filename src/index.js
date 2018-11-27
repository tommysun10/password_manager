import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import Navbar from './Components/navbar'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
    <BrowserRouter>
        <Navbar />
    </BrowserRouter>
    ), document.getElementById('root')
);

