// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Assets
import '../../css/Purchase.css';

class Purchase extends Component{
    state = {
        error: null,
        confirmation: '',
        customerId: '',
        productId: '',
        amountInput: '',
        customers: [],
        products: []
    };

    constructor(props){
        super(props);
        axios.get('http://localhost:4000/customers')
            .then(response => {
                const {data} = response;
                this.setState({
                    customers: data
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            });
        axios.get('http://localhost:4000/products')
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
            })
    }

    getCustomer = (event) => {
        const customerId = event.target.value;
        this.setState({customerId});
    };

    getProduct = (event) => {
        const productId = event.target.value;
        this.setState({productId});
    };

    getAmount = (event) => {
        const amountInput = event.target.value;
        this.setState({amountInput});
    };

    makeBuy = () => {
        const {customerId, productId, amountInput} = this.state;
        axios.post('http://localhost:4000/purchase', {
            customerId: customerId,
            productId: productId,
            amount: amountInput
        }).then(response => {
            const {data} = response;
            this.setState({
                confirmation: data
            });
            console.log(this.state.confirmation);
            this.props.history.push('/');
        }).catch(err => {
            this.setState({
                error: err.message
            })
        })
    };

    render() {
        const error = (<label>{this.state.error}</label>);

        return (
            <div className="Purchase-content">
                <div className="form-content">
                    <div className="tab-content">
                        <h1>Efectuar compra</h1>
                        <form>
                            <div className="field-wrap">
                                <label>Nombre de Cliente</label>
                                <div className="select-field">
                                    <select onChange={this.getCustomer}>
                                        <option></option>
                                        {
                                            this.state.customers
                                                .map((customer, index) => <option key={index} value={customer.id}>{customer.nombre}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="field-wrap">
                                <label>Producto</label>
                                <div className="select-field">
                                    <select onChange={this.getProduct}>
                                        <option></option>
                                        {
                                            this.state.products
                                                .map((product, index) => <option key={index} value={product.id}>{product.nombre}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="field-wrap">
                                <label>Cantidad a Comprar</label>
                                <input type="number" onChange={this.getAmount} value={this.state.amountInput} />
                            </div>
                            <button className="button-buy" onClick={this.makeBuy}>Buy</button>
                            {
                                this.state.error ? error : ''
                            }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Purchase;