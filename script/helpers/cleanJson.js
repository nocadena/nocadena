const fs = require("fs");

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log(`please supply the correct parameters:
      filename
    `);
  process.exit(1);
}
async function cleanJson(filename) {
  fs.writeFileSync("./script/addresses/" + filename, "", { flag: "w" });
  // process.stdout.write(content);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
cleanJson(args[0])
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
