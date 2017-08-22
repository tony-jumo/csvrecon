import React, { Component } from 'react';
import logo from './tutuka.png';
import './App.css';
import babyparse from 'babyparse';
import fs from 'fs';

var file = 'test.csv';

function FileInput(props) {
  return <div><label> {props.description} </label><input type="file" accept='.csv' name={props.name}/></div>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Tutuka File Recon</h2>
        </div>
        <p className="App-intro">
          To get started, choose two files to upload.
          </p>
          <br/><FileInput description="File 1" name="file1"/>
          <br/><FileInput description="File 2" name="file2"/>
          <br/><button onclick="activateLasers()">Process Recon</button>
      </div>
    );
  }
}

export default App;
