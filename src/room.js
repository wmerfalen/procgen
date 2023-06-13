'use strict';
let Lib = {};

module.exports = Lib;

let global_set = {
  id: 0,
  coords: {x:0,y:0,z:0},
};
let RoomMap = {};
Lib.at = (x,y) => {
  for(const r in RoomMap){
    if(RoomMap[r].coords.x === x && RoomMap[r].coords.y === y){
      return RoomMap[r];
    }
  }
};
Lib.coords = () => {
  return Object.assign({},global_set.coords);
};
Lib.set_coords = (obj) => {
  global_set.coords.x = obj.x;
  global_set.coords.y = obj.y;
  global_set.coords.z = obj.z;
};
Lib.inc_x = () => {
  global_set.coords.x += 1;
  return global_set.coords.x;
};
Lib.inc_y = () => {
  global_set.coords.y += 1;
  return global_set.coords.y;
};
Lib.inc_z = () => {
  global_set.coords.z += 1;
  return global_set.coords.z;
};
Lib.mod_x = (val) => {
  global_set.coords.x += val;
  return global_set.coords.x;
};
Lib.mod_y = (val) => {
  global_set.coords.y += val;
  return global_set.coords.y;
};
Lib.mod_z = (val) => {
  global_set.coords.z += val;
  return global_set.coords.z;
};

Lib.set_id = (i) => {
  global_set.id = i;
};

Lib.inc_id = () => {
  global_set.id += 1;
  return global_set.id;
};
Lib.id = () => {
  return global_set.id;
};

Lib.last = () => {
  return RoomMap[global_set.id];
};

Lib.by_id = (i) => {
  return RoomMap[i];
};
Lib.renumber = () => {
};
Lib.has = (x,y) => {
  for(const r in RoomMap){
    if(RoomMap[r].coords.x === x && RoomMap[r].coords.y === y){
      return true;
    }
  }
  return false;
};

Lib.set_start = (obj) => {
  global_set.coords.x = obj.x;
  global_set.coords.y = obj.y;
  global_set.coords.z = obj.z;
};

Lib.create = (args) => {
  if(typeof args === 'undefined'){
    let id = Lib.inc_id();
    RoomMap[id] = {id,};
    return RoomMap[id];
  }
  let len = 0;
  let dir = '';
  if(typeof args.n === 'number'){
    len = args.n;
    dir = 'n';
  }
  if(typeof args.e === 'number'){
    len = args.e;
    dir = 'e';
  }
  if(typeof args.w === 'number'){
    len = args.w;
    dir = 'w';
  }
  if(typeof args.s === 'number'){
    len = args.s;
    dir = 's';
  }
  let r = [];
  let last_id = Lib.id();
  let current_id = last_id;
  let room = {};
  if(typeof args.from === 'number'){
    room = RoomMap[args.from];
    Lib.set_coords(room.coords);
  }
  for(let i=0; i < len; i++){
    current_id = Lib.inc_id();
    switch(dir){
      case 'n':
        Lib.mod_y(-1);
        break;
      case 'e':
        Lib.mod_x(1);
        break;
      case 's':
        Lib.mod_y(1);
        break;
      case 'w':
        Lib.mod_x(-1);
        break;
    }
    room = {id: current_id,coords: Lib.coords(),dir};
    RoomMap[room.id] = room;
    r.push(room);
    last_id = current_id;
  }
  return r;
};


Lib.walk = (from_id,dir,length) => {
  let r = RoomMap[from_id];
  if(!r){
    throw new Error('unknown room id');
  }
  let c = Object.assign({},r.coords);
  let next = () => {};
  switch(dir){
    case 'n':
      next = () => {
        c.y += 1;
        return Object.assign({},c);
      };
      break;
    case 'e':
      next = () => {
        c.x += 1;
        return Object.assign({},c);
      };
      break;
    case 's':
      next = () => {
        c.y -= 1;
        return Object.assign({},c);
      };
      break;
    case 'w':
      next = () => {
        c.x -= 1;
        return Object.assign({},c);
      };
      break;
    default:
      throw new Error('dir must be a direction');
  }
  let id=null;
  let ln = 0;
  let ctr = 0;
  while(++ctr < 20){
    let c = next();
    let r = Lib.at(c.x,c.y);
    if(!r){
      return null;
    }
    if(++ln === length){
      return r;
    }
  }

};
