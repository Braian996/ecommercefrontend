// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Components
import ProductCard from '../ProductCard/ProductCard';

// Assets
import 'font-awesome/css/font-awesome.css';
import '../../css/Products.css';

class Products extends Component {
    state = {
        error: null,
        productInput: '',
        noResults: false,
        categoryIdInput: '',
        products: [],
        categories: []
    };

    constructor(props){
        super(props);
        this.connectWithServer();
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
            });
    }

    connectWithServer = (parameter) => {
        axios.get(`http://localhost:4000/products/?name=${parameter}`)
            .then(response => {
                const {data} = response;
                if (data.length === 0) {
                    this.setState({
                        noResults: true
                    })
                } else {
                    this.setState({
                        products: data,
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

    getCategoryIdInput = (event) => {
        const categoryIdInput = event.target.value;
        this.setState({categoryIdInput});
        if (categoryIdInput === 'all') {
            this.connectWithServer();
        } else {
            this.getProductByCategoryId(categoryIdInput)
        }
    };

    getProductByCategoryId = (parameter) => {
        axios.get(`http://localhost:4000/productByCategorieId/?categoryId=${parameter}`)
            .then(response => {
                const {data} = response;
                this.setState({
                    products: data
                })
            })
    };

    getName = (event) => {
        const productInput = event.target.value;
        this.setState({productInput});
        if (productInput.length >= 3 || productInput.length === 0) this.connectWithServer(productInput);
    };

    getProducts = () => {
        return this.state.products
            .map(product => {
                return (
                    <ProductCard key={product.id}
                                 id={product.id}
                                 name={product.nombre}
                                 stock={product.stock}
                    />
                );
            })
    };

    render () {
        let clase = '';
        const products = this.getProducts();
        const error = (<div className="error">{this.state.error}</div>);
        const verification = () => {
            if (this.state.noResults) {
                clase = 'noDisplay'
                return "No se han encontrado resultados"
            } else if (this.state.error) {
                return error
            } else {
                clase = '';
                return products
            }
        };

        return (
            <div className="Wrap">
                <div className="row display-prod">
                    <div className="search">
                        <input placeholder="Buscar productos por nombre..." type="search"
                               onChange={event => this.getName(event)}
                               value={this.state.nameInput}
                        />
                        <i className="fa fa-search"></i>
                    </div>
                    <div className="filter">
                        <i className="fa fa-filter margen"></i>
                        <select onChange={this.getCategoryIdInput}>
                            <option value="all">Todos</option>
                            {
                                this.state.categories
                                    .map((category, index) =>
                                        <option key={index} value={category.id}>{category.nombre}</option>
                                    )
                            }
                        </select>
                    </div>
                </div>
                <div className={`Add-new ${clase}`}>
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

export default Products;

