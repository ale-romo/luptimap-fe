const { fromProcess } = require("@aws-sdk/credential-providers"); // CommonJS import
const {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");

const loggerInfo = async (msg) => {
  console.log(`dynamo: ${msg}`);
};

const credentials = fromProcess({
  // Optional. The path to the shared credentials file. If not specified, the provider will use
  // the value in the `AWS_SHARED_CREDENTIALS_FILE` environment variable or a default of
  // `~/.aws/credentials`.
  filepath: "/opt/build/repo/.aws/credentials",
  // Optional. The path to the shared config file. If not specified, the provider will use the
  // value in the `AWS_CONFIG_FILE` environment variable or a default of `~/.aws/config`.
  configFilepath: "/opt/build/repo/.aws/config",
})

console.log('perron', credentials)

const client = new FooClient({
  credentials,
});

const documentClient = new DynamoDBClient({
  region: "us-east-1",
  credentialDefaultProvider: client
});

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
