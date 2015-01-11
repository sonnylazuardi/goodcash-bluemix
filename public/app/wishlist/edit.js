angular.module('GoodCash.WishlistEditCtrl', [])

.controller('WishlistEditCtrl', function($scope, $routeParams, Wishlist, $location, Cashflow, Category, $rootScope) {
    var idWishlist = $routeParams.id;
    $rootScope.title = 'Wishlist';
    $scope.title = '';
    $scope.description = '';
    $scope.price = '';
    $scope.picture = '';
    $scope.collect = '';
    $scope.id = idWishlist;
    Wishlist.find(idWishlist).then(function(result) {
        $scope.title = result.title;
        $scope.description = result.description;
        $scope.price = result.price;
        $scope.collect = result.collect;
    });
    $scope.save = function() {
        console.log('create');
        Wishlist.update({
            id: idWishlist,
            title: $scope.title,
            description: $scope.description,
            price: $scope.price,
            picture: $scope.picture,
            collect: $scope.collect,
        }, idWishlist).then(function(result) {
            window.history.back();
        });
    }
    $scope.bought = function() {
        Category.findWhere('is_savings', 1).then(function(result) {
            Cashflow.create({
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                value: $scope.price,
                source: 'bank',
                is_savings: 1,
                type: 'expense',
                category_id: result.id,
                detail: 'Wishlist ' + $scope.title + ' : ' + $scope.description
            });    
        });
        Wishlist.update({
            bought: 1,
        }, idWishlist).then(function(result) {
            $location.path('/home/2');
        });
    }
});