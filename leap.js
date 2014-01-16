var Cylon = require('cylon');

var direction = {
  forward: false,
  left: false,
  height: 0
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
      var height = Math.floor((payload.palmPosition[1] - 50) / 70);
      if (height < 0) {
        height = 0;
      } else if (height > 4) {
        height = 4;
      }
      direction.height = height;
    });

  }
}).start();

//function print() {
//  console.log(direction.left ? 'left' : 'right', 'and', direction.forward ? 'forward' : 'backward', 'and', direction.height);
//  setTimeout(print, 300)
//}
//print();
module.exports = function() {
  return direction;
};