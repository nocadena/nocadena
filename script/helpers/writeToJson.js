const fs = require("fs");

const args = process.argv.slice(2);
if (args.length < 3 || args.length % 2 != 0) {
  console.log(`please supply the correct parameters:
      filename
      chainId
      contractName1
      address1
      contractName2
      address2
      ...
    `);
  process.exit(1);
}
async function writeToJson(filename, chainId, contractMap) {
  let content = JSON.parse("{}");
  try {
    content = JSON.parse(fs.readFileSync("./script/addresses/" + filename));
  } catch {}
  let chain = JSON.parse("{}");
  for (let i = 0; i < contractMap.length; i += 2) {
    const name = contractMap[i];
    const address = contractMap[i + 1].toLowerCase();
    chain[name] = address;
  }
  content[chainId] = chain;
  fs.writeFileSync("./script/addresses/" + filename, JSON.stringify(content));
  // process.stdout.write(content);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
writeToJson(args[0], args[1], args.slice(2))
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
