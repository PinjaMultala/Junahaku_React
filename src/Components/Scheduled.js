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
   
    //const muuttuja joka kutsuu sitä funktiota
    let trains = this.props.data.map((joinInfo) => {
      return (
        
  
    <div className="row size">

  
<div className="col-3">
{joinInfo.startStation}
</div>
        
        <div className=" col-2">       
            {moment(joinInfo.departure.scheduledTime).format('LT')} 
        </div>
        <div className=" col-2">
            {moment(joinInfo.arrival.scheduledTime).format('LT')}
        </div>

        <div className=" col-1">
            {joinInfo.departure.trainNumber}
        </div>

        <div className=" col-1">
            {joinInfo.departure.commuterLineID}
        </div>

        <div className="col-3">
{joinInfo.endStation}
</div>
      
    </div>

      );
    });
   


    return <div className="col-sm-8 scroll" style = {{height: (trains.length === 0) ? "0px":"460px"}} >{trains}</div>; // style if-lause
  }
}

export default Trains;
