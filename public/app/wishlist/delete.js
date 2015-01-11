angular.module('GoodCash.WishlistDeleteCtrl', [])

.controller('WishlistDeleteCtrl', function($scope, $location, $routeParams, Wishlist) {
    var id = $routeParams.id;
    Wishlist.delete(id).then(function(result) {
        window.history.back();
    });
});