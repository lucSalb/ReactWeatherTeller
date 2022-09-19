import React from "react";
import axios from "axios";
import '../styles/Card.css';

const Card = (props) => {
    return( 
        <div className="card">
            <div className="card-overlayer"></div>
            <div className="content">
                <img src={props.icon} style={{width:50, height:50, marginLeft:'auto', marginRight: 'auto', borderRadius:25, marginBottom:40}}/>
                <h1>{props.temperature}°C</h1>
                <h3>{props.time}</h3>
                <h4 style={{marginTop: 50}}>{props.date}</h4>
                <h4>{props.city}</h4>
            </div>
        </div>
    );
}

export default Card;



/*
                <i className="sun icon huge centered gap" style={{marginLeft: 'auto', marginRight: 'auto', color: 'white', marginBottom: 20, marginTop: 20}}/>

    sun 
    tree
    leaf
*/