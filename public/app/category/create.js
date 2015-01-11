angular.module('GoodCash.CategoryCreateCtrl', [])

.controller('CategoryCreateCtrl', function($scope, $location, Category) {
    $scope.category = {
        name: '',
        color: '',
        icon: '',
        is_savings: 0,
        percent: 0,
    };
    $scope.colors = [
        '#16a085',
        '#27ae60',
        '#2980b9',
        '#8e44ad',
        '#2c3e50',
        '#f39c12',
        '#d35400',
        '#c0392b',
    ];
    $scope.icons = ['fa-cutlery','fa-star','fa-car','fa-camera','fa-beer','fa-building','fa-rocket','fa-medkit'];
    $scope.save = function() {
        Category.create(angular.copy($scope.category)).then(function(result) {
            window.history.back();
        });
    }
});
