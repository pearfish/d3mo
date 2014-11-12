/**
 * Created by AUB-Noxious on 11/8/2014.
 */
var fs = require('fs');

var alph = 'ABCDEFHGJKLMNOPQRXTUVWXYZ'.split('');
var output = ['letter\tfrequency'];

for(i=0; i<alph.length; i++){
    var line = alph[i]+'\t'+Math.random();
    output.push(line);
}

output = output.join('\n');

fs.writeFile('data/data.tsv', output, function(e){
    if(e){
        console.log('bad');
    } else {
        console.log('good');
    }
});