#!/usr/bin/env node
// Shebang Syntax for to run in given enviornment 
let inputArr = process.argv.slice(2);
let fs= require("fs");
let path=require("path");
//console.log(inputArr);
// //c.execSync("start chrome")
// console.log(c.platform());
// console.log(c.networkInterfaces());

let helpObj = require("./command/help");
let treeObj = require("./command/tree");
let organizeObj = require("./command/organize");

let types = {
    media: ["mp4", "mkv","jpeg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

// node main.js tree "directoryPath"
// node main.js oragnise "directoryPath"
// node main.js help "directoryPath"
let command = inputArr[0];





switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please 🙏 Input Right command");
        break;
}





