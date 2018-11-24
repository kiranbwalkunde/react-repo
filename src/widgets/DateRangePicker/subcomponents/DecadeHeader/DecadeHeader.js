/**
 * The Decade Header to show the year values for 1 Decade.
 * 
 * @author Kiran. Created on 23rd Nov. 2018.
 */
import React, {Component} from 'react';

class DecadeHeader extends Component {

  render() {
    const {props} = this;
    const {startYear} = props;
    const labelToShow = `${startYear} - ${startYear + 9}`;
    return(
      <div
        role="button"
        className="decade">
        {labelToShow}
      </div>
    )
  }
}

export default DecadeHeader;
