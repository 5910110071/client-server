import React, { Component } from 'react';
import axios from 'axios';
export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeStudentNumber = this.onChangeStudentNumber.bind(this);
        this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onChangeStudentId = this.onChangeStudentId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        axios.get('https://us-central1-client-server-e0e66.cloudfunctions.net/api/students')
              .then(res => console.log(res.data));

        this.state = {
            student_no: '',
            student_name: '',
            student_id: ''
        }
    }
    onChangeStudentNumber(e) {
        this.setState({
          student_no: e.target.value
        });
      }
      onChangeStudentName(e) {
        this.setState({
          student_name: e.target.value
        })  
      }
      onChangeStudentId(e) {
        this.setState({
          student_id: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
        //console.log(`The values are ${this.state. student_no}, ${this.state.student_name}, and ${this.state.student_id}`)
        const obj = {
            number : this.state.student_no,
            name : this.state.student_name,
            id  : this.state.student_id
          };
          axios.post('https://us-central1-client-server-e0e66.cloudfunctions.net/api/students', obj)
              .then(res => console.log(res.data));
          
        this.setState({
          student_no: '',
          student_name: '',
          student_id: ''
        })
      }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>ลงชื่อ</h3>
                <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                        <label>ลำดับ:  </label>
                        <input type="text" className="form-control" value={this.state.student_no} onChange={this.onChangeStudentNumber} />
                    </div>
                    <div className="form-group">
                        <label>ชื่อ-นามสกุล: </label>
                        <input type="text" className="form-control" value={this.state.student_name} onChange={this.onChangeStudentName} />
                    </div>
                    <div className="form-group">
                        <label>รหัสนักศึกษา: </label>
                        <input type="text" className="form-control" value={this.state.student_id} onChange={this.onChangeStudentId}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="ยืนยัน" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}