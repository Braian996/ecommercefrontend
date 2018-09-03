// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Component
import ProductCard from '../ProductCard/ProductCard';

// Assets


class ProductByCustomer extends Component {
    state = {
        error: null,
        prevIdProd: null,
        products: []
    };

    componentDidMount() {
        let customerId = this.props.match.params.customerId;

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

    deletePurchase = (id, idCostumer) => {
        axios.delete(`http://localhost:4000/purchase/?purchaseId=${id}&customerId=${idCostumer}`)
            .then((response) => {
                const {data} = response;
                this.setState({
                    products: data
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
    };

    getProducts = () => {
        return this.state.products
            .map(product =>
                <ProductCard key={product.purchaseId}
                             id={product.id}
                             name={product.nombre}
                             stock={product.stock}
                             handleDeleteClick={
                                 () => this.deletePurchase(product.purchaseId, this.props.match.params.customerId)
                             }
                />
            );
    };

    render() {
        const products = this.getProducts();
        const error = (<div className="error">{this.state.error}</div>);

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