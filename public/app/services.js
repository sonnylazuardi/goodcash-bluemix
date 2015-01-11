angular.module('GoodCash.services', ['ngStorage'])

.factory('Calculator', function() {
    var self = this;
    self.value = '';
    self.source = '';
    return self;
})

.factory('DataPassing', function() {
    var self = this;
    self.nextUrl = [];
    return self;
})

// DB wrapper
.factory('DB', function($q, DB_CONFIG, $rootScope) {
    var self = this;
    self.db = null;
 
    self.init = function() {
        console.log(DB_CONFIG);
        // self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name});
        var onDevice = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        // if (!onDevice) {
          console.log('websql');
          self.db = openDatabase(DB_CONFIG.name, '1.0', 'database', 8 * 1024 * 1024);
        // } else {
        //   console.log('sqlite');
        //   self.db = window.sqlitePlugin.openDatabase({ name: DB_CONFIG.name });
        // }
        // self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
        console.log('init');
        self.seed().then(function() {
            $rootScope.init = true;
        });
    };

    self.reset = function() {
        var deferred = $q.defer();
        angular.forEach(DB_CONFIG.tables, function(table) {
            var query = 'DROP TABLE ' + table.name;
            self.query(query);
            console.log('Table ' + table.name + ' dropped');
        });
        $rootScope.init = false;
        console.log('reset');
        self.seed().then(function() {
            $rootScope.init = true;
            deferred.resolve(true);
        });
        return deferred.promise;
    }

    self.seed = function() {
        var deferred = $q.defer();

        angular.forEach(DB_CONFIG.tables, function(table) {
          // console.log(table);
          var columns = [];

          angular.forEach(table.columns, function(column) {
              columns.push(column.name + ' ' + column.type);
          });
          var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
          self.query(query);
          console.log('Table ' + table.name + ' initialized');
        });

        self.query('SELECT * FROM category')
        .then(function(result){
            if (result.rows.length == 0) {
                angular.forEach(DB_CONFIG.seed, function(seed) {
                    angular.forEach(seed.data, function(item) {
                        self.insert(item, seed.table);
                    });
                });
            }
            deferred.resolve(true);
        });
        return deferred.promise;
    }
 
    self.query = function(query, bindings) {
      bindings = typeof bindings !== 'undefined' ? bindings : [];
      var deferred = $q.defer();
      self.db.transaction(function(transaction) {
        transaction.executeSql(query, bindings, function(transaction, result) {
          deferred.resolve(result);
        }, function(transaction, error) {
          console.log(error);
          deferred.reject(error);
        });
      });
      return deferred.promise;
    };

    self.insert = function(item, table) {
        var allAttr = [];
        var allValue = [];
        var allBind = [];
        for(var key in item){
            allAttr.push(key);
            allBind.push('?');
            allValue.push(item[key]);
        }
        var query = "INSERT INTO "+table+" ("+allAttr.join(', ')+") VALUES("+allBind.join(', ')+")";
        // console.log("=======  QUERY  =======");
        // console.log(query);
        // console.log("=======END QUERY=======");
        return self.query(query, allValue).then(function(result) {
            // console.log(result.insertId);
            return result.insertId;
        });
    }

    self.delete = function(id, table) {
        var query = "DELETE FROM "+table+" WHERE id = ?";
        // console.log("=======  QUERY  =======");
        // console.log(query);
        // console.log("=======END QUERY=======");
        return self.query(query, [id]).then(function(result) {
            console.log(result);
            // return result.insertId;
        });
    }

    self.update = function(item, id, table) {
        var temp = [];
        var tempVal = [];
        for(var key in item){
            temp.push(key + ' = ?');
            tempVal.push(item[key]);
        }
        tempVal.push(id);
        var query = "UPDATE "+table+" SET "+temp.join(', ')+" WHERE id = ?";
        // console.log("=======  QUERY  =======");
        // console.log(query);
        // console.log(temp.join(', '));
        // console.log("=======END QUERY=======");
        return self.query(query, tempVal);
    }
 
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };
 
    self.fetch = function(result) {
        return result.rows.item(0);
    };
 
    return self;
});