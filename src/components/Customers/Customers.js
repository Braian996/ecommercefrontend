// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Components
import CustomerCard from '../CustomerCard/CustomerCard';

// Assets
import 'font-awesome/css/font-awesome.css';
import '../../css/Customers.css';

class Customers extends Component{
    state = {
        error: null,
        nameInput: '',
        noResults: false,
        customers: []
    };

    componentDidMount(){
        this.connectWithServer();
    }

    connectWithServer = (parameter) => {
        axios.get(`http://localhost:4000/customers/?name=${parameter}`)
            .then(response => {
                const {data} = response;
                if (data.length === 0) {
                    this.setState({
                        noResults: true
                    })
                } else {
                    this.setState({
                        customers: data,
                        noResults: false
                    })
                }
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            });
    };

    getName = (event) => {
        const nameInput = event.target.value;
        this.setState({nameInput});
        if (nameInput.length >= 3 || nameInput.length === 0) this.connectWithServer(nameInput);
    };

    updateCustomer = (id) => {
        this.props.history.push(`/UpdateCustomer/${id}`);
    };

    getCustomers = () => {
        return this.state.customers
            .map(customer => {
                return (
                    <CustomerCard key={customer.id}
                                  id={customer.id}
                                  name={customer.nombre}
                                  handleEditClick={() => this.updateCustomer(customer.id)}
                    />
                );
            });
    };

    getClassStyle = () => {
        if (this.state.noResults) {
            return 'noDisplay'
        }
        return ''
    };

    createCustomerLink = () => {
        this.props.history.push('/CreateCustomer')
    };

    render () {
        const customers = this.getCustomers();
        const error = (<div className="error">{this.state.error}</div>);
        const classForElement = this.getClassStyle();
        const verification = () => {
            if (this.state.noResults) {
                return 'No se han encontrado resultados'
            } else if (this.state.error) {
                return error
            } else {
                return customers
            }
        };

        return (
            <div className="Wrap">
                <div className="row">
                    <div className="search">
                        <input placeholder="Buscar clientes por nombre..." type="search"
                               onChange={event => this.getName(event)}
                               value={this.state.nameInput}
                        />
                        <i className="fa fa-search"></i>
                    </div>
                </div>
                <div className={`Add-new ${classForElement}`} onClick={this.createCustomerLink}>
                    <div className="box-add">
                        <i className="fa fa-plus fa-5x color"></i>
                    </div>
                </div>
                {
                    verification()
                }
            </div>
        );
    }

}

export default Customers;