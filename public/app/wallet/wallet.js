angular.module('GoodCash.WalletCtrl', [])

.controller('WalletCtrl', function($scope, Cashflow, Category, $location, $rootScope) {
    $scope.total = 0;
    $scope.categories = [];
    $scope.daily = [];
    Category.show().then(function(result) {
        $scope.categories = result;
        angular.forEach($scope.categories, function(cat) {
            Cashflow.getTotalByCat(cat.id, 'wallet').then(function(result) {
                cat.total = result;
            });
        });
    });

    $scope.getCat = function(cat_id) {
        var _ = window._;
        var cat = _.findWhere($scope.categories, {id: cat_id});
        return cat;
    }

    $scope.income = function() {
        $location.path('/income/create/wallet');
    }

    $scope.expense = function() {
        $location.path('/expense/create/wallet');
    }

    $scope.atm = function() {
        $location.path('/income/atm');   
    }

    Cashflow.getToday('wallet').then(function(result) {
        $scope.daily = angular.copy(result);
    });

    Cashflow.getTotal('wallet').then(function(result) {
        $scope.total = result;
    });

});