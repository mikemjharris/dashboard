const allStatus = require('version-check');

exports.handler = async(event) => {
  const result = await allStatus()
  console.log(result);
}
