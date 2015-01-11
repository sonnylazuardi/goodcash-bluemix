angular.module('GoodCash.CategoryEditCtrl', [])

.controller('CategoryEditCtrl', function($scope, $routeParams, Category, $location) {
    $scope.category = {};
    $scope.id = $routeParams.id;
    Category.find($routeParams.id).then(function(item) {
        $scope.category = angular.copy(item);
    });
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
        Category.update($scope.category, $scope.category.id).then(function(result) {
            console.log(result);
            window.history.back();
        });
    };
    $scope.delete = function() {
        Category.delete($scope.id).then(function(result) {
           window.history.back(); 
        });
    };
});