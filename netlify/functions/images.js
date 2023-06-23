const {
  getImages,
} = require("../../support/dynamo");

exports.handler = async function (event, _context) {

  const results = await getImages();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  };
};
