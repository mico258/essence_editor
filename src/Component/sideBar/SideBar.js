import React from 'react';
import Alpha from './../../Assets/EssenceKernel/Alpha.png'


export default props => {
    return (
        <div className="sidenav">
            <a href="#about"><img src={Alpha}/></a>
            <a href="#services">Services</a>
            <a href="#clients">Clients</a>
            <a href="#contact">Contact</a>
        </div>
    );
};
