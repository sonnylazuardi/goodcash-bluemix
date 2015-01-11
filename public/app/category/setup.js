angular.module('GoodCash.CategorySetupCtrl', [])

.controller('CategorySetupCtrl', function($scope, Category, $location, Cashflow, $rootScope, DataPassing, $localStorage) {
    if (!$localStorage.tutorial) {
        $location.path('/home');
    }
    $rootScope.title = "SETUP";
    $scope.categories = [
        {id: 0, name: 'loading', icon: 'fa-refresh', color: '#e67e22', percent: 50},
    ];
    $scope.currentMoney = 0;
    $scope.load = function() {
        Category.all().then(function(result) {
            if (result.length > 0) {
                $scope.categories = angular.copy(result);
                // console.log($scope.categories[0]);
            }
        });
    }
    $scope.load();
    $rootScope.$watch('init', function() {
        if ($rootScope.init) $scope.load();
    });
    $scope.save = function() {
        var currentMoney = $scope.currentMoney;
        angular.forEach($scope.categories, function(item) {
            var item = angular.copy(item);
            Category.update(item, item.id);
        });
        DataPassing.nextUrl = ['/income/create/wallet', 'home'];
        $localStorage.tutorial = false;
        $location.path('/income/create/bank');
    };
    $scope.create = function() {
        $location.path('/category/create');
    };
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
});