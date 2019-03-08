import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    let url = "http://localhost:3000/events";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let events = data
          .map((event, index) => {
            return (
              <div key={index}>
                <p>Date: {event.date}</p>
                <p>Description: {event.description}</p>
              </div>
            );
          })
          .slice(0, 1000);
        this.setState({ events: events });
      });
  }

  render() {
    return <div className="events"> {this.state.events} </div>;
  }
}
export default App;
