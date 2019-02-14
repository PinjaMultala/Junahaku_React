import React, { Component } from "react";
import moment from "moment";
import ownArrow from "./img/ownArrow.png";

class Trains extends Component {


  render() {
     console.log("DATA", this.props.data)
   
    //const muuttuja joka kutsuu sitä funktiota
    let trains = this.props.data.map((joinInfo) => {
      return (
    <div className="row size">
        
        <div className=" col-4">       
            {moment(joinInfo.departure.scheduledTime).format('LT')} 
        </div>
        <div className=" col-4">
            {moment(joinInfo.arrival.scheduledTime).format('LT')}
        </div>

        <div className=" col-2">
            {joinInfo.departure.trainNumber}
        </div>

        <div className=" col-2">
            {joinInfo.departure.commuterLineID}
        </div>
    </div>
      );
    });
   


    return <div className="col-sm-6">{trains}</div>;
  }
}

export default Trains;
