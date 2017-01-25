import React, {PropTypes} from 'react';
import moment from 'moment';

const LogsDisplay = ({logs}) => {
  return (
    <div className="log-component">
      <table>
        <tbody>
        {logs.map((log, i) =>
          <tr key={i}>
            <td className="left">{log.level}</td>
            <td className="left">{log.message}</td>
            <td>{moment(log.timestamp).format("h:mm:ss a, MMM Do YY")}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

LogsDisplay.propTypes = {
  logs: PropTypes.array.isRequired
};

export default LogsDisplay;
