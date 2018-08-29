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

    /*componentDidUpdate(prevProps, prevState) {
        if (this.state.prevIdProd) {
            console.log('Entry');
            const newProducts = this.state.products.filter(product => product !== this.state.prevIdProd);
            console.log(newProducts);
            this.setState({
                prevIdProd: null
            });
            this.getProducts();
        }

        if (this.state.products.length !== prevState.products.length) {
            console.log('entro');
            const newProducts = this.state.products;
            this.setState({
                products: newProducts
            })
        }

    }*/

    deletePurchase = (id, idProd) => {
        let config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        /*this.setState({
            prevIdProd: idProd
        });*/
        axios.delete(`http://localhost:4000/purchase/${id}`, config)
            .then(response => {
                const {data} = response;
                console.log(data);
                this.setState({
                    prevIdProd: idProd,
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
                             handleDeleteClick={() => this.deletePurchase(product.purchaseId, product.id)}
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