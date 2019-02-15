import React, { Component } from "react";
import "./App.css";
import Scheduled from "./Components/Scheduled";
import Map2 from "./Components/Map2";
import RouteTitle from "./Components/RouteTitle";
import Weather from "./Components/Weather";
import Clock from "./Components/Clock";
import ScheduledCategories from "./Components/ScheduledCategories";




const API_KEY = "c67e5bdd523adc49ff8810e2278fe0ea";


class App extends Component {
  state = {
    departure: "", // departure tallennetaan stateen
    arrival: "",
    city: "",
    allTrains: [],
    allStations: [],
    allStationsNames: [],
    departureWeather: [],
    depCordinate: [],
    arrCordinate:[],
    
  };
 
componentDidMount = async () => { //käynnistyy heti
  const api_call3 = await fetch(
        `https://rata.digitraffic.fi/api/v1/metadata/stations`); // kaikkien asemien lyhenteet ja pitkät nimet.
        
        const data3 = await api_call3.json();

        if(data3) {
          this.setState({
            allStationsNames: data3
          })
        }
}

  getTrainData = async () => { //käynnistyy buttonista
    // täällä muutetaan longname --> short name
    const departureShortname = this.longNameToShortName(this.state.allStationsNames, this.state.departure)
    const arrivalShortname = this.longNameToShortName(this.state.allStationsNames, this.state.arrival)
    //koordinaatit
    const departureCordinate = this.cordinates(this.state.allStationsNames, departureShortname)
    const arrivalCordinate = this.cordinates(this.state.allStationsNames, arrivalShortname)


    // const weatherCity = this.shortNameToLongName(this.state.allStationsNames, this.state.departure)
    console.log("arrivalCordinate",arrivalCordinate.latitude)
    console.log("departureCordinate", departureCordinate)
  

    const api_call1 = await fetch(
        `https://rata.digitraffic.fi/api/v1/live-trains/station/${departureShortname}/${arrivalShortname}` // hakee kaikki junat jotka kulevat läpi halutun lähtöaseman ja saapuu haluttuun määränpähän.
      ), // this.state.departure hakee state restiin.
      api_call2 = await fetch(
        `https://rata.digitraffic.fi/api/v1/live-trains/station/${departureShortname}?minutes_before_departure=60&minutes_after_departure=15&minutes_before_arrival=15&minutes_after_arrival=15`// kyseisellä asemalla pysähtyvät junat
      ),
      api_call4 = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.departure},fi&appid=${API_KEY}&units=metric`
      ), // Sää departure
      api_call5 = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.arrival},fi&appid=${API_KEY}&units=metric`)

    const data = await api_call1.json();
    const data2 = await api_call2.json();
    const data4 = await api_call4.json();
    const data5 = await api_call5.json();
    
    if (data) {
      console.log("DATA2", data2);
      console.log("Sää", data4);
      this.setState({
        allTrains: data,
        allStations: data2,
        departureWeather: data4,
        arrivalWeather: data5,
        depCordinate: departureCordinate,
        arrCordinate: arrivalCordinate,
        error: ""
      });
    }
  };

  //_________________AETETAAN HAKUKENTTIEN ARVOT________________________________________________
  handleChangeDeparture = e => {
    //tallettaa "muuttujaan" formiin kirjoitettu e.target.value
    const muuttuja = e.target.value;
    

    this.setState({
      departure: muuttuja, //muuttuja talletetaan departureen
     
    });
  };

  handleChangeArrival = e => {
    const muuttuja2 = e.target.value;

    this.setState({
      arrival: muuttuja2
    });
  };


//_____________________________VERRATAAN MITKÄ JUNAT(junanumerot) PYSÄHTYVÄT HALUTULLA ASEMALLA._________________________________________________
 
compare = (allTrains, allStations) =>{  //functio
      const finallarray = [];

      if(allTrains && allStations){
      
        allTrains.forEach(train1 =>
        allStations.forEach(train2 => {
          
          if (train1.trainNumber === train2.trainNumber) {
            finallarray.push(train1); //pushaa tuloksen finllarrayhyn []
          }
        })
      );
      return finallarray; 
      }
    }



//_____________KAIVETAAN INFOA ALLTRAIN DATASTA TIMETABLEROWSIN ALTA. ETSITÄÄN ARRIVAL JA DEPARTURE ASEMAT. LUODAAN 2 ARRAYTA JOTKA JOINATAAN YHDEKSI ARRAYKSI (joinInfo)_____________________ 
   
infoDetail = (allTrains) => {
    console.log("alltrains",this.state.allTrains)
      const info = [];
     

      for (var i = 0; i < allTrains.length; i++) {
        const train = allTrains[i];

        const joinInfo = {}

        for( var j = 0; j < train.timeTableRows.length; j++) {
          const timeTableRow = train.timeTableRows[j];
          

          if(timeTableRow.stationShortCode === this.longNameToShortName(this.state.allStationsNames, this.state.departure) && timeTableRow.trainStopping === true){
       
            const departureInfo = {
              commercialTrack: timeTableRow.commercialTrack,
              trainNumber: train.trainNumber,
              commuterLineID: train.commuterLineID,
              cancelled: train.cancelled,
              stationShortCode: timeTableRow.stationShortCode,
              type: timeTableRow.type,
              scheduledTime: timeTableRow.scheduledTime,
              trainStopping: timeTableRow.trainStopping

            }
            joinInfo.departure = departureInfo 
           
          }
          if(timeTableRow.stationShortCode === this.longNameToShortName(this.state.allStationsNames, this.state.arrival) && timeTableRow.trainStopping === true){
            
            const arrivalInfo = {
              commercialTrack: timeTableRow.commercialTrack,
              cancelled: train.cancelled,
              stationShortCode: timeTableRow.stationShortCode,
              type: timeTableRow.type,
              scheduledTime: timeTableRow.scheduledTime,
              trainStopping: timeTableRow.trainStopping

            }
            joinInfo.arrival = arrivalInfo
          }
        }
        info.push(joinInfo)
      }
      return info;
    }

// _____________________________________PITKÄ NIMI = LYHYT NIMI______________________________________________________________
    
longNameToShortName = (_allStationsNames, longName) => {

      for (var z = 0; z < _allStationsNames.length; z++) {
        const namelist = _allStationsNames[z];

        // if (namelist.stationName.toUpperCase() === longName.toUpperCase()){

          if(namelist.stationName.toUpperCase().includes(longName.toUpperCase())){ // helsinki asema = helsinki


            return namelist.stationShortCode;
        
        }
      }
    }

    //______________________________________________________LYHYESTÄ NIMESTÄ PITKÄÄN NIMEEN___________________________________________________________________________________________

    shortNameToLongName = (_allStationsNames, _shortName) => {


      for (var z = 0; z < _allStationsNames.length; z++) {
        const namelist = _allStationsNames[z];
  
          if(namelist.stationShortCode.toUpperCase().includes(_shortName.toUpperCase())){ //
  
            return namelist.stationName;
        
        }
      }
      
    }

//_________________________________________________________HAETAAN KOORDINAATTEJA___________________________________________________________________________________


cordinates = (___allStationsNames,  __shortName) => {
console.log("cordinate", ___allStationsNames)
console.log("shortname", __shortName)

  for (var p = 0; p < ___allStationsNames.length; p++) {
    const latitudeCordinate = ___allStationsNames[p];

    if(latitudeCordinate.stationShortCode === __shortName){

      return { //laitetaan objectiin.
        latitude: latitudeCordinate.latitude,
        longitude: latitudeCordinate.longitude
      };
    }
  }
}







  render() {
    const haku = this.infoDetail (this.state.allTrains)
    const trainToDestination = this.compare(this.state.allTrains, this.state.allStations) // otetaan function palautus kiinni ja talletetaan muuttujaan
    // const mapCordinates = this.cordinates (this.state.allStationsNames, this.state.departure)
   
   
    
  
// console.log("koordinaatit", mapCordinates)
    console.log ("VÄLIHAKU", haku)
   console.log("MISSÄ", trainToDestination) 

   
    
    return (
      <div className="background">
<div className="container testi">


<div className="row yla">

  <div className= "col-4">
      <Clock />
      </div>

      <div className="col-2 empty"></div>

      <div className="col-6">
      <Weather
      data={haku} // mappays
      allStationsNames={this.state.allStationsNames}// Lähtöasema
      shortNameToLongName={this.shortNameToLongName} // muuntaa lyhenteet pitkiksi nimiksi
      departureWeather={this.state.departureWeather} // lähtöaseman sää
      arrivalWeather={this.state.arrivalWeather}
      departureShortname = {this.departureShortname}
      departure= {this.state.departure}
      />
    </div>
 
</div>


<div className="row keski">
        <input type="text" onChange={this.handleChangeDeparture} />
        <input type="text" onChange={this.handleChangeArrival} />
        <button onClick={this.getTrainData}>HAE</button>
</div>


<div className="row keski2">
     
        <RouteTitle
         data={haku} // mappays
         allStationsNames={this.state.allStationsNames}// Lähtöasema
         shortNameToLongName={this.shortNameToLongName} // muuntaa lyhenteet pitkiksi nimiksi
         departureWeather={this.state.departureWeather} // lähtöaseman sää
         arrivalWeather={this.state.arrivalWeather}
         departureShortname = {this.departureShortname}
         departure= {this.state.departure}
        
        />

</div>

        <ScheduledCategories
          data={haku} // mappays
          allStationsNames={this.state.allStationsNames}// Lähtöasema
          shortNameToLongName={this.shortNameToLongName} // muuntaa lyhenteet pitkiksi nimiksi
          departureWeather={this.state.departureWeather} // lähtöaseman sää
          arrivalWeather={this.state.arrivalWeather}
          />

<div className="row">
     
        <Scheduled 
        data={haku} // mappays
        allStationsNames={this.state.allStationsNames}// Lähtöasema
        shortNameToLongName={this.shortNameToLongName} // muuntaa lyhenteet pitkiksi nimiksi
        departureWeather={this.state.departureWeather} // lähtöaseman sää
        arrivalWeather={this.state.arrivalWeather}
        />
      

      <div className= "mapStyle">
     
        {/* <Map2
        arrivalCordinates={this.state.arrCordinate}
        departureCordinates={this.state.depCordinate}/> */}

         </div>
         </div> 
        
       </div>
       </div>
     
      
    );
  }
}

export default App;
