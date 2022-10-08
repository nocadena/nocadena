import axios from "axios";
import _ from "lodash";

export async function getTokenPrice(symbol: string) {
  return (await axios.get("/api/coinbasemarketcap?symbolList=" + symbol)).data
    .data;
}
