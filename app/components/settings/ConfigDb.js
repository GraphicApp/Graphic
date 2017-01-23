import React, {PropTypes} from 'react';

const ConfigDb = ({db}) => {
  return (
    <table className="options-db">
      <tbody>
        <tr>
          <td>PouchDB</td>
          {
            db.pouchdb.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        <tr>
          <td>CouchDB</td>
          {
            db.couchdb.status ? <td>On</td> : <td>Off</td>
          }
        </tr>
        { db.couchdb.status
          ?
        <table>
          <tbody>
            <tr>
              <td>Host</td>
              <td>{db.couchdb.host}</td>
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
              {
                db.couchdb.status ? <td>On</td> : <td>Off</td>
              }
            </tr>
          </tbody>
        </table>
          : ''
        }
        <tr>
          <td>PostgreSQL</td>
          {
            db.postgres.status ? <td>On</td> : <td>Off</td>
          }
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
        : ''
        }
      </tbody>
    </table>
  );
};

ConfigDb.propTypes = {
  db: PropTypes.object.isRequired
};

export default ConfigDb;
