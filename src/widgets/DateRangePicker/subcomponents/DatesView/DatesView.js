/**
 * The Dates View To Display the dates for the Month.
 * 
 * @author Kiran. Created on 24th Nov. 2018.
 */
import React, {Component} from 'react';
import moment from 'moment';

class DatesView extends Component {

  render() {
    const {props} = this;
    const {data, handleDateSelection} = props;
    const {year, month, date, selectedValue = new moment()} = data;
    const createdDate = new moment([year, month]);
    const daysInCurrentMonth = createdDate.daysInMonth();
    // Referred from Stack Overflow.: https://stackoverflow.com/questions/39924644/es6-generate-an-array-of-numbers
    const resultArray = Array.from(Array(daysInCurrentMonth).keys());
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // The Task is to show the previous months disabled dates
    // and next months few dates to complete the current month calendar.
    const isCurrentMonthAndYear = selectedValue.year() === year && selectedValue.month() === month;
    const value = date -1;
    return(
      <div className="dates">
        <ul className="weeks m-0 px-0">
          {weeks.map((item, key)=>
            <li
              className=""
              key={['week', key].join('_')}>{item}</li>
          )}
        </ul>
        <ul className="date-vals m-0 px-0">
          {resultArray.map((item, key) =>
            <li
              role="button"
              className={`${(key === value && isCurrentMonthAndYear) ? 'active' : ''} `}
              onClick={() => handleDateSelection(key + 1)}
              key={[key, 'date-value'].join('_')}>
              {item + 1}
            </li>  
          )}
        </ul>
      </div>
    )
  }
}

export default DatesView;
