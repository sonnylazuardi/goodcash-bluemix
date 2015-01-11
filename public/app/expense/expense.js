angular.module('GoodCash.ExpenseCtrl', [])

.controller('ExpenseCtrl', function($scope, $mdDialog, Calculator, Category, 
    $routeParams, DataPassing, Cashflow, $location, $rootScope) {
    $rootScope.title = 'Expense';
    $scope.source = $routeParams.source;
    Calculator.source = $routeParams.source;

    $scope.textDetail = 'My Expense From ' + $scope.source;

    $scope.textExpense = 0;
    $scope.categories = [];
    $scope.category = 0;
    $scope.load = function() {
        Category.all().then(function(result) {
            $scope.categories = angular.copy(result);
        });
    }
    $scope.load();
    $scope.textClick = function(event) {
        Calculator.value = $scope.textExpense;
        $mdDialog.show({
            templateUrl: 'app/calculator/modal.html',
            targetEvent: event,
            controller: 'CalculatorCtrl'
        }).then(function(answer) {
            $scope.textExpense = answer;
        });
    }
    $scope.textClick();
    
    $scope.save = function() {
        Cashflow.create({
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            value: $scope.textExpense,
            source: $scope.source,
            is_savings: 0,
            type: 'expense',
            category_id: $scope.category,
            detail: $scope.textDetail
        });
        if (DataPassing.nextUrl.length > 0) {
            Calculator.value = 0;
            $location.path(DataPassing.nextUrl[0]);
            DataPassing.nextUrl.shift();
        } else {
            window.history.back();
        }
    }

    $scope.back = function(){
        window.history.back();
    }
});