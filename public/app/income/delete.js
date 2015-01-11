angular.module('GoodCash.IncomeDeleteCtrl', [])

.controller('IncomeDeleteCtrl', function($scope, $routeParams, Cashflow) {
    var id = $routeParams.id;
    Cashflow.delete(id).then(function(result) {
        window.history.back();
    });
});