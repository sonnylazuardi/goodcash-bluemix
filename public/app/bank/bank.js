angular.module('GoodCash.BankCtrl', [])

.controller('BankCtrl', function($scope, $rootScope, Cashflow, Category, $location) {
    $scope.total = 0;
    $scope.categories = [];
    $scope.daily = [];
    Category.show().then(function(result) {
        $scope.categories = result;
        angular.forEach($scope.categories, function(cat) {
            Cashflow.getTotalByCat(cat.id, 'bank').then(function(result) {
                cat.total = result;
            });
        });
    });

    $scope.getCat = function(cat_id) {
        var _ = window._;
        var cat = _.findWhere($scope.categories, {id: cat_id});
        return cat;
    }

    Cashflow.getToday('bank').then(function(result) {
        $scope.daily = angular.copy(result);
    });

    Cashflow.getTotal('bank').then(function(result) {
        $scope.total = result;
    });

});