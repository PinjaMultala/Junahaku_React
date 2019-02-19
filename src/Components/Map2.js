import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class Map2 extends Component {

    


    render() {
        let arrivalLatitude;
        let arrivalLongitude;

        let departureLatitude;
        let departureLongitude;

        let departurePrint;
        let arrivalPrint;
        let map;
 
      

        if(this.props.arrivalCordinates){
            arrivalLatitude = this.props.arrivalCordinates.latitude 
        }
        if(this.props.arrivalCordinates){
            arrivalLongitude = this.props.arrivalCordinates.longitude
        }

        if(this.props.departureCordinates){
            departureLatitude = this.props.departureCordinates.latitude 
        }
        if(this.props.departureCordinates){
            departureLongitude = this.props.departureCordinates.longitude
        }
    

        if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].departure){
            departurePrint = this.props.shortNameToLongName(this.props.allStationsNames, this.props.data[0].departure.stationShortCode)
          }
          if(this.props.data && this.props.allStationsNames && this.props.data[0] && this.props.data[0].arrival){
            arrivalPrint = this.props.shortNameToLongName(this.props.allStationsNames, this.props.data[0].arrival.stationShortCode)
            
            map=<Map google={this.props.google}
                     initialCenter={{
                         lat: 65.01236, //oulu
                         lng: 25.46816
                         }}

                     style={{
                         width: "30%",
                         height: "40%",
                        position: "relative",
                         display: "inline-block",
                         overflow: "hidden"    
                     }}
                        zoom={4}>
                    <Marker
                     title = {departurePrint}
                     position={{lat:departureLatitude, lng:departureLongitude}}
                     />
                    <Marker
                     title = {arrivalPrint}
                     position={{lat:arrivalLatitude, lng:arrivalLongitude}}
                     />
                    
                   </Map>
          }
      
      
      
      
      
      
        console.log("MAP_arrivalLatitude",arrivalLatitude);
      console.log("MAP_arrivalLongitude",arrivalLongitude);
      console.log("MAP_departureLatitude",departureLatitude);
      console.log("MAP_departureLongitude",departureLongitude);
        return (


            
        
                <div>
                

            {map}
 
                        

                </div>






        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("")
})(Map2)
