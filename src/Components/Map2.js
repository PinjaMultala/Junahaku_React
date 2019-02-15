import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class Map2 extends Component {

    


    render() {
        let arrivalLatitude;
        let arrivalLongitude;

        let departureLatitude;
        let departureLongitude;
      

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
    
      
      
      
      
      
        console.log("MAP_arrivalLatitude",arrivalLatitude);
      console.log("MAP_arrivalLongitude",arrivalLongitude);
      console.log("MAP_departureLatitude",departureLatitude);
      console.log("MAP_departureLongitude",departureLongitude);
        return (


            
            <div className="Map2">
                <div>
                <Map google={this.props.google}
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
                     title = {'NAKKILA'}
                     position={{lat:departureLatitude, lng:departureLongitude}}
                     />

                     <Marker
                     title = {'ARRIVAL'}
                     position={{lat:arrivalLatitude, lng:arrivalLongitude}}
                     />
                    
                   


               
            </Map>

            
 
                        

                </div>



            </div>



        );
    }
}

export default GoogleApiWrapper({
    apiKey: 
})(Map2)
