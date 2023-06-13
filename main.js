'use strict';
const cross = require('./src/shapes/cross.js');
const room = require('./src/room.js');

const X = 40;
const Y = 40;
const Z = 0;
room.set_start({
  x: X,
  y: Y,
  z: Z,
});

let rooms = cross.build();
console.debug(rooms);



for(let rows = Y - (Y / 2); rows < Y + (Y / 2); rows++){
  for(let cols = X - (X / 2); cols < X + (X / 2); cols++){
    if(room.has(cols,rows)){
      process.stdout.write('o');
    }else{
      process.stdout.write(' ');
    }
  }
  console.log('');
}
