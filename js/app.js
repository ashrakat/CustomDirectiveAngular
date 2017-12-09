(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuItemsController', MenuItemsController)
.service('MenuItemsService', MenuItemsService)
.directive('foundItems', FoundItems)    
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItems() {
  var ddo = {
    templateUrl: 'itemsloaderindicator.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: DirectiveController,
    controllerAs: 'list',
    bindToController: true,    
  };

  return ddo;
}

    
function DirectiveController() {
  var list = this;
}
    
    
MenuItemsController.$inject = ['MenuItemsService'];
function MenuItemsController(MenuItemsService) {
  var menu = this;
  menu.wantedItem = "";
  
  menu.getItems = function(){
    var promise = MenuItemsService.getMenuItems();
    promise.then(function (response) {
      menu.items = response.data.menu_items;
      for(var i = 0 ; i < menu.items.length ; i++)
      {
          if(menu.items[i].name.toLocaleLowerCase().includes(menu.wantedItem.toLowerCase()) === true)
              {
                  MenuItemsService.addItem(menu.items[i].name , menu.items[i].short_name , menu.items[i].description);
              }
      }
      menu.foundItems = MenuItemsService.getfoundItems(); 
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
 };
    
  menu.removeItem = function(index){
    MenuItemsService.removeItem(index);
  };    

}    
    
    
MenuItemsService.$inject = ['$http', 'ApiBasePath'];
    
 function MenuItemsService($http, ApiBasePath) {
   var service = this;
   var found = [];
   service.getMenuItems = function () {
     var response = $http({
       method: "GET",
       url: (ApiBasePath + "/menu_items.json")
    });

     return response;
  };
    

  service.addItem = function (itemName, shortName , description) {
      var item = {
        name: itemName,
        shortName: shortName,
        description: description  
        };
      found.push(item);
    };
   

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };

  service.getfoundItems = function () {
    return found;
  };    
}
    
    
    
})();