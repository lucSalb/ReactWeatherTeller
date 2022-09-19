import React from "react";
import summer from '../Images/summer.jpg';
import winter from '../Images/winter.jpg';
import autumn from '../Images/autumn.jpg';
import spring from '../Images/spring.jpg';

const Background = (props) => {

    return <img className="back-image" src={props.backImage}/>;
}

export default Background;