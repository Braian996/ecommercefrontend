// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Assets
import '../../css/Create.css';

class CreateProduct extends Component {
    state = {
        inputName: '',
        inputCategoryId: '',
        stock: '',
        error: null,
        categories: []
    };

    constructor(props){
        super(props);
        axios.get('http://localhost:4000/categories')
            .then(response => {
                const {data} = response;
                this.setState({
                    categories: data
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
    }

    getInputName = (event) => {
        let inputName = event.target.value;
        this.setState({inputName});
    };

    getInputCategoryId = (event) => {
        let inputCategoryId = event.target.value;
        this.setState({inputCategoryId})
    };

    getStock = (event) => {
        let stock = event.target.value;
        this.setState({stock})
    };

    saveProduct = () => {
        const {inputName, inputCategoryId, stock} = this.state;
        axios.post('http://localhost:4000/products', {
            name: inputName,
            categoryId: inputCategoryId,
            stock
        }).then(response => {
            console.log('Works')
        }).catch(err => {
            this.setState({
                error: err.message
            })
        });
        this.props.history.push('/Products');
    };

    generateOptionSelect = (items) => {
        return items
            .map((item, index) => <option value={item.id} key={index}>{item.nombre}</option>)
    };

    render() {

        return (
            <div className="Create-content">
                <div className="Create-header">
                    <h1>Alta producto</h1>
                </div>
                <form>
                    <div className="form-group">
                        <label>Nombre de producto:</label>
                        <input type="text" onChange={(event) => this.getInputName(event)} />
                    </div>
                    <div className="form-group">
                        <label>Categoria:</label>
                        <div className="select-field">
                            <select onChange={(event) => this.getInputCategoryId(event)}>
                                <option>Seleccionar categoria...</option>
                                {
                                    this.generateOptionSelect(this.state.categories)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Cantidad de Stock: </label>
                        <input type="number" onChange={(event) => this.getStock(event)} />
                    </div>
                    <div className="form-group">
                        <button className="button-create" onClick={this.saveProduct}>Crear</button>
                    </div>
                </form>
            </div>
        );
    }

}

export default CreateProduct;