// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Assets
import '../../css/Create.css';

class CreateCustomer extends Component {
    state = {
        inputName: '',
        error: null,
        titleButton: 'crear',
        customerId: null,
    };

    componentDidMount() {
        let customerId = this.props.match.params.customerId
        if (customerId) {
            axios.get(`http://localhost:4000/customerById/${customerId}`)
                .then(response => {
                    const { data } = response
                    this.setState({
                        inputName: data.nombre,
                        customerId: data.id,
                        titleButton: 'Actualizar cliente'
                    })
                })
                .catch(err => {
                    this.setState({
                        error: err.message
                    })
                });
        }
    }

    getInputName = (event) => {
        let inputName = event.target.value;
        this.setState({inputName});
    };

    saveCustomer = () => {
        axios.post('http://localhost:4000/customers', {
            name: this.state.inputName
        }).then(() => {
            this.props.history.push("/Customers");
        }).catch(err => {
            this.setState({
                error: err.message
            })
        });

    };

    updateCustomerAsync = async () => {
        const { inputName, customerId, error } = this.state
        const response = await axios.put(`http://localhost:4000/customers/${customerId}`, {
            name: inputName
        })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
        if (response && !error) {
            this.props.history.push('/Customers')
        }
    }

    buttonHandler = () => {
        const { customerId } = this.state
        if (!customerId) {
            this.saveCustomer()
        } else {
            this.updateCustomerAsync()
        }
    }

    render() {
        const { titleButton, inputName, error } = this.state
        const errorM = (<div className="error">{error}</div>)

        return (
            <div className="Create-content">
                <div className="Create-header">
                    <h1>Registrar cliente</h1>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" onChange={(event) => this.getInputName(event)} value={inputName} />
                    </div>
                    <div className="form-group">
                        <button className="button-create" onClick={this.buttonHandler}>
                            { titleButton }
                        </button>
                        {
                            error ? errorM : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCustomer;