// Dependencies
import React from 'react';
import {Route, Switch} from  'react-router-dom';

// Components
import App from './components/App';
import Customers from './components/Customers/Customers';
import Products from './components/Products/Products';
import Purchase from './components/Purchase/Purchase';
import CreateCustomer from './components/CreateCustomer/CreateCustomer';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/" component={Purchase} />
            <Route exact path="/Customers" component={Customers} />
            <Route exact path="/Products" component={Products} />
            <Route exact path="/CreateCustomer" component={CreateCustomer} />
        </Switch>
    </App>;


export default AppRoutes;