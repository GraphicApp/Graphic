import React, {PropTypes} from 'react';

const ConfigModules = ({modules, onChange}) => {
  return (
    <div className="options-modules">
      <table>
        <tbody>
          <tr>
            <td>CPU</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="cpu"
                  onChange={onChange}
                  checked={modules.cpu.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.cpu.status
            ?
          <tr>
            <td>Interval</td>
            <td>{modules.cpu.interval}</td>
          </tr>
            : null
          }
          <tr>
            <td>Processes</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="processes"
                  onChange={onChange}
                  checked={modules.processes.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.processes.status
            ?
          <tr>
            <td>Interval</td>
            <td>{modules.processes.interval}</td>
          </tr>
            : null
          }
          <tr>
            <td>Memory</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="memory"
                  onChange={onChange}
                  checked={modules.memory.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.memory.status
            ?
          <tr>
            <td>Interval</td>
            <td>{modules.memory.interval}</td>
          </tr>
            : null
          }
          <tr>
            <td>Temperature</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="temperature"
                  onChange={onChange}
                  checked={modules.temperature.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.temperature.status
            ?
          <tr>
            <td>Interval</td>
            <td>{modules.temperature.interval}</td>
          </tr>
            : null
          }
          <tr>
            <td>Fan</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="fan"
                  onChange={onChange}
                  checked={modules.fan.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.fan.status
            ?
          <tr>
            <td>Interval</td>
            <td>{modules.fan.interval}</td>
          </tr>
            : null
          }
          <tr>
            <td>Battery</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="battery"
                  onChange={onChange}
                  checked={modules.battery.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.battery.status
            ?
          <tr>
            <td>Interval</td>
            <td>{modules.battery.interval}</td>
          </tr>
            : null
          }
          <tr>
            <td>Disks</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="disk"
                  onChange={onChange}
                  checked={modules.disk.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.disk.status
            ?
          <tr>
            <td>Interval</td>
            <td>{modules.disk.interval}</td>
          </tr>
            : null
          }
          <tr>
            <td>File System</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="diskfs"
                  onChange={onChange}
                  checked={modules.diskfs.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.diskfs.status
            ?
          <tr>
            <td>Interval</td>
            <td>{modules.diskfs.interval}</td>
          </tr>
            : null
          }
          <tr>
            <td>Network</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="network"
                  onChange={onChange}
                  checked={modules.network.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
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
            : null
          }
          <tr>
            <td>Network Connections</td>
            <td>
              <label className="switch">
                <input
                  id="modules"
                  type="checkbox"
                  name="netConnections"
                  onChange={onChange}
                  checked={modules.netConnections.status}
                />
                <div className="slider round"></div>
              </label>
            </td>
          </tr>
          { modules.netConnections.status
            ?
          <tr>
            <td>Interval</td>
            <td>{modules.netConnections.interval}</td>
          </tr>
            : null
          }
        </tbody>
      </table>
    </div>
  );
};

ConfigModules.propTypes = {
  modules: PropTypes.object.isRequired
};

export default ConfigModules;
