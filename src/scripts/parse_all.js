const helper = require('../utils/helpers')
const _ = require('lodash');
const { hrtime } = require("process");
const promise = require('bluebird');
const config = require('../config')
const files = helper.getFilesFromDir('files/epub', ['.rdf']);

console.log("Processing files : " ,files.length)

const starttime = hrtime();

/**
 * Using bluebird promise to control the concurrency.
 * if a larger scale is required, we should probably look
 * a queing system.
 */
promise.map(files, function(fileName) {
    // Promise.map awaits for returned promises as well.
    return helper.parse_and_save(fileName);
}, { concurrency: config.PROMISE_CONCURRENCY }).then(function() {
    const hrend = hrtime(starttime);
    console.info('Finished in: %ds %dms', hrend[0], hrend[1] / 1000000)
});