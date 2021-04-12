const PouchDB = require('pouchdb-core')
    .plugin(require('pouchdb-adapter-http-jwt'))
    .plugin(require('pouchdb-mapreduce'))
    .plugin(require('pouchdb-replication'))

PouchDB.adapter('worker', require('worker-pouch'));

export default PouchDB;