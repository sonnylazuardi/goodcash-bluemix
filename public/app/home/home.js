angular.module('GoodCash.HomeCtrl', [])

.controller('HomeCtrl', function($scope, $routeParams, $location, $rootScope, $timeout) {

  $scope.data = {
    maxIndex : 4,
    selectedIndex : 0,
    locked : true
  };

  $scope.next = function() {
    $scope.data.selectedIndex = Math.min( $scope.data.maxIndex, $scope.data.selectedIndex + 1) ;
  };

  $scope.previous = function() {
    $scope.data.selectedIndex = Math.max(0, ($scope.data.selectedIndex - 1));
  };

  $rootScope.title = 'TITLE';

  if ($routeParams.id)
    $scope.data.selectedIndex = $routeParams.id;

  $scope.$watch('data.selectedIndex', function(val) {
    $location.path('/home/'+$scope.data.selectedIndex, false);
    if (val==0)
      $rootScope.title = "Wallet";
    else if (val==1)
      $rootScope.title = "Bank";
    else if (val==2)
      $rootScope.title = "Saving";
    else if (val==3)
      $rootScope.title = "History";
    else if (val==4)
      $rootScope.title = "Settings";
    
      if (val == 0) {
        $rootScope.toolbars = [
            {
                icon : 'fa-plus',
                action : function() {
                    $location.path('/income/create/wallet');
                }
            },
            {
                icon : 'fa-minus',
                action : function() {
                    $location.path('/expense/create/wallet');
                }
            },
            {
                icon : 'fa-credit-card',
                action : function() {
                    $location.path('/income/atm');
                }
            }
        ];
      } else if (val == 1) {
        $rootScope.toolbars = [
            {
                icon : 'fa-plus',
                action : function() {
                    $location.path('/income/create/bank');
                }
            },
            {
                icon : 'fa-minus',
                action : function() {
                    $location.path('/expense/create/bank');
                }
            },
            {
                icon : 'fa-credit-card',
                action : function() {
                    $location.path('/income/atm');
                }
            }
        ];
      } else if (val == 2) {
        $rootScope.toolbars = [
            {
                icon: 'fa-plus',
                action: function() {
                    $location.path('/wishlist/create');
                }
            }
        ];
      } else {
        $rootScope.toolbars = [];
      }
  });
});