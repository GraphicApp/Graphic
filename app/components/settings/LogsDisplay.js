import React, {PropTypes} from 'react';

const LogsDisplay = ({logs}) => {
  console.log(logs);
  return (
    <div>
    </div>
  );
};

LogsDisplay.propTypes = {
  logs: PropTypes.object.isRequired
};

export default LogsDisplay;
