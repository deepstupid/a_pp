"use strict";

/*var w = new Worker("js/searchworker.js");
w.onmessage = function(e) {
	console.log('Message received from worker', e);
};
w.postMessage(['s']);*/

var index = elasticlunr(function () {
    this.addField('n'); //label
    //this.addField('S'); //list of supercategories
    this.addField('s'); //list of subcategories
    this.setRef('i'); //URI
    //this.pipeline._queue.remove()
    //console.log(this);
});


const _search = q => {
  return index.search(q, {
      fields: {
          n: {boost: 2},
          s: {boost: 1},
      }
      ,expand: false /*true */
  });
};
const search = memoizerific(256)(_search);

console.log('loading categories...');
var indexData = window.localStorage['categories'];
var loaded = indexData!==undefined;
if (loaded) {
    //TODO try and if failure remove the cached version and recreate below
    try {
      index.load(JSONC.decompress(indexData));
      console.log('categories cached.');
    }catch (e) {
      console.error(e);
      loaded = false;
    }
}

if (!loaded) {
  var noLeaves = false;
  $.get('cat.json', x=>{
    //console.log(x);
    //console.log('categories', x);
    var count = 0;
    for(var i in x) {
      const item = x[i];
      if (!noLeaves || item.s!==undefined) { //OR other filter
        item.i = i;
        index.addDoc(item);
        count++;
      }
    }
    console.log(count, 'categories loaded.');
/*    const y = index.toJSON();

    console.log('compressing');
    var compressedJSON = JSONC.compress( y );
    console.log(compressedJSON.length);*/

    //TODO: https://github.com/adrianmay/rhaboo, or similar
    //window.localStorage['categories'] = JSON.stringify(index.toJSON(), null, null);
  });
}
