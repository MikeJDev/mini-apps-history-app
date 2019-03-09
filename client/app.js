import React from "react";
import axios from "Axios";
import ReactPaginate from "react-paginate";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      value: ""
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/events?_page=1")
      .then(response => {
        let data = response.data.map((event, index) => {
          return (
            <div key={index}>
              <p> Date: {event.date}</p>
              <p> Description: {event.description}</p>
            </div>
          );
        });
        this.setState({ events: data });
      })
      .catch(err => {
        console.log("err:", err);
      });
  }

  search(e) {
    let data = this.state.value;
    event.preventDefault();
    axios
      .get(`http://localhost:3000/events?q=${data}`)
      .then(response => {
        let searchedData = response.data.map((event, index) => {
          return (
            <div key={index}>
              <p>Date: {event.date}</p>
              <p>Description: {event.description}</p>
            </div>
          );
        });
        this.setState({ events: searchedData });
        console.log("searchedData:", searchedData);
      })
      .catch(err => {
        console.log("err:", err);
      });
  }
  handleSearchChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
        <div>
          <h1> Search for historical events</h1>
          <form onSubmit={e => this.search(e)}>
            <input
              className="topnav"
              type="text"
              onChange={this.handleSearchChange}
              value={this.state.value}
              placeholder="Search..."
            />
            <input type="submit" />
          </form>
        </div>
        <div className="events"> {this.state.events} </div>
      </div>
    );
  }
}
export default App;
