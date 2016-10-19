'use strict';

// let obj = ['ena', 'dva', 'tri'];
let a = function () {
  return 5;
};

let obj = {
  first: 'First'
};
obj.second = 'Second';

Object.defineProperty(obj, 'third', {
  value: 'Third',
  enumerable: false // do not expose as object key
});

Object.defineProperty(obj, 'third', {
  value: 'Third',
  enumerable: true // do not expose as object key
});

// console.log(obj.a.constructor.name);
// let obj = [a];
// for(let elm in obj){
//   console.log(elm);
// }
console.log(obj);