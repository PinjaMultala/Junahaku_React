import React, { Component } from "react";

class ScheduledCategories extends Component {
    render() {
let departureTitle;
let arrivalTitle;
let trainNroTitle;

let startStation;
let endStation;




        if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].departure){
            departureTitle = "DEP."
            arrivalTitle = "ARR."
            trainNroTitle = "NRO/LINE"
            startStation = "START STATION"
            endStation = "END STATION"
    
        }

        return(
            <div className="col-sm-8">
            <div className="row size">
        
            <div className=" col-3 startStation">       
            {startStation} 
        </div>

        <div className=" col-2 dep">       
            {departureTitle} 
        </div>

        <div className=" col-2 arr">
            {arrivalTitle}
        </div>

        <div className=" col-2 trainNor">
            {trainNroTitle}
        </div>


        <div className=" col-3 endStation">       
            {endStation} 
        </div>
    </div>
    </div>
        )
    }

}
export default ScheduledCategories;