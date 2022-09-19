import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Background from "./Background";
import Geocode from "react-geocode";

import Get_forecast from "../API/Api";
import Loader from "./Loader";
import '../styles/Background.css';
import summer from '../Images/summer.jpg';
import winter from '../Images/winter.jpg';
import autumn from '../Images/autumn.jpg';
import spring from '../Images/spring.jpg';

class App extends React.Component {

    state = {temperature:'0',backImage:null,date:'00/00/00' ,time: new Date().toLocaleTimeString(
                                                    undefined,{
                                                        hour: '2-digit', 
                                                        hour12:false, 
                                                        minute: 'numeric',
                                                        second:'numeric' }), location: 'Unknown, UN', lat: null, long: null, icon: null,errorMessage: ''};
    componentDidMount(){
        this.getData();
        window.setInterval(()=>{
            const time = new Date().toLocaleTimeString(undefined,{hour: '2-digit', hour12:false, minute: 'numeric',second:'numeric' });
                this.setState({time, date: new Date().toLocaleDateString('en-GB',{year: 'numeric',month: '2-digit',day: '2-digit'})});
        },1000);
    };

    getTemperature = async () =>{
        const response = await Get_forecast.get('/weather/latest/by-lat-lng',{
            params: {lat: this.state.lat, lng: this.state.long},     
        });
        const celcius = (response.data.data.temperature - 32) * 5/9;
        this.setState({temperature: Math.round(celcius), 
                       icon: 'https://assetambee.s3-us-west-2.amazonaws.com/weatherIcons/PNG/' + response.data.data.icon + '.png'});
    };
    
    getLocation = async () => {
        Geocode.setApiKey("AIzaSyDfJwUEIFaLjv-qfApDEtlwaMgFrdS6eZE");
        Geocode.fromLatLng(this.state.lat, this.state.long).then((location)=>{
            this.setState({
                location: location.results[0].address_components[3].long_name+', '+location.results[0].address_components[4].short_name,
            });
            this.getTemperature();
        });
    }

    getData = () => {
        window.navigator.geolocation.getCurrentPosition(
                (position)=>{
                    this.setState({ lat: position.coords.latitude, long: position.coords.longitude });
                    const month = new Date().getMonth();
                    if(this.state.lat > 0){
                       if(month === 11 || month === 0 || month === 1){this.setState({backImage: winter})};
                       if(month === 2 || month === 3 || month === 4){this.setState({backImage: spring})};
                       if(month === 5 || month === 6 || month === 7){this.setState({backImage:summer})};
                       if(month === 8 || month === 9 || month === 10){this.setState({backImage:autumn})};
                    }else{
                        if(month === 11 || month === 0 || month === 1){this.setState({backImage: summer})};
                        if(month === 2 || month === 3 || month === 4){this.setState({backImage: autumn})};
                        if(month === 5 || month === 6 || month === 7){this.setState({backImage:winter})};
                        if(month === 8 || month === 9 || month === 10){this.setState({backImage:spring})};
                    }
                    this.getLocation();
                },
                (err)=>{this.setState({errorMessage: err.message})}
        );
    };

    componentWillUnmount = () =>{
        return <Loader/>;
    }

    renderContent = () =>{
        if(this.state.backImage && this.state.lat && this.state.long && this.state.icon){
            return (
                <div className="full-scale">
                    <div className="overlayed-panel"></div>
                    <Background backImage={this.state.backImage}/>
                    <Card temperature = {this.state.temperature} 
                        icon = {this.state.icon}
                        time = {this.state.time} 
                        date = {this.state.date}
                        city = {this.state.location}/>
                </div>
            );
        }
        else{
            if(this.state.errorMessage){
            }
            return(
                <div className="full-scale">
                    <Loader/>   
                    <div className="overlayed-panel"></div>
                    <Background backImage={this.state.backImage}/>
                    <Card temperature = {this.state.temperature} 
                        icon = {this.state.icon}
                        time = {this.state.time} 
                        date = {this.state.date}
                        city = {this.state.location}/>
                </div>
            );
        }
    }

    render(){
        return(
            <div style={{width:'100%', height:'100%'}}>
                 {this.renderContent()}
            </div>
        );
    };
}

export default App;