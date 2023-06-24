const {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

const awsParams = {
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
};

const documentClient = new DynamoDBClient({
  region: "us-east-1",
  credentials: awsParams
});

const loggerInfo = async (msg) => {
  console.log(`dynamo: ${msg}`);
};

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
  const command = new ScanCommand({
    TableName,
    Limit,
  });

  return documentClient.send(command);
};

module.exports.getImages = async () => {
  return getData("instagram_classified", 20);
};

module.exports.saveSwipe = async (post_id, user_uuid, swipe) => {
  if (!post_id || !user_uuid || !swipe) {
    await loggerInfo("swipe not saved, empty data");
    return;
  }

  const command = new PutItemCommand({
    Item: {
      post_id,
      swipe,
      user_uuid,
      created_at: new Date().getTime(),
    },
    TableName: "instagram_swipe",
  });

  return documentClient.send(command);
};
