// Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

// Assets
import '../../css/Header.css';

const header = (props) => {
    return (
        <header>
            <nav>
                <ul className="menu-item">
                    {
                        props.items.map((item, index) => {
                            return (
                                <li key={index} className={item.title}><Link to={item.url}>{item.title}</Link></li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    );
};

export default header;