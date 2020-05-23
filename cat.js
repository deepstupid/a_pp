const N3 = require('n3');
const fs = require('fs');
const parser = new N3.Parser();

//https://dumps.wikimedia.org/other/categoriesrdf/latest/
const rdfStream = fs.createReadStream('/home/me/d/simplewiki-20200516-categories.2.ttl');

parser.parse(rdfStream, console.log);
