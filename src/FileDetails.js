import React from 'react';
import './App.css';

class FileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });  
  }

  render() {    
    return (   
      <div>
        <table>
        <tbody>
          <tr>
          <td className="title">{this.state.data.name}</td>
          <td className="title">Count</td>
          </tr>
          <tr>
            <td className="title">Total Records:</td>
            <td className="text">{this.state.data.records}</td>
          </tr>
          <tr>
            <td className="title">Matching Records:</td>
            <td className="text">{this.state.data.matches}</td>
          </tr>
          <tr>
            <td className="title">Error Records:</td>
            <td className="text">{this.state.data.errors}</td>
          </tr>
          <tr>
            <td className="title">Duplicate Records:</td>
            <td className="text">{this.state.data.duplicates}</td>
          </tr>
          <tr>
            <td className="title">Unmatched Records:</td>
            <td className="text">{this.state.data.records - this.state.data.matches}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
    }
  }

export default FileDetails