angular.module('GoodCash.models', [])

// Resource service example
.factory('Category', function(DB) {
    var self = this;
    
    self.all = function() {
        return DB.query('SELECT * FROM category')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.show = function() {
        return DB.query('SELECT * FROM category WHERE is_savings = 0')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.find = function(id) {
        return DB.query('SELECT * FROM category WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    self.create = function(item) {
        return DB.insert(item, 'category');
    };

    self.update = function(item, id) {
        return DB.update(item, id, 'category');
    };

    self.delete = function(id) {
        return DB.delete(id, 'category');
    };

    self.findWhere = function(attr, value) {
        return DB.query('SELECT * FROM category WHERE '+attr+' = ?', [value])
        .then(function(result){
            return DB.fetch(result);
        });
    }
    
    return self;
})

// Resource service example
.factory('Cashflow', function(DB, $q) {
    var self = this;
    self.all = function() {
        return DB.query('SELECT * FROM cashflow')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    self.find = function(id) {
        return DB.query('SELECT * FROM cashflow WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    self.delete = function(id) {
        return DB.delete(id, 'cashflow');
    };
    self.getDates = function() {
        return DB.query("SELECT DATE(timestamp) AS tanggal FROM cashflow GROUP BY tanggal").then(function(result) {
            return DB.fetchAll(result);
        });
    };
    self.getHistory = function() {
        return DB.query("SELECT *, DATE(timestamp) AS tanggal FROM cashflow").then(function(result) {
            return DB.fetchAll(result);
        });
    };
    self.getTotalByCat = function(cat_id, source) {
        var deferred = $q.defer();
        DB.query("SELECT SUM(value) AS total_pos FROM cashflow WHERE type = 'income' AND category_id = ? AND source = ? AND is_savings = 0", [cat_id, source]).then(function(result) {
            var pos = DB.fetch(result).total_pos;
            DB.query("SELECT SUM(value) AS total_neg FROM cashflow WHERE type = 'expense' AND category_id = ? AND source = ? AND is_savings = 0", [cat_id, source]).then(function(result2) {
                var neg = DB.fetch(result2).total_neg;
                deferred.resolve(pos - neg);
            });
        });
        return deferred.promise;
    };
    self.getToday = function(source) {
        var today = moment().format('YYYY-MM-DD');
        return DB.query("SELECT * FROM cashflow WHERE DATE(timestamp) = ? AND source = ? AND is_savings = 0", [today, source]).then(function(result) {
            return DB.fetchAll(result);
        });
    };
    self.create = function(item) {
        return DB.insert(item, 'cashflow');
    };
    self.update = function(item, id) {
        return DB.update(item, id, 'cashflow');
    };
    self.getTotal = function(source) {
        var deferred = $q.defer();
        DB.query("SELECT SUM(value) AS total_pos FROM cashflow WHERE type = 'income' AND source = ? AND is_savings = 0", [source]).then(function(result) {
            var pos = DB.fetch(result).total_pos;
            DB.query("SELECT SUM(value) AS total_neg FROM cashflow WHERE type = 'expense' AND source = ? AND is_savings = 0", [source]).then(function(result2) {
                var neg = DB.fetch(result2).total_neg;
                deferred.resolve(pos - neg);
            });
        });
        return deferred.promise;
    };
    self.getSavings = function() {
        var deferred = $q.defer();
        DB.query("SELECT SUM(value) AS total_pos FROM cashflow WHERE type = 'income' AND is_savings = 1").then(function(result) {
            var pos = DB.fetch(result).total_pos;
            DB.query("SELECT SUM(value) AS total_neg FROM cashflow WHERE type = 'expense' AND is_savings = 1").then(function(result2) {
                var neg = DB.fetch(result2).total_neg;
                deferred.resolve(pos - neg);
            });
        });
        return deferred.promise;
    };
    self.getIncome = function() {
        var deferred = $q.defer();
        DB.query("SELECT SUM(value) AS income FROM cashflow WHERE type = 'income'").then(function(result) {
            var res = DB.fetch(result).income;
            deferred.resolve(res);
        });
        return deferred.promise;
    };
    self.getExpense = function() {
        var deferred = $q.defer();
        DB.query("SELECT SUM(value) AS expense FROM cashflow WHERE type = 'expense'").then(function(result) {
            var res = DB.fetch(result).expense;
            deferred.resolve(res);
        });
        return deferred.promise;
    };
    return self;
})

// Resource service example
.factory('Groups', function(DB) {
    var self = this;
    self.all = function() {
        return DB.query('SELECT * FROM groups')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    self.find = function(id) {
        return DB.query('SELECT * FROM groups WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    self.create = function(item) {
        return DB.insert(item, 'groups');
    };
    self.update = function(item, id) {
        return DB.update(item, id, 'groups');
    };
    return self;
})

.factory('Wishlist', function(DB) {
    var self = this;
    self.all = function() {
        return DB.query('SELECT * FROM wishlist')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    self.delete = function(id) {
        return DB.delete(id, 'wishlist');
    };
    self.find = function(id) {
        return DB.query('SELECT * FROM wishlist WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    self.create = function(item) {
        return DB.insert(item, 'wishlist');
    };
    self.update = function(item, id) {
        return DB.update(item, id, 'wishlist');
    };
    return self;
});
