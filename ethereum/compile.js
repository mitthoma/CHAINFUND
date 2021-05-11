//compile once and output a compiled file to refer to a build version
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
console.log(buildPath);
//removeSync included in fs-extra
//looks in folder and deletes everything in it as well as folder
fs.removeSync(buildPath);
console.log(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
console.log(campaignPath);
const source = fs.readFileSync(campaignPath, 'utf8');
// console.log(source);
//this output will output both compiled Campaign and Factory contracts
const output = solc.compile(source, 1).contracts;
console.log(output);


//this creates the build folder again
fs.ensureDirSync(buildPath);

console.log(output);
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
