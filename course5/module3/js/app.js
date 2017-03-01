(function () {
'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        nothingFound: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowedList = this;

    narrowedList.found = [];
    narrowedList.nothingFound = false;

    narrowedList.getMatchedMenuItems = function (searchTerm) {
      if(searchTerm === undefined || searchTerm === ""){
        console.log("Nothing Found.");
        narrowedList.nothingFound = true;
      }
      else{
        console.log(searchTerm);
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

        promise.then(function (response) {
          // console.log(response);
          narrowedList.found = response;
          if (narrowedList.found === undefined || narrowedList.found.length == 0) {
            narrowedList.nothingFound = true;
          }
          else {
            narrowedList.nothingFound = false;
          }
          console.log("Narrowed List: ");
          console.log(narrowedList.found);
        });
      }

    }


    narrowedList.removeItem = function (itemIndex) {
      narrowedList.found.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      })
      //console.log(response);

      .then(function (result) {
        var foundItems = [];
        var allItems = result.data.menu_items;

        for (var i = 0; i < allItems.length; i++) {
          //console.log(allItems[i]);
          if (allItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
            foundItems.push(allItems[i]);
          }
        }
        // console.log(foundItems);
        return foundItems;

      })
      .catch(function (error) {
        console.log("Something is wrong...");
      });
    };
  }


})();
