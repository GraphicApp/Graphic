import React, {PropTypes} from 'react';

const ConfigDb = ({db, onChange}) => {
  return (
    <table className="options-db">
      <tbody>
        <tr>
          <td>PouchDB</td>
          <td>
            <label className="switch">
              <input
                id="db"
                type="checkbox"
                name="pouchdb"
                onChange={onChange}
                checked={db.pouchdb.status}
              />
              <div className="slider round"></div>
            </label>
          </td>
        </tr>
        <tr>
          <td>CouchDB</td>
          <td>
            <label className="switch">
              <input
                id="db"
                type="checkbox"
                name="couchdb"
                onChange={onChange}
                checked={db.couchdb.status}
              />
              <div className="slider round"></div>
            </label>
          </td>
        </tr>
        { db.couchdb.status
          ?
        <table>
          <tbody>
            <tr>
              <td>Host</td>
              <td>
                <label className="input">
                  <input
                    id="db"
                    type="checkbox"
                    name="postgres"
                    onChange={onChange}
                    checked={db.postgres.host}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>Port</td>
              <td>{db.couchdb.port}</td>
            </tr>
            <tr>
              <td>Database</td>
              <td>{db.couchdb.dbname}</td>
            </tr>
            <tr>
              <td>SSL</td>
              <td>
                <label className="switch">
                  <input
                    id="db"
                    type="checkbox"
                    name="couchdb"
                    onChange={onChange}
                    checked={db.couchdb.ssl}
                  />
                  <div className="slider round"></div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
          : null
        }
        <tr>
          <td>PostgreSQL</td>
          <td>
            <label className="switch">
              <input
                id="db"
                type="checkbox"
                name="postgres"
                onChange={onChange}
                checked={db.postgres.status}
              />
              <div className="slider round"></div>
            </label>
          </td>
        </tr>
        { db.postgres.status
          ?
        <table>
          <tbody>
            <tr>
              <td>Host</td>
              <td>{db.postgres.host}</td>
            </tr>
            <tr>
              <td>Port</td>
              <td>{db.postgres.port}</td>
            </tr>
            <tr>
              <td>Database</td>
              <td>{db.postgres.dbname}</td>
            </tr>
            <tr>
              <td>User</td>
              <td>{db.postgres.user}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{db.postgres.pass}</td>
            </tr>
          </tbody>
        </table>
        : null
        }
      </tbody>
    </table>
  );
};

ConfigDb.propTypes = {
  db: PropTypes.object.isRequired
};

export default ConfigDb;
