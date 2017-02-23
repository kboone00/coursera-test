(function () {
'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.message = "";

    $scope.displayMessage = function () {
      $scope.message = checkIfTooMuch();

    };

    function checkIfTooMuch() {
      if($scope.dishes != "" && $scope.dishes != undefined) {
        var dishes = $scope.dishes.split(',');
        if (dishes.length <= 3) {
          return "Enjoy!";
        }
        else if (dishes.length > 3) {
          return "Too much!";
        }
      }
      else {
        return "Please enter data first!";
      }
    }

  }



})();
