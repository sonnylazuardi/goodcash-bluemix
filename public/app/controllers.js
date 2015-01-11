angular.module('GoodCash.controllers', [
    'GoodCash.CategorySetupCtrl', 
    'GoodCash.CategoryEditCtrl', 
    'GoodCash.CategoryCreateCtrl', 
    'GoodCash.HomeCtrl', 
    'GoodCash.WalletCtrl', 
    'GoodCash.BankCtrl',
    'GoodCash.IncomeCreateCtrl',
    'GoodCash.IncomeDeleteCtrl',
    'GoodCash.ExpenseCtrl',
    'GoodCash.CalculatorCtrl',
    'GoodCash.AtmCtrl',
    'GoodCash.WishlistCtrl',
    'GoodCash.WishlistCreateCtrl',
    'GoodCash.WishlistDeleteCtrl',
    'GoodCash.WishlistEditCtrl',
    'GoodCash.HistoryCtrl',
    'GoodCash.SettingsCtrl',
])

.controller('ResetCtrl', function($scope, DB, $location, $localStorage) {
    $localStorage.symbol = 'Rp';
    $localStorage.tutorial = true;
    $localStorage.decimal = ',';
    $localStorage.thousand = '.';
    $localStorage.precision = 0;
    DB.reset();
    $location.path('/');
});