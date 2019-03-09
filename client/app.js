import React from "react";
import axios from "Axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  // componentDidMount() {
  //   let url = "http://localhost:3000/events?_page=1";
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       let events = data
  //         .map((event, index) => {
  //           return (
  //             <div key={index}>
  //               <p>Date: {event.date}</p>
  //               <p>Event Description: {event.description}</p>
  //             </div>
  //           );
  //         })
  //         .slice(0, 1000);
  //       this.setState({ events: events });
  //     });
  // }

  componentDidMount() {
    axios
      .get("http://localhost:3000/events?_page=1")
      .then(response => {
        console.log("response:", response);
      })
      .catch(err => {
        console.log("err:", err);
      });
  }

  render() {
    return <div className="events"> </div>;
  }
}
export default App;
