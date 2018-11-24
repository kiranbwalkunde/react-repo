/**
 * The Month Values to be displayed when the Year has been selected.
 * 
 * @author Kiran. Created on 24th Nov. 2018.
 */
import React, {Component} from 'react';

class MonthValues extends Component {

  render() {
    const {props} = this;
    const {handleMonthSelection} = props;
    const months = ['Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];
    return(
      <div className="months">
        <ul>
          {months.map((item, key)=>
            <li
              onClick={() => handleMonthSelection(key)}
              role="button"
              key={['month', key].join('_')}>{item}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default MonthValues;
