/**
 * The Component to display the Year Values within the current Year Ranges.
 * 
 * @author Kiran. Created on 23rd Nov. 2018.
 */
import React, {Component} from 'react';

class YearValues extends Component{

  render() {
    const {props} = this;
    const {year, handleYearSelection} = props;
    const yearValuesToIterate = (startValue) => {
      const arrayToReturn = [];
      for (let index = 0; index < 10; index ++) {
        arrayToReturn.push(index + startValue);
      }
      return arrayToReturn;
    };
    
    return(
      <div className="year-values">
        <ul>
          {yearValuesToIterate(year).map((item, key) =>
              <li
                onClick={() => handleYearSelection(item)}
                role="button"
                key={['year', key].join('_')}>{item}</li>
            )}
        </ul>
      </div>
    );
  }
}

export default YearValues;
