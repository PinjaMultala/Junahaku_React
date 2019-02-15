import React, { Component } from "react";

class ScheduledCategories extends Component {
    render() {
let departureTitle;
let arrivalTitle;
let trainNroTitle;
let lineIdTitle;


        if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].departure){
            departureTitle = "DEPARTURE"
            arrivalTitle = "ARRIVAL"
            trainNroTitle = "TRAIN NRO"
            lineIdTitle = "LINE ID"
    
        }

        return(
            <div className="col-sm-6">
            <div className="row size">
        
        <div className=" col-4">       
            {departureTitle} 
        </div>

        <div className=" col-4">
            {arrivalTitle}
        </div>

        <div className=" col-2">
            {trainNroTitle}
        </div>

        <div className=" col-2">
            {lineIdTitle}
        </div>
      
    </div>
    </div>
        )
    }

}
export default ScheduledCategories;