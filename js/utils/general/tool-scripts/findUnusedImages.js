const fs = require("fs");
const path = require("path");
const glob = require("glob");

const imagesDir = path.join(__dirname, "Images");
const projectFiles = glob.sync(path.join(__dirname, "**/*.{html,css,js}"), {
  ignore: "node_modules/**",
});

fs.readdir(imagesDir, (err, files) => {
  if (err) throw err;

  const unusedImages = files.filter((file) => {
    const imageFileName = path.basename(file);
    const isUsed = projectFiles.some((projectFile) => {
      const content = fs.readFileSync(projectFile, "utf-8");
      return content.includes(imageFileName);
    });

    return !isUsed;
  });

  if (unusedImages.length) {
    console.log("Unused images found:");
    unusedImages.forEach((image) => console.log(image));
  } else {
    console.log("No unused images found.");
  }
});

// Run like this: node findUnusedImages.js
