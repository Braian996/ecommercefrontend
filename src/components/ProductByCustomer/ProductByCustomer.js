// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Component
import ProductCard from '../ProductCard/ProductCard';

// Assets


class ProductByCustomer extends Component {
    state = {
        error: null,
        products: []
    };

    constructor(props){
        super(props);
        let customerId = props.match.params.customerId;

        axios(`http://localhost:4000/productsOfCustomer/?customerId=${customerId}`)
            .then(response => {
                const {data} = response;
                this.setState({
                    products: data
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            });
    }

    getProducts = () => {
        return this.state.products
            .map(product =>
                <ProductCard key={product.id}
                             id={product.id}
                             name={product.nombre}
                             stock={product.stock}
                />
            );
    };

    render() {
        const products = this.getProducts();
        const error = (<div className="error">{this.state.error}</div>)

        return (
            <div className="Wrap">
                {
                    this.state.error ? error : products
                }
            </div>
        );
    }

}

export default ProductByCustomer;