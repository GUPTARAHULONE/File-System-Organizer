let fs= require("fs");
let path=require("path");

let types = {
    media: ["mp4", "mkv","jpeg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizeFn(dirPath) {

    // console.log("organize command implemnted for ", dirPath);
    // 1. input -> directory path given
    let destPath;
    if (dirPath == undefined) {
        destPath = process.cwd();
        //console.log("Enter path");
        return;
    }
    else{
        ///getting file or folder
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {

            // 2. create -> organized_files -> directory
            // Getting Path
            destPath = path.join(dirPath, "organized_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }

        } else {

            console.log("Kindly enter the correct path");
            return;
        }
    }

    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
    // 3. identify categories of all the files present in that input directory  ->
    //Read all the data from src folder
    let childNames = fs.readdirSync(src);
     console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
       // Getting Path
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to --> ", category);
            // 4. copy / cut  files to that organized directory inside of any of category folder 
            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(srcFilePath, dest, category) {
    // 
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
   
    //  returns the filename part of a file path
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    ///    Copy the content of src to dest folder
    fs.copyFileSync(srcFilePath, destFilePath);
    // For cut 
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to ", category);

}


function getCategory(name) {
    // Getting the extension like .pdf  , .jpg
    let ext = path.extname(name);
    // Remove dot fro extension
    ext = ext.slice(1);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            //  If extension matches then return that type which decalred in Utilies.js
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}



module.exports = {
    organizeKey: organizeFn
}