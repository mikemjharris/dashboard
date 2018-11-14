const allStatus = require('version-check');

(async () => {
  const result = await allStatus()
  console.log(result);
}
