/**
 * The Date Range Picker Component
 * to Pick the Date Range with the help of the Calendar.
 * 
 * @author Kiran. Created on 23rd Nov. 2018.
 */
import React, {Component} from 'react';

// Import the Sub Components.
import CalendarHeader from './subcomponents/CalendarHeader/CalendarHeader';
import CalendarView from './subcomponents/CalendarView/CalendarView';
import moment from 'moment';

class DateRangePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: {
        year: 2018,
        month: 0,
        date: 12,
        selectedFilter: 0
      },
      endDate: {
        year: 2019,
        month: 1,
        date: 15,
        selectedFilter: 0
      }
    };
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleNextAction = this.handleNextAction.bind(this);
    this.handlePreviousAction = this.handlePreviousAction.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleYearSelection = this.handleYearSelection.bind(this);
    this.handleMonthSelection = this.handleMonthSelection.bind(this);
    this.handleDateSelection = this.handleDateSelection.bind(this);
  }

  handleYearSelection(value, dateType) {
    const {state} = this;
    if (dateType === 'startDate') {
      const {startDate} = state;
      startDate.year = value;
      startDate.selectedFilter = 0;
      this.setState({startDate});
    } else {
      const {endDate} = state;
      endDate.year = value;
      endDate.selectedFilter = 0;
      this.setState({endDate});
    }
  }

  handleMonthSelection(value, dateType) {
    const {state} = this;
    if (dateType === 'startDate') {
      const {startDate} = state;
      startDate.month = value;
      startDate.selectedFilter = 0;
      this.setState({startDate});
    } else {
      const {endDate} = state;
      endDate.month = value;
      endDate.selectedFilter = 0;
      this.setState({endDate});
    }
  }

  handleDateSelection(value, dateType) {
    const {state} = this;
    if (dateType === 'startDate') {
      const {startDate} = state;
      startDate.date = value;
      const selectedValue = new moment({ years:startDate.year,
        months:startDate.month,
        date:value});
      startDate.selectedValue = selectedValue;
      startDate.stringValue = selectedValue.local().format('DD-MM-YYYY');
      this.setState({startDate});
    } else {
      const {endDate} = state;
      endDate.date = value;
      const selectedValue = new moment({ years:endDate.year,
        months:endDate.month,
        date:value});
        endDate.selectedValue = selectedValue;
        endDate.stringValue = selectedValue.local().format('DD-MM-YYYY');
      this.setState({endDate});
    }
  }

  handleHeaderClick(dateType) {
    const {state} = this;
    if ('startDate' === dateType) {
      const {startDate} = state;
      const {selectedFilter} = startDate;
      const modifiedFilter = (selectedFilter + 1) % 3;
      startDate.selectedFilter = modifiedFilter;
      this.setState({startDate});
    } else {
      const {endDate} = state;
      const {selectedFilter} = endDate;
      const modifiedFilter = (selectedFilter + 1) % 3;
      endDate.selectedFilter = modifiedFilter;
      this.setState({endDate});
    }
  }

  handlePreviousAction(dateType) {
    const {state} = this;
    if('startDate' === dateType) {
      const{startDate} = state;
      // Get the Filter Type;
      const {selectedFilter} = startDate;
      // const nextFilter = (selectedFilter + 1) % 3;
      // The Next Filter can be the Month, Year, or Year Series.
      // All of the above has the different filters.
      switch(selectedFilter) {
        case 0: {
          const currentMonth = startDate.month;
          if (currentMonth === 0) {
            startDate.month = 11;
            startDate.year = (startDate.year - 1);
          } else {
            startDate.month = (currentMonth - 1);
          }
          break;
        }
        case 1: {
          const currentYear = startDate.year;
          startDate.year = currentYear - 1;
          break;
        }
        case 2: {
          const currentYear = startDate.year;
          startDate.year = currentYear - 9;
          break;
        }
      }
      this.setState({startDate});
    } else {
      const {endDate} = state;
      // Get the Filter Type;
      const {selectedFilter} = endDate;
      // const nextFilter = (selectedFilter + 1) % 3;
      // The Next Filter can be the Month, Year, or Year Series.
      // All of the above has the different filters.
      switch(selectedFilter) {
        case 0: {
          const currentMonth = endDate.month;
          if (currentMonth === 0) {
            endDate.month = 11;
            endDate.year = endDate.year - 1;
          } else {
            endDate.month = (currentMonth - 1);
          }
          break;
        }
        case 1: {
          const currentYear = endDate.year;
          endDate.year = currentYear - 1;
          break;
        }
        case 2: {
          const currentYear = endDate.year;
          endDate.year = currentYear - 9;
          break;
        }
      }
      this.setState({endDate});
    }
  }

  handleNextAction(dateType) {
    const {state} = this;
    if('startDate' === dateType) {
      const{startDate} = state;
      // Get the Filter Type;
      const {selectedFilter} = startDate;
      // const nextFilter = (selectedFilter + 1) % 3;
      // The Next Filter can be the Month, Year, or Year Series.
      // All of the above has the different filters.
      switch(selectedFilter) {
        case 0: {
          const currentMonth = startDate.month;
          if (currentMonth === 11) {
            startDate.month = 0;
            startDate.year = (startDate.year + 1);
          } else {
            startDate.month = (currentMonth + 1) % 12;
          }
          break;
        }
        case 1: {
          const currentYear = startDate.year;
          startDate.year = currentYear + 1;
          break;
        }
        case 2: {
          const currentYear = startDate.year;
          startDate.year = currentYear + 9;
          break;
        }
      }
      this.setState({startDate});
    } else {
      const {endDate} = state;
      // Get the Filter Type;
      const {selectedFilter} = endDate;
      // const nextFilter = (selectedFilter + 1) % 3;
      // The Next Filter can be the Month, Year, or Year Series.
      // All of the above has the different filters.
      switch(selectedFilter) {
        case 0: {
          const currentMonth = endDate.month;
          if (currentMonth === 11) {
            endDate.month = 0;
            endDate.year = endDate.year + 1;
          } else {
            endDate.month = (currentMonth + 1) % 12;
          }
          break;
        }
        case 1: {
          const currentYear = endDate.year;
          endDate.year = currentYear + 1;
          break;
        }
        case 2: {
          const currentYear = endDate.year;
          endDate.year = currentYear ;
          break;
        }
      }
      this.setState({endDate});
    }
  }

  handleOnFocus(rangeType) {
    const {state} = this;
    const dateType = state[rangeType];
    dateType.isFocused = true;
    // TODO: refactor this code with proper coding style.
    if(rangeType === 'startDate') {
      this.setState({startDate: dateType});
    } else {
      this.setState({endDate: dateType});
    }
  }

  render() {
    const {state} = this;
    const {startDate = {}, endDate = {}} = state;
    const isStartDateFocused = startDate.isFocused;
    const isEndDateFocused = endDate.isFocused;
    return(
      <div className="date-range-picker">
        <div className="row mx-0">
          <div className="col-md-5 py-2">
            <input
              type="textfield"
              value={startDate.stringValue}
              className="form-field w-100"
              onFocus={() => this.handleOnFocus('startDate')} />
            <div className={`calendar ${isStartDateFocused ? 'd-block' : 'd-none'}`}>
              <CalendarHeader
                handlePreviousAction={() => this.handlePreviousAction('startDate')}
                handleNextAction={() => this.handleNextAction('startDate')}
                handleHeaderClick={() => this.handleHeaderClick('startDate')}
                data={startDate} />
              <CalendarView
                handleDateSelection={(e) => this.handleDateSelection(e, 'startDate')}
                handleYearSelection={(e) => this.handleYearSelection(e, 'startDate')}
                handleMonthSelection={(e) => this.handleMonthSelection(e, 'startDate')}
                date={startDate} />
            </div>
          </div>
          <div className="col-md-5 py-2">
            <input
              type="textfield"
              className="form-field w-100"
              value={endDate.stringValue}
              onFocus={() => this.handleOnFocus('endDate')} />
            <div className={`calendar ${isEndDateFocused ? 'd-block' : 'd-none'}`}>
              <CalendarHeader
                handlePreviousAction={() => this.handlePreviousAction('endDate')}
                handleNextAction={() => this.handleNextAction('endDate')}
                handleHeaderClick={() => this.handleHeaderClick('endDate')}
                data={endDate} />
              <CalendarView
                handleDateSelection={(e) => this.handleDateSelection(e, 'endDate')}
                handleYearSelection={(e) => this.handleYearSelection(e, 'endDate')}
                handleMonthSelection={(e) => this.handleMonthSelection(e, 'endDate')}
                date={endDate} />
            </div>
          </div>
          <div className="col-md-2">
            <button
              role="button"
              className="btn btn-primary text-center w-100">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DateRangePicker;
