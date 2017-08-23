import React, { Component } from 'react';
import logo from './tutuka.png';
import './App.css';
import Papa from 'papaparse'

function FileInput(props) {
  return <div><label> {props.description} </label><input type="file" accept='.csv' name={props.name}/></div>;
}

function buildHash(dataRow) {
  var hashString = ""
  var row = dataRow[0]

  hashString = row.ProfileName + '|' +
    row.TransactionDate + '|' +
    row.TransactionAmount +  '|' + 
    row.TransactionNarrative + '|' + 
    row.TransactionDescription + '|' + 
    row.TransactionID + '|' + 
    row.TransactionType + '|' +
    row.WalletReference

  var hash = numbersconv(hashString)
  return hash
}

function numbersconv(str) {
  var res = 0,
      len = str.length;
  for (var i = 0; i < len; i++) {
   res = res * 31 + str.charCodeAt(i);
   res = res & res;
  }
  return res;
 }
 
function processFile(file,fileHash) {
  var fileDetails = [];
  fileDetails['records'] = 0;
  fileDetails['errors'] = 0;
  fileDetails['duplicates'] = 0;
  fileDetails['matches'] = 0;

  Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      step: function(results) {
        // Ignore TooManyFields errors since we can't disable it for the trailing comma.
        var errors = results.errors.filter(function (error) {
          return error.code !== "TooManyFields";
        });

        // Counts as a record in all scenarios
        fileDetails['records'] = fileDetails['records'] + 1

        if (errors.length === 0) {
          var hash = buildHash(results.data)
          if (fileHash.hasOwnProperty(hash)) {
            //Collision
            if (fileHash[hash].fileNames.indexOf(file.name) > -1) {
              //File already exists in array
              fileDetails['duplicates'] = fileDetails['duplicates'] + 1
            } else {
              //It's a match
              fileDetails['matches'] = fileDetails['matches'] + 1
              
              // Update the filename hash to include this file
              fileHash[hash].fileNames.push(file.name) 
              
              //Remove the data, it's no longer neccesary
              delete fileHash[hash]
            }
          }
          else {
            fileHash[hash] = { fileNames: [file.name], rowData: results.data[0] }
          }
        }
        else {
          // Count the error if it's flagged as such
          fileDetails['errors'] = fileDetails['errors'] + 1;
        }
      }
    });

    return fileDetails;
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
          <br/><button onClick={this.onButtonClick}>Process Recon</button>
      </div>
    );
  }

  onButtonClick() {
    var fileHashArray = [];

    var fileDetails1 = processFile(document.getElementsByName("file1")[0].files[0],fileHashArray);
    var fileDetails2 = processFile(document.getElementsByName("file2")[0].files[0],fileHashArray);
    fileDetails1['matches'] = fileDetails2['matches']
  }
}

export default App;
