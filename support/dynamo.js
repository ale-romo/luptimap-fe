const AWS = require("aws-sdk");

const loggerInfo = async (msg) => {
  console.log(`dynamo: ${msg}`);
};

require("dotenv").config();

const awsParams = {
  region: "us-east-1",
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(awsParams);

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getPostClassified = async (id, taken_at_timestamp) => {
  const params = {
    TableName: "instagram_classified",
    Key: {
      id,
      taken_at_timestamp,
    },
  };

  return documentClient.get(params).promise();
};

const getData = async (TableName, Limit) => {
  const params = {
    TableName,
    Limit,
  };

  return documentClient.scan(params).promise();
};

module.exports.getImages = async () => {
  return getData("instagram_classified", 20);
};

module.exports.saveSwipe = async (post_id, user_uuid, swipe) => {
  if (!post_id || !user_uuid || !swipe) {
    await loggerInfo("swipe not saved, empty data");
    return;
  }

  await documentClient
    .put({
      Item: {
        post_id,
        swipe,
        user_uuid,
        created_at: new Date().getTime(),
      },
      TableName: "instagram_swipe",
    })
    .promise();

  return true;
};
