/**
 * The Year Header to show the current Selected Year Value in the Header.
 * 
 * @author Kiran. Created on 23rd Nov. 2018.
 */
import React, {Component} from 'react';

class YearHeader extends Component {

  render() {
    const {props} = this;
    const {year} = props;
    return(
      <div
        role="button"
        className="year">
        {year}
      </div>
    );
  }
}

export default YearHeader;
