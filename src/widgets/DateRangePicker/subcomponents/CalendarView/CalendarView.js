/**
 * The Calendar View to Display The Months,
 * Dates and Years based on the Header Selection.
 * 
 * @author Kiran. Created on 24th Nov. 2018.
 */
import React, {Component} from 'react';

import DatesView from '../DatesView/DatesView';
import YearValues from '../YearValues/YearValues';
import MonthValues from '../MonthValues/MonthValues';

class CalendarView extends Component {

  render() {
    const {props} = this;
    const {date, handleDateSelection,
      handleYearSelection,
      handleMonthSelection} = props;
    const {selectedFilter} = date;
    const elementToRender = (filter) => {
      let element;
      switch (filter) {
        case 0: element = (<DatesView
                              data={date}
                              handleDateSelection={handleDateSelection} />)
                break;
        case 1: element = (<MonthValues
                            handleMonthSelection={handleMonthSelection} />);
                break;
        case 2: element = (<YearValues
                              handleYearSelection={handleYearSelection}
                              year={date.year} />);
                break;
      };
      return element;
    };
    return(
      <div className="cal-view">
        {elementToRender(selectedFilter)}
      </div>
    )
  }
}

export default CalendarView;
