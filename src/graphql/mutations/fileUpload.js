const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = async ({ file }) => {
  const { createReadStream, filename } = await file;
  const stream = createReadStream();

  try {
    const generatedUUID = uuidv4();
    const extension = path.extname(filename);
    const newFileName = generatedUUID + "-" + Date.now() + extension;
    const pathName = path.join(
      __dirname,
      `../../../public/images/${newFileName}`
    );
    await stream.pipe(fs.createWriteStream(pathName));

    return { url: `http://localhost:4000/images/${newFileName}` };
  } catch (error) {
    throw error;
  }
};
