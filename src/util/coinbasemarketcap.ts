import axios from "axios";
import _ from "lodash";

export async function getTokenPrices(symbols: string[]) {
  let symbolList = "";
  if (symbols.length > 0) {
    symbols.forEach((symbol) => (symbolList += symbol + ","));
    return (
      await axios.get(
        "/api/coinbasemarketcap?symbolList=" +
          symbolList.slice(0, symbolList.length - 1)
      )
    ).data.data;
  }
  return [];
}
