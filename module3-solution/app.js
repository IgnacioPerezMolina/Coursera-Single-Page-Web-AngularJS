(function () {
    'use strict';

angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'list.html',
        scope: {
            items: '<',
            onRemove: '&',
            showError:'<'
        },
        controller: NarrowItDownController,
        controllerAs: 'list',
        bindToController: true,
    };
    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.searchTerm ='';
    menu.found = []
    menu.showError = false;

    menu.getItems = function () {
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        promise.then(function (response) {
                if (response.length !== 0) {
                    menu.showError = false;
                    menu.found = response;
                }else {
                    menu.showError =true;
                }
            })
            .catch(function (error){
                console.log('something went wrong.' + error);
                menu.showError =true;
            })
    };
    menu.removeItem = function (itemIndex) {
        menu.found.splice(itemIndex, 1);
    };
}

MenuSearchService.$inject = ['$http', '$filter']
function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: "GET",
            url: ("https://davids-restaurant.herokuapp.com/menu_items.json")

        }).then(function (result) {
            // process result and only keep items that match
            var foundItemsInitial = result.data.menu_items;
            var foundItems = [];
            if (searchTerm.length !== 0){
                for (var i = 0; i < foundItemsInitial.length; i++) {
                    if (foundItemsInitial[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1){
                        foundItems.push(foundItemsInitial[i]);
                    }
                }
            }
            return foundItems;
        });
    };
}

})();