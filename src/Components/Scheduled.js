import React, { Component } from "react";
import moment from "moment";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

class Trains extends Component {

  // constructor(props) {
  //   super(props);
  //   this.scrollToTop = this.scrollToTop.bind(this);
  // }

  // componentDidMount() {
  //   Events.scrollEvent.register("begin", function() {
  //     console.log("begin", arguments);
  //   });

  //   Events.scrollEvent.register("end", function() {
  //     console.log("end", arguments);
  //   });
  // }
  // scrollToTop() {
  //   scroll.scrollToTop();
  // }
  // scrollTo() {
  //   scroller.scrollTo("scroll-to-element", {
  //     duration: 800,
  //     delay: 0,
  //     smooth: "easeInOutQuart"
  //   });
  // }
  // scrollToWithContainer() {
  //   let goToContainer = new Promise((resolve, reject) => {
  //     Events.scrollEvent.register("end", () => {
  //       resolve();
  //       Events.scrollEvent.remove("end");
  //     });

  //     scroller.scrollTo("scroll-container", {
  //       duration: 800,
  //       delay: 0,
  //       smooth: "easeInOutQuart"
  //     });
  //   });

  // }
  // componentWillUnmount() {
  //   Events.scrollEvent.remove("begin");
  //   Events.scrollEvent.remove("end");
  // }



  render() {
     console.log("DATA", this.props.data)
   
    //const muuttuja joka kutsuu sitä funktiota
    let trains = this.props.data.map((joinInfo) => {
      return (
        
      //   <Element
      //   name="test7"
      //   className="element"
      //   id="containerElement"
      //   style={{
      //     position: "relative",
      //     height: "200px",
      //     overflow: "scroll",
      //     marginBottom: "100px"
      //   }}
      // >
    <div className="row size">

  
<div className=" col-2">
     {joinInfo.departure.startPoint}
        </div>
        
        <div className=" col-2">       
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
    // </Element>
      );
    });
   


    return <div className="col-sm-6">{trains}</div>;
  }
}

export default Trains;
