import React, { Component } from "react";
import "./App.css";
import Trains from "./Trains";
import Map2 from "./Map2";




const API_KEY = "c67e5bdd523adc49ff8810e2278fe0ea";


class App extends Component {
  state = {
    departure: "", // departure tallennetaan stateen
    arrival: "",
    city: "",
    allTrains: [],
    allStations: [],
    allStationsNames: []
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

    // const weatherCity = this.shortNameToLongName(this.state.allStationsNames, this.state.departure)
    
    console.log("SÄÄTIETO: helsinki", this.state.departure)
    console.log("MISSÄ TÄMÄ ON", this.longNameToShortName(this.state.allStationsNames, this.state.arrival))
    console.log("departure",this.longNameToShortName(this.state.allStationsNames, this.state.departure))
    console.log("arrival", this.longNameToShortName(this.state.allStationsNames, this.state.arrival))

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
    console.log("alltrains",allTrains)
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

   // _____________________________________________________________________________________________________________________________________________________________________________________________________
       

  

  render() {
    const haku = this.infoDetail (this.state.allTrains)
    const trainToDestination = this.compare(this.state.allTrains, this.state.allStations) // otetaan function palautus kiinni ja talletetaan muuttujaan
   
   
    
    console.log("MITÄ TÄMÄ TULOSTAA?", this.stationShortCodeArrival)

    console.log ("VÄLIHAKU", haku)
   console.log("MISSÄ", trainToDestination) 

   
    
    return (
      <div>

        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">


        <h1>HAE JUNIA</h1>
        <input type="text" onChange={this.handleChangeDeparture} />
        <input type="text" onChange={this.handleChangeArrival} />
        <button onClick={this.getTrainData}>HAE</button>

        {/* haetaan departure statesta. */}

        <Trains 
        data={haku} // mappays
        allStationsNames={this.state.allStationsNames}// Lähtöasema
        shortNameToLongName={this.shortNameToLongName} // muuntaa lyhenteet pitkiksi nimiksi
        departureWeather={this.state.departureWeather} // lähtöaseman sää
        arrivalWeather={this.state.arrivalWeather}
        />
      
         {/* <Map2/> */}
       </div>
       </div>
       </div>
       </div>
      </div>
    );
  }
}

export default App;
