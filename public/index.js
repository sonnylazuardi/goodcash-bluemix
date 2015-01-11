angular.module('GoodCash', ['ngMaterial', 'ngAnimate', 'ngRoute', 'ngStorage', 'ng-iscroll', 'GoodCash.config', 'GoodCash.controllers', 'GoodCash.services', 'GoodCash.models', 'GoodCash.directives'])

.run(function(DB, $localStorage, $rootScope, $route, $location) {
    DB.init();
    if ($localStorage.symbol == undefined) {
        $localStorage.symbol = 'Rp';
    }
    if ($localStorage.tutorial == undefined) {
        $localStorage.tutorial = true;
    }
    if ($localStorage.decimal == undefined) {
        $localStorage.decimal = ',';
    }
    if ($localStorage.thousand == undefined) {
        $localStorage.thousand = '.';
    }
    if ($localStorage.precision == undefined) {
        $localStorage.precision = 0;
    }
    $rootScope.init = false;
    $rootScope.symbol = $localStorage.symbol;
    $rootScope.decimal = $localStorage.decimal;
    $rootScope.thousand = $localStorage.thousand;
    $rootScope.precision = $localStorage.precision;
    $rootScope.$watch('symbol', function() {
        $localStorage.symbol = $rootScope.symbol;
        accounting.settings.currency.symbol = $rootScope.symbol;
    });
    $rootScope.$watch('decimal', function() {
        $localStorage.decimal = $rootScope.decimal;
        accounting.settings.currency.decimal = $rootScope.decimal;
    });
    $rootScope.$watch('thousand', function() {
        $localStorage.thousand = $rootScope.thousand;
        accounting.settings.currency.thousand = $rootScope.thousand;
    });
    $rootScope.$watch('precision', function() {
        $localStorage.precision = $rootScope.precision;
        accounting.settings.currency.precision = $rootScope.precision;
    });
    accounting.settings = {
        currency: {
            symbol : "Rp",   // default currency symbol is '$'
            format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal : ",",  // decimal point separator
            thousand: ".",  // thousands separator
            precision : 0   // decimal places
        },
        number: {
            precision : 0,  // default precision on numbers is 0
            thousand: ",",
            decimal : "."
        }
    }
    $rootScope.title = "GOODCASH";
    $rootScope.toolbars = [];
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
});

