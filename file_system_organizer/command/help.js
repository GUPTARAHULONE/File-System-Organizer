let fs= require("fs");
let path=require("path");
function helpFn(dirPath) {
    console.log(`
    List alll
      node main.js tree "directoryPath"
       node main.js oragnise "directoryPath"
       node main.js help "directoryPath"
    `);
  }
  

  module.exports={
    helpKey: helpFn
}