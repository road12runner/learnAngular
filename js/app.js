var myApp =  angular.module('myApp', ['ngMessages', 'ngResource']);

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


myApp.service('nameService', function(){
    var self = this;
    this.name = 'John Doe';
    this.nameLength = function(){
        return self.name.length;
    }
});
