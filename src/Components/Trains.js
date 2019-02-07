import React, { Component } from "react";
import moment from "moment";

class Trains extends Component {


  render() {
     console.log("DATA", this.props.data)
   
    //const muuttuja joka kutsuu sitä funktiota
    let trains = this.props.data.map((joinInfo) => {
      return (
        <div>
          <p>
          <p className="scheduled__key">{this.props.shortNameToLongName(this.props.allStationsNames, joinInfo.departure.stationShortCode)} --->
           {this.props.shortNameToLongName(this.props.allStationsNames, joinInfo.arrival.stationShortCode)}  </p><br/>
           
            Departure time: {moment(joinInfo.departure.scheduledTime).calendar()} <br/>
            Weather: {this.props.departureWeather.main.temp}<br/>
            Train number: {joinInfo.departure.trainNumber}<br/> 
            Line ID: {joinInfo.departure.commuterLineID}<br/> 
            Laituri: {joinInfo.departure.commercialTrack}<br/> 

            <br/>
            
            
            Arrival time: {moment(joinInfo.arrival.scheduledTime).calendar()} <br/>
            Weather: {this.props.arrivalWeather.main.temp}<br/>
            Laituri: {joinInfo.arrival.commercialTrack}<br/> 
     ___________________________________________________________________________________________________
          </p>
        </div>
      );
    });

    return <div>{trains}</div>;
  }
}

export default Trains;
