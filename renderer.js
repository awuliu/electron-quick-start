// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var sqlite3 = require('sqlite3').verbose();
var db

opendb()

function opendb() {
  // db = new sqlite3.Database(':memory:');
  db = new sqlite3.Database('electron-quick-start.sqlite');
  db.run("CREATE TABLE if not exists test (id INTEGER PRIMARY KEY , name TEXT, createat DATETIME) ");
}

exports.adddb = function() {
  db.serialize(function() {

    var stmt = db.prepare("INSERT INTO test(name, createat) VALUES (?, ?)");
    stmt.run('test', new Date());
    stmt.finalize();

    db.each("SELECT rowid, id, name, createat FROM test", function(err, row) {
      console.log(row);
      console.log(row.rowid);
    });
  });
}

exports.closedb = function() {
  db.close();
}

exports.opendb = opendb
