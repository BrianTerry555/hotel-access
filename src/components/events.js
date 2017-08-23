import React from "react";

class Events extends React.Component {
  genEvents() {
    return this.props.events.map((item, index) => {
      return (
        <div key={item.title + index}>
          <h2>{item.title}</h2>
          <p>Event starts at {item.checkIn} and ends at {item.checkOut}</p>
          <p>{item.description}</p>
        </div>
      )
    });
  }
  render() {
    return (
      <div>
        <h1>Events</h1>
        {this.genEvents()}
      </div>
    )
  }
}

export default Events;
