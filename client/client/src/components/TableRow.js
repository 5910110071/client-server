import React, { Component } from 'react';

class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.number}
          </td>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.id}
          </td>
          
        </tr>
    );
  }
}
export default TableRow;