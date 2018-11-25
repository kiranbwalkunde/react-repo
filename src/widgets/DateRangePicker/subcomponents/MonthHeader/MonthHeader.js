/**
 * The Months Header to show the Current Selected Month.
 * 
 * @author Kiran. Created on 23rd Nov. 2018.
 */
import React, {Component} from 'react';

class MonthHeader extends Component {

  render() {
    const {props} = this;
    const {month, year} = props;
    const months = ['January', 'February', 'March',
    'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
    const value = `${months[month]} - ${year}`;
    return(
      <div
        role="button"
        className="date-header">
        {value}
      </div>
    );
  }
}

export default MonthHeader;
