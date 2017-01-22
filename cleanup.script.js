const prompt = require('prompt'),
      colors = require('colors'),
      del = require('del');
prompt.message = '';
prompt.delimiter = '';
prompt.get({
  properties: {
    confirm: {
      pattern: /^(yes|no|y|n)$/gi,
      description: 'Are you sure you want to clean up?'.red + ' This will delete config files, logs, and PouchDB files.'.magenta,
      message: 'yes/no',
      required: true,
      default: 'yes'
    }
  }
}, (err, result) => {
  let c = result.confirm.toLowerCase();
    if (c!='y' && c!='yes'){
        console.log('ABORT'.red);
        return;
    } else {
      del([
        'server/services/config.json',
        'logs/*.json',
        'npm-debug.log',
        'app/dist',
        'pouch__all_dbs__',
        'graphicdb',
        'log.txt',
        '_replicator'
      ])
      .then(paths => console.log('Deleted files and folders:\n'.random, paths.join('\n').white))
      .then(()=> console.log('Done.'.random));
    }
});
