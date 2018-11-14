#!/bin/node

const request = require('request');

const endpoints = [
  "https://blog.mikemjharris.com",
  "https://www.mikemjharris.com"
]


const makeCall = (endpoint) => {
  return new Promise((resolve, reject) => {
    request(endpoint + '/version.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve({
          url: endpoint,
          versionEndpoint: 'version.json',
          status: JSON.parse(body)
        });
      }
      reject(error);
    });
  });
};

const allStatus = () => {
  return Promise.all(endpoints.map(makeCall));
};

module.exports = allStatus;


