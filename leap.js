var Cylon = require('cylon');

var direction = {
  forward: false,
  left: false,
  handPresent: false,
  height: 0
};
var lastHand = new Date();
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
    my.leapmotion.on('hand', function(payload) {
      direction.handPresent = true;
      lastHand = new Date();

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

function checkHand() {
//  console.log('check');
  if (new Date().getTime() - lastHand.getTime() > 300) {
//    console.log('false');
    direction.handPresent = false;
  }
  setTimeout(checkHand, 300);
}

checkHand();

//function print() {
//  console.log(direction.left ? 'left' : 'right', 'and', direction.forward ? 'forward' : 'backward', 'and', direction.height);
//  setTimeout(print, 300)
//}
//print();
module.exports = direction;