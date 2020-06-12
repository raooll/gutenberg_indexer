const rdf_parser = require("./rdf_parser");

const fs = require("fs");

/**
 * Parsed a files and returns a dict of required content.
 * @param {Text} file the filename to parse.
 */
const parseFile = (file) => {
  const file_data = fs.readFileSync(file, "utf8");
  return rdf_parser.parse(file_data);
};

/**
 * Parses a xml string and returns a dict of required content.
 * @param {Text} book_rdf_info the string context of rdf files.
 */
const parseString = (book_rdf_info) => {
  return rdf_parser.parse(book_rdf_info);
};

module.exports = { parseFile, parseString };
