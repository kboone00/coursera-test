(function () {
'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    }

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getItemsBought();
  }



  function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
      {name: "Cookies", quantity: 10},
      {name: "Gatorade", quantity: 1},
      {name: "Cucumbers", quantity: 3},
      {name: "Beers", quantity: 24},
      {name: "Hot Dogs", quantity: 20}
  ];

  var itemsBought = [];

  service.buyItem = function (itemIndex) {
    //Push bought item to already bought list
    itemsBought.push(itemsToBuy[itemIndex]);

    //Remove bought item from toBuy list
    itemsToBuy.splice(itemIndex, 1);
  }

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };

}

})();
