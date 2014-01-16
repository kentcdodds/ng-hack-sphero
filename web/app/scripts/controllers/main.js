'use strict';

angular.module('cylon')
  .controller('MainCtrl', function ($scope,$http) {
  var main= this;
        main.robotname = null;
        main._fetchRobots = function(){
           $http({url:"http://127.0.0.1/Robots",method:"GET"}).success(function(result){
               main.robotname = result[0].name;
           });
        };
        main.ChangeColor = function(color){
            $http({url:"http://127.0.0.1:4321/", data:color}).success(function(){
                console.log("Recieved")
            });
            console.log("Sending "+color+"....");
        }
    });
