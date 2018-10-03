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
import ProductByCustomer from './components/ProductByCustomer/ProductByCustomer';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/" component={Purchase} />
            <Route exact path="/Customers" component={Customers} />
            <Route exact path="/Products" component={Products} />
            <Route exact path="/CreateCustomer" component={CreateCustomer} />
            <Route exact path="/CreateProduct" component={CreateProduct} />
            <Route exact path="/ProductsOfCustomer/:customerId?" component={ProductByCustomer} />
            <Route exact path="/UpdateProduct/:productId?" component={CreateProduct} />
            <Route exact path="/UpdateCustomer/:customerId?" component={CreateCustomer} />
        </Switch>
    </App>;


export default AppRoutes;