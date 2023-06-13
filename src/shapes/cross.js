'use strict';
const room = require('../room.js');

let Lib = {};
module.exports = Lib;

Lib.build = function(args={}){
  let start = null;
  if(typeof args.from_id === 'number'){
    start = args.from_id;
  }
  if(typeof args.rotate === 'number'){
    let horiz, mid, vert;
    switch(args.rotate){
      case 90:
        // Clockwise 90 degree rotate
        /**
         *         |
         *         |
         * ========|
         *         |
         *         |
         */
        horiz = room.create({n: 10,from: start});
        mid = room.walk(horiz[0].id,'n',5);
        vert = room.create({w: 4,from: mid.id});
        return [...horiz,mid,...vert];
        break;
      case -90:
        // Counter-clockwise 90 degree rotate
        /**
         *
         *  |
         *  |
         *  |=========
         *  |
         *  |
         *
         */
        horiz = room.create({n: 10,from: start,});
        mid = room.walk(horiz[0].id,'n',5);
        vert = room.create({e: 4,from: mid.id});
        return [...horiz,mid,...vert];
        break;
      case 180:
        // clockwise 180 degree rotate
        /**
         *        ||
         *        ||
         *        ||
         *        ||
         * ----------------
         */
        horiz = room.create({e: 10,from: start,});
        mid = room.walk(horiz[0].id,'e',5);
        vert = room.create({n: 4,from: mid.id});
        return [...horiz,mid,...vert];
        break;
      default:
        throw new Error(`Invalid rotation. Accepted rotations are 90,-90,and 180`);
        break;
    }
  }
  let horiz = room.create({e: 10,from: start,});
  let mid = room.walk(horiz[0].id,'e',5);
  let vert = room.create({s: 4,from: mid.id});
  return [...horiz,mid,...vert];
}

