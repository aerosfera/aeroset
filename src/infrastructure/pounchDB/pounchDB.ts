const PouchDB = require('pouchdb-core')
    .plugin(require('pouchdb-adapter-http-jwt'))
    .plugin(require('pouchdb-mapreduce'))
    .plugin(require('pouchdb-replication'))
    .plugin(require('worker-pouch'))
;

export default PouchDB;