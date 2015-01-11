angular.module('GoodCash.AtmCtrl', [])

.controller('AtmCtrl', function($scope, $mdDialog, Calculator, Category, 
    DataPassing, Cashflow, Groups, $location) {

    $scope.methods = [
        {id: 0, name: 'Bank > Wallet'},
        {id: 1, name: 'Wallet > Bank'},
    ];
    $scope.method = 0;

    $scope.$watch(function() {return Calculator.value}, function() {
        $scope.textIncome = Calculator.value;
    });

    $scope.textDetail = 'ATM Transfer ' + $scope.methods[$scope.method].name;

    $scope.textIncome = 0;
    $scope.categories = [];
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
    
    $scope.save = function() {
        Groups.create({
            details: $scope.textDetail,
            value: $scope.textIncome,
            type: 'transfer',
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        }).then(function(result) {
            angular.forEach($scope.categories, function(cat) {
                var newValue = cat.percent / 100 * $scope.textIncome;
                if (newValue > 0) {
                    var newData = {
                        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                        value: newValue,
                        source: 'bank',
                        type: 'income',
                        groups_id: result,
                        is_savings: 0,
                        category_id: cat.id,
                        detail: $scope.textDetail
                    };
                    if (cat.is_savings) {
                        newData.is_savings = 1;
                    }
                    if ($scope.method == 0) {
                        newData.type = 'income';
                        newData.source = 'wallet';
                        Cashflow.create(newData);
                        newData.type = 'expense';
                        newData.source = 'bank';
                        Cashflow.create(newData);
                    } else {
                        newData.type = 'income';
                        newData.source = 'bank';
                        Cashflow.create(newData);
                        newData.type = 'expense';
                        newData.source = 'wallet';
                        Cashflow.create(newData);
                    }
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

    $scope.back = function(){
        window.history.back();
    }
});