import React, { Component } from "react";
import ownArrow from "./img/ownArrow.png";

class ScheduledCategories extends Component {
    render() {
let departureTitle;
let arrivalTitle;
let trainNroTitle;
let startStation;
let endStation;


let departurePrint;
let arrivalPrint;
let img;

if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].departure){
    departurePrint = this.props.shortNameToLongName(this.props.allStationsNames, this.props.data[0].departure.stationShortCode) 
    img = <img src={ownArrow} className = "arrow"/>
  }
  if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].arrival){
    arrivalPrint = this.props.shortNameToLongName(this.props.allStationsNames, this.props.data[0].arrival.stationShortCode) 
  }



        if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].departure){
            
             startStation = "START STATION"
            departureTitle = "DEPARTURE STATION/TIME"
            arrivalTitle = "ARRIVAL STATION/TIME"
            trainNroTitle = "TRAIN NRO/LINE"
           endStation = "END STATION"
    
        }

        return(
            <div className="col-sm-12">
            <div className="row size">
        
            <div className=" col-1 startStation">       
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


        <div className=" col-1 endStation">       
            {endStation} 

</div>



            <div className=" col-3 route__key">
    
            <span>
            {departurePrint}  
           </span> 
           <span>
            {img}
           </span>
           <span>
            {arrivalPrint} 
           </span>
          
      
    </div>


        
    </div>




   
    </div>
        )
    }

}
export default ScheduledCategories;