import React, { Component } from "react";


class Weather extends Component {
    render() {
   
    let departureWeather;
    let arrivalWeather;
    let departurePrint;
    let arrivalPrint;
    let celsius;


    if(this.props.departureWeather && this.props.departureWeather.main){
      departureWeather = this.props.departureWeather.main.temp;
      celsius= "°C"
    }
    if(this.props.arrivalWeather && this.props.arrivalWeather.main){
      arrivalWeather = this.props.arrivalWeather.main.temp;
    }
    if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].departure){
      departurePrint = this.props.shortNameToLongName(this.props.allStationsNames, this.props.data[0].departure.stationShortCode) 
    }
    if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].arrival){
      arrivalPrint = this.props.shortNameToLongName(this.props.allStationsNames, this.props.data[0].arrival.stationShortCode) 
    }



         return (
           <div className="col-sm-12">
           <div className="weather_box" >
           
         <p><span className="city__weather">
         <span> 
         {departurePrint}</span>  {departureWeather} {celsius}
         </span>         
         
         <span className="city__weather">
         <span>
         {arrivalPrint}</span>  {arrivalWeather} {celsius}
         </span> 
         </p> 
           
          </div>

        
            
           </div>
         );
         
     
   
     }
   }
    
    
export default Weather;