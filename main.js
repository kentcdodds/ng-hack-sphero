var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-RWY-AMP-SPP' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
    var on = false;
    every((1).second(), function() {
      // flash light
      if (on) {
        my.sphero.setColor('purple');
        on = false;
      } else {
        my.sphero.setColor('white');
        on = true;
      }
      my.sphero.roll(60, Math.floor(Math.random() * 360));
    });
  }
}).start();