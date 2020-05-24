const N3 = require('n3');
const fs = require('fs');
const parser = new N3.Parser();

const outputRaw = true;

//https://dumps.wikimedia.org/other/categoriesrdf/latest/
const rdfStream = fs.createReadStream('/home/me/d/simplewiki-20200516-categories.2.ttl');

const d =  {} ; //new Map();

function id(x) {
    return x.replace('https://simple.wikipedia.org/wiki/Category:', '');
}

function X(id) {
  var x = d[id]; //.get(id);
  if (x === undefined) {
     x = {  }; d[id] = x; //.set(id, x);
  }
  return x;
}

parser.parse(rdfStream, (err, q, prefixes)=>{
    if (!q) {
      //done
      if (outputRaw) {
        console.log(JSON.stringify(d,null,null));
      } else {
          const lunr = require('elasticlunr');
          const index = lunr(function () {
              this.addField('n'); //label
              this.addField('S'); //list of supercategories
              this.addField('s'); //list of subcategories
              this.setRef('i'); //URI
          });
          var count = 0;
          for(var i in d) {
            const item = d[i];
            item.i = i;
            index.addDoc(item);
            count++;
          }
          console.log(JSON.stringify(index.toJSON(),null,null));
      }
      return;
    }

    const s = id(q.subject.id);
    var o = id(q.object.id);

    const p = q.predicate.id
              .replace('https://www.mediawiki.org/ontology#', '')
              .replace('http://www.w3.org/2000/01/rdf-schema#', '');

    var x = X(s);

    if ('isInCategory'===p) {

        if (x.S===undefined)
          x.S = [];
        x.S.push(o);

        const y = X(o);
        if (y.s===undefined)
          y.s = [];

        y.s.push(s);

    } else if ('pages' ===p) {

    } else if ('label' === p) {
        if (typeof(o)==='string') {
          if (o[0] === '"')
            o = o.substring(1, o.length-1);
        }
        x.n = o;
    } else if ('subcategories'===p) {
        //console.log(s, '->', o);
    }

});
