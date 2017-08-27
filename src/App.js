import React, { Component } from 'react';
import logo from './tutuka.png';
import './App.css';
import { FileInput, processFile } from "./Utils";
import FileDetails from './FileDetails';
import FileRecon from './FileRecon';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file1: null,
      file2: null,
      fileDetails1: {name: 'n/a', records:0, duplicates:0, errors:0, matches: 0},
      fileDetails2: {name: 'n/a', records:0, duplicates:0, errors:0, matches: 0},
      fileHashArray: [],
      gridData: []
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          To get started, choose two files to process.
        </p>
        <br /><FileInput description="File 1" name="file1" />
        <br /><FileInput description="File 2" name="file2" />
        <br /><button onClick={this.onButtonClick.bind(this)}>Process Recon</button>
        <br />
        <br />
        <div style={{ float: 'left' }}>
          <FileDetails data={this.state.fileDetails1} />
        </div>
        <div style={{ float: 'right' }}>
          <FileDetails data={this.state.fileDetails2} />
        </div>
        <div style={{ clear: 'both' }}>Below</div>
        <br /><FileRecon data={this.state.gridData} />
      </div>
    );
  }
  
  buildGridRow(tag, row) {
    var rowData = []
    rowData[tag+"transactionAmount"] = row.TransactionAmount;
    rowData[tag+"transactionDate"] = row.TransactionDate;
    rowData[tag+"walletReference"] = row.WalletReference;
    
    return rowData;
  }
  
  buildGridData(fileHash) {
    var gridData = [];
    for (var key in fileHash) {
      if (fileHash.hasOwnProperty(key)) {
        var element = fileHash[key];
        if (element.fileNames[0] === this.state.fileDetails1.name) {
          gridData.push(this.buildGridRow('file1',element.rowData));
        }
        else {
          gridData.push(this.buildGridRow('file2',element.rowData));
        }
      }
    }
    this.setState({gridData: gridData});
  }

  setFileDetailsData(fileDetails,fileHash) {
    if (fileDetails.name === this.state.fileDetails1.name) {
      this.setState({
        fileDetails1: fileDetails,
        fileHashArray: fileHash
      });
    }
    else if (fileDetails.name === this.state.fileDetails2.name) {
      // Keep the matches in sync with the 2nd file
      var tempFileDetails1 = this.state.fileDetails1;
      tempFileDetails1.matches = this.state.fileDetails2.matches;

      this.setState({
        fileDetails1: tempFileDetails1,
        fileDetails2: fileDetails,
        fileHashArray: fileHash
      });

      this.buildGridData(fileHash);      
    }
  }

  onButtonClick() {
    var props = {};
    props.fileHashArray = [];
    props.fileDetails1 = processFile(this.setFileDetailsData.bind(this), document.getElementsByName("file1")[0].files[0], props.fileHashArray);
    props.fileDetails2 = processFile(this.setFileDetailsData.bind(this), document.getElementsByName("file2")[0].files[0], props.fileHashArray);

    this.setState({
      fileDetails1: props.fileDetails1,
      fileDetails2: props.fileDetails2
    });
  }
}

export default App;
