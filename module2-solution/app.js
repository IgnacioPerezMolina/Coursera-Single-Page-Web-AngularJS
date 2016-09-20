(function() {
    'use strict';
    
angular.module('ShoppingListApp', [])
.controller('ToBuyShoppingController', ToBuyShoppingController )
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var itemBuy = this;

        itemBuy.toBuy = ShoppingListCheckOffService.getBuyItems();
        console.log(itemBuy.toBuy);

        itemBuy.buyItem = function (itemName, itemQuantity){
            ShoppingListCheckOffService.buyItem(itemName, itemQuantity)
        }
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var itemBought = this;

        itemBought.toBought = ShoppingListCheckOffService.getBoughtItems();
        console.log(itemBought.toBought);
    }

    function ShoppingListCheckOffService(){
        var service = this;
        var toBuy = [
            {
                name: "Milk",
                quantity: "2"
            },
            {
                name: "Donuts",
                quantity: "200"
            },
            {
                name: "Cookies",
                quantity: "300"
            },
            {
                name: "Chocolate",
                quantity: "5"
            },
            {
                name: "Beer",
                quantity: "20"
            }
        ];
        var toBought =[];

        service.buyItem = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            toBought.push(item);
            toBuy.splice(item, 1);
        }

        service.getBuyItems = function () {
            return toBuy;
        }

        service.getBoughtItems = function () {
            return toBought;
        }

    }
})();