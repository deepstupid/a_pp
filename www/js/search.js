"use strict";

var index = elasticlunr(function () {
    this.addField('n'); //label
    //this.addField('S'); //list of supercategories
    this.addField('s'); //list of subcategories
    this.setRef('i'); //URI
});


const _search = q => {
  return index.search(q, {
      fields: {
          n: {boost: 2},
          s: {boost: 1},
      }
      ,expand: true /*true */
  });
};
const search = memoizerific(256)(_search);

console.log('loading categories...');
var indexData = window.localStorage['categories'];
var loaded = indexData!==undefined;
if (loaded) {
    //TODO try and if failure remove the cached version and recreate below
    try {
      index.load(JSON.parse(indexData));
      console.log('categories cached.');
    }catch (e) {
      console.error(e);
      loaded = false;
    }
}

if (!loaded) {
  $.get('cat.json', x=>{
    //console.log(x);
    //console.log('categories', x);
    var count = 0;
    for(var i in x) {
      const item = x[i];
      if (item.s!==undefined) { //OR other filter
        item.i = i;
        index.addDoc(item);
        count++;
      }
    }
    console.log(count, 'categories loaded.');
    //TODO: https://github.com/adrianmay/rhaboo, or similar
    //window.localStorage['categories'] = JSON.stringify(index.toJSON(), null, null);
  });
}
