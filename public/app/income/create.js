angular.module('GoodCash.IncomeCreateCtrl', ['ngMaterial', 'GoodCash.services'])

.controller('IncomeCreateCtrl', function($scope, $mdDialog, Calculator, Category, 
    $routeParams, DataPassing, Cashflow, Groups, $location) {
    $scope.source = $routeParams.source;
    Calculator.source = $routeParams.source;
    $scope.categories = [];
    $scope.textIncome = 0;
    $scope.textDetail = 'My Income From ' + $scope.source;
    $scope.load = function() {
        Category.all().then(function(result) {
            $scope.categories = angular.copy(result);
        });
    }
    $scope.load();
    $scope.textClick = function(event) {
        // console.log($mdDialog);
        Calculator.value = $scope.textIncome;
        $mdDialog.show({
            templateUrl: 'app/calculator/modal.html',
            targetEvent: event,
            controller: 'CalculatorCtrl'
        }).then(function(answer) {
            $scope.textIncome = answer;
        });
    }
    $scope.textClick();

    
    $scope.save = function() {
        Groups.create({
            details: $scope.textDetail,
            value: $scope.textIncome,
            type: 'income',
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        }).then(function(result) {
            console.log(result);
            angular.forEach($scope.categories, function(cat) {
                var newValue = cat.percent / 100 * $scope.textIncome;
                if (newValue > 0) {
                    var newData = {
                        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                        value: newValue,
                        source: $scope.source,
                        type: 'income',
                        is_savings: 0,
                        groups_id: result,
                        category_id: cat.id,
                        detail: $scope.textDetail
                    };
                    if (cat.is_savings) {
                        newData.is_savings = 1;
                    }
                    Cashflow.create(newData);
                }
            });
            if (DataPassing.nextUrl.length > 0) {
                Calculator.value = 0;
                $location.path(DataPassing.nextUrl[0]);
                DataPassing.nextUrl.shift();
            } else {
                window.history.back();
            }
        });
    }

    $scope.change = function(id, value) {
        var total = 0;
        var idmax = 0;
        angular.forEach($scope.categories, function(item) {
            total += item.percent;
        });
        if (total > 100) {

            var arrSort = _.sortBy($scope.categories, function(item) {
                return item.percent * -1;
            });

            for (var i = 0; i <= arrSort.length - 1; i++) {
                if (arrSort[i].id != id ) {
                    if (total - 100 <= arrSort[i].percent) {
                        arrSort[i].percent -= (total - 100);
                        break;
                    } else {
                        total -= arrSort[i];
                        arrSort[i].percent = 0;
                    }
                }
            };

        }
        //total without others
        total = 0;
        angular.forEach($scope.categories, function(item) {
            if (item.is_others != 1)
                total += item.percent;
        });

        if (total < 100) {
            _.findWhere($scope.categories, {is_others: 1}).percent = 100 - total;
        }
    }
    
    $scope.back = function(){
        window.history.back();
    }
});