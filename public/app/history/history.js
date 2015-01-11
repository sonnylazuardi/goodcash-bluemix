angular.module('GoodCash.HistoryCtrl', ['angularCharts'])

.controller('HistoryCtrl', function($scope, Category, Cashflow) {
    $scope.categories = [];
    $scope.dates = [];
    $scope.histories = [];
    var _ = window._;
    $scope.list = {
        income: 0,
        expense: 0,
    };
    $scope.getCat = function(cat_id) {
        var _ = window._;
        var cat = _.findWhere($scope.categories, {id: cat_id});
        return cat;
    }
    $scope.$watch('list', function() {
        var tempA = $scope.list.income;
        var tempB = $scope.list.expense;
        // $scope.highchartsNG.series[0].data[0][1] = tempA;
        // $scope.highchartsNG.series[0].data[1][1] = tempB;
        $scope.data.data[0].y[0] = tempA;
        $scope.data.data[1].y[0] = tempB;
    }, true);

    $scope.config = {
        "labels": false,
        "title": "Cashflow",
        "legend": {
            "display": true,
            "position": "right"
        },
        "innerRadius": 20,
    }

    $scope.data = {
        series: ['Income', 'Expense'],
        data : [{
            x : "Income",
            y: [50],
        },
        {
            x : "Expense",
            y: [50]
        }]     
    }

    Cashflow.getIncome().then(function(result) {
        console.log(result);
        $scope.list.income = result;
    });

    Cashflow.getExpense().then(function(result) {
        console.log(result);
        $scope.list.expense = result;
    });

    Category.all().then(function(result) {
        $scope.categories = angular.copy(result);
    });

    Cashflow.getDates().then(function(result) {
        console.log(result);
        $scope.dates = angular.copy(result);
    });

    Cashflow.getHistory().then(function(result) {
        $scope.histories = angular.copy(result);
        angular.forEach($scope.histories, function(item) {
            var cari = _.findWhere($scope.dates, {tanggal: item.tanggal});
            if (!cari['items'])
                cari['items'] = [];
            cari['items'].push(item);
        });
    });
});