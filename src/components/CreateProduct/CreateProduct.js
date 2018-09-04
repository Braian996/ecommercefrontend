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
        categories: [],
        productId: null,
        categoryName: ''
    };

    constructor(props){
        super(props);
        let productId = props.match.params.productId;

        if (productId) {
            axios.get(`http://localhost:4000/productsById/${productId}`)
                .then(response => {
                    const {data} = response;
                    this.setState({
                        inputName: data[0].nombre,
                        inputCategoryId: data[0].categoriaId,
                        categoryName: data[0].categoryName,
                        stock: data[0].stock,
                        productId: data[0].id
                    })
                })
                .catch(err => {
                    this.setState({
                        error: err.message
                    })
                });
        }

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

    updateProduct = () => {
        const {inputName, inputCategoryId, stock, productId} = this.state;

        axios.put(`http://localhost:4000/products/${productId}`, {
            name: inputName,
            categoryId: inputCategoryId,
            stock
        }).then((response) => {
            const {data} = response;
            console.log(data);
            this.props.history.push('/Products')
        }).catch(err => {
            console.log('ENTER');
            this.setState({
                error: err.message
            })
        })
    };

    buttonHandler = () => {
        if (!this.state.productId) {
            this.saveProduct();
        } else {
            this.updateProduct();
        }
    };

    generateOptionSelect = (items) => {
        return items
            .map((item, index) => <option value={item.id} key={index}>{item.nombre}</option>)
    };

    render() {
        const error = (<div className="error">{this.state.error}</div>);

        return (
            <div className="Create-content">
                <div className="Create-header">
                    <h1>Alta producto</h1>
                </div>
                <form>
                    <div className="form-group">
                        <label>Nombre de producto:</label>
                        <input type="text" onChange={this.getInputName} value={this.state.inputName} />
                    </div>
                    <div className="form-group">
                        <label>Categoria:</label>
                        <div className="select-field">
                            <select onChange={this.getInputCategoryId}>
                                <option value={this.state.inputCategoryId}>
                                    {
                                        this.state.productId ? this.state.categoryName : 'Seleccionar categoria...'
                                    }
                                </option>
                                {
                                    this.generateOptionSelect(this.state.categories)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Cantidad de Stock: </label>
                        <input type="number" onChange={this.getStock} value={this.state.stock} />
                    </div>
                    <div className="form-group">
                        <button className="button-create" onClick={this.buttonHandler}>Crear</button>
                        {
                            this.state.error ? error : ''
                        }
                    </div>
                </form>
            </div>
        );
    }

}

export default CreateProduct;