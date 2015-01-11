angular.module('GoodCash.config', [])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        reloadOnSearch: false,
    })
    .when('/home/:id', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        reloadOnSearch: false,
    })
    .when('/setup', {
        templateUrl: 'app/category/setup.html',
        controller: 'CategorySetupCtrl'
    })
    .when('/income/create/:source', {
        templateUrl: 'app/income/create.html',
        controller: 'IncomeCreateCtrl'
    })
    .when('/income/delete/:id', {
        template: '',
        controller: 'IncomeDeleteCtrl'
    })
    .when('/wishlist/delete/:id', {
        template: '',
        controller: 'WishlistDeleteCtrl'
    })
    .when('/expense/create/:source', {
        templateUrl: 'app/expense/expense.html',
        controller: 'ExpenseCtrl'
    })
    .when('/income/atm', {
        templateUrl: 'app/income/atm.html',
        controller: 'AtmCtrl'
    })
    .when('/category/create', {
        templateUrl: 'app/category/edit.html',
        controller: 'CategoryCreateCtrl'
    })
    .when('/category/edit/:id', {
        templateUrl: 'app/category/edit.html',
        controller: 'CategoryEditCtrl'
    })
    .when('/wishlist/create', {
        templateUrl: 'app/wishlist/create.html',
        controller: 'WishlistCreateCtrl'
    })
    .when('/wishlist/edit/:id', {
        templateUrl: 'app/wishlist/create.html',
        controller: 'WishlistEditCtrl'
    })
    .when('/reset', {
      template: '',
      controller: 'ResetCtrl'
    })
    .otherwise({
        redirectTo: '/setup'
    });
})

.constant('DB_CONFIG', {
  name: 'DB',
  tables: [
    {
      name: 'cashflow',
      columns: [
        {name: 'id', type: 'integer primary key'},
        {name: 'timestamp', type: 'text'},
        {name: 'value', type: 'real'},
        {name: 'detail', type: 'text'},
        {name: 'source', type: 'text'}, // bank | wallet
        {name: 'type', type: 'text'}, // income | expense
        {name: 'pos_lat', type: 'text'},
        {name: 'pos_long', type: 'text'},
        {name: 'category_id', type: 'integer'}, // food | transport | entertainment
        {name: 'wishlist_id', type: 'integer'}, // id of related wishlist item (if any)
        {name: 'groups_id', type: 'integer'}, // id of related wishlist item (if any)
        {name: 'is_savings', type: 'boolean'}, // 1 | 0
      ]
    },
    {
      name: 'category',
      columns: [
        {name: 'id', type: 'integer primary key'},
        {name: 'name', type: 'text'},
        {name: 'color', type: 'text'}, // hex code of color
        {name: 'icon', type: 'text'}, //icon from ionicons?
        {name: 'percent', type: 'real'},
        {name: 'is_savings', type: 'boolean'}, // 1 | 0
        {name: 'is_others', type: 'boolean'}, // 1 | 0
      ]
    },
    {
      name: 'groups',
      columns: [
        {name: 'id', type: 'integer primary key'},
        {name: 'details', type: 'text'},
        {name: 'value', type: 'integer'}, 
        {name: 'timestamp', type: 'text'},
        {name: 'type', type: 'text'}, // income | transfer
      ]
    },
    {
      name: 'wishlist',
      columns: [
        {name: 'id', type: 'integer primary key'},
        {name: 'title', type: 'text'},
        {name: 'description', type: 'text'},
        {name: 'price', type: 'real'},
        {name: 'collect', type: 'real'},
        {name: 'picture', type: 'text'},
        {name: 'bought', type: 'integer'}, // actually a boolean
        {name: 'star', type: 'boolean'},
      ]
    }
  ],
  seed : [
  {
      table: 'category',
      data: [
        {name: 'savings', icon: 'fa-money', color: '#1abc9c', percent: 20, is_savings: 1},
        {name: 'food', icon: 'fa-cutlery', color: '#2ecc71', percent: 20, is_savings: 0},
        {name: 'entertainment', icon: 'fa-star', color: '#3498db', percent: 20, is_savings: 0},
        {name: 'transport', icon: 'fa-taxi', color: '#c0392b', percent: 20, is_savings: 0},
        {name: 'others', icon: 'fa-refresh', color: '#e67e22', percent: 20, is_others: 1, is_savings: 0},
      ]
  }
  ]
});