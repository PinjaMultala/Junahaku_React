import React, { Component } from "react";
import ownArrow from "./img/ownArrow.png";

class RouteTitle extends Component {
    render() {
   
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


         return (
           <div>
           
         <span className="route__key">
       
           <span>
            {departurePrint}  
           </span> 
           <span>
            {img}
           </span>
           <span>
            {arrivalPrint} 
           </span>
          
         </span>

          
          
          {/* <img src={arrow}/> */}
           {/* {this.props.shortNameToLongName(this.props.allStationsNames, joinInfo.arrival.stationShortCode)}  </p> */}
            
           </div>
         );
         
     
   
     }
   }
    
    
export default RouteTitle;