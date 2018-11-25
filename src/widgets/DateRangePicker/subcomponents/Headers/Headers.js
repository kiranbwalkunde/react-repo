/**
 * The Headers Component to render the Month, Years and Month - Year Header.
 * 
 * @author Kiran. Created on 23rd Nov. 2018.
 */
import React, {Component} from 'react';

// Import Other Sub Components.
import DecadeHeader from '../DecadeHeader/DecadeHeader';
import MonthHeader from '../MonthHeader/MonthHeader';
import YearHeader from '../YearHeader/YearHeader';

class Headers extends Component {

  render() {
    const {props} = this;
    const {selectedFilter, year, month} = props;
    let element = (currentSelection) => {
      let elementToRender;
      switch(currentSelection) {
        case 0: elementToRender =  (<MonthHeader
                  year={year}
                  month={month} />);
                  break;
        case 1: elementToRender = (<YearHeader
                  year={year} />);
                break;
        case 2: elementToRender = (<DecadeHeader
                  startYear={year} />);
                break;
      }
      return elementToRender;
    };
    return(
      <div className="header">
        {element(selectedFilter)}
      </div>
    )
  }
}

export default Headers;
