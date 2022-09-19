import axios from "axios";

export default axios.create({
    method: 'GET',
    baseURL: 'https://api.ambeedata.com',
    headers: {'x-api-key': 'c49b37c8068ffabc50db8f771a4e4543d5233f6be4c02e8dd7be5c01793e1921', 'Content-type': 'application/json'}
});






/*
const Get_forecast = (props) =>{
    const options = {
        method: 'GET',
        url: 'https://api.ambeedata.com/weather/latest/by-lat-lng',
        params: {lat:'12', lng: '17'},
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
        return response.data;
    }).catch(function (error) {
        console.error(error);
        return error;
    });
};

export default Get_forecast;

*/