import React from "react";
import axios from "Axios";
import ReactPaginate from "react-paginate";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      value: "",
      currentPage: 0
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    axios
      .get("/events?_page=0")
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
      .get(`/events?q=${data}&_page=${this.state.currentPage.selected}`)
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

  handlePageClick(arg) {
    console.log(arg);
    this.setState({
      currentPage: arg
    });
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.search(this.state.value);
    }
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
        <ReactPaginate
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
export default App;
