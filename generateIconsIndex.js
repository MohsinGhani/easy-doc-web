const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "components/icons");
const outputFile = path.join(iconsDir, "index.ts");

// Get all .tsx files in the icons directory
const files = fs
  .readdirSync(iconsDir)
  .filter((file) => path.extname(file) === ".tsx");

// Create export statements for each file
const exportStatements = files
  .map((file) => {
    const fileName = path.basename(file, ".tsx");
    return `export { default as ${fileName} } from './${fileName}';`;
  })
  .join("\n");

// Write the export statements to the index.ts file
fs.writeFileSync(outputFile, exportStatements);

console.log(`Generated ${outputFile} with ${files.length} exports.`);
