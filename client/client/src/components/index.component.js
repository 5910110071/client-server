import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {students: []};
    }
    componentDidMount(){
      axios.get('https://us-central1-client-server-e0e66.cloudfunctions.net/api/students')
        .then(response => {
          this.setState({ students: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.students.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }
    render() {
      return (
        <div>
          <h3 align="center">รายชื่อนักศึกษา</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>ลำดับที่</th>
                <th>ชื่อ-นามสกุล</th>
                <th>รหัสนักศึกษา</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }