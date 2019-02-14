import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class Map2 extends Component {

    render() {
        return (
            <div className="Map2">
                <div>
                <Map google={this.props.google}
                     initialCenter={{
                         lat: 60.205067,
                         lng: 24.655992
                         
                     }}

                     
                        // lat: 60.205067,
                        // lng: 24.655992
                

                     style={{
                         width: "20%",
                         height: "40%",
                        position: "relative",
                         display: "inline-block",
                         overflow: "hidden"
                     }}

                     zoom={15}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
            </Map>
                </div>



            </div>



        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAMS7KDIoQx4jeJHpI6ABzATONYloNkcAA")
})(Map2)