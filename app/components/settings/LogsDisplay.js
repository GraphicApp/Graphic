import React, {PropTypes} from 'react';

const LogsDisplay = ({logs}) => {
  console.log(logs);
  return (
    <div>
      {/*logs.map(log, i =>
        <div key={i}>
          <span>{log.level}</span>
          <span>{log.message}</span>
          <span>{log.timestamp}</span>
        </div>
      )*/}
    </div>
  );
};

LogsDisplay.propTypes = {
  logs: PropTypes.object.isRequired
};

export default LogsDisplay;
