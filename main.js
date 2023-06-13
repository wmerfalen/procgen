'use strict';
const cross = require('./src/shapes/cross.js');
const room = require('./src/room.js');
const AR = require('./src/array.js');
const os = require('os');
const colors = require('./src/colors.js');

if(process.argv.includes('--mem-debug')){
setInterval(() => {
  console.debug('free:',Number.parseFloat(os.freemem() / 1024 / 1024 / 1024).toFixed(2),'Mb total:',Number.parseFloat(os.totalmem() / 1024 / 1024 / 1024).toFixed(2),'Mb');
},1000);
}
(async () => {
  //await sleep(4000);
  await main();
})();

async function main(){
  const X = 40;
  const Y = 40;
  const Z = 0;
  room.set_start({
    x: X,
    y: Y,
    z: Z,
  });

  let rooms = cross.build({
    rotate: 90,
  });
  room.mark(AR.beg(rooms).id,'white');
  room.mark(AR.endpluck(rooms,'id'),'red');
  let rooms2 = cross.build({
    from: rooms[0].id,
    rotate: 90,
  });
  room.mark(AR.endpluck(rooms2,'id'),'red');
  room.mark(AR.beg(rooms2).id,'white');
  room.set_start({
    x: X - 1,
    y: Y - 1,
    z: Z,
  });
  let rooms3 = cross.build({
    from: rooms[5].id,
    rotate: 180,
  });
  room.mark(AR.beg(rooms3).id,'white');
  room.mark(AR.endpluck(rooms3,'id'),'red');

  for(let rows = Y - (Y / 2); rows < Y + (Y / 2); rows++){
    for(let cols = X - (X / 2); cols < X + (X / 2); cols++){
      if(room.has(cols,rows)){
        let r = room.at(cols,rows);
        if(typeof r.mark === 'undefined'){
          process.stdout.write('o');
          continue;
        }
        switch(r.mark){
          case true:
            process.stdout.write('x');
            break;
          case 'red':
            process.stdout.write(colors.red('x'));
            break;
          case 'white':
            process.stdout.write(colors.wht('x'));
            break;
          case 'green':
            process.stdout.write(colors.grn('x'));
            break;
          case false:
            break;
          default:
            throw new Error(`invalid mark value`);
        }
      }else{
        process.stdout.write(' ');
      }
    }
    console.log('');
  }
}

async function sleep(ms){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve();
    },ms);
  });
}

if(process.argv.includes('--keep-alive')){
(async () => {
  await sleep(60000);
})();
}
