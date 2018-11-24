/**
 * The Months Header to show the Current Selected Month.
 * 
 * @author Kiran. Created on 23rd Nov. 2018.
 */
import React, {Component} from 'react';

class MonthHeader extends Component {

  render() {
    const {props} = this;
    const {month} = props;
    const months = ['January', 'February', 'March',
    'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
    return(
      <div
        role="button"
        className="date-header">
        {months[month]}
      </div>
    );
  }
}

export default MonthHeader;
