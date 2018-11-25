/**
 * The Dates View To Display the dates for the Month.
 * 
 * @author Kiran. Created on 24th Nov. 2018.
 */
import React, {Component} from 'react';
import moment from 'moment';

import Utils from '../../utils/Utils';

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
    const value = date - 1;
    const previousAndNextRecords = Utils.getPreviousMonthsDates(createdDate);
    console.log('The Previous and Next dates are: ', previousAndNextRecords);
    const {previous, next} = previousAndNextRecords;
    return(
      <div className="dates">
        <ul className="weeks m-0 px-0">
          {weeks.map((item, key)=>
            <li
              className=""
              key={['week', key].join('_')}>{item}</li>
          )}
        </ul>
        {/* Render Past Months Dates. */}
        <ul className="date-vals m-0 px-0">
          {previous.map((item, key) =>
            <li
              className="disabled rounded"
              key={['previous', key].join('_')}>{item}</li>
          )}
          {resultArray.map((item, key) =>
            <li
              role="button"
              className={`border border-success rounded ${(key === value && isCurrentMonthAndYear) ? 'active' : ''} `}
              onClick={() => handleDateSelection(key + 1)}
              key={[key, 'date-value'].join('_')}>
              {item + 1}
            </li>
          )}
          {next.map((item, key) =>
            <li
              className="disabled rounded"
              key={['next', key].join('_')}>{item + 1}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default DatesView;
