const { saveSwipe } = require("../../support/dynamo");

exports.handler = async function (event, _context) {
  console.log(JSON.stringify(event, null, 2));
  if (event.httpMethod === "POST") {
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return {
        statusCode: 400,
      };
    }

    console.log("body", body);
    const { post_id, user_uuid, swipe } = body;
    if (!post_id || !user_uuid || !swipe) {
      return {
        statusCode: 400,
      };
    }

    await saveSwipe(post_id, user_uuid, swipe);

    return {
      statusCode: 200,
    };
  }

  return {
    statusCode: 404,
  };
};
