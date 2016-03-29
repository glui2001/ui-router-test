var app = angular.module('testapp', ['ui.router']);

app.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
       $urlRouterProvider.otherwise("/home");

       $stateProvider
//HOME
         .state('home', {
           url: "/home",
           templateUrl: "./home.html",
           controller: 'HomeCtrl'
         })

//ONE
         .state('home.one', {
           url: "/one",
           templateUrl: "./one.html",
           resolve: {
              simpleResolve: function() {
                return { id: 'Simple resolve' };
              }
           },
           controller: function($scope, simpleResolve) {
              $scope.title = "State 'home.one' (one.html)";
              $scope.arr = ['are', 'we', 'having', 'fun', 'yet'];
              $scope.simpleResolve = simpleResolve;
           }
         })

//TWO
         .state('home.two', {
           url: "/two",
           templateUrl: "./two.html",
           controller: 'HomeTwoCtrl'
         })
         .state('home.two.detail', {
           url: "/detail/:val",
           templateUrl: "two-detail.html",
           controller: 'HomeTwoDetailCtrl'
         })

//THREE
         .state('home.three', {
           url: "/three",
           templateUrl: "./three.html",
           controller: 'HomeThreeCtrl'
         })
         .state('home.three.detail', {
           url: "/detail/:val",
           templateUrl: "three-detail.html",
           controller: 'HomeThreeDetailCtrl'
         })
         .state('home.three.detail.tab', {
           url: "/tab/:tabData",
           resolve: {
              promiseResolve: function($timeout) {
                 var deferred = new $.Deferred;

                $timeout(function() {
                    deferred.resolve({ id: 'Promise resolved' });
                }, 2000);

                 return deferred.promise();
              }
           },
           templateUrl: "three-detail-tab.html",
           controller: function($scope, $rootScope, $stateParams, promiseResolve) {
                $scope.content = $stateParams.tabData;
                $scope.random = (Math.random() * 100).toFixed(0);
                $scope.promiseResolve = promiseResolve;
           }
         });
    }
] );


/* ==========================================================================
 SERVICES
 ============================================================================= */

    
/* ==========================================================================
 CONTROLLERS
 ============================================================================= */

/*
 * Main Controller:
 *
 */
app.controller('HomeCtrl', [
    '$scope',
    function($scope) {
        $scope.title = "Home Sweet Home";
        $scope.desc = "I'm the parent state (home.html)"
    }
] );


app.controller('HomeTwoCtrl', [
    '$scope',
    function($scope) {
        $scope.title = "State 'home.two' (two.html). HomeTwoCtrl";
        $scope.desc = "Master/Detail example";
        $scope.masterList = [
            { id: 'a', val: 'a' },
            { id: 'b', val: 'bb' },
            { id: 'c', val: 'ccc' },
            { id: 'd', val: 'dddd' }
        ];
    }
] );

app.controller('HomeTwoDetailCtrl', [
    '$scope',
    '$stateParams',
    function($scope, $stateParams) {
        $scope.passedParam = $stateParams.val;
    }
] );

app.controller('HomeThreeCtrl', [
    '$scope',
    function($scope, promiseResolve) {
        $scope.title = "State 'home.three' (three.html). HomeThreeCtrl";
        $scope.desc = "Master/Detail example with dynamic Sub-Tabs";
        
        $scope.masterList = [
            { id: 'three', val: 3 },
            { id: 'four', val: 4 },
            { id: 'six', val: 6 },
            { id: 'seven', val: 7 },
            { id: 'eight', val: 8 }
        ];
    }
] );

app.controller('HomeThreeDetailCtrl', [
    '$scope',
    '$stateParams',
    '$state',
    function($scope, $stateParams, $state) {
        $scope.passedParam = $stateParams.val;        
        $scope.arr = [];
        for (var i = 0; i < $scope.passedParam; i++) {
            $scope.arr.push('x');   
        }

        $scope.tabSelected = function(data) {
            $state.go('home.three.detail.tab', { tabData: data }, { reload: true });
        };
    }
] );


/* ==========================================================================
 DIRECTIVES
 ============================================================================= */

/* ==========================================================================
 FILTERS
 ============================================================================= */

 /* ==========================================================================
  GENERAL
  ============================================================================= */

