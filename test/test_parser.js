const assert = require("assert");
const Parser = require("src/parser");
const fs = require("fs");

const test_file = "test/pg1.rdf";
const file_content = fs.readFileSync(test_file, "utf-8");

const expected_data = require("./common_data")

describe("Parser", function () {
  describe("#parseFile()", function () {
    it("should return return a dict of items when a file is passed", function () {
      parsed_data = Parser.parseFile(test_file);
      assert.equal(expected_data.id, parsed_data.id);
      assert.equal(expected_data.title, parsed_data.title);
      assert.equal(expected_data.author_name, parsed_data.author_name);
      assert.equal(expected_data.publisher, parsed_data.publisher);
      assert.equal(expected_data.publication_date, parsed_data.publication_date);
      assert.equal(expected_data.language, parsed_data.language);
      assert.equal(expected_data.subjects, parsed_data.subjects);
      assert.equal(expected_data.license_rights, parsed_data.license_rights);
    });
  });

  describe("#parseString()", function () {
    it("should return return a xml string is passed", function () {
      parsed_data = Parser.parseString(file_content);
      assert.equal(expected_data.id, parsed_data.id);
      assert.equal(expected_data.title, parsed_data.title);
      assert.equal(expected_data.author_name, parsed_data.author_name);
      assert.equal(expected_data.publisher, parsed_data.publisher);
      assert.equal(expected_data.publication_date, parsed_data.publication_date);
      assert.equal(expected_data.language, parsed_data.language);
      assert.equal(expected_data.subjects, parsed_data.subjects);
      assert.equal(expected_data.license_rights, parsed_data.license_rights);
    });
  });
});
