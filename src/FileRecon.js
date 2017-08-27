import React from 'react';
import './App.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

class FileRecon extends React.Component {
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
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "File 1 Recon",
              columns: [
                {
                  Header: "Date",
                  accessor: "file1transactionDate"
                },
                {
                  Header: "Reference",
                  accessor: "file1walletReference"
                },
                {
                  Header: "Amount",
                  accessor: "file1transactionAmount"
                }
              ]
            },
            {
              Header: "File 2 Recon",
              columns: [
                {
                  Header: "Date",
                  accessor: "file2transactionDate"
                },
                {
                  Header: "Reference",
                  accessor: "file2walletReference"
                },
                {
                  Header: "Amount",
                  accessor: "file2transactionAmount"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />     
      </div>
    );
  }
}

export default FileRecon

