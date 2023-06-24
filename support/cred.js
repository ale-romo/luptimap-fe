const fs = require("fs");

require("dotenv").config();

const folderName = "/opt/build/repo/aws";

function createFolder() {
  console.log("creating folder");
  console.log(process.cwd())
  console.log(__dirname);

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
}

function saveCred() {
  const content = `aws_access_key_id=${process.env.MY_AWS_ACCESS_KEY_ID}\naws_secret_access_key=${process.env.MY_AWS_SECRET_ACCESS_KEY}`;

  try {
    fs.writeFileSync(`${folderName}/credentials`, content);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  createFolder();
  saveCred();
}

main().then(() => {
  console.log("cred created");
});
