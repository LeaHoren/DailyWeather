import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Weather Application!</h1>
        <p>Welcome to weather application</p>
        <p>in weather to city tab you can start writing the city name </p>
        <p>automatically the cities list will appear </p>
        <p>you can allso add the city to favorite, so the city will appear in the head of cities list</p>
        <p>also, the num of favorite cities appears in the tab head</p>
     </div>
    );
  }
}
