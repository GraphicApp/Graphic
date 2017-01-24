import React, {PropTypes} from 'react';
import ConfigModules from './ConfigModules';
import ConfigDb from './ConfigDb';

const Configuration = ({settings, onChange}) => {
  return (
    <section className="options-configure">
      <table className="options-main">
        <tbody>
          <tr>
            <td>Port</td>
            <td>{settings.port}</td>
          </tr>
          <tr>
            <td>Log Level</td>
            <td>{settings.logLevel}</td>
          </tr>
        </tbody>
      </table>
      <ConfigModules
        modules={settings.modules}
        onChange={onChange}
      />
      <ConfigDb
        db={settings.db}
        onChange={onChange}
      />
    </section>
  );
};

Configuration.propTypes = {
  settings: PropTypes.object.isRequired
};

export default Configuration;
