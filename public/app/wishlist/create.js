angular.module('GoodCash.WishlistCreateCtrl', [])

.controller('WishlistCreateCtrl', function($scope, $location, Wishlist,$rootScope) {
    $rootScope.title = 'Wishlist';
    $scope.title = '';
    $scope.description = '';
    $scope.price = '';
    $scope.picture = '';
    $scope.collect = '';
    $scope.save = function() {
        console.log('create');
        Wishlist.create({
            title: $scope.title,
            description: $scope.description,
            price: $scope.price,
            picture: $scope.picture,
            collect: $scope.collect,
            bought: 0,
        }).then(function(result) {
            window.history.back();
        });
    }
    $scope.back = function(){
        window.history.back();
    }
    $scope.bought = function(id) {
        Wishlist.update({
            bought: 1,
        }, id).then(function(result) {
            $location.path('/home/2');
        });
    }
});