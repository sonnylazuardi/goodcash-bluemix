angular.module('GoodCash.CalculatorCtrl', [])

.controller('CalculatorCtrl', function($scope, Calculator, $mdDialog) {
    $scope.textCalc = parseInt(Calculator.value);
    $scope.source = Calculator.source;
    $scope.state = 0;
    $scope.currentOp = -1;
    $scope.currentTemp = 0;
    $scope.click = function(num) {
        if ($scope.state == 0 || $scope.state == 2) { // no operator
            num = $scope.textCalc * 10 + num;
            $scope.textCalc = num;
        } else if ($scope.state == 1) {
            $scope.currentTemp = $scope.textCalc;
            $scope.textCalc = num;
            $scope.state = 2;
        } else if ($scope.state == 3) {
            $scope.currentTemp = $scope.textCalc;
            $scope.textCalc = num;
            $scope.state = 0;
        }
    }
    $scope.clicko = function(num) {
        if (num == 1) {
            num = $scope.textCalc * 10;    
        } else if (num == 2) {
            num = $scope.textCalc * 100;
        } else if (num == 3) {
            num = $scope.textCalc * 1000;
        }
        $scope.textCalc = num;
    }
    $scope.equals = function() {
        if ($scope.state == 2) {
            if ($scope.currentOp == 0) {
                $scope.textCalc = $scope.currentTemp + $scope.textCalc;
            } else if ($scope.currentOp == 1) {
                $scope.textCalc = $scope.currentTemp - $scope.textCalc;
            } else if ($scope.currentOp == 2) {
                $scope.textCalc = $scope.currentTemp * $scope.textCalc;
            } else if ($scope.currentOp == 3) {
                $scope.textCalc = $scope.currentTemp / $scope.textCalc;
            }
            $scope.currentOp = -1;
            $scope.state = 3;
        }
    }
    $scope.operator = function(op) {
        if ($scope.state == 2) {
            $scope.equals();
        }
        $scope.currentOp = op;
        $scope.state = 1;
    }
    $scope.del = function() {
        var num = Math.floor($scope.textCalc / 10);
        console.log (num);
        $scope.textCalc = num;   
    }
    $scope.close = function() {
        $mdDialog.hide($scope.textCalc);
    };
});