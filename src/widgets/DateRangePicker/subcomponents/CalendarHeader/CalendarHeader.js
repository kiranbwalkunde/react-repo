/**
 * The Calendar Header to show the Header
 * Items and associated Actions.
 * 
 * @author Kiran. Created on 23rd Nov. 2018.
 */
import React, {Component} from 'react';

// Importing Other Sub Components.
import Headers from "../Headers/Headers";

class CalendarHeader extends Component {
  
  render() {
    const {props} = this;
    const {handlePreviousAction,
      handleNextAction,
      handleHeaderClick, data} = props;
    const {year, month, selectedFilter} = data;
    return(
      <div className="cal-header row py-2 mx-0">
        <div
          className="col-2"
          onClick={handlePreviousAction}
          role="button">
          &lt;
        </div>
        <div
          className="col-8 text-center"
          onClick={handleHeaderClick}>
          <Headers
            year={year}
            month={month}
            selectedFilter={selectedFilter} />
        </div>
        <div
          className="col-2 text-right"
          onClick={handleNextAction}
          role="button">
          &gt;
        </div>
      </div>
    );
  }
}

export default CalendarHeader;
