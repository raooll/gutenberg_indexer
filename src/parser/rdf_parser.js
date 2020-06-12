"use strict";

const DOMParser = require("xmldom").DOMParser;
const _ = require("lodash");

const domparser = new DOMParser();

/**
 * Parses the xml string and returns a dict of information.
 * @param {*} rdf_string the xml rdf context as string
 */
const parse = (rdf_string) => {
  const rdf_doc = domparser.parseFromString(rdf_string);
  const data = {
    id: get_id(rdf_doc),
    title: get_title(rdf_doc),
    author_name: get_author_name(rdf_doc),
    publisher: get_publisher(rdf_doc),
    publication_date: get_publication_date(rdf_doc),
    language: get_language(rdf_doc),
    subjects: get_subjects(rdf_doc),
    license_rights: get_license_rights(rdf_doc),
  };
  return data;
};

const get_id = (xml_doc) => {
  let id;
  const ebook_node = xml_doc.getElementsByTagName("pgterms:ebook")[0];
  const about_attribute = ebook_node.getAttribute("rdf:about");
  id = parseInt(_.trim(about_attribute.split("/")[1]));
  return id;
};

const get_title = (xml_doc) => {
  let title;
  try {
    const title_node = xml_doc.getElementsByTagName("dcterms:title")[0];
    title = _.trim(title_node.childNodes[0].data);
  } catch (e) {
    //console.log("Exception ", e);
  }

  return title;
};

const get_author_name = (xml_doc) => {
  let author_name;
  try {
    const creator_node = xml_doc.getElementsByTagName("dcterms:creator")[0];
    const name_node = creator_node.getElementsByTagName("pgterms:name")[0];
    author_name = _.trim(name_node.childNodes[0].data);
  } catch (e) {
    //console.log("Exception ", e);
  }

  return author_name;
};

const get_publisher = (xml_doc) => {
  let publisher;
  try {
    const publisher_node = xml_doc.getElementsByTagName("dcterms:publisher")[0];
    publisher = _.trim(publisher_node.childNodes[0].data);
  } catch (e) {
    //console.log("Exception ", e);
  }
  return publisher;
};

const get_publication_date = (xml_doc) => {
  let publication_date;
  try {
    const publication_date_node = xml_doc.getElementsByTagName(
      "dcterms:issued"
    )[0];
    publication_date = _.trim(publication_date_node.childNodes[0].data);
  } catch (e) {
    //console.log("Exception ", e);
  }
  return publication_date;
};

const get_language = (xml_doc) => {
  let language;
  try {
    const language_node = xml_doc.getElementsByTagName("dcterms:language")[0];
    const value_node = language_node.getElementsByTagName("rdf:value")[0];
    language = _.trim(value_node.childNodes[0].data);
  } catch (e) {
    //console.log("Exception ", e);
  }
  return language;
};

const get_subjects = (xml_doc) => {
  let subjects;

  const get_subject_value = (subject_node) => {
    let value_nodes = subject_node.getElementsByTagName("rdf:value")[0];
    return _.trim(value_nodes.childNodes[0].data);
  }

  try {
    const subjects_nodes = xml_doc.getElementsByTagName("dcterms:subject");
    subjects = _.map(subjects_nodes, (sn) => get_subject_value(sn)).join(",");
  } catch (e) {
    //console.log("Exception ", e);
  }
  return subjects;
};

const get_license_rights = (xml_doc) => {
  let license_rights;
  try {
    const license_rights_node = xml_doc.getElementsByTagName(
      "dcterms:rights"
    )[0];
    license_rights = _.trim(license_rights_node.childNodes[0].data);
  } catch (e) {
    //console.log("Exception ", e);
  }
  return license_rights;
};

module.exports = { parse };
