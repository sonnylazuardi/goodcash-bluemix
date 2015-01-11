angular.module('GoodCash.SettingsCtrl', [])

.controller('SettingsCtrl', function($scope, $localStorage, $rootScope, Category, $location) {
    $scope.categories = [];
    Category.all().then(function(result) {
        $scope.categories = angular.copy(result);
    });

    $rootScope.toolbars = [];

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
        angular.forEach($scope.categories, function(item) {
            var item = angular.copy(item);
            Category.update(item, item.id);
        });
    };
    $scope.create = function() {
        $location.path('/category/create');
    }
    $scope.reset = function() {
        $location.path('/reset');
    }
    $scope.go = function(path) {
        $location.path(path);
    }
});