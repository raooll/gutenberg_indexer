const { DataTypes } = require("sequelize");

/**
 * Create the database schema
 */
module.exports = (sequelize, Sequelize) => {
  const BookInfo = sequelize.define(
    "books",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
      },
      author_name: {
        type: DataTypes.STRING,
      },
      publisher: {
        type: DataTypes.STRING,
      },
      publication_date: {
        type: DataTypes.DATEONLY,
      },
      language: {
        type: DataTypes.STRING,
      },
      subjects: {
        type: DataTypes.TEXT,
      },
      license_rights: {
        type: DataTypes.TEXT,
      },
    },
    {
      indexes: [
        { fields: ["title"] },
        { fields: ["author_name"] },
        { fields: ["publication_date"] },
      ],
    }
  );

  return BookInfo;
};
