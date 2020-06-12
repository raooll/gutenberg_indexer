const fs = require('fs');
const path = require('path');
const DB = require("../../src/database");
const Parser = require("../../src/parser");
const book_info = require("../../src/database/models/book_info");
 
/**
 * Gets all the files of a required extensions in a directory and its sub-directories
 * @param {*} dir the directory path to look for files
 * @param {*} fileTypes a list of fileTypes to search for
 */
const  getFilesFromDir = (dir, fileTypes) =>  {
  var filesToReturn = [];
  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);      
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
        filesToReturn.push(path.resolve(curFile));
      } else if (fs.statSync(curFile).isDirectory()) {
       walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn; 
}

/**
 * Parses the rdf file and save the information in db.
 * @param {*} file_name the name of the to parse
 */
const parse_and_save = async (file_name) => {
  if (fs.existsSync(file_name)) {
    const parsed_info = Parser.parseFile(file_name);
    let book_info = await DB.BookInfo.findByPk(parsed_info.id);
    if (book_info == null) {
      await save_new_bookinfo(parsed_info);
    } else {
      await update_existing_bookinfo(book_info, parsed_info);
    }
    console.log("Processed ", file_name);
  } else {
    console.log("File missing", file_name);
  }
};

/**
 * Updates existings data in the db.
 * @param {*} bookinfo_object a BookInfo db object to update
 * @param {*} parsed_info dictionary of parsed info
 */
const update_existing_bookinfo = async (bookinfo_object, parsed_info) => {
  bookinfo_object.title = parsed_info.title;
  bookinfo_object.author_name = parsed_info.author_name;
  bookinfo_object.publisher = parsed_info.publisher;
  bookinfo_object.publication_date = parsed_info.publication_date;
  bookinfo_object.language = parsed_info.language;
  bookinfo_object.subjects = parsed_info.subjects;
  bookinfo_object.license_rights = parsed_info.license_rights;
  await bookinfo_object.save();

  return bookinfo_object
};

/**
 * Saves new parsed information in db.
 * @param {*} parsed_info dictionary of parsed info
 */
const save_new_bookinfo = async (parsed_info) => {
  const book_info = await DB.BookInfo.create({
    id: parsed_info.id,
    title: parsed_info.title,
    author_name: parsed_info.author_name,
    publisher: parsed_info.publisher,
    publication_date: parsed_info.publication_date,
    language: parsed_info.language,
    subjects: parsed_info.subjects,
    license_rights: parsed_info.license_rights,
  });

  return book_info;
};
 
module.exports = { getFilesFromDir, parse_and_save }