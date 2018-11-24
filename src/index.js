import React from 'react';
import ReactDOM from 'react-dom';

import DateRangePicker from './widgets/DateRangePicker/DateRangePicker';

ReactDOM.render(
  <div className="container py-2 px-0">
    <DateRangePicker />
  </div>,
  document.getElementById('app')
);

module.hot.accept();