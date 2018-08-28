/*
 * Desc: basic mongo dber for init
 * Author: guochanghui
 */
var MongoClient = require("mongodb").MongoClient;

/*
 * Mongodber class
 */
function Mongodber() {
    this.dbs = {};
}

Mongodber.prototype.init = function (dbs_conf, callback) {
    var self = this;
    self.dbs_conf = dbs_conf;
    var count = 0;
    for (var name in dbs_conf) {
        ++count;
        console.log(`init ${name}`);
        var db_url = dbs_conf[name];
        (function (name, db_url) {
            MongoClient.connect(db_url, {
                autoReconnect: true
            }, function (err, db) {
                if (err) {
                    err = new Error(`Init ${name} failed: ${err.message}`);
                    return callback(err);
                }
                self.dbs[name] = db;
                --count;
                if (!count) {
                    return callback(null);
                }
            });
        })(name, db_url);
    }
}

Mongodber.prototype.use = function (name) {
    return this.dbs[name];
}

module.exports = new Mongodber();
