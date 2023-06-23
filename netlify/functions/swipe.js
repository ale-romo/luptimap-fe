const {
  saveSwipe,
} = require("../../support/dynamo");

exports.handler = async function (event, _context) {
  if (event.httpMethod === "POST") {
    const { post_id, user_uuid, swipe } = event.multiValueQueryStringParameters;

    if (!post_id?.length || !user_uuid?.length || !swipe?.length) {
      return {
        statusCode: 400,
      };
    }

    await saveSwipe(post_id[0], user_uuid[0], swipe[0]);

    return {
      statusCode: 200,
    };
  }

  return {
    statusCode: 404,
  };
};
