import React, {PropTypes} from 'react';

const ConfigModules = ({modules}) => {
  return (
    <table className="options-modules">
      <tbody>
        <tr>
          <td>System Information</td>
          {
            modules.system.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        <tr>
          <td>CPU</td>
          {
            modules.cpu.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.cpu.status
          ?
        <tr>
          <td>Interval</td>
          <td>{modules.network.interval}</td>
        </tr>
          : ''
        }
        <tr>
          <td>Processes</td>
          {
            modules.processes.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.processes.status
          ?
        <tr>
          <td>Interval</td>
          <td>{modules.processes.interval}</td>
        </tr>
          : ''
        }
        <tr>
          <td>Memory</td>
          {
            modules.memory.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.memory.status
          ?
        <tr>
          <td>Interval</td>
          <td>{modules.memory.interval}</td>
        </tr>
          : ''
        }
        <tr>
          <td>Temperature</td>
          {
            modules.temperature.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.temperature.status
          ?
        <tr>
          <td>Interval</td>
          <td>{modules.temperature.interval}</td>
        </tr>
          : ''
        }
        <tr>
          <td>Fan</td>
          {
            modules.fan.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.fan.status
          ?
        <tr>
          <td>Interval</td>
          <td>{modules.fan.interval}</td>
        </tr>
          : ''
        }
        <tr>
          <td>Battery</td>
          {
            modules.battery.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.battery.status
          ?
        <tr>
          <td>Interval</td>
          <td>{modules.battery.interval}</td>
        </tr>
          : ''
        }
        <tr>
          <td>Disks</td>
          {
            modules.disk.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.disk.status
          ?
        <tr>
          <td>Interval</td>
          <td>{modules.disk.interval}</td>
        </tr>
          : ''
        }
        <tr>
          <td>File System</td>
          {
            modules.diskfs.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.diskfs.status
          ?
        <tr>
          <td>Interval</td>
          <td>{modules.diskfs.interval}</td>
        </tr>
          : ''
        }
        <tr>
          <td>Network</td>
          {
            modules.network.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.network.status
          ?
        <table>
          <tbody>
            <tr>
              <td>Interface</td>
              <td>{modules.network.iface}</td>
            </tr>
            <tr>
              <td>Ping</td>
              <td>{modules.network.ping}</td>
            </tr>
          </tbody>
        </table>
          : ''
        }
        <tr>
          <td>Network Connections</td>
          {
            modules.netConnections.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { modules.netConnections.status
          ?
        <tr>
          <td>Interval</td>
          <td>{modules.netConnections.interval}</td>
        </tr>
          : ''
        }
      </tbody>
    </table>
  );
};

ConfigModules.propTypes = {
  modules: PropTypes.object.isRequired
};

export default ConfigModules;
