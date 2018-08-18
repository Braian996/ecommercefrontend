// Dependencies
import React from 'react';
import {Route, Switch} from  'react-router-dom';

// Components
import App from './components/App';
import Customers from './components/Customers/Customers';
import Purchase from './components/Purchase/Purchase';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/" component={Purchase}/>
            <Route path="/Customers" component={Customers}/>
        </Switch>
    </App>;


export default AppRoutes;