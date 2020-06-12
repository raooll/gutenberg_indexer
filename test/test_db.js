const assert = require("assert");
const fs = require("fs");
const DB = require("src/database");
const parsed_info = require("./common_data")

beforeEach(async function () {
  DB.BookInfo.destroy({
      where:{}
  }).then(() => {});
});

describe("BookInfo", function () {
  describe("#save()", function () {
    it("should return save the object in the DB.", async function () {
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
      const book_info_from_db = await DB.BookInfo.findByPk(parsed_info.id);

      assert.equal(book_info_from_db.id, parsed_info.id);
      assert.equal(book_info_from_db.title, parsed_info.title);
      assert.equal(book_info_from_db.author_name, parsed_info.author_name);
    });
  });
});
