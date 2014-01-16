'use strict';

angular.module('cylon')
  .controller('MainCtrl', function ($scope) {
  var main= this;
        main.ChangeColor = function(color){
            console.log("Sending "+color+"....");
        }
    });
