/**
 * The Utils Method to do some operations on the Dates and Numbers.
 * 
 * @author Kiran. Created on 25th Nov. 2018.
 */
module.exports = {
  getPreviousMonthsDates(dateInSelection) {
    // Get the Total No. of Days in the current Month.
    const daysInMonth = dateInSelection.daysInMonth();
    // As per the current calendar view, there should be 
    // 42 days in the current month selection.
    // then if the current month has 31 days,
    // then remaining has to be calculated from the previous and the next days.
    const clonedCurrentDate = dateInSelection.clone();
    const startOfTheMonth = clonedCurrentDate.startOf('month');
    // Check the day when the 1st Day of this month was.
    const dayOnFirstOfTheMonth = startOfTheMonth.day();
    const result = {};
    if (dayOnFirstOfTheMonth === 0) {
      result.previous = [];
      result.next = [];
      const remainingDays = 35 - daysInMonth;
      // This will calculate the No. of dates for the Next Month.
      result.next = Array.from(Array(remainingDays).keys());
      return result;
    } else {
      // Calculate the No. of days from the
      // Last Month to show in the present calendar.
      const stepToPrevious = dayOnFirstOfTheMonth % 7;
      const dayOnLastMonth = clonedCurrentDate.subtract(stepToPrevious, 'day');
      const startOfPreviousMonth = dayOnLastMonth.date();
      result.previous = [];
      for(let index = 0; index < stepToPrevious; index ++) {
        result.previous.push((index + startOfPreviousMonth));
      }

      // Calculate the Next Months to Display.
      const remainingForNextMonth = 42 - (stepToPrevious + daysInMonth);
      result.next = Array.from(Array(remainingForNextMonth).keys());
      return result;
    }
  }
};
