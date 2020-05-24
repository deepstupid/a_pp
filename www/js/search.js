"use strict";

var index = elasticlunr(function () {
    this.addField('n'); //label
    //this.addField('S'); //list of supercategories
    this.addField('s'); //list of subcategories
    this.setRef('i'); //URI
});

function search(q) {
  return index.search(q, {
      fields: {
          n: {boost: 2},
          s: {boost: 1},
      }
      //,expand: false /*true */
  });
}

$.get('cat.json', x=>{
  //console.log(x);
  //console.log('categories', x);
  console.log('loading categories...');
  var count = 0;
  for(var i in x) {
    const item = x[i];
    item.i = i;
    index.addDoc(item);
    count++;
  }
  console.log(count, 'categories loaded.');
});
