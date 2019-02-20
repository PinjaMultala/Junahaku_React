import React, { Component } from "react";
import moment from "moment";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

class Trains extends Component {


  render() {
     console.log("DATA", this.props.data.length)

     let departurePrint;
     let arrivalPrint;



     if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].departure){
      departurePrint = this.props.shortNameToLongName(this.props.allStationsNames, this.props.data[0].departure.stationShortCode) 
    }
    if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].arrival){
      arrivalPrint = this.props.shortNameToLongName(this.props.allStationsNames, this.props.data[0].arrival.stationShortCode) 
    }

   
    //const muuttuja joka kutsuu sitä funktiota
    let trains = this.props.data.map((joinInfo) => {
      return (
        
  
    <div className="row size">

  
<div className="col-2">
{joinInfo.startStation}
</div>


        
        <div className=" col-3">       
            {departurePrint} {moment(joinInfo.departure.scheduledTime).format('HH:mm')} 
        </div>
        <div className=" col-3">
        {arrivalPrint} {moment(joinInfo.arrival.scheduledTime).format('HH:mm')}
        </div>

        <div className=" col-1">
            {joinInfo.departure.trainNumber}
        </div>

        <div className=" col-1">
            {joinInfo.departure.commuterLineID}
        </div>

        <div className="col-2">
{joinInfo.endStation}
</div>
      
    </div>

      );
    });
   


    return <div className="col-sm-9 scroll" style = {{height: (trains.length === 0) ? "0px":"460px"}} >{trains}</div>; // style if-lause
  }
}

export default Trains;
