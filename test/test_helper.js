const fs = require("fs");
const assert = require("assert");
const helper = require("src/utils/helpers");
const DB = require("src/database");
const expected_data = require("./common_data")
const test_file = "test/pg1.rdf";


beforeEach(async function () {
    DB.BookInfo.destroy({
        where:{}
    }).then(() => {});
  });

describe('helpers', function () {
    describe('#getFilesFromDir()', function () {
      it('should return one file of rdf format in the test dir', function () {
        files = helper.getFilesFromDir("./test", [".rdf"])
        assert.equal(files.length,1);
        assert.equal(files[0].includes("pg1.rdf"),true);
      });
    });
  });