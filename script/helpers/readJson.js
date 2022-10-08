const fs = require("fs");

const args = process.argv.slice(2);
if (args.length < 3) {
  console.log(`please supply the correct parameters:
      filename
      chainId
      contractName
    `);
  process.exit(1);
}
async function readJson(filename, chainId, contractName) {
  let content = JSON.parse(fs.readFileSync("./script/addresses/" + filename));
  try {
    process.stdout.write(content[chainId][contractName]);
  } catch {
    process.stdout.write("0x0000000000000000000000000000000000000000");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
readJson(args[0], args[1], args[2])
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
