angular.module('GoodCash.WishlistCtrl', [])

.controller('WishlistCtrl', function($scope, Wishlist, Cashflow, $location, $rootScope) {
    $scope.wishlists = [];
    $scope.savings = 0;

    Cashflow.getSavings().then(function(result) {
        $scope.savings = result;
    });
    Wishlist.all().then(function(result) {
        $scope.wishlists = angular.copy(result);
    });
    $scope.edit = function(id) {
        console.log(id);
        $location.path('/wishlist/edit/'+id);
    }
    $scope.delete = function(id) {
        $location.path('/wishlist/delete/'+id);
    }

});