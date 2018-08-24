// Dependencies
import React from 'react';
import {Route, Switch} from  'react-router-dom';

// Components
import App from './components/App';
import Customers from './components/Customers/Customers';
import Products from './components/Products/Products';
import Purchase from './components/Purchase/Purchase';
import CreateCustomer from './components/CreateCustomer/CreateCustomer';
import CreateProduct from './components/CreateProduct/CreateProduct';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/" component={Purchase} />
            <Route exact path="/Customers" component={Customers} />
            <Route exact path="/Products" component={Products} />
            <Route exact path="/CreateCustomer" component={CreateCustomer} />
            <Route exact path="/CreateProduct" component={CreateProduct} />
        </Switch>
    </App>;


export default AppRoutes;