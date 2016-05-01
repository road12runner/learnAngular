var myApp =  angular.module('myApp', ['ngMessages', 'ngResource', 'ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'pages/main.html',
        controller : 'mainController'
        })
        .when('/second/:num', {
            templateUrl: 'pages/second.html',
            controller : 'secondController'
        })
        .when('/search', {
            templateUrl: 'pages/search.html',
            controller: 'searchController'
        })
    ;
});

myApp.controller('mainController', ['$scope', '$log', '$timeout', '$filter', 'nameService', function($scope, $log, $timeout, $filter, nameService){

    $scope.myName = nameService.name;

    $scope.$watch('myName', function(){
        nameService.name = $scope.myName;
    });
    $scope.lowercasehandle = function() {
        return $filter('lowercase')($scope.handle);
    };

    //$timeout(function(){
    //    $scope.name = 'Everybody';
    //}, 3000);

    $scope.characters =5;

    $scope.rules =[
        {rulename : "Must be 5 characters"},
        {rulename : "Must not be used elsewhere"},
        {rulename : "Must be cool"}
    ];


    //$log.log(nameService.name);
    //$log.log(nameService.nameLength());

}]);

myApp.controller('secondController', ['$scope', '$log', '$timeout', '$filter', '$routeParams', function($scope, $log, $timeout, $filter, $routeParams){

    $scope.name = 'Second';

    $scope.num = $routeParams.num;
    console.log($scope.num);
}]);


myApp.controller('searchController', ['$scope', '$log', '$timeout', '$filter', '$routeParams', function($scope, $log, $timeout, $filter, $routeParams){

    //$scope.person = {
    //    name: 'John Doe',
    //    address: '55 Main St, New York, NY 11111'
    //};

    $scope.person = {
        name: 'John Doe',
        address: '55 Main St',
        city: 'New York',
        state: 'NY',
        zip:'11111'
    };


    $scope.people = [{
        name: 'John Doe',
        address: '55 Main St',
        city: 'New York',
        state: 'NY',
        zip:'11111'
    }, {
        name: 'Jane Doe',
        address: '33 Second St',
        city: 'New York',
        state: 'NY',
        zip:'112211'
    }, {
        name: 'George Doe',
        address: '111 Main St',
        city: 'Miamia',
        state: 'FL',
        zip:'55555'
    }];


    $scope.formattedAddress= function(person){
        return person.address + ', ' + person.city  + ', ' + person.state  + ', ' + person.zip;
    };
    console.log('here');
}]);



myApp.service('nameService', function(){
    var self = this;
    this.name = 'John Doe';
    this.nameLength = function(){
        return self.name.length;
    }
});


myApp.directive('searchResult', function(){
    return {
        restrict: 'AECM',
        templateUrl: 'directives/searchResult.html',
        replace: true,
        scope: {
            //personName : "@",
            //personAddress: "@"
            personObject: "=",
            formattedAddressFunction: "&"
        },
        compile: function(elem, attrs){
            console.log('Compiling...');
            console.log(elem);

            return {
                pre: function(scope, elements, attrs) {
                    console.log('pre-linking');
                    console.log(elements);
                },
                post : function(scope, elements, attrs) {
                    console.log('post-linking');
                    console.log(elements);
                }
            }
        }
    }
});
