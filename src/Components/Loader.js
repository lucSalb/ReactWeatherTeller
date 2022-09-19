import React from "react";
import '../styles/loader.css';

const Loader = (props) => {
    return(
        <div id="loader-holder">
            <div id="spinner-holder">
            <div class="ui active dimmer">
                <div class="ui text loader">{props.loadeMessage}</div>
                </div>
                <p></p>
            </div>
        </div>

    );
}

export default Loader;