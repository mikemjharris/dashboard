#!/bin/node

const request = require('request');

const endpoints = [
  "https://blog.mikemjharris.com",
  "https://www.mikemjharris.com",
  "https://books.mikemjharris.com",
  "https://view-from-the-ra.mikemjharris.com"
]


const makeCall = (endpoint) => {
  return new Promise((resolve, reject) => {
    request(endpoint + '/version.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve({
          ok: true,
          url: endpoint,
          versionEndpoint: 'version.json',
          status: JSON.parse(body)
        });
      }
      resolve({
        ok: false,
        url: endpoint,
        versionEndpoint: 'version.json',
        status: {}
      });
    });
  });
};

const allStatus = () => {
  return Promise.all(endpoints.map(makeCall));
};

module.exports = allStatus;


