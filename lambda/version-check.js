#!/bin/node

const request = require('request');

const endpoints = [
  "https://blog.mikemjharris.com/version.json",
  "https://www.mikemjharris.com/version.json"
]


const makeCall = (endpoint) => {
  return new Promise((resolve, reject) => {
    request(endpoint, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve({
          endpoint: endpoint,
          ...JSON.parse(body)
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


