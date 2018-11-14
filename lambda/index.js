const allStatus = require('./version-check');

exports.handler = async(event) => {
  const result = await allStatus()
  console.log(result);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(result)
  }
}
