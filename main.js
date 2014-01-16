var Cylon = require('cylon'),
    leap = require('./leap');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-RRP-AMP-SPP' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
    var colors = ['purple', 'white', 'blue', 'red', 'green'];
    every((0.3).second(), function() {
      my.sphero.setColor(colors[leap.height]);
      var direction = 0, offset = 1;
      if(leap.left) {
        direction += 3;
        offset = -1;
      }
      if(!leap.forward) {
        direction += offset;
      }
      direction = 90 * direction + 45;
      my.sphero.roll(60, direction);
//        console.log(leap);
    });
  }
}).start();
