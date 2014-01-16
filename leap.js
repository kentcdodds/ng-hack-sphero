var Cylon = require('cylon');

var direction = {
  forward: false,
  left: false
};

Cylon.robot({
  connection: {
    name: 'leapmotion',
    adaptor: 'leapmotion',
    port: '127.0.0.1:6437'
  },

  device: {
    name: 'leapmotion',
    driver: 'leapmotion'
  },

  work: function(my) {
    var dontPrint = ['pointables'];
    my.leapmotion.on('hand', function(payload) {

      var palmX = payload.palmNormal[0];
      var palmZ = payload.palmNormal[2];
      direction.left = palmX > 0;
      direction.forward = palmZ > 0;
    });

  }
}).start();

//function print() {
//  console.log(direction.left ? 'left' : 'right', 'and', direction.forward ? 'forward' : 'backward');
//  setTimeout(print, 300)
//}
//print();
module.exports = function() {
  return direction;
};