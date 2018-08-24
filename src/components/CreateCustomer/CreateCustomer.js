// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Assets
import '../../css/Create.css';

class CreateCustomer extends Component {
    state = {
        inputName: '',
        error: null
    };

    getInputName = (event) => {
        let inputName = event.target.value;
        this.setState({inputName});
    };

    saveCustomer = () => {
        axios.post('http://localhost:4000/customers', {
            name: this.state.inputName
        }).then(response => {
            console.log('Its Works')
        }).catch(err => {
            this.setState({
                error: err.message
            })
        });
        this.props.history.push("/Customers");
    };

    render() {
        return (
            <div className="Create-content">
                <div className="Create-header">
                    <h1>Registrar cliente</h1>
                </div>
                <form>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" onChange={(event) => this.getInputName(event)} />
                    </div>
                    <div className="form-group">
                        <button className="button-create" onClick={this.saveCustomer}>Crear</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateCustomer;