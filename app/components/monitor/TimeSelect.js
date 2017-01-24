import React, {PropTypes} from 'react';

const TimeSelect = ({onSelectAll, onSelectToday, onSelectLastThreeDays, onSelectLastSevenDays, onSelectThisMonth}) => {
  return (
    <div>
      <button onClick={onSelectToday}>Today</button>
      <button onClick={onSelectLastThreeDays}>Last 3 Days</button>
      <button onClick={onSelectLastSevenDays}>Last 7 Days</button>
      <button onClick={onSelectThisMonth}>This Month</button>
      <button onClick={onSelectAll}>All Data</button>
    </div>
  );
};


TimeSelect.propTypes = {
  onSelectAll: React.PropTypes.func.isRequired,
  onSelectToday: React.PropTypes.func.isRequired,
  onSelectLastThreeDays: React.PropTypes.func.isRequired,
  onSelectLastSevenDays: React.PropTypes.func.isRequired,
  onSelectThisMonth: React.PropTypes.func.isRequired
};

export default TimeSelect;
