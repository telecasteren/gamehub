const fs = require("fs-extra");
const path = require("path");
const postcss = require("postcss");

const originalColor = ""; // add --original-color here
const newColor = ""; // add --new-color here
const cssDir = path.join(__dirname, "..", "..", "..", "..", "css");

function replaceColors(css) {
  return postcss.plugin("replaceColors", () => {
    return (root) => {
      root.walkDecls((decl) => {
        if (decl.value.includes(`var(${originalColor})`)) {
          decl.value = decl.value.replace(
            `var(${originalColor})`,
            `var(${newColor})`
          );
        }
      });
    };
  });
}

async function processCSSFiles(dir) {
  const items = await fs.readdir(dir);

  for (let item of items) {
    const itemPath = path.join(dir, item);
    const stats = await fs.stat(itemPath);

    if (stats.isDirectory()) {
      await processCSSFiles(itemPath); // Recursive call for subdirectories
    } else if (path.extname(item) === ".css") {
      const css = await fs.readFile(itemPath, "utf8");
      const result = await postcss([replaceColors()]).process(css, {
        from: itemPath,
        to: itemPath,
      });
      await fs.writeFile(itemPath, result.css);
      console.log(`Updated colors in ${itemPath}`);
    }
  }
}

processCSSFiles(cssDir).catch((err) => console.error(err));
