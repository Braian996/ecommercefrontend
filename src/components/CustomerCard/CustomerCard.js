// Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

// Assets
import '../../css/Card.css';
import avatar from '../../img/avatar_generico.jpg';

const customerCard = (props) => {
    return (
        <div className="Card">
            <img src={avatar} alt="avatar"/>
            <div className="container">
                <h4>Name: {props.name}</h4>
                <p><Link to={`/ProductsOfCustomer/${props.id}`}>Ver productos adquiridos</Link></p>
            </div>
            <div className="actions">
                <button className="delete" onClick={props.handleDeleteClick}>Delete</button>
                <button className="generic" onClick={props.handleEditClick}>Edit</button>
            </div>
        </div>
    );
};

export default customerCard;