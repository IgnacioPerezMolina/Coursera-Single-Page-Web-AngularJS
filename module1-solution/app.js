(function(){
'use strict';
  
angular.module('LunchCheck', [])
.controller('ControllerModule1', ControllerModule1);
  
ControllerModule1.$inject = ['$scope'];
function ControllerModule1($scope){
  $scope.lunch="";

  $scope.checkLunch = function () {
    var elements = $scope.lunch.split(/\s*,\w\s*/);
    if(elements == ""){
      $scope.message = "Please enter data first";
      // Change class of div that contains the message
      $scope.class = "alert alert-danger";
    }
    else if(elements.length <= 3){
      $scope.message = "Enjoy!";
      // Change class of div that contains the message
      $scope.class = "alert alert-success";
    }
    else if(elements.length > 3){
      $scope.message = "Too much!";
      // Change class of div that contains the message 
      $scope.class = "alert alert-success";
    }
  }
}

})();

